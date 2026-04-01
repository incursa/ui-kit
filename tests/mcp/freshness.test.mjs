import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { writeMcpArtifacts } from "../../scripts/generate-mcp.mjs";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const distMcpDir = path.join(repoRoot, "dist", "mcp");

function listJsonFiles(rootDir) {
    const results = [];

    function walk(currentDir) {
        for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
            const absolutePath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(absolutePath);
                continue;
            }

            if (entry.isFile() && entry.name.endsWith(".json")) {
                results.push(path.relative(rootDir, absolutePath).split(path.sep).join("/"));
            }
        }
    }

    walk(rootDir);
    results.sort();
    return results;
}

test("dist/mcp JSON manifests match the freshly generated content model", async () => {
    assert.ok(existsSync(distMcpDir), "dist/mcp must exist before the freshness check runs");

    const tempDir = mkdtempSync(path.join(os.tmpdir(), "incursa-ui-kit-freshness-"));

    try {
        writeMcpArtifacts({ repoRoot, outDir: tempDir });

        const generatedFiles = listJsonFiles(tempDir);
        const checkedInFiles = listJsonFiles(distMcpDir);

        assert.deepEqual(checkedInFiles, generatedFiles);

        for (const relativePath of generatedFiles) {
            const generated = readFileSync(path.join(tempDir, relativePath), "utf8");
            const checkedIn = readFileSync(path.join(distMcpDir, relativePath), "utf8");
            assert.equal(checkedIn, generated, `Expected ${relativePath} to match the freshly generated manifest`);
        }
    } finally {
        rmSync(tempDir, { recursive: true, force: true });
    }
});
