<p align="center">
  <img src="./assets/brand/logo_color.svg" alt="Incursa UI Kit" width="360">
</p>

# Incursa UI Kit

[![CI](https://github.com/incursa/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/ci.yml)
[![Pages](https://github.com/incursa/ui-kit/actions/workflows/pages.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/pages.yml)
[![npm publish](https://github.com/incursa/ui-kit/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/npm-publish.yml)

This folder contains a distilled, reusable UI kit for data-heavy business applications. The goal is to keep the recurring visual patterns that define the UI language and expose them consistently through the [`inc-*`](reference.html) class surface. The CSS classes remain the canonical public API; the optional Web Component layer adds a browser-native entrypoint without replacing the existing class-based usage model. The Web Component layer also ships a companion stylesheet entrypoint so the default look is one import away.

## Documentation

- Consumer documentation starts at [`docs/README.md`](docs/README.md).
- Use [`docs/getting-started.md`](docs/getting-started.md) to choose compiled CSS, SCSS, the JS helper, Web Components, or icons.
- Use [`docs/component-catalog.md`](docs/component-catalog.md) to find component families, examples, specs, and source modules without duplicating stale API tables.
- Use [`docs/style-control.md`](docs/style-control.md) before overriding fonts, colors, density, or Bootstrap-facing tokens.
- Use [`docs/maintainer-readiness.md`](docs/maintainer-readiness.md) for package boundaries, local validation, preview, release, and readiness notes.
- Use [`docs/documentation-maintenance.md`](docs/documentation-maintenance.md) when changing docs, examples, specs, package exports, or generated MCP resources.

## Live Examples

> Open the hosted examples and component reference: [https://incursa.github.io/ui-kit](https://incursa.github.io/ui-kit)

For the plain HTML baseline, open [`demo.html`](demo.html). For the paired Web Component view, open [`web-components.html`](web-components.html). The two pages are meant to be compared side by side.

## Optional Web Components

Use the CSS classes by default. Use Web Components when you want the same design language from plain HTML, JavaScript, and slots rather than hand-wired class markup. Use native HTML primitives first when `<button>`, `<input>`, `<details>`, or `<dialog>` already satisfy the interaction and accessibility contract.

Load the optional layered entrypoints from the same package:

```html
<link rel="stylesheet" href="/node_modules/@incursa/ui-kit/web-components/style.css">
<script type="module">
    import "@incursa/ui-kit/web-components";
</script>
```

The module auto-defines the shipped elements on load. If you prefer explicit registration control, import the same entrypoint in your module graph and call the exported registration helper from your own bootstrap code.

The v1 Web Component scope covers:

- layouts and shells: [`inc-app-shell`](reference.html), [`inc-page`](reference.html), [`inc-page-header`](reference.html), [`inc-section`](reference.html), [`inc-card`](reference.html), [`inc-summary-overview`](reference.html), [`inc-summary-block`](reference.html), [`inc-footer-bar`](reference.html)
- navigation: [`inc-navbar`](reference.html), [`inc-tabs`](reference.html), [`inc-user-menu`](reference.html)
- forms and inputs: [`inc-field`](reference.html), [`inc-input-group`](reference.html), [`inc-choice-group`](reference.html), [`inc-readonly-field`](reference.html), [`inc-validation-summary`](reference.html)
- feedback and status: [`inc-state-panel`](reference.html), [`inc-live-region`](reference.html), [`inc-auto-refresh`](reference.html), [`inc-theme-switcher`](reference.html), [`inc-badge`](reference.html), [`inc-spinner`](reference.html)
- actions and detail shells: [`inc-button`](reference.html), [`inc-button-group`](reference.html), [`inc-button-toolbar`](reference.html), [`inc-close-button`](reference.html), [`inc-alert`](reference.html), [`inc-empty-state`](reference.html), [`inc-list-group`](reference.html), [`inc-key-value-grid`](reference.html), [`inc-key-value`](reference.html)
- data visualization: [`inc-sparkline`](reference.html)
- overlays and disclosures: [`inc-disclosure`](reference.html), [`inc-dialog`](reference.html), [`inc-drawer`](reference.html)

The intentionally deferred surfaces stay CSS-first in v1, including tables and the remaining data presentation surfaces, filter and bulk toolbars, file workflows, permission banners, toasts, utility helpers, and the remaining compatibility overlay shells.

For maintainers, treat the Web Component layer as an additive wrapper over the same design language: one package, one token system, one naming vocabulary, and the same helper behavior where it already exists.

Licensed under Apache 2.0.

## What was kept

- Bootstrap theming overrides for colors, typography, spacing, borders, inputs, cards, tabs, and tables.
- Dense but readable table styling with strong teal headers and mono-friendly numeric cells.
- Compact action buttons and inline forms that work well inside grids and table rows.
- Card, section-shell, summary-block, page-frame, vertical-list, and layout primitives used across admin screens.
- Status-oriented badges and alerts with soft backgrounds and stronger foreground/border cues.
- Validation states, error summaries, fieldset/legend groups, filter chips, and dense toolbar patterns for search-heavy screens.
- Operational states such as empty, no-results, loading, error, permission, lock, toast, live-region, auto-refresh, and activity timeline surfaces.
- Bulk-action, sticky-header, and row-state table patterns for operator-facing grids.
- File/document dropzones, file rows, read-only description-list grids, progress/meter surfaces, and drawer-style side panels.
- Contextual floating content for tooltip and popover shells anchored to a trigger.
- A small overlay/navigation layer for tabs, pagination, dropdown actions, native details/dialog patterns, and compatibility modals/offcanvas panels.
- Opinionated app-shell pieces for navbar/topbar, breadcrumb/nav-triad, page-frame wrappers, footer-bar action clusters, sticky footer, user menu, and common two/three-column page layouts.
- A public-surface standards layer for [`inc-`](reference.html) prefixing, BEM naming, and accessible interactive behavior.
- An additive optional Web Component layer that keeps the CSS-first surface intact instead of creating a second design system.

## What was intentionally left out

- App-specific backgrounds, admin footer behavior, report CSS, print CSS, and vendor assets.
- App-specific background art and report/print-only styling.
- Feature-specific one-off classes that do not generalize cleanly across products.

## Specification Baseline

- First-pass Spec Trace suite: [`specs/requirements/ui-kit/_index.md`](./specs/requirements/ui-kit/_index.md)
- Open requirement gaps and follow-up questions: [`specs/requirements/ui-kit/REQUIREMENT-GAPS.md`](./specs/requirements/ui-kit/REQUIREMENT-GAPS.md)
- Architecture / design-rationale layer: [`specs/architecture/_index.md`](./specs/architecture/_index.md)
- Verification baseline and smoke gate: [`specs/verification/ui-kit/_index.md`](./specs/verification/ui-kit/_index.md)

## Files

- [`assets/brand/`](assets/brand)
  Repository brand assets for GitHub, docs, and future package-site usage.
- [`src/_inc-tokens.scss`](src/_inc-tokens.scss)
  Bootstrap-facing theme tokens and override variables.
- [`src/_inc-theme.scss`](src/_inc-theme.scss)
  Dedicated brand-facing variables for fonts, palette, semantic surfaces, and text colors.
- [`src/inc-design-language.scss`](src/inc-design-language.scss)
  Main source entrypoint for the [`inc-*`](reference.html) class surface.
- [`dist/inc-design-language.css`](dist/inc-design-language.css)
  Compiled standalone CSS output.
- [`dist/inc-design-language.js`](dist/inc-design-language.js)
  Optional vanilla-JS helper for menus, tabs, collapsible sections, modal/offcanvas shells, native dialog launch hooks, auto-refresh widgets with pause/resume controls, and light/dark/system theme switching with pluggable controls.
- [`dist/web-components/`](dist/web-components)
  Optional browser-native component runtime built from the same package and exposed through the `./web-components` entrypoint.
- [`index.html`](index.html)
  Showcase hub for the included example pages.
- [`demo.html`](demo.html)
  Dashboard-style preview of the extracted patterns.
- [`work-queue.html`](work-queue.html)
  Sidebar and table-heavy queue example.
- [`record-detail.html`](record-detail.html)
  Three-column detail example with action rail.
- [`native-patterns.html`](native-patterns.html)
  Native-first details/menu/dialog example.
- [`overlay-workflows.html`](overlay-workflows.html)
  Modal and offcanvas workflow example with validation and assignment flows.
- [`reference.html`](reference.html)
  Copy/paste catalog for the standard controls, page framing, metrics, lists, overlays, and markup patterns.
- [`web-components.html`](web-components.html)
  Public landing page for the optional Web Component entrypoint and the CSS-first versus Web Component usage split.
- [`specs/requirements/ui-kit/`](specs/requirements/ui-kit)
  First-pass Spec Trace specification suite for the UI kit, including the gap log for unresolved questions.
- [`specs/verification/ui-kit/`](specs/verification/ui-kit)
  Auditable verification baseline for the current UI kit public surface, including the repo-local smoke gate.
- [`states.html`](states.html)
  Empty, no-results, loading, error, permission, timeline, file, and notification patterns.
- [`forms-and-validation.html`](forms-and-validation.html)
  Validation, error-summary, filter-bar, chip, and read-only/edit form patterns.
- [`data-grid-advanced.html`](data-grid-advanced.html)
  Sticky-header table, bulk selection, row states, busy buttons, and side drawer pattern.
- [`showcase.css`](showcase.css)
  Small demo-only helper stylesheet for the static examples.
- [`LLMS.txt`](LLMS.txt)
  Plain-text agent guidance in the emerging [`llms.txt`](llms.txt)-style format for packaged consumers and tooling.
- [`AI-AGENT-INSTRUCTIONS.md`](AI-AGENT-INSTRUCTIONS.md)
  Short operational guidance for an AI agent or another engineer.

## Naming

The reusable public class surface uses the [`inc-*`](reference.html) prefix.

Examples:

- [`inc-table`](reference.html)
- [`inc-btn`](reference.html)
- [`inc-text`](reference.html)
- [`inc-heading`](reference.html)
- [`inc-data`](reference.html)
- [`inc-card`](reference.html)
- [`inc-header-body`](reference.html)
- [`inc-summary-block`](reference.html)

The BEM/modifier structure stays consistent across the package, for example [`inc-table__cell--numeric`](reference.html) or [`inc-btn--primary`](reference.html).

For titled sections that wrap tables, use [`inc-header-body--table-body`](reference.html) to keep body padding while removing extra bottom margin from nested table wrappers.

## Design language summary

- Typography: IBM Plex Sans for UI copy and IBM Plex Mono for data, amounts, and identifiers.
- Density: tighter than consumer-product UI, but not cramped; compact forms and small action buttons are first-class.
- Surfaces: mostly white and light neutral surfaces with restrained borders and low shadow usage.
- Accent: indigo is the primary brand/action color, with amber used as a brighter warning/highlight accent.
- Status communication: success/warning/error use pale backgrounds with darker foreground and border colors instead of pure solid fills.
- Tables first: headers are high-contrast, numeric alignment is explicit, and responsive table wrappers are part of the default system.
- Shell aware: the package now includes app-shell, breadcrumb, nav-triad, navbar, footer-bar, and user-menu primitives so page layout is part of the language, not an afterthought.
- Layout aware: sidebar menus, inline form fields, and multi-column page examples are included so common admin-page composition is demonstrated directly.
- Workflow aware: validation, filter bars, bulk action bars, audit timelines, and file-review surfaces are part of the package now because those patterns recur constantly in B2B products.
- Native capable: the package now also includes styled `<details>` disclosures, a native summary-based menu, and `<dialog>` surfaces for both centered modals and drawer-style side sheets so you can choose browser primitives when they fit better than helper-managed components.
- Color mode: `data-bs-theme` is the global light/dark activation hook, and the bundled `IncTheme` helper can persist light, dark, or system mode from a small control surface.

## CSS-only vs JS-assisted

- CSS-only/native behavior is enough for layout, cards, tables, breadcrumbs, sticky footer, and most surface styling.
- Stateful controls still need behavior:
  tabs, collapsible sections, menus/dropdowns, modal and offcanvas shells, and auto-refresh countdowns with pause/resume behavior.
- Alert and toast surfaces can stay CSS/HTML-first when the app only needs static messaging; use the Web Component host when you want standardized tone or optional dismissal behavior.
- This package now includes an optional dependency-free helper at [`dist/inc-design-language.js`](dist/inc-design-language.js) for:
  user-menu dropdowns, tab switching, collapse/accordion toggles, legacy modal/offcanvas shells, native dialog launching, page auto-refresh countdown widgets, and theme switching controls.
- The helper also exposes `window.IncTheme` and listens for [`data-inc-theme-mode`](src/inc-design-language.js), [`data-inc-theme-toggle`](src/inc-design-language.js), and [`data-inc-theme-select`](src/inc-design-language.js) controls.
- `window.IncTheme` also supports `createSwitcher(options)` and `mountSwitcher(target, options)` when you want to drop in the packaged switcher without hand-writing the markup.
- This package also includes native-styled patterns for:
  [`details.inc-disclosure`](reference.html), [`details.inc-native-menu`](reference.html), [`dialog.inc-native-dialog`](reference.html), and [`dialog.inc-native-dialog--drawer`](reference.html).
- If you prefer native HTML behavior where possible, use browser primitives like `<details>` and `<dialog>` for product-specific implementations. The helper exists for places where the design language is intentionally Bootstrap-like and needs matching interaction behavior.

## Web Component usage

- Use the CSS class surface when you already have the HTML structure and only need the design language.
- Use the Web Component entrypoint when you want declarative slots, attributes, and DOM events around the approved v1 component families.
- Use native HTML primitives when they already solve the interaction cleanly and keep the semantics simpler.
- Keep tables, utilities, and the remaining low-value atoms class-based until there is a clear component contract worth adding.
- Treat the Web Component layer as a layered entrypoint in the same package, not as a separate design system.

## Use it quickly

If you just want the look in another app:

1. Copy [`dist/inc-design-language.css`](dist/inc-design-language.css).
2. If you need interactive tabs/menus/collapses or helper-managed overlays, also copy [`dist/inc-design-language.js`](dist/inc-design-language.js).
3. If you want browser-native custom elements, see [`web-components.html`](web-components.html) for the optional layered entrypoint.
4. Load the CSS after your reset or base stylesheet.
5. Load the optional JS near the end of the page.
6. Use the [`inc-*`](reference.html) classes shown in [`reference.html`](reference.html) for direct copy/paste control markup, or use the matching custom elements from the Web Component layer when that better fits the page.
7. Check [`states.html`](states.html), [`forms-and-validation.html`](forms-and-validation.html), [`data-grid-advanced.html`](data-grid-advanced.html), and [`overlay-workflows.html`](overlay-workflows.html) for the workflow-heavy patterns that do not read well as isolated snippets.
8. Use [`demo.html`](demo.html), [`work-queue.html`](work-queue.html), [`record-detail.html`](record-detail.html), and [`native-patterns.html`](native-patterns.html) for fuller page composition.

If you want the color mode to follow the saved user preference before first paint, add a tiny bootstrap script in the `<head>`:

```html
<script>
    (() => {
        const storageKey = "inc-theme-mode";
        const resolveTheme = (mode) => mode === "dark" || mode === "light"
            ? mode
            : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        let mode = "system";

        try {
            const storedMode = window.localStorage.getItem(storageKey);

            if (storedMode === "light" || storedMode === "dark" || storedMode === "system") {
                mode = storedMode;
            }
        } catch {
            // Ignore storage restrictions.
        }

        document.documentElement.setAttribute("data-inc-theme-mode", mode);
        document.documentElement.setAttribute("data-bs-theme", resolveTheme(mode));
        document.documentElement.style.colorScheme = resolveTheme(mode);
    })();
</script>
```

Then you can either mount the packaged switcher:

```html
<div data-inc-theme-switcher data-inc-theme-switcher-variant="navbar"></div>
```

or control the mode yourself:

```html
<button type="button" data-inc-theme-toggle>Cycle theme</button>
<button type="button" data-inc-theme-mode="light">Light</button>
<button type="button" data-inc-theme-mode="dark">Dark</button>
<button type="button" data-inc-theme-mode="system">System</button>
```

```html
<script src="/path/to/inc-design-language.js"></script>
<script>
    window.IncTheme.setMode("dark");
    window.IncTheme.mountSwitcher("[data-inc-theme-switcher]", { variant: "navbar" });
</script>
```

## Use it as a package

This repository is shaped as a normal npm package:

- `main`, `style`, `sass`, and the layered `web-components/style.css` entry points are set.
- `files` limits packaged output to the reusable source and dist assets.
- `npm pack` produces a local tarball.
- `publishConfig.access` is set for public scoped publishing.
- GitHub Actions is set up for npm Trusted Publishing on release.
- `npm run verify` is the repo-local build, smoke, and dry-run package gate.

Typical flow:

```bash
npm install
npm run verify
npm pack
```

Then in the consuming app:

```bash
npm install ../path-to-tarball/incursa-ui-kit-x.y.z.tgz
```

Or, while iterating locally:

```bash
npm install ../path-to-styles-folder
```

If you publish it publicly:

```bash
npm install @incursa/ui-kit
```

Import the base CSS:

```js
import "@incursa/ui-kit/dist/inc-design-language.css";
```

Or, for the browser-native layer, import the paired stylesheet and runtime:

```js
import "@incursa/ui-kit/web-components/style.css";
import "@incursa/ui-kit/web-components";
```

or, if you want to own the theme variables:

```scss
@import "@incursa/ui-kit/src/_inc-theme";
@import "@incursa/ui-kit/src/inc-design-language";
```

## How It Fits Into A Razor Or ASP.NET Core App

There are three supported ways to use it.

1. Use the compiled assets.

- Add [`dist/inc-design-language.css`](dist/inc-design-language.css) to your site and optionally [`dist/inc-design-language.js`](dist/inc-design-language.js).
- This is the simplest path.
- You do not need Bootstrap CSS at runtime because the compiled CSS already includes the Bootstrap layer it was built on.
- You do not need Bootstrap JS unless your app separately uses Bootstrap's own JavaScript components.
- If you want light/dark/system switching, keep `data-bs-theme` on the root element and let `window.IncTheme` persist the user's override or mount the packaged switcher into your layout.
- If you want browser-native custom elements instead of helper wiring, import the same-package `./web-components` entrypoint and keep the CSS bundle in place. The companion stylesheet lives at `./web-components/style.css`.

2. Use the SCSS source.

- Import [`src/inc-design-language.scss`](src/inc-design-language.scss) into your own Sass pipeline.
- This path is for when you want to override theme variables or deeper Bootstrap-facing tokens.
- In this mode you do need Bootstrap and Sass available at build time because the source imports `bootstrap/scss/bootstrap`.

3. Use the optional Web Component layer.

- Import the same-package `./web-components` entrypoint when you want browser-native custom elements for the supported v1 families.
- Keep the CSS bundle in place because the custom elements are designed to sit on top of the same class and token vocabulary.
- Prefer this layer for declarative shell components, standardized atomic controls, and repeated action/detail or collection hosts, and keep static tables plus the remaining low-value atoms on the CSS surface.

### Icons

Incursa components use semantic icon names instead of Lucide component names. The default renderer maps names such as `info`, `help`, `success`, `warning`, `error`, `upload`, `document`, `download`, `settings`, and `external-link` to bundled Lucide SVGs.

Use [`data-inc-icon="warning"`](src/inc-design-language.js) in CSS-first markup loaded with [`dist/inc-design-language.js`](dist/inc-design-language.js), or use component attributes such as [`<inc-alert tone="warning">`](reference.html) and [`<inc-button icon="download">Download</inc-button>`](reference.html) in the Web Component layer. Decorative package icons are rendered with `aria-hidden="true"`; icon-only controls still need an accessible label.

Consumers can replace the global renderer without depending on Lucide names:

```js
import { setIconRenderer } from "@incursa/ui-kit/icons";

setIconRenderer((name, options) => {
  // Return an SVG/HTMLElement or an SVG string for the semantic Incursa name.
});
```

Practical recommendation for a .NET Razor Pages or MVC app:

- If you just want the finished look, copy or install the package and reference [`dist/inc-design-language.css`](dist/inc-design-language.css) from your layout.
- Add [`dist/inc-design-language.js`](dist/inc-design-language.js) if you want the optional [`inc-*`](reference.html) menu/tab/collapse helper behavior or the bundled theme switcher helper.
- Add the same-package `./web-components` entrypoint when you want declarative custom elements for the supported v1 component families. Pair it with `./web-components/style.css` for the default look.
- Use the native `<details>` and `<dialog>` patterns when you want less JavaScript.
- Use [`<inc-sparkline>`](reference.html) for compact trend evidence beside surrounding metric text. It accepts `values="5120,5400,5310"` for static pages or a `points` property with `{ x, y }` objects for timestamped data.
- Use the SCSS source path only if you want this package to become part of your app's own asset build and theme pipeline.

## GitHub repository

This repository is set up for:

- CI on pushes and pull requests via [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- GitHub Pages showcase deployment from `main` via [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
- Cloudflare Worker MCP deployment from `main` via [`.github/workflows/mcp-worker.yml`](.github/workflows/mcp-worker.yml)
- npm Trusted Publishing on `v*` tag pushes via [`.github/workflows/npm-publish.yml`](.github/workflows/npm-publish.yml)
- Public release hygiene through `LICENSE`, `NOTICE`, [`CHANGELOG.md`](CHANGELOG.md), [`CONTRIBUTING.md`](CONTRIBUTING.md), [`SECURITY.md`](SECURITY.md), [`SUPPORT.md`](SUPPORT.md), and [`RELEASING.md`](RELEASING.md)
- Brand assets in [`assets/brand/`](assets/brand) so README and future docs do not depend on external image hosting

## Release flow

For normal releases:

1. Merge the source changes you want on `main`.
2. Run the release helper from PowerShell:

```powershell
.\release.ps1 -ReleaseType patch -Changelog @"
- Summarize the release here.
- Add more markdown if needed.
"@
```

Use `minor` or `major` when needed. The script verifies the repo state, bumps the version, runs the build, smoke, and package validation step, updates [`CHANGELOG.md`](CHANGELOG.md), creates the release commit and tag, and pushes them. Pushing the tag publishes the package to npm automatically. If you need to retry a failed publish, rerun the original tag-triggered workflow run rather than dispatching a separate manual publish.

## Use it as source

If you want to keep editing it:

1. Install Bootstrap 5.3 and Sass in the consuming project.
2. Copy the [`src/`](src) folder.
3. Import [`src/inc-design-language.scss`](src/inc-design-language.scss).
4. Edit [`src/_inc-theme.scss`](src/_inc-theme.scss) for the fonts and colors you want.
5. Use [`src/_inc-tokens.scss`](src/_inc-tokens.scss) only when you need deeper spacing, radius, shadow, or Bootstrap-level tuning.

Example:

```scss
$inc-brand-700: #0f5f73;
$inc-brand-800: #0a4958;
$inc-font-family-sans: "Aptos", "Segoe UI", sans-serif;

@import "./src/inc-design-language";
```

## MCP Worker

The repository also ships a deterministic Cloudflare Worker that exposes the UI kit content through Model Context Protocol. The Worker is intentionally read-only and stateless:

- `POST /mcp` serves the MCP JSON-RPC endpoint.
- `GET /mcp` serves a small HTML index for browsing the generated manifest.
- `GET /mcp/resource/*` serves a human-readable resource page for inspection.
- The Worker also tolerates a leading path prefix from a load balancer and keeps the rendered links under the configured `MCP_PATH_PREFIX` value.
- Build-time manifests live under [`dist/mcp/`](dist/mcp) and are regenerated from the repo docs, examples, specs, and package metadata.
- The Worker does not call an LLM, crawl the web, or depend on a database.

The local workflow is:

```bash
npm run build
npm run test:mcp
```

`npm run build` regenerates the MCP manifests and bundles the Worker. `npm run verify` runs the full repo gate, including the MCP transport tests and the manifest smoke check.

For local Worker development, use Wrangler against the generated bundle:

```bash
npm run build:mcp
npx wrangler dev --config wrangler.toml
```

To refresh the generated manifests after changing docs or examples, rerun `npm run build:mcp` or the full `npm run build` pipeline.
If you only need to refresh the JSON manifests before bundling, run `npm run build:mcp:manifests`.

To deploy the Worker:

```bash
npm run deploy:mcp
```

The Cloudflare deploy workflow uses `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets and deploys the bundled Worker from [`dist/mcp/worker.mjs`](dist/mcp/worker.mjs).
