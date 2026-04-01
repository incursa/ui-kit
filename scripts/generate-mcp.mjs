import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const defaultOutDir = path.join(repoRoot, "dist", "mcp");

function readText(relativePath, baseDir = repoRoot) {
  return readFileSync(path.join(baseDir, relativePath), "utf8");
}

function normalizeWhitespace(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPosixPath(value) {
  return String(value ?? "").replace(/\\/g, "/");
}

function markdownToText(markdown) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let inCode = false;

  for (const line of lines) {
    const trimmed = line.trimEnd();

    if (/^\s*```/.test(trimmed)) {
      inCode = !inCode;
      output.push(trimmed);
      continue;
    }

    if (!inCode) {
      if (/^#{1,6}\s+/.test(trimmed)) {
        output.push(trimmed.replace(/^#{1,6}\s+/, ""));
        continue;
      }

      if (/^\s*[-*]\s+/.test(trimmed)) {
        output.push(trimmed.replace(/^\s*[-*]\s+/, "- "));
        continue;
      }

      if (/^\s*\d+\.\s+/.test(trimmed)) {
        output.push(trimmed.replace(/^\s*/, ""));
        continue;
      }
    }

    output.push(trimmed);
  }

  return normalizeWhitespace(
    output
      .join("\n")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1"),
  );
}

function htmlToText(html) {
  const { document } = parseHTML(String(html ?? ""));
  const body = document.body ?? document.documentElement;

  for (const node of Array.from(body.querySelectorAll("script, style, noscript, template"))) {
    node.remove();
  }

  return normalizeWhitespace(body.textContent ?? "");
}

function htmlToCodeBlocks(html) {
  const { document } = parseHTML(String(html ?? ""));
  return Array.from(document.querySelectorAll("pre code")).map((node) => normalizeWhitespace(node.textContent ?? ""));
}

function findReferenceSection(html, title) {
  const { document } = parseHTML(String(html ?? ""));
  const wanted = normalizeWhitespace(title).toLowerCase();

  for (const section of Array.from(document.querySelectorAll("section.inc-card"))) {
    const heading = section.querySelector(".inc-card__title");
    if (!heading) continue;
    if (normalizeWhitespace(heading.textContent ?? "").toLowerCase() === wanted) {
      return section;
    }
  }

  return null;
}

function extractReferenceSection(html, title) {
  const section = findReferenceSection(html, title);

  if (!section) {
    return { title, text: "", markup: "" };
  }

  return {
    title,
    text: normalizeWhitespace(section.textContent ?? ""),
    markup: normalizeWhitespace(section.querySelector("pre code")?.textContent ?? ""),
  };
}

function getPageTitle(html) {
  const { document } = parseHTML(String(html ?? ""));
  const h1 = document.querySelector("h1");
  if (h1) {
    return normalizeWhitespace(h1.textContent ?? "");
  }

  const title = document.querySelector("title");
  return normalizeWhitespace(title?.textContent ?? "");
}

function getFirstCodeBlock(html) {
  return normalizeWhitespace(htmlToCodeBlocks(html)[0] ?? "");
}

function splitSection(markdown, sectionHeading) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const escaped = sectionHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingPattern = new RegExp(`^#{1,6}\\s+${escaped}\\s*$`, "i");
  let start = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (headingPattern.test(lines[index].trim())) {
      start = index + 1;
      break;
    }
  }

  if (start < 0) {
    return "";
  }

  const body = [];
  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^#{1,2}\s+/.test(line) && body.length > 0) {
      break;
    }
    body.push(line);
  }

  return normalizeWhitespace(body.join("\n"));
}

function getLatestChangelogSection(changelog) {
  const normalized = String(changelog ?? "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^##\s+(.+?)\s*$/m);

  if (!match) {
    return markdownToText(changelog).slice(0, 1000);
  }

  return splitSection(normalized, match[1]) || markdownToText(changelog).slice(0, 1000);
}

function createResourceRecord({
  uri,
  title,
  kind,
  searchKind,
  summary,
  body,
  sourcePaths,
  mimeType = "text/markdown; charset=utf-8",
  canonicalMarkup,
  aliases = [],
  relatedUris = [],
  group,
  priority = 50,
  includeInSearch = true,
}) {
  const record = {
    uri,
    title,
    kind,
    searchKind,
    summary,
    body: normalizeWhitespace(body),
    sourcePaths,
    mimeType,
    aliases,
    relatedUris,
    group,
    priority,
    includeInSearch,
  };

  if (canonicalMarkup) {
    record.canonicalMarkup = canonicalMarkup;
  }

  record.searchText = normalizeWhitespace(
    [
      title,
      summary,
      body,
      canonicalMarkup?.default ?? "",
      ...(canonicalMarkup?.variants ? Object.values(canonicalMarkup.variants) : []),
      ...aliases,
      ...sourcePaths,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return record;
}

function resourceToListItem(resource) {
  return {
    uri: resource.uri,
    name: resource.title,
    title: resource.title,
    description: resource.summary,
    mimeType: resource.mimeType,
    annotations: {
      audience: ["user", "assistant"],
      priority: resource.priority / 100,
    },
  };
}

function buildInstallData(packageJson) {
  const packageName = packageJson.name ?? "@incursa/ui-kit";
  const version = packageJson.version ?? "0.0.0";

  return {
    title: "Install",
    summary: "Install guidance for compiled CSS, SCSS, JS helper, and web-components entrypoints.",
    packageName,
    version,
    installCommands: {
      npm: `npm install ${packageName}`,
      pnpm: `pnpm add ${packageName}`,
      yarn: `yarn add ${packageName}`,
    },
    updateCommands: {
      npm: `npm install ${packageName}@latest`,
      pnpm: `pnpm up ${packageName}`,
      yarn: `yarn upgrade ${packageName}`,
    },
    importExamples: {
      cssOnly: `import "${packageName}/dist/inc-design-language.css";`,
      jsHelper: `import "${packageName}/dist/inc-design-language.js";`,
      webComponents: `import "${packageName}/web-components/style.css";\nimport "${packageName}/web-components";`,
      scss: `@import "${packageName}/src/inc-design-language";`,
    },
    notes: [
      "The compiled CSS already includes the Bootstrap layer it was built on.",
      "The SCSS source path requires Bootstrap Sass at build time because it imports bootstrap/scss/bootstrap.",
      "The same-package web-components entrypoint is additive and keeps the CSS-first surface intact.",
      "Use the JS helper only for stateful primitives such as menus, tabs, collapsible sections, auto-refresh widgets, and dialog launch hooks.",
    ],
    decisionTree: [
      "- Existing HTML and mostly visual work: use the compiled CSS surface.",
      "- Token, density, or Bootstrap-default tuning: use the SCSS source entrypoint.",
      "- Stateful primitives like menus, tabs, collapses, auto-refresh, or dialog launch hooks: use the JS helper.",
      "- Approved v1 browser-native families: use the same-package web-components entrypoint.",
    ].join("\n"),
    relatedUris: [
      "ui-kit://overview",
      "ui-kit://fast-path",
      "ui-kit://install/decision-tree",
      "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components",
      "ui-kit://guides/when-to-use-css-first",
    ],
  };
}

function buildUpdateData(packageJson, changelog) {
  const packageName = packageJson.name ?? "@incursa/ui-kit";
  const latestSection = (packageJson.version ? splitSection(changelog, packageJson.version) : "") || getLatestChangelogSection(changelog);

  return {
    title: "Update",
    summary: "Package-manager update commands and release-review guidance.",
    packageName,
    version: packageJson.version ?? "0.0.0",
    commands: {
      npm: `npm install ${packageName}@latest`,
      pnpm: `pnpm up ${packageName}`,
      yarn: `yarn upgrade ${packageName}`,
    },
    verifyCommands: {
      npm: "npm run verify",
      packageVersion: "node -p \"require('./package.json').version\"",
    },
    notes: [
      "Review the changelog and regenerated MCP manifests after each upgrade.",
      "Verify that the compiled CSS, JS helper, and web-components entrypoints still match the package contract.",
    ],
    latestReleaseNotes: latestSection,
    relatedUris: ["ui-kit://release-notes/latest", "ui-kit://package-metadata"],
  };
}

function buildPackageMetadata(packageJson) {
  return {
    title: "Package metadata",
    summary: "Package identity, exports, and packaging surface from package.json.",
    packageName: packageJson.name ?? "@incursa/ui-kit",
    version: packageJson.version ?? "0.0.0",
    license: packageJson.license ?? "Apache-2.0",
    repository: packageJson.repository?.url ?? "",
    homepage: packageJson.homepage ?? "",
    exports: packageJson.exports ?? {},
    files: packageJson.files ?? [],
    publishConfig: packageJson.publishConfig ?? {},
    main: packageJson.main ?? "",
    style: packageJson.style ?? "",
    sass: packageJson.sass ?? "",
    notes: [
      "The package exposes both the CSS-first surface and the optional same-package web-components layer.",
      "The dist/ directory is the public build output root.",
    ],
    relatedUris: ["ui-kit://install", "ui-kit://update", "ui-kit://overview"],
  };
}

function buildOverview(readme, llms) {
  const readmeIntro = splitSection(readme, "Incursa UI Kit") || markdownToText(readme).slice(0, 600);
  const llmsIntro = markdownToText(llms).split("\n").slice(0, 12).join("\n");

  return {
    title: "Overview",
    summary: "Repository-level overview of the UI kit and its canonical public surface.",
    body: normalizeWhitespace([readmeIntro, llmsIntro].filter(Boolean).join("\n\n")),
    notes: [
      "CSS-first inc-* classes remain the canonical API.",
      "The optional same-package web-components layer is additive.",
      "The JS helper is reserved for stateful primitives.",
    ],
    relatedUris: ["ui-kit://fast-path", "ui-kit://install", "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components"],
  };
}

function buildFastPath(readme, aiInstructions, llms) {
  const body = normalizeWhitespace(
    [
      "Fast path decision tree:",
      "- Existing HTML already works: use the compiled CSS surface.",
      "- Need token, density, or Bootstrap-default tuning: use the SCSS source entrypoint.",
      "- Need helper-managed menus, tabs, collapses, auto-refresh, or dialog launch hooks: use the JS helper.",
      "- Need declarative browser-native families: use the same-package web-components entrypoint.",
      "",
      splitSection(aiInstructions, "Fast path") || splitSection(llms, "Surface selection") || "",
      splitSection(readme, "Optional Web Components") || "",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return {
    title: "Fast path",
    summary: "Choose the narrowest surface that fits the job.",
    body,
    notes: [
      "Start with compiled CSS when markup already exists.",
      "Use SCSS only for theme/token/Bootstrap-default customization.",
      "Use the JS helper only for stateful primitives.",
      "Use web-components only for approved v1 families.",
    ],
    relatedUris: ["ui-kit://install", "ui-kit://guides/when-to-use-css-first", "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components"],
  };
}

function buildReleaseNotesLatest(changelog) {
  const latestSection = getLatestChangelogSection(changelog);
  return {
    title: "Latest release notes",
    summary: "The latest recorded changelog entry.",
    body: latestSection,
    notes: ["This mirrors the topmost changelog section in CHANGELOG.md."],
    relatedUris: ["ui-kit://update", "ui-kit://package-metadata"],
  };
}

function buildGuideResource({ uri, title, summary, body, sourcePaths }) {
  return createResourceRecord({
    uri,
    title,
    kind: "guide",
    searchKind: uri.includes("/install") || uri.includes("/update") ? "install" : "guide",
    summary,
    body,
    sourcePaths,
    group: "guides",
    priority: 80,
  });
}

function buildHtmlPageResource({
  uri,
  title,
  summary,
  body,
  sourcePath,
  group,
  kind = "pattern",
  searchKind = "pattern",
  aliases = [],
  canonicalMarkup,
  priority = 60,
}) {
  return createResourceRecord({
    uri,
    title,
    kind,
    searchKind,
    summary,
    body,
    sourcePaths: [sourcePath],
    group,
    aliases,
    canonicalMarkup,
    priority,
  });
}

function makeTemplate(uriTemplate, list, description) {
  return {
    uriTemplate,
    description,
    mimeType: "text/markdown; charset=utf-8",
    title: description,
    _meta: {},
    list,
  };
}

function buildMcpCatalog({ repoRoot: customRepoRoot = repoRoot } = {}) {
  const packageJson = JSON.parse(readText("package.json", customRepoRoot));
  const readme = readText("README.md", customRepoRoot);
  const llms = readText("LLMS.txt", customRepoRoot);
  const aiInstructions = readText("AI-AGENT-INSTRUCTIONS.md", customRepoRoot);
  const changelog = readText("CHANGELOG.md", customRepoRoot);
  const referenceHtml = readText("reference.html", customRepoRoot);
  const webComponentsHtml = readText("web-components.html", customRepoRoot);
  const formsPage = readText("forms-and-validation.html", customRepoRoot);
  const dataGridPage = readText("data-grid-advanced.html", customRepoRoot);
  const statesPage = readText("states.html", customRepoRoot);
  const overlayPage = readText("overlay-workflows.html", customRepoRoot);
  const demoPage = readText("demo.html", customRepoRoot);
  const workQueuePage = readText("work-queue.html", customRepoRoot);
  const recordDetailPage = readText("record-detail.html", customRepoRoot);
  const nativePatternsPage = readText("native-patterns.html", customRepoRoot);
  const specsRequirementIndex = readText(path.join("specs", "requirements", "ui-kit", "_index.md"), customRepoRoot);
  const specsRequirementGaps = readText(path.join("specs", "requirements", "ui-kit", "REQUIREMENT-GAPS.md"), customRepoRoot);
  const specsVerificationIndex = readText(path.join("specs", "verification", "ui-kit", "_index.md"), customRepoRoot);

  const resources = [];

  const overview = buildOverview(readme, llms);
  resources.push(
    createResourceRecord({
      uri: "ui-kit://overview",
      title: overview.title,
      kind: "guide",
      searchKind: "guide",
      summary: overview.summary,
      body: overview.body,
      sourcePaths: ["README.md", "LLMS.txt"],
      group: "guides",
      aliases: ["ui kit overview", "overview"],
      priority: 100,
      relatedUris: overview.relatedUris,
    }),
  );

  const install = buildInstallData(packageJson);
  resources.push(
    createResourceRecord({
      uri: "ui-kit://install",
      title: install.title,
      kind: "guide",
      searchKind: "install",
      summary: install.summary,
      body: [
        `Install ${install.packageName} with npm, pnpm, or yarn.`,
        "",
        `npm: ${install.installCommands.npm}`,
        `pnpm: ${install.installCommands.pnpm}`,
        `yarn: ${install.installCommands.yarn}`,
        "",
        "Install decision tree:",
        install.decisionTree,
        "",
        `CSS-only import: ${install.importExamples.cssOnly}`,
        `JS helper import: ${install.importExamples.jsHelper}`,
        "Web components import:",
        install.importExamples.webComponents,
        `SCSS import: ${install.importExamples.scss}`,
        "",
        ...install.notes.map((note) => `- ${note}`),
      ].join("\n"),
      sourcePaths: ["README.md", "LLMS.txt", "AI-AGENT-INSTRUCTIONS.md", "package.json"],
      group: "guides",
      aliases: ["install", "installation", "setup"],
      priority: 110,
      relatedUris: install.relatedUris,
    }),
  );

  resources.push(
    createResourceRecord({
      uri: "ui-kit://install/decision-tree",
      title: "Install decision tree",
      kind: "guide",
      searchKind: "install",
      summary: "Choose compiled CSS, SCSS, JS helper, or web-components based on the consumer scenario.",
      body: normalizeWhitespace(
        [
          "Decision tree:",
          install.decisionTree,
          "",
          "Related entrypoints:",
          "- Compiled CSS: `dist/inc-design-language.css`",
          "- JS helper: `dist/inc-design-language.js`",
          "- Web components: `@incursa/ui-kit/web-components`",
          "- SCSS source: `src/inc-design-language.scss`",
        ].join("\n"),
      ),
      sourcePaths: ["README.md", "LLMS.txt", "AI-AGENT-INSTRUCTIONS.md"],
      group: "guides",
      aliases: ["install decision tree", "decision tree", "surface selection"],
      priority: 109,
      relatedUris: ["ui-kit://install", "ui-kit://fast-path", "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components"],
    }),
  );

  const update = buildUpdateData(packageJson, changelog);
  resources.push(
    createResourceRecord({
      uri: "ui-kit://update",
      title: update.title,
      kind: "guide",
      searchKind: "install",
      summary: update.summary,
      body: [
        `Update ${update.packageName} with your package manager of choice.`,
        "",
        `npm: ${update.commands.npm}`,
        `pnpm: ${update.commands.pnpm}`,
        `yarn: ${update.commands.yarn}`,
        "",
        "Review after upgrading:",
        ...update.notes.map((note) => `- ${note}`),
        "",
        "Latest recorded release notes:",
        update.latestReleaseNotes,
      ].join("\n"),
      sourcePaths: ["CHANGELOG.md", "package.json"],
      group: "guides",
      aliases: ["update", "upgrade", "latest"],
      priority: 108,
      relatedUris: update.relatedUris,
    }),
  );

  const packageMetadata = buildPackageMetadata(packageJson);
  resources.push(
    createResourceRecord({
      uri: "ui-kit://package-metadata",
      title: packageMetadata.title,
      kind: "guide",
      searchKind: "guide",
      summary: packageMetadata.summary,
      body: JSON.stringify(packageMetadata, null, 2),
      sourcePaths: ["package.json"],
      group: "guides",
      aliases: ["package metadata", "package json"],
      mimeType: "application/json",
      priority: 90,
      relatedUris: packageMetadata.relatedUris,
    }),
  );

  const releaseNotes = buildReleaseNotesLatest(changelog);
  resources.push(
    createResourceRecord({
      uri: "ui-kit://release-notes/latest",
      title: releaseNotes.title,
      kind: "guide",
      searchKind: "guide",
      summary: releaseNotes.summary,
      body: releaseNotes.body,
      sourcePaths: ["CHANGELOG.md"],
      group: "guides",
      aliases: ["release notes", "changelog", "latest release"],
      priority: 95,
      relatedUris: releaseNotes.relatedUris,
    }),
  );

  const guideDefinitions = [
    {
      uri: "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components",
      title: "Choose CSS vs SCSS vs JS vs web components",
      summary: "Decision tree for the package entrypoints and helper surfaces.",
      body: normalizeWhitespace(
        [
          "Decision tree:",
          "- Existing HTML and mostly visual work: use the compiled CSS.",
          "- Token, density, or Bootstrap-default tuning: use the SCSS source entrypoint.",
          "- Stateful primitives like menus, tabs, collapses, auto-refresh, or dialog launch hooks: use the JS helper.",
          "- Approved v1 browser-native families: use the same-package web-components entrypoint.",
          "",
          splitSection(aiInstructions, "Surface selection") || splitSection(llms, "Surface selection") || "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
      sourcePaths: ["README.md", "LLMS.txt", "AI-AGENT-INSTRUCTIONS.md"],
      aliases: ["choose css vs scss vs js vs web components", "surface selection", "decision tree"],
      priority: 96,
    },
    {
      uri: "ui-kit://guides/when-to-use-css-first",
      title: "When to use CSS first",
      summary: "Use the compiled CSS when markup already exists or the family is CSS-only.",
      body: normalizeWhitespace(
        [
          splitSection(aiInstructions, "Surface selection") || "",
          splitSection(llms, "Surface selection") || "",
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
      sourcePaths: ["README.md", "LLMS.txt", "AI-AGENT-INSTRUCTIONS.md"],
      aliases: ["css first", "css-first", "compiled css"],
      priority: 94,
    },
    {
      uri: "ui-kit://guides/allowed-web-component-families",
      title: "Allowed web component families",
      summary: "The approved v1 browser-native families and the surfaces that stay CSS-first.",
      body: normalizeWhitespace(
        [
          "Approved v1 browser-native families from the repo guidance:",
          "- layouts and shells",
          "- navbar, tabs, and user menu",
          "- field, input group, choice group, readonly field, and validation summary",
          "- state panel, live region, auto-refresh, and theme switcher",
          "- disclosure, dialog, and drawer",
          "",
          splitSection(readme, "Optional Web Components") || "",
          splitSection(llms, "Primary files") || "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
      sourcePaths: ["README.md", "LLMS.txt"],
      aliases: ["allowed wc families", "web component families", "v1 families"],
      priority: 92,
    },
    {
      uri: "ui-kit://guides/customization-order",
      title: "Customization order",
      summary: "The supported order for theme, token, rebuild, and component-rule changes.",
      body: normalizeWhitespace(
        [
          "Customization order:",
          "1. Change fonts and colors in src/_inc-theme.scss.",
          "2. Use src/_inc-tokens.scss only for deeper token or Bootstrap-level tuning.",
          "3. Rebuild the CSS.",
          "4. Only add new component rules after checking whether an existing inc-* block already fits.",
          "",
          splitSection(aiInstructions, "Customization order") || splitSection(llms, "Customization order") || "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
      sourcePaths: ["AI-AGENT-INSTRUCTIONS.md", "LLMS.txt", "README.md"],
      aliases: ["customization order", "theme order", "token order"],
      priority: 93,
    },
    {
      uri: "ui-kit://guides/guardrails",
      title: "Guardrails",
      summary: "Repository guardrails for naming, accessibility, and component scope.",
      body: normalizeWhitespace(
        [
          splitSection(aiInstructions, "Guardrails") || "",
          splitSection(llms, "Guardrails") || "",
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
      sourcePaths: ["AI-AGENT-INSTRUCTIONS.md", "LLMS.txt", "README.md"],
      aliases: ["guardrails", "naming rules", "scope guardrails"],
      priority: 91,
    },
  ];

  for (const guide of guideDefinitions) {
    resources.push(buildGuideResource(guide));
  }

  const componentSpecs = [
    {
      slug: "buttons",
      title: "Buttons",
      sectionTitle: "Buttons",
      summary: "Primary, secondary, outline, danger, warning, info, and loading buttons.",
      aliases: ["button", "btn", "actions"],
      relatedUris: ["ui-kit://components/status", "ui-kit://guides/when-to-use-css-first"],
    },
    {
      slug: "forms",
      title: "Forms",
      sectionTitle: "Form Fields",
      summary: "Form fields, selects, textareas, input groups, and validation basics.",
      aliases: ["form fields", "inputs", "form"],
      relatedUris: ["ui-kit://components/form-choices", "ui-kit://components/filter-bars"],
    },
    {
      slug: "form-choices",
      title: "Form choices",
      sectionTitle: "Form Fields",
      summary: "Checkbox, radio, and switch choice groups.",
      aliases: ["choices", "checkboxes", "radios", "switches"],
      relatedUris: ["ui-kit://components/forms"],
    },
    {
      slug: "tables",
      title: "Tables",
      sectionTitle: "Tables And Lists",
      summary: "Dense tables, list groups, and row-oriented collection markup.",
      aliases: ["table", "data table", "lists"],
      relatedUris: ["ui-kit://components/utilities", "ui-kit://components/layout"],
    },
    {
      slug: "cards",
      title: "Cards",
      sectionTitle: "Cards, Metrics, And Empty States",
      summary: "Cards, empty states, summary blocks, and metrics surfaces.",
      aliases: ["card", "summary blocks", "empty states"],
      relatedUris: ["ui-kit://components/metrics", "ui-kit://components/states"],
    },
    {
      slug: "filter-bars",
      title: "Filter bars",
      sectionTitle: "Validation And Filter Toolbars",
      summary: "Dense filter toolbars, chips, and bulk-action bars.",
      aliases: ["filters", "filter bar", "bulk bar"],
      relatedUris: ["ui-kit://components/forms"],
    },
    {
      slug: "layout",
      title: "Layout",
      sectionTitle: "Page Framing",
      summary: "Page framing, breadcrumbs, and shell wrappers.",
      aliases: ["page framing", "shell", "breadcrumb body"],
      relatedUris: ["ui-kit://components/cards"],
    },
    {
      slug: "states",
      title: "States",
      sectionTitle: "Operational States And Feedback",
      summary: "Operational states, permission banners, and toast feedback surfaces.",
      aliases: ["state panel", "feedback", "operational states"],
      relatedUris: ["ui-kit://components/status"],
    },
    {
      slug: "interaction",
      title: "Interaction",
      sectionTitle: "Native Controls",
      summary: "Native controls, disclosure, menu, progress, and dialog launch hooks.",
      aliases: ["native controls", "dialogs", "interaction hooks"],
      relatedUris: ["ui-kit://patterns/overlay-workflows"],
    },
    {
      slug: "status",
      title: "Status",
      sectionTitle: "Badges And Alerts",
      summary: "Status badges and alert surfaces.",
      aliases: ["badge", "alert", "feedback status"],
      relatedUris: ["ui-kit://components/states"],
    },
    {
      slug: "metrics",
      title: "Metrics",
      sectionTitle: "Cards, Metrics, And Empty States",
      summary: "Summary overview and summary block metrics.",
      aliases: ["summary overview", "summary block", "dashboard metrics"],
      relatedUris: ["ui-kit://components/cards"],
    },
    {
      slug: "utilities",
      title: "Utilities",
      sectionTitle: "Spacing And Visibility Utilities",
      summary: "Spacing, gap, padding, and visibility helpers.",
      aliases: ["utility classes", "spacing utilities", "visibility utilities"],
      relatedUris: ["ui-kit://components/layout"],
    },
  ];

  for (const spec of componentSpecs) {
    const extracted = extractReferenceSection(referenceHtml, spec.sectionTitle);
    const canonicalMarkup = extracted.markup || "";
    const extraSnippet = (() => {
      if (spec.slug !== "form-choices") {
        return canonicalMarkup;
      }

      const start = canonicalMarkup.indexOf("<fieldset");
      const end = canonicalMarkup.indexOf("</fieldset>");
      if (start < 0 || end < 0 || end <= start) {
        return canonicalMarkup;
      }

      return canonicalMarkup.slice(start, end + "</fieldset>".length);
    })();
    const body = normalizeWhitespace(
      [
        spec.summary,
        extracted.text,
        extraSnippet ? `Canonical markup:\n\n\`\`\`html\n${extraSnippet}\n\`\`\`` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    );

    resources.push(
      createResourceRecord({
        uri: `ui-kit://components/${spec.slug}`,
        title: spec.title,
        kind: "component",
        searchKind: "component",
        summary: spec.summary,
        body,
        sourcePaths: ["reference.html"],
        group: "components",
        aliases: [...spec.aliases, spec.slug.replace(/-/g, " ")],
        canonicalMarkup: canonicalMarkup
          ? {
              default: spec.slug === "form-choices" && extraSnippet ? extraSnippet : canonicalMarkup,
              variants: spec.slug === "tables" ? { families: canonicalMarkup } : undefined,
            }
          : undefined,
        relatedUris: spec.relatedUris,
        priority: 85,
      }),
    );
  }

  const htmlPageSpecs = [
    {
      slug: "reference",
      file: "reference.html",
      title: getPageTitle(referenceHtml) || "Reference",
      summary: "Copy/paste catalog for the standard controls, page framing, metrics, lists, overlays, and markup patterns.",
      aliases: ["reference catalog", "reference page"],
      kind: "pattern",
      searchKind: "pattern",
      priority: 98,
    },
    {
      slug: "forms-and-validation",
      file: "forms-and-validation.html",
      title: getPageTitle(formsPage) || "Forms and validation",
      summary: "Validation, dense toolbars, and edit-friendly detail blocks.",
      aliases: ["forms validation", "validation"],
    },
    {
      slug: "data-grid-advanced",
      file: "data-grid-advanced.html",
      title: getPageTitle(dataGridPage) || "Data grid advanced",
      summary: "Bulk actions, sticky headers, row states, and a side drawer.",
      aliases: ["data grid", "grid advanced", "bulk actions"],
    },
    {
      slug: "states",
      file: "states.html",
      title: getPageTitle(statesPage) || "States",
      summary: "The non-happy-path surfaces B2B apps actually need.",
      aliases: ["state examples", "feedback examples"],
    },
    {
      slug: "overlay-workflows",
      file: "overlay-workflows.html",
      title: getPageTitle(overlayPage) || "Overlay workflows",
      summary: "Modal and offcanvas examples for operator review flows.",
      aliases: ["overlays", "overlay workflows", "modals"],
    },
    {
      slug: "demo",
      file: "demo.html",
      title: getPageTitle(demoPage) || "Demo",
      summary: "Data-heavy home screen preview of the extracted patterns.",
      aliases: ["homepage demo", "showcase demo"],
    },
    {
      slug: "work-queue",
      file: "work-queue.html",
      title: getPageTitle(workQueuePage) || "Work queue",
      summary: "Operator work queue with sidebar navigation and table-heavy composition.",
      aliases: ["queue", "operator queue"],
    },
    {
      slug: "record-detail",
      file: "record-detail.html",
      title: getPageTitle(recordDetailPage) || "Record detail",
      summary: "Three-column detail example with action rail and section stack.",
      aliases: ["detail", "record detail"],
    },
    {
      slug: "native-patterns",
      file: "native-patterns.html",
      title: getPageTitle(nativePatternsPage) || "Native patterns",
      summary: "Patterns built on browser elements with minimal helper wiring.",
      aliases: ["native controls", "browser elements"],
    },
    {
      slug: "web-components",
      file: "web-components.html",
      title: getPageTitle(webComponentsHtml) || "Web components",
      summary: "Browser-native components that stay inside the same CSS kit.",
      aliases: ["wc", "components landing page"],
    },
  ];

  const pageLookup = {
    "forms-and-validation": formsPage,
    "data-grid-advanced": dataGridPage,
    states: statesPage,
    "overlay-workflows": overlayPage,
    demo: demoPage,
    "work-queue": workQueuePage,
    "record-detail": recordDetailPage,
    "native-patterns": nativePatternsPage,
    reference: referenceHtml,
    "web-components": webComponentsHtml,
  };

  for (const page of htmlPageSpecs) {
    const html = pageLookup[page.slug];
    const bodyText = htmlToText(html);
    const codeText = getFirstCodeBlock(html);
    const body = normalizeWhitespace(
      [
        page.summary,
        bodyText,
        codeText ? `Canonical markup:\n\n\`\`\`html\n${codeText}\n\`\`\`` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    );

    resources.push(
      buildHtmlPageResource({
        uri: `ui-kit://patterns/${page.slug}`,
        title: page.title,
        summary: page.summary,
        body,
        sourcePath: page.file,
        group: "patterns",
        kind: "pattern",
        searchKind: "pattern",
        aliases: page.aliases,
        canonicalMarkup: codeText
          ? {
              default: codeText,
            }
          : undefined,
        priority: page.priority ?? 70,
      }),
    );
  }

  const examplePageSpecs = [
    ...htmlPageSpecs.filter((page) => page.slug !== "reference"),
    {
      slug: "reference",
      file: "reference.html",
      title: getPageTitle(referenceHtml) || "Reference",
      summary: "Example catalog with copy/paste HTML snippets.",
      aliases: ["reference example"],
    },
  ];

  for (const page of examplePageSpecs) {
    const html = pageLookup[page.slug];
    const bodyText = htmlToText(html);
    const codeText = getFirstCodeBlock(html);
    const body = normalizeWhitespace(
      [
        page.summary,
        bodyText,
        codeText ? `Example markup:\n\n\`\`\`html\n${codeText}\n\`\`\`` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    );

    resources.push(
      buildHtmlPageResource({
        uri: `ui-kit://example/${page.slug}`,
        title: page.title,
        summary: page.summary,
        body,
        sourcePath: page.file,
        group: "examples",
        kind: "example",
        searchKind: "example",
        aliases: page.aliases,
        canonicalMarkup: codeText
          ? {
              default: codeText,
            }
          : undefined,
        priority: 55,
      }),
    );
  }

  const specPageSpecs = [
    {
      slug: "public-surface",
      file: toPosixPath(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-STD.md")),
      title: "Public surface",
      summary: "Public surface standards and accessible interaction behavior.",
      body: markdownToText(readText(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-STD.md"), customRepoRoot)),
      aliases: ["std", "surface standards"],
    },
    {
      slug: "control-conventions",
      file: toPosixPath(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-CNV.md")),
      title: "Control conventions",
      summary: "Shared control conventions and modifier grammar.",
      body: markdownToText(readText(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-CNV.md"), customRepoRoot)),
      aliases: ["cnv", "conventions"],
    },
    {
      slug: "requirements-index",
      file: toPosixPath(path.join("specs", "requirements", "ui-kit", "_index.md")),
      title: "Requirements index",
      summary: "Index for the UI kit requirement specs and gap tracker.",
      body: normalizeWhitespace(
        [
          markdownToText(specsRequirementIndex),
          markdownToText(specsRequirementGaps),
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
      aliases: ["requirements", "specs index"],
    },
    {
      slug: "verification-index",
      file: toPosixPath(path.join("specs", "verification", "ui-kit", "_index.md")),
      title: "Verification index",
      summary: "Auditable verification baseline for the spec suite.",
      body: markdownToText(specsVerificationIndex),
      aliases: ["verification", "ver index"],
    },
  ];

  for (const spec of specPageSpecs) {
    resources.push(
      createResourceRecord({
        uri: `ui-kit://specs/${spec.slug}`,
        title: spec.title,
        kind: "spec",
        searchKind: "spec",
        summary: spec.summary,
        body: spec.body,
        sourcePaths: [spec.file],
        group: "specs",
        aliases: spec.aliases,
        priority: 88,
      }),
    );
  }

  const aiResources = [
    {
      slug: "agent-instructions",
      file: "AI-AGENT-INSTRUCTIONS.md",
      title: "Agent instructions",
      summary: "Canonical AI guidance for using the package surfaces.",
      body: markdownToText(aiInstructions),
      aliases: ["ai instructions", "agent instructions"],
    },
    {
      slug: "llms-txt",
      file: "LLMS.txt",
      title: "LLMS text",
      summary: "Concise AI-facing package guidance and surface selection.",
      body: markdownToText(llms),
      aliases: ["llms", "llms.txt"],
    },
  ];

  for (const ai of aiResources) {
    resources.push(
      createResourceRecord({
        uri: `ui-kit://ai/${ai.slug}`,
        title: ai.title,
        kind: "guide",
        searchKind: "guide",
        summary: ai.summary,
        body: ai.body,
        sourcePaths: [ai.file],
        group: "ai",
        aliases: ai.aliases,
        priority: 86,
      }),
    );
  }

  const curatedFiles = [
    "README.md",
    "LLMS.txt",
    "AI-AGENT-INSTRUCTIONS.md",
    "CHANGELOG.md",
    "reference.html",
    "forms-and-validation.html",
    "data-grid-advanced.html",
    "states.html",
    "overlay-workflows.html",
    "demo.html",
    "work-queue.html",
    "record-detail.html",
    "native-patterns.html",
    "web-components.html",
    toPosixPath(path.join("specs", "architecture", "_index.md")),
    toPosixPath(path.join("specs", "architecture", "ui-kit", "ARC-UIK-0001.md")),
    toPosixPath(path.join("specs", "requirements", "ui-kit", "_index.md")),
    toPosixPath(path.join("specs", "requirements", "ui-kit", "REQUIREMENT-GAPS.md")),
    toPosixPath(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-STD.md")),
    toPosixPath(path.join("specs", "requirements", "ui-kit", "SPEC-UIK-CNV.md")),
    toPosixPath(path.join("specs", "verification", "ui-kit", "_index.md")),
    toPosixPath(path.join("specs", "verification", "ui-kit", "VER-UIK-0001.md")),
    toPosixPath(path.join("specs", "verification", "ui-kit", "VER-UIK-0002.md")),
    toPosixPath(path.join("specs", "verification", "ui-kit", "VER-UIK-0003.md")),
    toPosixPath(path.join("specs", "verification", "ui-kit", "VER-UIK-0004.md")),
    "package.json",
    toPosixPath(path.join("src", "inc-design-language.scss")),
    toPosixPath(path.join("src", "inc-design-language.js")),
    toPosixPath(path.join("src", "_inc-theme.scss")),
    toPosixPath(path.join("src", "_inc-tokens.scss")),
    toPosixPath(path.join("src", "web-components", "README.md")),
    toPosixPath(path.join("src", "web-components", "index.js")),
    toPosixPath(path.join("src", "web-components", "style.css")),
    toPosixPath(path.join("dist", "inc-design-language.css")),
    toPosixPath(path.join("dist", "inc-design-language.js")),
    toPosixPath(path.join("dist", "web-components", "index.js")),
    toPosixPath(path.join("dist", "web-components", "style.css")),
  ];

  const fileResources = [];
  for (const relativeFile of curatedFiles) {
    const text = readText(relativeFile, customRepoRoot);
    const fileResource = createResourceRecord({
      uri: `ui-kit://file/${toPosixPath(relativeFile)}`,
      title: toPosixPath(relativeFile),
      kind: "file",
      searchKind: "guide",
      summary: `Raw curated file content for ${toPosixPath(relativeFile)}.`,
      body: text,
      sourcePaths: [toPosixPath(relativeFile)],
      mimeType: "text/plain; charset=utf-8",
      group: "files",
      aliases: [path.basename(relativeFile), slugify(relativeFile)],
      priority: 20,
      includeInSearch: false,
    });
    fileResources.push(fileResource);
    resources.push(fileResource);
  }

  const resourceTemplates = [
    makeTemplate("ui-kit://component/{name}", resources.filter((resource) => resource.group === "components").map(resourceToListItem), "Component"),
    makeTemplate("ui-kit://pattern/{name}", resources.filter((resource) => resource.group === "patterns").map(resourceToListItem), "Pattern"),
    makeTemplate("ui-kit://spec/{id}", resources.filter((resource) => resource.group === "specs").map(resourceToListItem), "Spec"),
    makeTemplate("ui-kit://example/{name}", resources.filter((resource) => resource.group === "examples").map(resourceToListItem), "Example"),
    makeTemplate("ui-kit://file/{path}", resources.filter((resource) => resource.group === "files").map(resourceToListItem), "Curated file"),
  ];

  const resourceMap = new Map(resources.map((resource) => [resource.uri, resource]));
  const searchIndex = resources
    .filter((resource) => resource.includeInSearch !== false && resource.group !== "files")
    .map((resource) => ({
      uri: resource.uri,
      title: resource.title,
      kind: resource.searchKind,
      summary: resource.summary,
      sourcePaths: resource.sourcePaths,
      aliases: resource.aliases,
      priority: resource.priority,
      searchText: resource.searchText,
      canonicalMarkup: resource.canonicalMarkup,
    }));

  return {
    packageName: packageJson.name ?? "@incursa/ui-kit",
    packageVersion: packageJson.version ?? "0.0.0",
    resources,
    resourceTemplates,
    searchIndex,
    resourceMap: Object.fromEntries(resourceMap),
    install,
    update,
    packageMetadata,
    curatedFiles,
    fileResources,
    sourcePaths: {
      README: "README.md",
      LLMS: "LLMS.txt",
      AI: "AI-AGENT-INSTRUCTIONS.md",
      CHANGELOG: "CHANGELOG.md",
      REFERENCE: "reference.html",
      WEB_COMPONENTS: "web-components.html",
    },
  };
}

function writeMcpArtifacts({ repoRoot: customRepoRoot = repoRoot, outDir = defaultOutDir } = {}) {
  const catalog = buildMcpCatalog({ repoRoot: customRepoRoot });
  mkdirSync(outDir, { recursive: true });

  const resourcesManifest = {
    packageName: catalog.packageName,
    packageVersion: catalog.packageVersion,
    resources: catalog.resources,
    resourceTemplates: catalog.resourceTemplates.map(({ list, ...template }) => template),
    install: catalog.install,
    update: catalog.update,
    packageMetadata: catalog.packageMetadata,
  };

  writeFileSync(path.join(outDir, "resources.json"), `${JSON.stringify(resourcesManifest, null, 2)}\n`);
  writeFileSync(path.join(outDir, "search-index.json"), `${JSON.stringify(catalog.searchIndex, null, 2)}\n`);
  writeFileSync(path.join(outDir, "install.json"), `${JSON.stringify(catalog.install, null, 2)}\n`);
  writeFileSync(path.join(outDir, "update.json"), `${JSON.stringify(catalog.update, null, 2)}\n`);

  for (const resource of catalog.resources) {
    if (resource.group === "files") continue;
    const relativeDir = resource.group;
    const uriLeaf = resource.uri.replace(/^ui-kit:\/\//, "").split("/").pop() ?? resource.title;
    const safeName = uriLeaf.replace(/[{}]/g, "");
    const target = path.join(outDir, relativeDir, `${safeName}.json`);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(resource, null, 2)}\n`);
  }

  return catalog;
}

function main() {
  writeMcpArtifacts();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}

export {
  buildMcpCatalog,
  writeMcpArtifacts,
  markdownToText,
  normalizeWhitespace,
  splitSection,
  extractReferenceSection,
  htmlToText,
  getFirstCodeBlock,
};
