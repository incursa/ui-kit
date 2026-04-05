import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const workerModuleUrl = pathToFileURL(path.join(repoRoot, "dist", "mcp", "worker.mjs")).href;

let workerModulePromise;

export async function getWorkerModule() {
    workerModulePromise ??= import(workerModuleUrl);
    return workerModulePromise;
}

export async function callWorker(pathname, { method = "GET", body, headers = {}, env } = {}) {
    const { fetch } = await getWorkerModule();
    const response = await fetch(
        new Request(`https://example.com${pathname}`, {
            method,
            headers: {
                accept: "application/json, text/event-stream",
                ...headers,
            },
            body,
        }),
        env,
    );

    const text = await response.text();
    let parsed = text;

    try {
        parsed = text ? JSON.parse(text) : null;
    } catch {
        // Keep the raw body text when the response is not JSON.
    }

    return {
        response,
        text,
        parsed,
    };
}

export async function callJsonRpc(method, params, { id = 1, pathname = "/mcp", headers = {}, env } = {}) {
    return callWorker(pathname, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json, text/event-stream",
            ...headers,
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id,
            method,
            params,
        }),
        env,
    });
}
