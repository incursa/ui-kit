import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceDir = path.join(repoRoot, "src", "icons");
const targetDir = path.join(repoRoot, "dist", "icons");

rmSync(targetDir, { force: true, recursive: true });
mkdirSync(targetDir, { recursive: true });
cpSync(path.join(sourceDir, "package.json"), path.join(targetDir, "package.json"));

await build({
    bundle: true,
    entryPoints: [path.join(sourceDir, "index.js")],
    format: "esm",
    platform: "browser",
    outfile: path.join(targetDir, "index.js"),
    write: true,
});

console.log("build:icons bundled src/icons to dist/icons.");
