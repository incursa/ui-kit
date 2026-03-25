import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixturePath = "tests/browser/web-components/fixture.html";
const repoRoot = fileURLToPath(new URL("../../..", import.meta.url));

let serverPromise = null;

function contentTypeFor(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
        case ".html":
            return "text/html; charset=utf-8";
        case ".js":
        case ".mjs":
            return "text/javascript; charset=utf-8";
        case ".css":
            return "text/css; charset=utf-8";
        case ".svg":
            return "image/svg+xml";
        case ".png":
            return "image/png";
        case ".webm":
            return "video/webm";
        default:
            return "application/octet-stream";
    }
}

async function ensureFixtureServer() {
    if (serverPromise) {
        return serverPromise;
    }

    serverPromise = new Promise((resolve, reject) => {
        const server = createServer(async (request, response) => {
            try {
                const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
                const pathname = decodeURIComponent(requestUrl.pathname);
                const absolutePath = path.resolve(repoRoot, `.${pathname}`);

                if (!absolutePath.startsWith(repoRoot)) {
                    response.statusCode = 403;
                    response.end("Forbidden");
                    return;
                }

                const file = await readFile(absolutePath);
                response.statusCode = 200;
                response.setHeader("Content-Type", contentTypeFor(absolutePath));
                response.end(file);
            } catch {
                response.statusCode = 404;
                response.end("Not Found");
            }
        });

        server.once("error", reject);
        server.listen(0, "127.0.0.1", () => {
            const address = server.address();
            if (!address || typeof address === "string") {
                reject(new Error("Failed to start the WC fixture server."));
                return;
            }

            server.unref();

            resolve({
                baseUrl: `http://127.0.0.1:${address.port}`,
                server,
            });
        });
    });

    return serverPromise;
}

async function waitForWebComponentsReady(page) {
    await page.waitForFunction(() => window.__incWcReady === true || Boolean(window.__incWcError), null, {
        timeout: 10_000,
    });

    const bootstrapError = await page.evaluate(() => window.__incWcError || null);
    if (bootstrapError) {
        throw new Error(bootstrapError);
    }
}

async function openWebComponentsFixture(page) {
    const { baseUrl } = await ensureFixtureServer();

    await page.goto(`${baseUrl}/${fixturePath}`, { waitUntil: "load" });
    await waitForWebComponentsReady(page);
}

async function openWebComponentsPage(page) {
    await openWebComponentsFixture(page);
}

export {
    ensureFixtureServer,
    fixturePath,
    openWebComponentsFixture,
    openWebComponentsPage,
    waitForWebComponentsReady,
};
