import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceDir = path.join(repoRoot, "src", "web-components");
const targetDir = path.join(repoRoot, "dist", "web-components");

if (!existsSync(sourceDir)) {
    console.log("build:wc skipped (src/web-components not found).");
    process.exit(0);
}

rmSync(targetDir, { force: true, recursive: true });
mkdirSync(path.dirname(targetDir), { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log("build:wc copied src/web-components to dist/web-components.");
