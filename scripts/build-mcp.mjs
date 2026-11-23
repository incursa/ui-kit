import path from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { writeMcpArtifacts } from "./generate-mcp.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceFile = path.join(repoRoot, "src", "mcp", "worker.ts");
const outFile = path.join(repoRoot, "dist", "mcp", "worker.mjs");

const hardenSdkUriTemplate = {
  name: "harden-sdk-uri-template",
  setup(buildContext) {
    buildContext.onLoad(
      { filter: /@modelcontextprotocol\/sdk\/dist\/esm\/shared\/uriTemplate\.js$/ },
      async ({ path: sdkPath }) => {
        const source = await readFile(sdkPath, "utf8");
        const hardened = source.replaceAll(".replace('*', '')", ".replaceAll('*', '')");
        if (hardened === source) {
          throw new Error("The MCP SDK URI-template hardening hook no longer matches its upstream source.");
        }

        return { contents: hardened, loader: "js" };
      },
    );
  },
};

async function main() {
  writeMcpArtifacts({ repoRoot, outDir: path.join(repoRoot, "dist", "mcp") });

  await build({
    entryPoints: [sourceFile],
    outfile: outFile,
    bundle: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
    sourcemap: true,
    packages: "bundle",
    plugins: [hardenSdkUriTemplate],
    logLevel: "info",
    loader: {
      ".json": "json",
    },
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
