import { build } from "esbuild";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceDir = path.join(repoRoot, "src", "web-components");
const targetDir = path.join(repoRoot, "dist", "web-components");
const showcaseHtmlPath = path.join(repoRoot, "web-components.html");

if (!existsSync(sourceDir)) {
    console.log("build:wc skipped (src/web-components not found).");
    process.exit(0);
}

try {
    rmSync(targetDir, { force: true, recursive: true });
} catch {
    if (existsSync(targetDir)) {
        for (const entry of readdirSync(targetDir, { withFileTypes: true })) {
            rmSync(path.join(targetDir, entry.name), { force: true, recursive: true });
        }
    }
}

mkdirSync(path.dirname(targetDir), { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

await build({
    bundle: true,
    entryPoints: [path.join(sourceDir, "index.js")],
    format: "esm",
    platform: "browser",
    outfile: path.join(targetDir, "index.js"),
    write: true,
});

if (existsSync(showcaseHtmlPath)) {
    const bundle = readFileSync(path.join(targetDir, "index.js"), "utf8").trimEnd();
    const showcaseHtml = readFileSync(showcaseHtmlPath, "utf8");
    const startMarker = "/* INC_WC_BUNDLE_START */";
    const endMarker = "/* INC_WC_BUNDLE_END */";
    const startIndex = showcaseHtml.indexOf(startMarker);
    const endIndex = showcaseHtml.indexOf(endMarker, startIndex + startMarker.length);

    if (startIndex < 0 || endIndex < 0) {
        throw new Error("build:wc could not locate the Web Components bundle markers in web-components.html.");
    }

    const updatedHtml = [
        showcaseHtml.slice(0, startIndex + startMarker.length),
        "",
        bundle,
        "",
        showcaseHtml.slice(endIndex),
    ].join("\n");

    writeFileSync(showcaseHtmlPath, updatedHtml);
}

console.log("build:wc bundled src/web-components to dist/web-components.");
