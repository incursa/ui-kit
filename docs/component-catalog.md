---
title: "Component Catalog"
---

# Component Catalog

This catalog is a navigation layer, not the complete API reference. The maintained details live in the HTML examples, source modules, specs, and generated MCP manifests. This keeps the docs useful without copying every selector, attribute, and event into another stale list.

## Component Families

| Family | CSS-first source | Web Component tags | Notes |
| --- | --- | --- | --- |
| Layout and shells | `reference.html`, `demo.html`, `record-detail.html` | [`inc-app-shell`](../reference.html), [`inc-page`](../reference.html), [`inc-page-header`](../reference.html), [`inc-section`](../reference.html), [`inc-card`](../reference.html), [`inc-summary-overview`](../reference.html), [`inc-summary-block`](../reference.html), [`inc-footer-bar`](../reference.html) | Use for page structure, cards, summary metrics, and footers. |
| Navigation | `reference.html`, `native-patterns.html` | [`inc-navbar`](../reference.html), [`inc-tabs`](../reference.html), [`inc-user-menu`](../reference.html) | Use native links and buttons inside the components. JS helper and Web Components both preserve keyboard/focus behavior. |
| Forms and choices | `forms-and-validation.html`, `reference.html` | [`inc-field`](../reference.html), [`inc-input-group`](../reference.html), [`inc-choice-group`](../reference.html), [`inc-readonly-field`](../reference.html), [`inc-validation-summary`](../reference.html) | Keep native controls native. Use wrappers for label, hint, validation, and density consistency. |
| Feedback and status | `states.html`, `reference.html` | [`inc-state-panel`](../reference.html), [`inc-live-region`](../reference.html), [`inc-auto-refresh`](../reference.html), [`inc-theme-switcher`](../reference.html), [`inc-badge`](../reference.html), [`inc-spinner`](../reference.html) | Use for operational states, accessible announcements, refresh controls, theme switching, and compact status. |
| Actions | `reference.html`, `overlay-workflows.html` | [`inc-button`](../reference.html), [`inc-button-group`](../reference.html), [`inc-button-toolbar`](../reference.html), [`inc-close-button`](../reference.html), [`inc-alert`](../reference.html), [`inc-empty-state`](../reference.html) | Use button elements for in-place actions and anchors for navigation. Icon names are semantic Incursa names. |
| Collections and detail | `record-detail.html`, `reference.html` | [`inc-list-group`](../reference.html), [`inc-key-value-grid`](../reference.html), [`inc-key-value`](../reference.html) | Use for description-list style data and compact repeated items. |
| Data visualization | `reference.html`, `web-components.html` | [`inc-sparkline`](../reference.html) | Use for compact trend evidence beside text. Surrounding product copy remains responsible for interpretation. |
| Overlays and disclosure | `native-patterns.html`, `overlay-workflows.html` | [`inc-disclosure`](../reference.html), [`inc-dialog`](../reference.html), [`inc-drawer`](../reference.html) | Prefer native `<details>` and `<dialog>` when they fit. Use helper-managed legacy overlays only for Bootstrap-like workflows. |
| Tables, grids, filters, files, utilities | `reference.html`, `data-grid-advanced.html`, `forms-and-validation.html`, `states.html` | Deferred or CSS-first | These stay class-based until a stronger component contract is worth the runtime. |

## Where Details Live

- CSS-first class names and copy/paste snippets: `reference.html`.
- Web Component usage and comparison: `web-components.html`.
- Web Component runtime notes: `src/web-components/README.md`.
- Web Component registration and public tag set: `src/web-components/index.js`.
- Family modules: `src/web-components/components/`.
- Public requirements: `specs/requirements/ui-kit/`.
- Generated MCP component resources: `dist/mcp/components/`.
- Generated MCP pattern resources: `dist/mcp/patterns/`.

## Adding Or Changing A Component

1. Check whether an existing [`inc-*`](../reference.html) class family or native HTML element already solves the case.
2. Update the CSS-first example or source first when the class surface changes.
3. Add or update the Web Component only when the behavior has a stable declarative contract.
4. Update the relevant requirement spec under `specs/requirements/ui-kit/`.
5. Update `reference.html`, the realistic example page, and `web-components.html` when applicable.
6. Regenerate build outputs and MCP manifests with `npm run build` when generated package or catalog output changes.
7. Run `npm run docs:check` after Markdown edits.
