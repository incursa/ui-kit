# AI Agent Instructions

Use this package as a reusable data-heavy UI baseline.

Repository brand assets live under `assets/brand/`. Prefer those local files when adding logos, favicons, or README imagery.

## Fast path

- Prefer `dist/inc-design-language.css` if the target app already has working HTML and only needs the look.
- Prefer `src/inc-design-language.scss` if you need to tune tokens, density, or Bootstrap defaults.
- Prefer `dist/inc-design-language.js` only for stateful UI primitives such as menus, tabs, or collapsible sections.
- Prefer `reference.html` when you need copy/paste starter markup for a supported control before composing a full page.
- Prefer `states.html`, `forms-and-validation.html`, and `data-grid-advanced.html` when the target screen is workflow-heavy and you need realistic composition patterns, not isolated snippets.

## Naming rules

- Use the `inc-` prefix for all public classes.
- Keep the existing BEM pattern:
  `inc-block`, `inc-block__element`, `inc-block--modifier`.

## Core primitives

- Tables:
  Start with `inc-table` and add cell modifiers such as `inc-table__cell--numeric`, `inc-table__cell--action`, `inc-table__cell--min`, and `inc-table__cell--expand`.
- Buttons:
  Use `inc-btn` plus a semantic modifier such as `inc-btn--primary`, `inc-btn--secondary`, or `inc-btn--danger`.
  Use `inc-btn--micro` for in-row or in-cell actions.
- Forms:
  Use `inc-form--inline` for toolbar/filter layouts, wrap each label/control pair in `inc-form__field` or `inc-form__group`, and use `inc-input-group` for composed inputs.
  Use `inc-form__hint`, `inc-form__feedback--error`, `inc-form__feedback--success`, and `inc-form__error-summary` for validation.
- Filter bars:
  Use `inc-filter-bar`, `inc-filter-chip`, and `inc-bulk-bar` for search-heavy or multi-select operator screens.
- Cards and shells:
  Use `inc-card` for plain cards and `inc-header-body inc-header-body--card` for titled sections with actions.
  Use `inc-header-body--table-body` when the body contains a table and should keep section padding without adding extra bottom table margin.
- App layout:
  Use `inc-app-shell`, `inc-footer-bar`, `inc-navbar`, `inc-breadcrumb`, `inc-nav-triad`, and `inc-sidebar-menu` when you need an opinionated application frame instead of isolated components.
- States and workflow:
  Use `inc-state-panel`, `inc-permission-banner`, `inc-toast-card`, `inc-timeline`, `inc-file-dropzone`, `inc-file-row`, and `inc-key-value` for non-happy-path and detail-heavy B2B flows.
- Interaction:
  Use `data-inc-toggle="menu"`, `data-inc-toggle="tab"`, and `data-inc-toggle="collapse"` with `data-inc-target="#target-id"` when you want the optional vanilla-JS helper to wire behavior.
- Native interaction:
  Use `details.inc-disclosure` for section stacks, `details.inc-native-menu` for lightweight menus, and `dialog.inc-native-dialog` for native modal surfaces.
- Status:
  Use `inc-badge--success|warning|danger|info` for compact status signals.
- Metrics:
  Use `inc-summary-overview` and `inc-summary-block` for dashboard and header metrics.

## Customization order

1. Change fonts and colors in `src/_inc-theme.scss`.
2. Use `src/_inc-tokens.scss` only for deeper token or Bootstrap-level tuning.
3. Rebuild the CSS.
4. Only add new component rules after checking whether an existing `inc-*` block already fits.

## Packaging

- Use `npm run build` to rebuild distributables.
- Use `npm pack` or `npm run package` to produce a local installable tarball.
- The repository is licensed under Apache 2.0.
- The compiled `dist/inc-design-language.css` already includes the Bootstrap layer it was built from, so consumers do not need Bootstrap CSS at runtime when they use the compiled assets.
- The source `src/inc-design-language.scss` does require Bootstrap Sass at build time because it imports `bootstrap/scss/bootstrap`.

## Guardrails

- Keep the typography stack split:
  sans for UI text, mono for data.
- Preserve explicit alignment classes for numeric table data.
- Avoid adding product-specific shell/background styles to this package.
- Keep new components generic enough to drop into another admin/data app.
- If you add a new block, prefer names like `inc-filter-bar`, `inc-stat-card`, or `inc-data-toolbar` over feature-specific names.
- Keep border radius consistent across panels, tabs, tables, and cards unless there is a deliberate reason to differentiate them.
- Prefer native browser behavior first for disclosures and dialogs when it fits the product; use the helper only when the Bootstrap-like component contract needs custom state handling.

## Build

If Bootstrap and Sass are installed in the package folder:

```bash
npm run build
```

If you are compiling from somewhere else, make sure Sass can resolve `bootstrap/scss/*`.
