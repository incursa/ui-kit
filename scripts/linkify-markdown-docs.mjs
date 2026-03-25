#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const checkOnly = process.argv.includes("--check");

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isProbablyExternalPackageRef(value) {
  return value.startsWith("@") || value.startsWith("bootstrap/");
}

function isFileLikeRef(value) {
  return /[\\/]/.test(value) || /\.[a-z0-9]{2,5}$/i.test(value) || /\/$/.test(value);
}

function relativeLink(fromFile, targetFile, fragment = "") {
  const rel = toPosix(path.relative(path.dirname(fromFile), targetFile));
  return fragment ? `${rel}#${fragment}` : rel;
}

function protectExistingLinks(line) {
  const placeholders = [];
  const protectedLine = line.replace(/\[[^\]\n]+\]\([^)]+\)/g, (match) => {
    const token = `@@LINK${placeholders.length}@@`;
    placeholders.push(match);
    return token;
  });

  return {
    text: protectedLine,
    restore(value) {
      return value.replace(/@@LINK(\d+)@@/g, (_, index) => placeholders[Number(index)]);
    },
  };
}

function buildAnchors(markdown) {
  const anchors = new Map();
  for (const match of markdown.matchAll(/^##\s+(REQ-[A-Z0-9-]+)\s+(.+)$/gm)) {
    const [, id, title] = match;
    anchors.set(id, slugify(`${id} ${title}`));
  }

  return anchors;
}

function codeSpanTarget(code, fromFile, maps) {
  if (/^https?:\/\//i.test(code)) {
    return null;
  }

  if (isProbablyExternalPackageRef(code)) {
    return null;
  }

  if (/^(SPEC|REQ|VER|ARC)-[A-Z0-9-]+$/.test(code)) {
    const target = maps.artifacts.get(code);
    if (!target) {
      return null;
    }

    const anchor = maps.reqAnchors.get(code);
    return relativeLink(fromFile, target, anchor ?? "");
  }

  const cleaned = code.replace(/[`"'<>]/g, "");
  if (isFileLikeRef(cleaned)) {
    const normalized = cleaned.replace(/\/+$/, "");
    if (normalized.includes("bootstrap/")) {
      return null;
    }

    const candidate = path.resolve(path.dirname(fromFile), normalized);
    if (candidate.startsWith(rootDir) && existsSync(candidate)) {
      return toPosix(path.relative(path.dirname(fromFile), candidate));
    }
  }

  if (/\bdata-inc-/.test(code)) {
    return relativeLink(fromFile, path.join(rootDir, "src", "inc-design-language.js"));
  }

  if (/\b(?:inc-|is-)/.test(code)) {
    return relativeLink(fromFile, path.join(rootDir, "reference.html"));
  }

  return null;
}

function shouldCodeFormatLinkText(text, target) {
  if (/^`.*`$/.test(text)) {
    return false;
  }

  if (/^(SPEC|REQ|VER|ARC)-[A-Z0-9-]+$/.test(text)) {
    return true;
  }

  if (/\b(?:data-inc-|inc-|is-)/.test(text)) {
    return true;
  }

  if (isFileLikeRef(text)) {
    return true;
  }

  return false;
}

function formatMarkdownLinks(line) {
  return line.replace(/(?<!\!)\[([^\]\n]+)\]\(([^)\n]+)\)/g, (match, text, target) => {
    if (/^https?:\/\//i.test(target) || /^mailto:/i.test(target)) {
      return match;
    }

    if (!shouldCodeFormatLinkText(text, target)) {
      return match;
    }

    return `[\`${text}\`](${target})`;
  });
}

function transformMarkdown(markdown, fromFile, maps) {
  const hasFrontmatter = markdown.startsWith("---\n");
  let frontmatter = "";
  let body = markdown;

  if (hasFrontmatter) {
    const end = markdown.indexOf("\n---\n", 4);
    if (end !== -1) {
      frontmatter = markdown.slice(0, end + 5);
      body = markdown.slice(end + 5);
    }
  }

  const lines = body.split(/\r?\n/);
  let inFence = false;
  const out = lines.map((line) => {
    if (/^\s*```/.test(line) || /^\s*~~~/.test(line)) {
      inFence = !inFence;
      return line;
    }

    if (inFence) {
      return line;
    }

    const { text, restore } = protectExistingLinks(line);
    const withCodeLinks = text.replace(/`([^`]+)`/g, (match, code) => {
      const target = codeSpanTarget(code, fromFile, maps);
      if (!target) {
        return match;
      }

      return `[\`${code}\`](${target})`;
    });

    return formatMarkdownLinks(restore(withCodeLinks));
  }).join("\n");

  return frontmatter + out;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "dist" || entry.name === "test-results") {
      continue;
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }

  return files;
}

const allFiles = await walk(rootDir);
const markdownFiles = allFiles.filter((file) => (
  /\.(md|mdx|markdown)$/i.test(file) || file.endsWith("LLMS.txt")
) && !file.endsWith("CHANGELOG.md"));

const specFiles = markdownFiles.filter((file) => /[\\/](specs)[\\/](requirements|architecture|verification)[\\/]/i.test(file));

const artifactTargets = new Map();
const reqAnchors = new Map();

for (const file of specFiles) {
  const text = await readFile(file, "utf8");
  const base = path.basename(file, ".md");

  if (/^(SPEC|VER|ARC)-[A-Z0-9-]+$/.test(base)) {
    artifactTargets.set(base, file);
  }

  if (/^SPEC-UIK-/.test(base)) {
    const anchors = buildAnchors(text);
    for (const [id, anchor] of anchors) {
      reqAnchors.set(id, anchor);
      artifactTargets.set(id, file);
    }
  }
}

const changedFiles = [];
for (const file of markdownFiles) {
  const rel = toPosix(path.relative(rootDir, file));
  const original = await readFile(file, "utf8");
  const updated = transformMarkdown(original, file, { artifacts: artifactTargets, reqAnchors });

  if (updated !== original) {
    changedFiles.push(rel);
    if (!checkOnly) {
      await writeFile(file, updated, "utf8");
    }
  }
}

if (checkOnly) {
  if (changedFiles.length > 0) {
    console.error("Markdown link policy check failed. Files needing updates:");
    for (const file of changedFiles) {
      console.error(`- ${file}`);
    }
    process.exit(1);
  }

  console.log(`Markdown link policy check passed (${markdownFiles.length} files scanned).`);
} else {
  console.log(`Markdown link policy applied (${changedFiles.length} files updated).`);
}
