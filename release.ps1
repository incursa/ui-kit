[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("patch", "minor", "major")]
    [string]$ReleaseType,

    [Parameter(Mandatory = $true)]
    [string]$Changelog,

    [switch]$NoPush
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,

        [Parameter(Mandatory = $true)]
        [scriptblock]$Action
    )

    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
    & $Action
}

function Get-RepositoryRoot {
    $root = git rev-parse --show-toplevel 2>$null
    if (-not $root) {
        throw "This script must be run inside the git repository."
    }

    return $root.Trim()
}

function Get-CurrentBranch {
    return (git branch --show-current).Trim()
}

function Get-DirtyEntries {
    $statusLines = git status --short
    if (-not $statusLines) {
        return @()
    }

    return @($statusLines | Where-Object { $_.Trim() -ne "" })
}

function Get-PackageVersion {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PackageJsonPath
    )

    $packageJson = Get-Content -Raw -Path $PackageJsonPath | ConvertFrom-Json
    return [string]$packageJson.version
}

function Get-NextVersion {
    param(
        [Parameter(Mandatory = $true)]
        [string]$CurrentVersion,

        [Parameter(Mandatory = $true)]
        [ValidateSet("patch", "minor", "major")]
        [string]$ReleaseType
    )

    $parts = $CurrentVersion.Split(".")
    if ($parts.Count -ne 3) {
        throw "Version '$CurrentVersion' is not a simple semver triplet."
    }

    $major = [int]$parts[0]
    $minor = [int]$parts[1]
    $patch = [int]$parts[2]

    switch ($ReleaseType) {
        "patch" { $patch += 1 }
        "minor" { $minor += 1; $patch = 0 }
        "major" { $major += 1; $minor = 0; $patch = 0 }
    }

    return "$major.$minor.$patch"
}

function Format-ChangelogBody {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Text
    )

    $normalized = $Text -replace "`r`n", "`n"
    $normalized = $normalized.Trim()

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        throw "Changelog text cannot be empty."
    }

    return $normalized
}

function Update-Changelog {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ChangelogPath,

        [Parameter(Mandatory = $true)]
        [string]$Version,

        [Parameter(Mandatory = $true)]
        [string]$Body
    )

    $existing = Get-Content -Raw -Path $ChangelogPath
    $normalizedExisting = $existing -replace "`r`n", "`n"

    if ($normalizedExisting -match "(?m)^##\s+$([regex]::Escape($Version))\s*$") {
        throw "CHANGELOG.md already contains a section for version $Version."
    }

    $newSection = "## $Version`n`n$Body`n`n"
    $headerPattern = "(?s)\A(# Changelog\s*\n\n)"

    if ($normalizedExisting -notmatch $headerPattern) {
        throw "CHANGELOG.md does not start with the expected '# Changelog' header."
    }

    $updated = [regex]::Replace($normalizedExisting, $headerPattern, "`$1$newSection", 1)
    [System.IO.File]::WriteAllText($ChangelogPath, $updated.Replace("`n", [Environment]::NewLine))
}

$repoRoot = Get-RepositoryRoot
Set-Location $repoRoot

$packageJsonPath = Join-Path $repoRoot "package.json"
$packageLockPath = Join-Path $repoRoot "package-lock.json"
$changelogPath = Join-Path $repoRoot "CHANGELOG.md"

Invoke-Step "Checking repository state" {
    $branch = Get-CurrentBranch
    if ($branch -ne "main") {
        throw "Release script only runs from 'main'. Current branch: '$branch'."
    }

    $dirtyEntries = Get-DirtyEntries
    if ($dirtyEntries.Count -gt 0) {
        throw "Working tree is not clean. Commit or stash changes first.`n$($dirtyEntries -join [Environment]::NewLine)"
    }
}

$currentVersion = Get-PackageVersion -PackageJsonPath $packageJsonPath
$nextVersion = Get-NextVersion -CurrentVersion $currentVersion -ReleaseType $ReleaseType
$tagName = "v$nextVersion"
$changelogBody = Format-ChangelogBody -Text $Changelog

Write-Host ""
Write-Host "Preparing $ReleaseType release $nextVersion" -ForegroundColor Green

Invoke-Step "Bumping package version to $nextVersion and running package validation" {
    npm version $ReleaseType --no-git-tag-version
}

Invoke-Step "Updating CHANGELOG.md" {
    Update-Changelog -ChangelogPath $changelogPath -Version $nextVersion -Body $changelogBody
}

Invoke-Step "Staging release files" {
    git add -- package.json package-lock.json CHANGELOG.md dist
}

Invoke-Step "Creating release commit" {
    git commit -m "chore: release $tagName"
}

Invoke-Step "Creating git tag $tagName" {
    git tag $tagName
}

if (-not $NoPush) {
    Invoke-Step "Pushing main to origin" {
        git push origin main
    }

    Invoke-Step "Pushing tag $tagName to origin" {
        git push origin $tagName
    }
}
else {
    Write-Host ""
    Write-Host "Skipping push because -NoPush was supplied." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Release $nextVersion is ready." -ForegroundColor Green

if ($NoPush) {
    Write-Host "Next steps:" -ForegroundColor Green
    Write-Host "  git push origin main"
    Write-Host "  git push origin $tagName"
}
else {
    Write-Host "The npm publish workflow should start from tag $tagName." -ForegroundColor Green
}
