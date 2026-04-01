# AI Agent Instructions

Use this package as a reusable data-heavy UI baseline.

Repository brand assets live under [`assets/brand/`](assets/brand). Prefer those local files when adding logos, favicons, or README imagery.

## Surface selection

- Start with the highest-level public surface that already fits the job.
- Prefer [`web-components.html`](web-components.html) and the same-package [`./web-components`](./web-components) entrypoint when you are building new UI from plain HTML/JS and the capability exists in the approved v1 component set.
- Prefer [`dist/inc-design-language.css`](dist/inc-design-language.css) with raw HTML plus [`inc-*`](reference.html) classes when the markup already exists, the family is CSS-only, or you only need styling.
- Use native `<button>`, `<input>`, `<details>`, and `<dialog>` before adding helper wiring or custom elements.
- Drop into `src/*` or token files only when the public surface cannot express the needed layout or behavior.

## Fast path

- Prefer [`dist/inc-design-language.css`](dist/inc-design-language.css) if the target app already has working HTML and only needs the look.
- Prefer [`src/inc-design-language.scss`](src/inc-design-language.scss) if you need to tune tokens, density, or Bootstrap defaults.
- Prefer [`dist/inc-design-language.js`](dist/inc-design-language.js) only for stateful UI primitives such as menus, tabs, collapsible sections, modal/offcanvas shells, native dialog launch hooks, and auto-refresh widgets.
- Prefer the optional [`web-components.html`](web-components.html) landing page and the same-package [`./web-components`](./web-components) entrypoint when you want declarative browser-native components for the approved v1 families from plain HTML/JS.
- Prefer [`reference.html`](reference.html) when you need copy/paste starter markup for a supported control or page-frame primitive before composing a full page.
- Prefer [`states.html`](states.html), [`forms-and-validation.html`](forms-and-validation.html), and [`data-grid-advanced.html`](data-grid-advanced.html) when the target screen is workflow-heavy and you need realistic composition patterns, not isolated snippets.

## Markdown links

- Use relative links for repo-local references in markdown, and keep the visible label code-formatted, for example [`README.md`](README.md), [`SPEC-UIK-CNV`](specs/requirements/ui-kit/SPEC-UIK-CNV.md), or [`src/inc-design-language.scss`](src/inc-design-language.scss).
- Use absolute URLs only for external documentation, hosted examples, package registry pages, or other non-repo targets.
- When a reference has a clear local target, prefer linking it instead of leaving it as a plain code span.
- Run `node scripts/linkify-markdown-docs.mjs --check` after markdown edits to confirm the repo-local reference policy still holds.

## Naming rules

- Use the [`inc-`](reference.html) prefix for all public classes.
- Keep the existing BEM pattern:
  [`inc-block`](reference.html), [`inc-block__element`](reference.html), [`inc-block--modifier`](reference.html).

## Core primitives

- Tables:
  Start with [`inc-table`](reference.html) and add cell modifiers such as [`inc-table__cell--numeric`](reference.html), [`inc-table__cell--action`](reference.html), [`inc-table__cell--min`](reference.html), and [`inc-table__cell--expand`](reference.html).
- Buttons:
  Use [`inc-btn`](reference.html) plus a semantic modifier such as [`inc-btn--primary`](reference.html), [`inc-btn--secondary`](reference.html), or [`inc-btn--danger`](reference.html).
  Use [`inc-btn--micro`](reference.html) for in-row or in-cell actions.
- Forms:
  Use [`inc-form--inline`](reference.html) for toolbar/filter layouts, wrap each label/control pair in [`inc-form__field`](reference.html) or [`inc-form__group`](reference.html), and use [`inc-input-group`](reference.html) for composed inputs.
  Use [`inc-form__hint`](reference.html), [`inc-form__feedback--error`](reference.html), [`inc-form__feedback--success`](reference.html), and [`inc-form__error-summary`](reference.html) for validation.
- Filter bars:
  Use [`inc-filter-bar`](reference.html), [`inc-filter-chip`](reference.html), and [`inc-bulk-bar`](reference.html) for search-heavy or multi-select operator screens.
- Cards and shells:
  Use [`inc-card`](reference.html) for plain cards and [`inc-header-body inc-header-body--card`](reference.html) for titled sections with actions.
  Use [`inc-header-body--table-body`](reference.html) when the body contains a table and should keep section padding without adding extra bottom table margin.
- App layout:
  Use [`inc-app-shell`](reference.html), [`inc-page`](reference.html), [`inc-breadcrumb-body`](reference.html), [`inc-footer-bar`](reference.html), [`inc-footer-bar__menu`](reference.html), [`inc-footer-bar__meta`](reference.html), [`inc-navbar`](reference.html), [`inc-breadcrumb`](reference.html), [`inc-nav-triad`](reference.html), and [`inc-sidebar-menu`](reference.html) when you need an opinionated application frame instead of isolated components.
- States and workflow:
  Use [`inc-state-panel`](reference.html), [`inc-permission-banner`](reference.html), [`inc-toast-card`](reference.html), [`inc-timeline`](reference.html), [`inc-file-dropzone`](reference.html), [`inc-file-row`](reference.html), and [`inc-key-value`](reference.html) for non-happy-path and detail-heavy B2B flows.
- Interaction:
  Use [`data-inc-toggle="menu"`](src/inc-design-language.js), [`data-inc-toggle="tab"`](src/inc-design-language.js), and [`data-inc-toggle="collapse"`](src/inc-design-language.js) with [`data-inc-target="#target-id"`](src/inc-design-language.js) when you want the optional vanilla-JS helper to wire behavior. Use [`data-inc-toggle="modal"`](src/inc-design-language.js), [`data-inc-toggle="offcanvas"`](src/inc-design-language.js), [`data-inc-dismiss="modal"`](src/inc-design-language.js), [`data-inc-dismiss="offcanvas"`](src/inc-design-language.js), and [`data-inc-native-dialog-open`](src/inc-design-language.js) only when the helper-managed or launch-hook contract is the intended path.
- Native interaction:
  Use [`details.inc-disclosure`](reference.html) for section stacks, [`details.inc-native-menu`](reference.html) for lightweight menus, and [`dialog.inc-native-dialog`](reference.html) for native modal surfaces.
- Web Components:
  Keep the CSS class surface canonical, use the optional layered entrypoint for the approved v1 component families when declarative markup is the better fit, and fall back to raw HTML/CSS for CSS-first surfaces or when the markup already exists.
- Status:
  Use [`inc-badge--success|warning|danger|info`](reference.html) for compact status signals.
- Metrics:
  Use [`inc-summary-overview`](reference.html) and [`inc-summary-block`](reference.html) for dashboard and header metrics.

## Customization order

1. Change fonts and colors in [`src/_inc-theme.scss`](src/_inc-theme.scss).
2. Use [`src/_inc-tokens.scss`](src/_inc-tokens.scss) only for deeper token or Bootstrap-level tuning.
3. Rebuild the CSS.
4. Only add new component rules after checking whether an existing [`inc-*`](reference.html) block already fits.

## Packaging

- Use `npm run verify` before versioning when you want to rebuild, smoke-test, and dry-run the package.
- Use `npm run build` to rebuild distributables.
- Use `npm pack` or `npm run package` to produce a local installable tarball.
- The repository is licensed under Apache 2.0.
- The compiled [`dist/inc-design-language.css`](dist/inc-design-language.css) already includes the Bootstrap layer it was built from, so consumers do not need Bootstrap CSS at runtime when they use the compiled assets.
- The source [`src/inc-design-language.scss`](src/inc-design-language.scss) does require Bootstrap Sass at build time because it imports `bootstrap/scss/bootstrap`.
- The optional Web Component layer lives in the same package as a layered entrypoint so the CSS-first surface and browser-native surface stay aligned.
- The Web Component source tree lives under [`src/web-components/`](src/web-components); keep consumer-facing guidance in [`web-components.html`](web-components.html) and maintainer notes alongside the runtime source tree.

## Guardrails

- Keep the typography stack split:
  sans for UI text, mono for data.
- Preserve explicit alignment classes for numeric table data.
- Avoid adding product-specific shell/background styles to this package.
- Keep new components generic enough to drop into another admin/data app.
- If you add a new block, prefer names like [`inc-filter-bar`](reference.html), [`inc-stat-card`](reference.html), or [`inc-data-toolbar`](reference.html) over feature-specific names.
- Keep border radius consistent across panels, tabs, tables, and cards unless there is a deliberate reason to differentiate them.
- Prefer native browser behavior first for disclosures and dialogs when it fits the product; use the helper only when the Bootstrap-like component contract needs custom state handling.
- Keep the CSS-first class API canonical and treat the Web Component layer as additive, not a replacement.

## Build

If Bootstrap and Sass are installed in the package folder:

```bash
npm run build
```

If you are compiling from somewhere else, make sure Sass can resolve `bootstrap/scss/*`.
