import { readFileSync } from "node:fs";

function getArg(index) {
    return process.argv[index] ?? "";
}

function parseVersion(value) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(value);

    if (!match) {
        throw new Error(`Unsupported package version "${value}". Expected semantic version major.minor.patch.`);
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

function bumpVersion(version, releaseType) {
    switch (releaseType) {
        case "patch":
            return `${version.major}.${version.minor}.${version.patch + 1}`;
        case "minor":
            return `${version.major}.${version.minor + 1}.0`;
        case "major":
            return `${version.major + 1}.0.0`;
        default:
            throw new Error(`Unsupported release type "${releaseType}". Expected patch, minor, or major.`);
    }
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasChangelogSection(changelog, version) {
    const pattern = new RegExp(`^##\\s+${escapeRegExp(version)}\\s*$`, "m");
    return pattern.test(changelog);
}

const releaseType = getArg(2);

if (!releaseType) {
    throw new Error("Usage: node scripts/assert-changelog-version.mjs <patch|minor|major>");
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const currentVersion = parseVersion(packageJson.version);
const nextVersion = bumpVersion(currentVersion, releaseType);
const changelog = readFileSync("CHANGELOG.md", "utf8").replace(/\r\n/g, "\n");

if (!hasChangelogSection(changelog, nextVersion)) {
    throw new Error(`Missing CHANGELOG.md section for upcoming version ${nextVersion}.`);
}

console.log(`Found CHANGELOG.md section for ${nextVersion}.`);
