<p align="center">
  <img src="./assets/brand/logo_color.svg" alt="Incursa UI Kit" width="360">
</p>

# Incursa UI Kit

[![CI](https://github.com/incursa/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/ci.yml)
[![Pages](https://github.com/incursa/ui-kit/actions/workflows/pages.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/pages.yml)
[![npm publish](https://github.com/incursa/ui-kit/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/incursa/ui-kit/actions/workflows/npm-publish.yml)

This folder contains a distilled, reusable UI kit for data-heavy business applications. The goal is to keep the recurring visual patterns that define the UI language and expose them consistently through the `inc-*` class surface.

Licensed under Apache 2.0.

## What was kept

- Bootstrap theming overrides for colors, typography, spacing, borders, inputs, cards, tabs, and tables.
- Dense but readable table styling with strong teal headers and mono-friendly numeric cells.
- Compact action buttons and inline forms that work well inside grids and table rows.
- Card, section-shell, summary-block, vertical-list, and layout primitives used across admin screens.
- Status-oriented badges and alerts with soft backgrounds and stronger foreground/border cues.
- Validation states, error summaries, filter chips, and dense toolbar patterns for search-heavy screens.
- Operational states such as empty, no-results, loading, error, permission, lock, toast, and activity timeline surfaces.
- Bulk-action, sticky-header, and row-state table patterns for operator-facing grids.
- File/document dropzones, file rows, read-only key-value grids, and drawer-style side panels.
- A small overlay/navigation layer for tabs, pagination, dropdown actions, modals, and offcanvas panels.
- Opinionated app-shell pieces for navbar/topbar, breadcrumb/nav-triad, sticky footer, user menu, and common two/three-column page layouts.

## What was intentionally left out

- App-specific backgrounds, admin footer behavior, report CSS, print CSS, and vendor assets.
- App-specific background art and report/print-only styling.
- Feature-specific one-off classes that do not generalize cleanly across products.

## Files

- `assets/brand/`
  Repository brand assets for GitHub, docs, and future package-site usage.
- `src/_inc-tokens.scss`
  Bootstrap-facing theme tokens and override variables.
- `src/_inc-theme.scss`
  Dedicated brand-facing variables for fonts, palette, semantic surfaces, and text colors.
- `src/inc-design-language.scss`
  Main source entrypoint for the `inc-*` class surface.
- `dist/inc-design-language.css`
  Compiled standalone CSS output.
- `dist/inc-design-language.js`
  Optional vanilla-JS helper for menus, tabs, and collapsible sections.
- `index.html`
  Showcase hub for the included example pages.
- `demo.html`
  Dashboard-style preview of the extracted patterns.
- `work-queue.html`
  Sidebar and table-heavy queue example.
- `record-detail.html`
  Three-column detail example with action rail.
- `native-patterns.html`
  Native-first details/menu/dialog example.
- `reference.html`
  Copy/paste catalog for the standard controls and markup patterns.
- `states.html`
  Empty, no-results, loading, error, permission, timeline, file, and notification patterns.
- `forms-and-validation.html`
  Validation, error-summary, filter-bar, chip, and read-only/edit form patterns.
- `data-grid-advanced.html`
  Sticky-header table, bulk selection, row states, busy buttons, and side drawer pattern.
- `showcase.css`
  Small demo-only helper stylesheet for the static examples.
- `AI-AGENT-INSTRUCTIONS.md`
  Short operational guidance for an AI agent or another engineer.

## Naming

The reusable public class surface uses the `inc-*` prefix.

Examples:

- `inc-table`
- `inc-btn`
- `inc-card`
- `inc-header-body`
- `inc-summary-block`

The BEM/modifier structure stays consistent across the package, for example `inc-table__cell--numeric` or `inc-btn--primary`.

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
- Native capable: the package now also includes styled `<details>` disclosures, a native summary-based menu, and a `<dialog>` surface so you can choose browser primitives when they fit better than helper-managed components.

## CSS-only vs JS-assisted

- CSS-only/native behavior is enough for layout, cards, tables, buttons, alerts, form fields, badges, breadcrumbs, sticky footer, and most surface styling.
- Stateful controls still need behavior:
  tabs, collapsible sections, menus/dropdowns, modals, offcanvas panels, dismissible alerts, and toasts.
- This package now includes an optional dependency-free helper at `dist/inc-design-language.js` for:
  user-menu dropdowns, tab switching, and collapse/accordion toggles.
- This package also includes native-styled patterns for:
  `details.inc-disclosure`, `details.inc-native-menu`, and `dialog.inc-native-dialog`.
- If you prefer native HTML behavior where possible, use browser primitives like `<details>` and `<dialog>` for product-specific implementations. The helper exists for places where the design language is intentionally Bootstrap-like and needs matching interaction behavior.

## Use it quickly

If you just want the look in another app:

1. Copy `dist/inc-design-language.css`.
2. If you need interactive tabs/menus/collapses, also copy `dist/inc-design-language.js`.
3. Load the CSS after your reset or base stylesheet.
4. Load the optional JS near the end of the page.
5. Use the `inc-*` classes shown in `reference.html` for direct copy/paste control markup.
6. Check `states.html`, `forms-and-validation.html`, and `data-grid-advanced.html` for the workflow-heavy patterns that do not read well as isolated snippets.
7. Use `demo.html`, `work-queue.html`, `record-detail.html`, and `native-patterns.html` for fuller page composition.

## Use it as a package

This repository is shaped as a normal npm package:

- `main`, `style`, and `sass` entry points are set.
- `files` limits packaged output to the reusable source and dist assets.
- `npm pack` produces a local tarball.
- `publishConfig.access` is set for public scoped publishing.
- GitHub Actions is set up for npm Trusted Publishing on release.

Typical flow:

```bash
npm install
npm run build
npm pack
```

Then in the consuming app:

```bash
npm install ../path-to-tarball/incursa-ui-kit-0.2.1.tgz
```

Or, while iterating locally:

```bash
npm install ../path-to-styles-folder
```

If you publish it publicly:

```bash
npm install @incursa/ui-kit
```

Import either:

```js
import "@incursa/ui-kit/dist/inc-design-language.css";
```

or, if you want to own the theme variables:

```scss
@import "@incursa/ui-kit/src/_inc-theme";
@import "@incursa/ui-kit/src/inc-design-language";
```

## How It Fits Into A Razor Or ASP.NET Core App

There are two supported ways to use it.

1. Use the compiled assets.

- Add `dist/inc-design-language.css` to your site and optionally `dist/inc-design-language.js`.
- This is the simplest path.
- You do not need Bootstrap CSS at runtime because the compiled CSS already includes the Bootstrap layer it was built on.
- You do not need Bootstrap JS unless your app separately uses Bootstrap's own JavaScript components.

2. Use the SCSS source.

- Import `src/inc-design-language.scss` into your own Sass pipeline.
- This path is for when you want to override theme variables or deeper Bootstrap-facing tokens.
- In this mode you do need Bootstrap and Sass available at build time because the source imports `bootstrap/scss/bootstrap`.

Practical recommendation for a .NET Razor Pages or MVC app:

- If you just want the finished look, copy or install the package and reference `dist/inc-design-language.css` from your layout.
- Add `dist/inc-design-language.js` only if you want the optional `inc-*` menu/tab/collapse helper behavior.
- Use the native `<details>` and `<dialog>` patterns when you want less JavaScript.
- Use the SCSS source path only if you want this package to become part of your app's own asset build and theme pipeline.

## GitHub repository

This repository is set up for:

- CI on pushes and pull requests via `.github/workflows/ci.yml`
- GitHub Pages showcase deployment from `main` via `.github/workflows/pages.yml`
- npm Trusted Publishing on GitHub Release publication via `.github/workflows/npm-publish.yml`
- Public release hygiene through `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`, and `RELEASING.md`
- Brand assets in `assets/brand/` so README and future docs do not depend on external image hosting

## Use it as source

If you want to keep editing it:

1. Install Bootstrap 5.3 and Sass in the consuming project.
2. Copy the `src/` folder.
3. Import `src/inc-design-language.scss`.
4. Edit `src/_inc-theme.scss` for the fonts and colors you want.
5. Use `src/_inc-tokens.scss` only when you need deeper spacing, radius, shadow, or Bootstrap-level tuning.

Example:

```scss
$inc-brand-700: #0f5f73;
$inc-brand-800: #0a4958;
$inc-font-family-sans: "Aptos", "Segoe UI", sans-serif;

@import "./src/inc-design-language";
```

## Suggested next extensions

- Add a spacing/visibility utility layer if you want the package to stand more independently from Bootstrap utilities.
- Split tables into clearer grid families if products start diverging:
  base, compact review grid, analytics grid, and spreadsheet-like grid.
- Add modal/offcanvas examples that use the same drawer and validation primitives shown in the new pages.
- Replace the `@extend`-heavy wrappers with mixins or direct declarations if you want less Bootstrap coupling over time.
