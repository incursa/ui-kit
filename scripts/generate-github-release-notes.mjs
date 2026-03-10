import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

function getArg(flag) {
    const index = process.argv.indexOf(flag);
    if (index === -1 || index === process.argv.length - 1) {
        return "";
    }

    return process.argv[index + 1];
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getReleaseBody(changelog, version) {
    const escapedVersion = escapeRegExp(version);
    const pattern = new RegExp(`^##\\s+${escapedVersion}\\s*$\\n\\n([\\s\\S]*?)(?=^##\\s+|\\Z)`, "m");
    const match = changelog.match(pattern);

    if (!match) {
        throw new Error(`Could not find CHANGELOG.md section for version ${version}.`);
    }

    return match[1].trim();
}

function getSortedTags() {
    const output = execSync("git tag --sort=-version:refname", { encoding: "utf8" }).trim();
    return output ? output.split(/\r?\n/).filter(Boolean) : [];
}

function getPreviousTag(tags, currentTag) {
    const index = tags.indexOf(currentTag);
    if (index === -1 || index === tags.length - 1) {
        return "";
    }

    return tags[index + 1];
}

const tag = getArg("--tag");
const outputPath = getArg("--output");

if (!tag || !outputPath) {
    throw new Error("Usage: node scripts/generate-github-release-notes.mjs --tag <tag> --output <path>");
}

const version = tag.startsWith("v") ? tag.slice(1) : tag;
const changelog = readFileSync("CHANGELOG.md", "utf8").replace(/\r\n/g, "\n");
const releaseBody = getReleaseBody(changelog, version);
const tags = getSortedTags();
const previousTag = getPreviousTag(tags, tag);
const compareLine = previousTag
    ? `- Full diff: https://github.com/incursa/ui-kit/compare/${previousTag}...${tag}`
    : "";

const lines = [
    `## ${version}`,
    "",
    releaseBody,
    "",
    "## Examples",
    "",
    "- Live examples: https://incursa.github.io/ui-kit",
    "- Component reference: https://incursa.github.io/ui-kit/reference.html",
    "- Showcase hub: https://incursa.github.io/ui-kit/index.html",
    "",
    "## Package",
    "",
    `- npm: \`@incursa/ui-kit@${version}\``,
];

if (compareLine) {
    lines.push(compareLine);
}

lines.push("");

writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
