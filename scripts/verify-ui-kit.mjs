import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { writeMcpArtifacts } from "./generate-mcp.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

const requiredFiles = [
    "CHANGELOG.md",
    "README.md",
    "AI-AGENT-INSTRUCTIONS.md",
    "LLMS.txt",
    "RELEASING.md",
    "package.json",
    "package-lock.json",
    "src/_inc-theme.scss",
    "src/_inc-tokens.scss",
    "src/inc-design-language.scss",
    "src/inc-design-language.js",
    "src/icons/index.js",
    "src/icons/package.json",
    "src/web-components/README.md",
    "src/web-components/style.css",
    "dist/inc-design-language.css",
    "dist/inc-design-language.css.map",
    "dist/inc-design-language.min.css",
    "dist/inc-design-language.min.css.map",
    "dist/inc-design-language.js",
    "dist/icons/index.js",
    "dist/icons/package.json",
    "wrangler.toml",
    "scripts/build-icons.mjs",
    "dist/mcp/worker.mjs",
    "dist/mcp/resources.json",
    "dist/mcp/search-index.json",
    "dist/mcp/install.json",
    "dist/mcp/update.json",
    "dist/mcp/components/buttons.json",
    "dist/mcp/components/forms.json",
    "dist/mcp/components/tables.json",
    "dist/mcp/components/layout.json",
    "dist/mcp/patterns/reference.json",
    "dist/mcp/patterns/forms-and-validation.json",
    "dist/mcp/patterns/data-grid-advanced.json",
    "dist/mcp/specs/public-surface.json",
    "dist/mcp/specs/control-conventions.json",
    "dist/mcp/guides/guardrails.json",
    "dist/mcp/guides/customization-order.json",
    "dist/mcp/ai/agent-instructions.json",
    "dist/mcp/ai/llms-txt.json",
    "forms-and-validation.html",
    "data-grid-advanced.html",
    "states.html",
    "reference.html",
    "web-components.html",
    "specs/architecture/_index.md",
    "specs/architecture/ui-kit/ARC-UIK-0001.md",
    "specs/requirements/ui-kit/_index.md",
    "specs/requirements/ui-kit/REQUIREMENT-GAPS.md",
    "specs/verification/ui-kit/_index.md",
    "specs/verification/ui-kit/VER-UIK-0001.md",
    "specs/verification/ui-kit/VER-UIK-0002.md",
    "specs/verification/ui-kit/VER-UIK-0003.md",
    "specs/verification/ui-kit/VER-UIK-0004.md",
    "playwright.config.mjs",
    "tests/browser/_helpers.mjs",
    "tests/browser/auto-refresh.spec.mjs",
    "tests/browser/native-dialog.spec.mjs",
    "tests/browser/overlays.spec.mjs",
    "tests/browser/tabs.spec.mjs",
    "tests/browser/web-components/_helpers.mjs",
    "tests/browser/web-components/fixture.html",
    "tests/browser/web-components/render.spec.mjs",
    "tests/browser/web-components/rendering.spec.mjs",
    "tests/browser/web-components/interactions.spec.mjs",
    "tests/browser/web-components/theme.spec.mjs",
    "tests/browser/web-components/responsive.spec.mjs",
    "tests/browser/web-components/feedback.spec.mjs",
];

const cssSelectors = [
    ".inc-page",
    ".inc-page__breadcrumbs",
    ".inc-page__body",
    ".inc-breadcrumb-body",
    ".inc-footer-bar__menu",
    ".inc-footer-bar__meta",
    ".inc-list-group--flush",
    ".inc-list-group--numbered",
    ".inc-vertical-list--inset",
    ".inc-summary-overview--4-col",
    ".inc-summary-block__header--with-action",
    ".inc-summary-block__body--right",
    ".inc-summary-block__value--small",
    ".inc-tooltip",
    ".inc-tooltip__inner",
    ".inc-popover",
    ".inc-popover-header",
    ".inc-popover-body",
    ".inc-spinner",
    ".inc-spinner--grow",
    ".inc-spinner--grow--sm",
    ".inc-btn.is-loading",
    ":has(> .inc-spinner)",
    ".inc-form__control.is-invalid",
    ".inc-form__select.is-invalid",
    ".inc-form__check.is-invalid",
];

const referenceMarkers = [
    'class="inc-page inc-breadcrumb-body"',
    'class="inc-page__breadcrumbs inc-breadcrumb-body__breadcrumb"',
    'class="inc-page__body inc-breadcrumb-body__body"',
    'class="inc-footer-bar__menu"',
    'class="inc-list-group inc-list-group--flush"',
    'class="inc-list-group inc-list-group--numbered"',
    'class="inc-vertical-list inc-vertical-list--compact inc-vertical-list--trim inc-vertical-list--inset"',
    'class="inc-summary-overview inc-summary-overview--4-col"',
    'class="inc-summary-block__header inc-summary-block__header--with-action"',
    'class="inc-summary-block__body inc-summary-block__body--right"',
    'class="inc-summary-block__value inc-summary-block__value--small"',
    'class="inc-tooltip show bs-tooltip-auto"',
    'class="inc-tooltip__inner"',
    'class="inc-popover show bs-popover-auto"',
    'class="inc-popover-header"',
    'class="inc-popover-body"',
    'class="inc-btn inc-btn--primary is-loading"',
    'class="inc-spinner inc-spinner--border inc-spinner--border--sm"',
    'class="inc-spinner inc-spinner--grow inc-spinner--grow--sm inc-spinner--grow--primary"',
    'aria-invalid="true"',
];

const formsMarkers = [
    'aria-invalid="true"',
];

const dataGridMarkers = [
    'class="inc-btn inc-btn--primary is-loading"',
    'class="inc-spinner inc-spinner--border inc-spinner--border--sm"',
];

const statesMarkers = [
    'class="inc-spinner inc-spinner--border inc-spinner--border--sm inc-spinner--border--primary"',
];

function readUtf8(path) {
    return readFileSync(path, "utf8");
}

function ensure(condition, message, failures) {
    if (!condition) {
        failures.push(message);
    }
}

function parseDocument(path) {
    return parseHTML(readUtf8(path)).document;
}

function assertMarkers(path, markers, failures) {
    const content = readUtf8(path);

    for (const marker of markers) {
        ensure(content.includes(marker), `${path} is missing coverage marker: ${marker}`, failures);
    }
}

function hasDirectChildWithClass(element, className) {
    return Array.from(element.children ?? []).some((child) => child.classList?.contains(className));
}

function hasLoadingHelperChild(element) {
    return hasDirectChildWithClass(element, "inc-spinner") || hasDirectChildWithClass(element, "inc-loading-dots");
}

function listJsonFiles(rootDir) {
    const results = [];

    function walk(currentDir) {
        for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
            const absolutePath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(absolutePath);
                continue;
            }

            if (entry.isFile() && entry.name.endsWith(".json")) {
                results.push(path.relative(rootDir, absolutePath).split(path.sep).join("/"));
            }
        }
    }

    walk(rootDir);
    results.sort();
    return results;
}

function compareFiles(leftRoot, rightRoot, files, failures) {
    for (const relativePath of files) {
        const leftFile = path.join(leftRoot, relativePath);
        const rightFile = path.join(rightRoot, relativePath);

        ensure(existsSync(leftFile), `Missing generated MCP manifest: ${leftFile}`, failures);
        ensure(existsSync(rightFile), `Missing checked-in MCP manifest: ${rightFile}`, failures);

        if (!existsSync(leftFile) || !existsSync(rightFile)) {
            continue;
        }

        const leftContent = readFileSync(leftFile, "utf8");
        const rightContent = readFileSync(rightFile, "utf8");
        ensure(leftContent === rightContent, `MCP manifest drift detected for ${relativePath}`, failures);
    }
}

function verifyMcpManifestFreshness(failures) {
    const distMcpDir = path.join(repoRoot, "dist", "mcp");
    ensure(existsSync(distMcpDir), "Missing dist/mcp directory", failures);

    if (!existsSync(distMcpDir)) {
        return;
    }

    const tempDir = mkdtempSync(path.join(os.tmpdir(), "incursa-ui-kit-mcp-"));

    try {
        writeMcpArtifacts({ repoRoot, outDir: tempDir });

        const generatedFiles = listJsonFiles(tempDir);
        const checkedInFiles = listJsonFiles(distMcpDir);

        ensure(
            JSON.stringify(generatedFiles) === JSON.stringify(checkedInFiles),
            "dist/mcp JSON manifest file set must match the freshly generated manifest tree",
            failures,
        );

        const sharedFiles = generatedFiles.filter((file) => checkedInFiles.includes(file));
        compareFiles(tempDir, distMcpDir, sharedFiles, failures);
    } finally {
        rmSync(tempDir, { recursive: true, force: true });
    }
}

const failures = [];

for (const file of requiredFiles) {
    ensure(existsSync(file), `Missing required file: ${file}`, failures);
}

if (existsSync("src/web-components")) {
    ensure(existsSync("src/web-components/package.json"), "src/web-components/package.json must exist when src/web-components is present", failures);
    ensure(existsSync("src/web-components/index.js"), "src/web-components/index.js must exist when src/web-components is present", failures);
    ensure(existsSync("dist/web-components/index.js"), "dist/web-components/index.js must exist when src/web-components is present", failures);
    ensure(existsSync("dist/web-components/package.json"), "dist/web-components/package.json must exist when src/web-components is present", failures);
    const webComponentFiles = [
        "package.json",
        "base-element.js",
        "shared.js",
        "registry.js",
        "index.js",
        "README.md",
        "style.css",
        "controllers/focus.js",
        "controllers/overlay.js",
        "controllers/selection.js",
        "controllers/theme.js",
        "components/layout.js",
        "components/navigation.js",
        "components/forms.js",
        "components/overlays.js",
    ];

    for (const file of webComponentFiles) {
        ensure(existsSync(`src/web-components/${file}`), `Missing WC source file: src/web-components/${file}`, failures);
        ensure(existsSync(`dist/web-components/${file}`), `Missing WC dist file: dist/web-components/${file}`, failures);
    }
}

if (existsSync("package.json") && existsSync("package-lock.json")) {
    const packageJson = JSON.parse(readUtf8("package.json"));
    const packageLock = JSON.parse(readUtf8("package-lock.json"));

    ensure(packageJson.version === packageLock.version, "package.json and package-lock.json must declare the same version", failures);
    ensure(packageJson.version === packageLock.packages?.[""]?.version, "package-lock.json package root version must match package.json", failures);
    ensure(packageJson.dependencies?.lucide, "package.json must declare lucide as a runtime dependency for default icons", failures);

    const webComponentsExport = packageJson.exports?.["./web-components"];
    ensure(webComponentsExport && typeof webComponentsExport === "object", "package.json must export ./web-components as a conditional entry", failures);
    ensure(webComponentsExport?.default === "./dist/web-components/index.js", "package.json ./web-components default export must point to dist/web-components/index.js", failures);
    ensure(webComponentsExport?.style === "./dist/web-components/style.css", "package.json ./web-components style export must point to dist/web-components/style.css", failures);
    ensure(packageJson.exports?.["./web-components/style.css"] === "./dist/web-components/style.css", "package.json must export ./web-components/style.css", failures);

    const iconsExport = packageJson.exports?.["./icons"];
    ensure(iconsExport && typeof iconsExport === "object", "package.json must export ./icons as a conditional entry", failures);
    ensure(iconsExport?.default === "./dist/icons/index.js", "package.json ./icons default export must point to dist/icons/index.js", failures);
}

if (existsSync("src/inc-design-language.js") && existsSync("dist/inc-design-language.js")) {
    const sourceJs = readUtf8("src/inc-design-language.js");
    const distJs = readUtf8("dist/inc-design-language.js");

    ensure(sourceJs.includes("upgradeIconPlaceholders"), "src/inc-design-language.js must initialize semantic icon placeholders", failures);
    ensure(distJs.includes("data-inc-icon"), "dist/inc-design-language.js must include the bundled semantic icon runtime", failures);
    ensure(distJs.includes("IncWebComponents"), "dist/inc-design-language.js must expose the shared IncWebComponents namespace", failures);
    ensure(!distJs.includes("AUTO_REFRESH_PAUSE_ICON"), "dist/inc-design-language.js must not use the legacy auto-refresh SVG constants", failures);
}

if (existsSync("dist/inc-design-language.css")) {
    const css = readUtf8("dist/inc-design-language.css");

    for (const selector of cssSelectors) {
        ensure(css.includes(selector), `dist/inc-design-language.css is missing selector: ${selector}`, failures);
    }
}

if (existsSync("reference.html")) {
    const reference = readUtf8("reference.html");

    for (const marker of referenceMarkers) {
        ensure(reference.includes(marker), `reference.html is missing coverage marker: ${marker}`, failures);
    }
}

if (existsSync("reference.html")) {
    const referenceDocument = parseDocument("reference.html");

    ensure(referenceDocument.querySelector(".inc-page.inc-breadcrumb-body"), "reference.html is missing the canonical page-frame wrapper", failures);
    ensure(referenceDocument.querySelector(".inc-page__breadcrumbs.inc-breadcrumb-body__breadcrumb"), "reference.html is missing the breadcrumb wrapper", failures);
    ensure(referenceDocument.querySelector(".inc-page__body.inc-breadcrumb-body__body"), "reference.html is missing the page body wrapper", failures);
    ensure(referenceDocument.querySelector(".inc-footer-bar__menu"), "reference.html is missing the footer-bar action cluster", failures);
    ensure(referenceDocument.querySelector(".inc-tooltip.show.bs-tooltip-auto"), "reference.html is missing the tooltip shell", failures);
    ensure(referenceDocument.querySelector(".inc-popover.show.bs-popover-auto"), "reference.html is missing the popover shell", failures);
    ensure(referenceDocument.querySelector(".inc-auto-refresh__spinner .inc-spinner"), "reference.html is missing the auto-refresh spinner helper", failures);
    ensure(referenceDocument.querySelector(".inc-spinner.inc-spinner--grow"), "reference.html is missing the grow spinner helper", failures);

    const loadingButtons = Array.from(referenceDocument.querySelectorAll("button.inc-btn.is-loading"));
    ensure(loadingButtons.length > 0, "reference.html is missing a loading button example", failures);
    ensure(loadingButtons.every(hasLoadingHelperChild), "reference.html loading buttons must use the shared spinner helper child", failures);
}

if (existsSync("forms-and-validation.html")) {
    const formsDocument = parseDocument("forms-and-validation.html");

    ensure(formsDocument.querySelector("#form-contract[aria-invalid='true']"), "forms-and-validation.html is missing the invalid contract field accessibility hook", failures);
    ensure(formsDocument.querySelector("#form-period[aria-invalid='true']"), "forms-and-validation.html is missing the invalid select accessibility hook", failures);
}

if (existsSync("data-grid-advanced.html")) {
    assertMarkers("data-grid-advanced.html", dataGridMarkers, failures);

    const dataGridDocument = parseDocument("data-grid-advanced.html");
    const loadingButtons = Array.from(dataGridDocument.querySelectorAll("button.inc-btn.is-loading"));

    ensure(loadingButtons.length >= 2, "data-grid-advanced.html is missing the busy button examples", failures);
    ensure(loadingButtons.every(hasLoadingHelperChild), "data-grid-advanced.html loading buttons must use the shared spinner helper child", failures);
}

if (existsSync("states.html")) {
    assertMarkers("states.html", statesMarkers, failures);

    const statesDocument = parseDocument("states.html");
    ensure(statesDocument.querySelector(".inc-auto-refresh__spinner .inc-spinner"), "states.html is missing the inline auto-refresh spinner helper", failures);
    ensure(statesDocument.querySelector(".inc-loading-dots"), "states.html is missing loading dots coverage", failures);
}

if (existsSync("dist/inc-design-language.css") && existsSync("dist/inc-design-language.min.css")) {
    const cssSize = statSync("dist/inc-design-language.css").size;
    const minCssSize = statSync("dist/inc-design-language.min.css").size;

    ensure(cssSize > 0, "dist/inc-design-language.css must not be empty", failures);
    ensure(minCssSize > 0, "dist/inc-design-language.min.css must not be empty", failures);
    ensure(minCssSize < cssSize, "dist/inc-design-language.min.css should be smaller than the expanded CSS output", failures);
}

verifyMcpManifestFreshness(failures);

if (failures.length > 0) {
    console.error("UI kit smoke checks failed:");
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

const htmlMarkerCount = referenceMarkers.length + formsMarkers.length + dataGridMarkers.length + statesMarkers.length;

console.log(`UI kit smoke checks passed (${requiredFiles.length} required files, ${cssSelectors.length} CSS selectors, ${htmlMarkerCount} HTML markers, and DOM coverage for the shipped example pages).`);
