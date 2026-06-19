# Web Components Runtime Notes

This folder ships the optional `./web-components` entrypoint for the UI kit.

## v1 Scope

The runtime defines the approved v1 host family set:

- layouts and shells: [`inc-app-shell`](../../reference.html), [`inc-page`](../../reference.html), [`inc-page-header`](../../reference.html), [`inc-section`](../../reference.html), [`inc-card`](../../reference.html), [`inc-summary-overview`](../../reference.html), [`inc-summary-block`](../../reference.html), [`inc-footer-bar`](../../reference.html)
- navigation: [`inc-navbar`](../../reference.html), [`inc-tabs`](../../reference.html), [`inc-user-menu`](../../reference.html)
- forms and inputs: [`inc-field`](../../reference.html), [`inc-input-group`](../../reference.html), [`inc-choice-group`](../../reference.html), [`inc-readonly-field`](../../reference.html), [`inc-validation-summary`](../../reference.html)
- feedback and status: [`inc-state-panel`](../../reference.html), [`inc-live-region`](../../reference.html), [`inc-auto-refresh`](../../reference.html), [`inc-theme-switcher`](../../reference.html), [`inc-badge`](../../reference.html), [`inc-spinner`](../../reference.html)
- actions and detail shells: [`inc-button`](../../reference.html), [`inc-button-group`](../../reference.html), [`inc-button-toolbar`](../../reference.html), [`inc-close-button`](../../reference.html), [`inc-alert`](../../reference.html), [`inc-empty-state`](../../reference.html)
- collections: [`inc-list-group`](../../reference.html), [`inc-key-value-grid`](../../reference.html), [`inc-key-value`](../../reference.html)
- data visualization: [`inc-sparkline`](../../reference.html)
- overlays: [`inc-disclosure`](../../reference.html), [`inc-dialog`](../../reference.html), [`inc-drawer`](../../reference.html)

## Contract shape

- CSS-first is still canonical. Components reuse existing [`inc-*`](../../reference.html) class contracts.
- Badge and spinner hosts standardize the most common atomic status defaults while still reusing the same [`inc-*`](../../reference.html) vocabulary, the action/detail hosts standardize repeated button, alert, and empty-state markup patterns, and the collection hosts standardize repeated list and key/value markup patterns.
- Package consumers should pair `@incursa/ui-kit/web-components` with `@incursa/ui-kit/web-components/style.css` when they want the default look out of the box.
- v1 stays light DOM first so current style selectors keep working.
- Native primitives are used for disclosure/menu/dialog behavior where practical.
- [`index.js`](index.js) is a thin bootstrap that registers family modules and the promoted action/detail and collection hosts:
  - [`components/layout.js`](components/layout.js)
  - [`components/navigation.js`](components/navigation.js)
  - [`components/forms.js`](components/forms.js)
  - [`components/feedback.js`](components/feedback.js)
  - [`components/actions.js`](components/actions.js)
  - [`components/collections.js`](components/collections.js)
  - [`components/visualizations.js`](components/visualizations.js)
  - [`components/overlays.js`](components/overlays.js)
- Public registration API is idempotent:
  - `window.IncWebComponents.defineAll()`
  - `window.IncWebComponents.registerIncWebComponents()`
- The dedicated entrypoint auto-defines components on load.

## Explicitly deferred surfaces in v1

- tooltip and popover components
- permission-banner and toast runtime orchestration
- table/data wrappers and grid-like behavior
- filter/file/bulk workflow wrappers
- legacy helper-managed modal/offcanvas compatibility wrappers

Those surfaces remain CSS-first until a follow-up requirement pass promotes them.
