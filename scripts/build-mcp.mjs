import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { writeMcpArtifacts } from "./generate-mcp.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceFile = path.join(repoRoot, "src", "mcp", "worker.ts");
const outFile = path.join(repoRoot, "dist", "mcp", "worker.mjs");

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
