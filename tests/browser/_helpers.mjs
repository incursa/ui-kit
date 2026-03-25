import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

export function pageUrl(relativePath) {
    return pathToFileURL(path.join(repoRoot, relativePath)).href;
}

export async function openPage(page, relativePath) {
    await page.goto(pageUrl(relativePath), { waitUntil: "load" });
}
