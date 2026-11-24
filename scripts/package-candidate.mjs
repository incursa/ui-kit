import { createHash } from "node:crypto";
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { gunzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const hasFlag = (name) => args.includes(name);
const valueFor = (name) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : undefined;
};

const check = hasFlag("--check");
const record = hasFlag("--record");
const sourceCommit = valueFor("--source-commit");
const outputDirValue = valueFor("--output-dir");

if (check === record) {
    throw new Error("Choose exactly one of --check or --record.");
}

if (record && !/^[0-9a-f]{40}$/.test(sourceCommit ?? "")) {
    throw new Error("--record requires --source-commit with a full 40-character Git commit.");
}

const readJson = (relativePath) => JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
const sha = (algorithm, bytes) => createHash(algorithm).update(bytes).digest("hex");
const sri = (algorithm, bytes) => `${algorithm}-${createHash(algorithm).update(bytes).digest("base64")}`;

const packageJson = readJson("package.json");
const manifest = readJson("conformance/ui-kit.json");
const evidencePath = manifest.packageEvidence?.repositoryPath;
const expectedNpmVersion = packageJson.packageManager?.match(/^npm@(.+)$/)?.[1];

if (!expectedNpmVersion) {
    throw new Error("package.json must pin the npm pack toolchain with packageManager.");
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const npmVersionResult = spawnSync(npm, ["--version"], { cwd: repoRoot, encoding: "utf8" });
const npmVersion = npmVersionResult.stdout.trim();
if (npmVersionResult.status !== 0 || npmVersion !== expectedNpmVersion) {
    throw new Error(`Expected npm ${expectedNpmVersion} for deterministic packing, found ${npmVersion || "unknown"}.`);
}

const git = (gitArgs) => spawnSync("git", gitArgs, { cwd: repoRoot, encoding: "utf8" });
const assertCommit = (commit, label) => {
    if (!/^[0-9a-f]{40}$/.test(commit ?? "") || git(["cat-file", "-e", `${commit}^{commit}`]).status !== 0) {
        throw new Error(`${label} must identify a fetched full Git commit.`);
    }
};

assertCommit(manifest.sourceBaselineRevision, "sourceBaselineRevision");
if (record) {
    assertCommit(sourceCommit, "sourceCommit");
    if (git(["merge-base", "--is-ancestor", manifest.sourceBaselineRevision, sourceCommit]).status !== 0) {
        throw new Error("The recorded source commit must descend from the declared generic payload baseline.");
    }
}

if (!evidencePath || path.isAbsolute(evidencePath) || evidencePath.split(/[\\/]/).includes("..")) {
    throw new Error("conformance/ui-kit.json must name a safe repository-relative package evidence path.");
}

const absoluteEvidencePath = path.join(repoRoot, evidencePath);
const expectedEvidence = check && existsSync(absoluteEvidencePath) ? readJson(evidencePath) : undefined;

if (record && process.platform !== "linux") {
    throw new Error("Canonical package evidence must be recorded on the pinned Linux CI pack platform.");
}

if (manifest.uiKitVersion !== packageJson.version) {
    throw new Error(`Conformance version ${manifest.uiKitVersion} does not match package version ${packageJson.version}.`);
}

if (manifest.releaseStatus !== "non-production-prerelease-artifact-only" || manifest.published !== false) {
    throw new Error("Candidate metadata must remain explicitly non-production and unpublished.");
}

const calculatedAssets = {};
for (const relativePath of Object.keys(manifest.generatedAssets ?? {}).sort()) {
    const absolutePath = path.join(repoRoot, relativePath);
    if (!existsSync(absolutePath)) {
        throw new Error(`Generated asset is missing: ${relativePath}`);
    }
    calculatedAssets[relativePath] = sha("sha256", readFileSync(absolutePath));
}

if (Object.keys(calculatedAssets).length === 0) {
    throw new Error("Conformance metadata must identify generated assets.");
}

for (const [relativePath, digest] of Object.entries(calculatedAssets)) {
    if (manifest.generatedAssets[relativePath] !== digest) {
        throw new Error(`Generated asset digest drifted for ${relativePath}.`);
    }
}

const tempDir = mkdtempSync(path.join(os.tmpdir(), "incursa-ui-kit-candidate-"));

try {
    const packed = spawnSync(
        npm,
        ["pack", "--ignore-scripts", "--json", "--pack-destination", tempDir],
        { cwd: repoRoot, encoding: "utf8" },
    );

    if (packed.status !== 0) {
        throw new Error(`npm pack failed:\n${packed.stderr || packed.stdout}`);
    }

    const packResult = JSON.parse(packed.stdout)[0];
    const tarballPath = path.join(tempDir, packResult.filename);
    const tarballBytes = readFileSync(tarballPath);
    const packageSha256 = sha("sha256", tarballBytes);
    const packageIntegrity = sri("sha512", tarballBytes);
    const tarPayloadSha256 = sha("sha256", gunzipSync(tarballBytes));

    if (packResult.integrity !== packageIntegrity) {
        throw new Error("npm-reported integrity does not match the independently calculated tarball integrity.");
    }

    const candidate = {
        contract: "incursa.ui-kit.package-evidence.v1",
        package: packageJson.name,
        packageVersion: packageJson.version,
        releaseStatus: manifest.releaseStatus,
        published: false,
        sourceCommit: record ? sourceCommit : expectedEvidence?.sourceCommit,
        sourceBaselineRevision: manifest.sourceBaselineRevision,
        canonicalPlatform: record ? process.platform : expectedEvidence?.canonicalPlatform,
        tarball: packResult.filename,
        packageSha256,
        packageIntegrity,
        npmShasum: packResult.shasum,
        tarPayloadSha256,
        packageSize: packResult.size,
        unpackedSize: packResult.unpackedSize,
        fileCount: packResult.entryCount,
        generatedAssets: calculatedAssets,
        deterministicRestore: `npm install ./${packResult.filename}`,
        retention: {
            workflow: ".github/workflows/ci.yml",
            artifactName: `ui-kit-${packageJson.version}-<source-commit>`,
            publicRegistryPublication: false,
        },
    };

    if (record) {
        mkdirSync(path.dirname(absoluteEvidencePath), { recursive: true });
        writeFileSync(absoluteEvidencePath, `${JSON.stringify(candidate, null, 2)}\n`);
        console.log(`Recorded immutable package evidence at ${evidencePath}.`);
    } else {
        if (!existsSync(path.join(repoRoot, evidencePath))) {
            throw new Error(`Package evidence is missing: ${evidencePath}`);
        }

        const expected = expectedEvidence;
        assertCommit(expected.sourceCommit, "sourceCommit");
        if (git(["merge-base", "--is-ancestor", manifest.sourceBaselineRevision, expected.sourceCommit]).status !== 0) {
            throw new Error("The recorded source commit must descend from the declared generic payload baseline.");
        }
        const actual = { ...candidate };
        if (process.platform !== expected.canonicalPlatform) {
            for (const key of ["packageSha256", "packageIntegrity", "npmShasum", "packageSize"]) {
                actual[key] = expected[key];
            }
        }
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            const mismatches = Object.keys(actual)
                .filter((key) => JSON.stringify(actual[key]) !== JSON.stringify(expected[key]))
                .map((key) => `${key}: expected ${JSON.stringify(expected[key])}, received ${JSON.stringify(actual[key])}`)
                .join("\n");
            throw new Error(
                `Package identity drift detected for ${packageJson.name}@${packageJson.version}. ` +
                `Assign changed contents a new version and record new evidence.\n${mismatches}`,
            );
        }
        console.log(`Verified immutable package identity ${packageJson.name}@${packageJson.version} (${packageSha256}).`);
    }

    if (outputDirValue) {
        const outputDir = path.resolve(repoRoot, outputDirValue);
        mkdirSync(outputDir, { recursive: true });
        copyFileSync(tarballPath, path.join(outputDir, packResult.filename));
        writeFileSync(path.join(outputDir, "compatibility.json"), `${JSON.stringify(candidate, null, 2)}\n`);
        writeFileSync(path.join(outputDir, "SHA256SUMS"), `${packageSha256}  ${packResult.filename}\n`);
        console.log(`Wrote deterministic handoff files to ${path.relative(repoRoot, outputDir)}.`);
    }
} finally {
    rmSync(tempDir, { recursive: true, force: true });
}
