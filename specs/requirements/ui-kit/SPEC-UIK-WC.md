---
artifact_id: SPEC-UIK-WC
artifact_type: specification
title: Web Component Layer Contract
domain: ui-kit
capability: web-components
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - web-components
  - custom-elements
  - additive-layer
---

# SPEC-UIK-WC - Web Component Layer Contract

## Purpose

Define the additive Web Component layer for the Incursa UI kit so it mirrors the current CSS-first surface without creating a second design system.

## Scope

This specification covers:

- custom-element naming and public contract rules
- the current CSS kit inventory mapped to Web Component equivalents
- v1 versus deferred scope decisions
- shared rules for attributes, properties, events, methods, slots, parts, custom properties, lifecycle, accessibility, and theming
- acceptance criteria for each supported family

This specification does not replace the existing CSS family specs. The CSS class surface remains the canonical public API and the Web Component layer is additive.

## Context

The current kit is CSS-first and helper-assisted. The repository already ships:

- the public `inc-*` class surface in [`src/inc-design-language.scss`](../../../reference.html)
- the selector-driven helper layer in [`src/inc-design-language.js`](../../../reference.html)
- the current example and scenario pages in [`reference.html`](../../../reference.html), [`forms-and-validation.html`](../../../forms-and-validation.html), [`data-grid-advanced.html`](../../../data-grid-advanced.html), [`overlay-workflows.html`](../../../overlay-workflows.html), [`native-patterns.html`](../../../native-patterns.html), [`states.html`](../../../states.html), [`work-queue.html`](../../../work-queue.html), and [`record-detail.html`](../../../record-detail.html)

The Web Component layer must reuse that design language rather than recreate it.

## WC Contract Baseline

### REQ-UIK-WC-0001 Keep CSS-first usage canonical

The CSS class API MUST remain the primary and supported surface.

The Web Component layer MAY provide the same visual language and behavior in declarative form, but it MUST NOT imply that existing `inc-*` classes are deprecated or secondary.

### REQ-UIK-WC-0002 Ship the Web Component layer as an additive entrypoint in the same package

The package MUST expose the Web Component layer through a layered entrypoint in the same npm package.

The Web Component layer MUST NOT require a second package, a second design system, or a forked token set.

### REQ-UIK-WC-0003 Use stable `inc-` custom element naming

Custom elements MUST use the `inc-` prefix and kebab-case names that align with the current UI kit vocabulary.

The component names SHOULD stay close to the current family names so consumers can recognize the mapping between the CSS class surface and the element surface.

### REQ-UIK-WC-0004 Prefer light DOM and slotted native content by default

Custom elements SHOULD use light DOM by default.

The Web Component layer MUST prefer slotted native HTML for forms, links, buttons, tables, lists, and headings unless Shadow DOM is clearly justified by encapsulation or accessibility needs.

### REQ-UIK-WC-0005 Standardize the shared contract

All v1 custom elements MUST:

- expose public state through attributes and mirrored properties when that state is part of the public contract
- dispatch DOM events rather than framework callbacks
- use named slots where the component is composite
- expose useful CSS `part` names and component-scoped CSS custom properties when styling needs it
- clean up timers, observers, and event listeners on disconnect
- keep accessibility semantics and keyboard behavior aligned with the current helper-managed or native browser behavior
- reuse current tokens, theme state, and helper logic instead of redefining them

### REQ-UIK-WC-0006 Keep CSS-only and deferred surfaces explicit

The Web Component requirements MUST label which current CSS families remain CSS-only in v1 and which are deferred.

## Current Surface Inventory

| Family | Current CSS surface | Proposed Web Component equivalent | V1 posture | Notes |
| --- | --- | --- | --- | --- |
| Layouts and shells | `inc-app-shell`, `inc-page`, `inc-breadcrumb-body`, `inc-page-header`, `inc-section-container`, `inc-card`, `inc-summary-overview`, `inc-summary-block`, `inc-footer-bar` | `inc-app-shell`, `inc-page`, `inc-page-header`, `inc-section`, `inc-card`, `inc-summary-overview`, `inc-summary-block`, `inc-footer-bar` | V1 | Slot-heavy light DOM wrappers; keep grid and spacing utilities CSS-only. |
| Navigation | `inc-navbar`, `inc-nav-triad`, `inc-breadcrumb`, `inc-sidebar-menu`, `inc-user-menu`, `inc-nav*`, `inc-pagination`, `inc-native-menu`, `inc-dropdown` | `inc-navbar`, `inc-tabs`, `inc-user-menu` | Mixed | Tabs, navbar collapse, and user menus need behavior; breadcrumb, pagination, sidebar menus, native menus, and dropdowns stay CSS-first or deferred. |
| Forms and inputs | `inc-form`, `inc-form__*`, `inc-input-group`, `inc-readonly-field`, `inc-form__error-summary`, `inc-filter-bar`, `inc-filter-chip`, `inc-file-dropzone`, `inc-file-list`, `inc-file-row` | `inc-field`, `inc-input-group`, `inc-choice-group`, `inc-readonly-field`, `inc-validation-summary` | Mixed | Wrapper-based composites around native controls; filter, file, and bulk surfaces stay CSS-first or deferred in v1. |
| Feedback and status | `inc-badge`, `inc-state-panel`, `inc-permission-banner`, `inc-toast`, `inc-spinner`, `inc-progress`, `inc-meter`, `inc-live-region`, `inc-auto-refresh`, `inc-loading*`, `inc-skeleton` | `inc-state-panel`, `inc-live-region`, `inc-auto-refresh`, `inc-theme-switcher`, `inc-badge`, `inc-spinner` | Mixed | Stateful shells become components; badge and spinner hosts become standardized atomic controls; permission banners and toasts stay CSS-first or deferred. |
| Actions and detail shells | `inc-btn`, `inc-button-group`, `inc-button-toolbar`, `inc-close-button`, `inc-alert`, `inc-empty-state`, `inc-list-group`, `inc-key-value-grid`, `inc-key-value` | `inc-button`, `inc-button-group`, `inc-button-toolbar`, `inc-close-button`, `inc-alert`, `inc-empty-state`, `inc-list-group`, `inc-key-value-grid`, `inc-key-value` | V1 | Thin native wrappers and light-DOM shells standardize repeated actions, alerts, empty states, list groups, and description-list pairs without inventing a second styling vocabulary. |
| Data visualization | `inc-sparkline` | `inc-sparkline` | V1 | D3-backed SVG trend evidence for dense metrics and tables; keep full charts out of scope. |
| Overlays and disclosures | `inc-disclosure`, `inc-accordion`, `inc-collapse`, `inc-native-dialog`, `inc-modal`, `inc-offcanvas`, `inc-tooltip`, `inc-popover`, `inc-drawer` | `inc-disclosure`, `inc-dialog`, `inc-drawer` | Mixed | Native `<dialog>` and `<details>` are preferred; accordion/collapse, popover, tooltip, modal, offcanvas, and contextual menu helpers remain deferred or compatibility-only. |
| Tables and data presentation | `inc-table`, `inc-table-responsive`, `inc-table-container`, `inc-vertical-list`, `inc-timeline`, `inc-bulk-bar` | None in v1 | Deferred | These surfaces stay CSS-first in v1; a later pass can define a bounded component contract for the remaining table-like patterns. |
| Theme controls and color mode | `inc-theme-switcher`, `inc-theme-toggle`, `data-inc-theme-*` | `inc-theme-switcher` | V1 | Reuse the existing `IncTheme` helper contract and root theme attributes. |
| CSS-only primitives | `inc-text*`, `inc-heading*`, `inc-data*`, `inc-u-*`, `inc-grid`, `inc-row`, `inc-col`, `inc-stack`, `inc-flex-*`, `inc-btn`, `inc-progress`, `inc-meter`, `inc-loading*`, `inc-skeleton` | None | CSS-only | These stay class-based in v1 by design. |

## Layouts And Shells

### REQ-UIK-WC-0010 Provide slot-based shell components

The Web Component layer MUST provide slot-based light DOM wrappers for the layout and shell family.

The v1 layout surface MUST cover `inc-app-shell`, `inc-page`, `inc-page-header`, `inc-section`, `inc-card`, `inc-summary-overview`, `inc-summary-block`, and `inc-footer-bar`.

The layout components MUST preserve the existing composition model:

- no hard-coded page templates
- no hidden content reordering
- no private layout assumptions that break current slot-driven composition

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-app-shell>` | `variant`, `dense`, `collapsed` | `slotchange` | none | `header`, `main`, `footer`, `default` | `part="shell header main footer"`; `--inc-shell-gap` | Light DOM wrapper; preserve slotted landmarks and body content | V1 |
| `<inc-page>` | `variant`, `dense`, `wide` | `slotchange` | none | `breadcrumbs`, `header`, `body`, `aside`, `footer`, `default` | `part="page breadcrumbs body aside footer"` | Reflect presence of breadcrumbs/body slots without templating them | V1 |
| `<inc-page-header>` | `variant`, `dense` | `slotchange` | none | `title`, `body`, `actions`, `default` | `part="header title body actions"` | Keep heading semantics in slotted content | V1 |
| `<inc-section>` | `variant`, `dense`, `tone` | `slotchange` | none | `header`, `body`, `footer`, `actions`, `default` | `part="section header body footer actions"` | Provide a semantic section shell without imposing structure | V1 |
| `<inc-card>` | `variant`, `tone`, `elevated` | `slotchange` | none | `header`, `body`, `footer`, `default` | `part="card header body footer"` | Keep card composition flexible and slotted | V1 |
| `<inc-summary-overview>` | `columns`, `dense` | `slotchange` | none | `default` | `part="overview"`; `--inc-summary-columns` | Reflect column count through attributes or CSS vars | V1 |
| `<inc-summary-block>` | `variant`, `tone`, `dense` | `slotchange` | none | `header`, `body`, `footer`, `actions`, `default` | `part="block header body footer actions value status"` | Preserve current summary/value/status semantics | V1 |
| `<inc-footer-bar>` | `variant`, `dense` | `slotchange` | none | `menu`, `meta`, `default` | `part="footer menu meta"` | Keep footer actions and metadata composable | V1 |

#### Acceptance criteria

- Each host must accept declarative children and render them without a fixed internal template.
- Each host must keep the current content language recognizable to existing `inc-*` class users.
- Each host must remain usable without Shadow DOM.
- Any layout-specific visual state must be expressed by attributes or CSS custom properties, not by framework callbacks.

## Navigation

### REQ-UIK-WC-0020 Provide navigation components with keyboard parity

The Web Component layer MUST provide navigation components for the current navbar, tab, menu, breadcrumb, sidebar, and pagination patterns.

The v1 navigation surface MUST cover `inc-navbar`, `inc-tabs`, and `inc-user-menu`.

The navigation components MUST match the current helper-managed keyboard and focus behavior:

- tabs must support roving tabindex and Arrow/Home/End navigation
- menus must support Arrow/Home/End/Escape behavior and focus restoration
- navbar collapse and user menus must close cleanly on Escape and outside interaction
- active and selected state must remain visible and reflected in the DOM

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-navbar>` | `variant`, `breakpoint`, `expanded`, `app` | `toggle`, `open`, `close` | `toggle()`, `expand()`, `collapse()` | `brand`, `nav`, `utilities`, `collapse`, `default` | `part="bar brand nav collapse utilities toggle"` | Open Shadow DOM candidate if the responsive shell needs a stable scaffold | V1 |
| `<inc-tabs>` | `selected`, `orientation`, `activation`, `variant`, `fill`, `justified` | `change`, `select` | `select()`, `next()`, `previous()` | `tab`, `panel`, `default` | `part="tablist tab panel"` | Strong open Shadow DOM candidate for the tablist/panel scaffold | V1 |
| `<inc-user-menu>` | `open`, `label`, `placement` | `open`, `close`, `select` | `open()`, `close()`, `toggle()` | `trigger`, `menu`, `item`, `default` | `part="summary panel item"` | May stay light DOM as long as focus and dismissal behavior remain correct | V1 |

#### Acceptance criteria

- Interactive navigation components must expose a predictable DOM contract through attributes, properties, and events.
- Keyboard behavior must match the current helper contract already proven in the browser suite.
- Navigation wrappers must not suppress or replace anchor semantics.
- Components must be usable declaratively in plain HTML and remain controllable from JavaScript.

## Forms And Inputs

### REQ-UIK-WC-0030 Provide wrapper-based form and input composites

The Web Component layer MUST cover the reusable form and input composition shells in the current kit.

The v1 forms surface MUST cover `inc-field`, `inc-input-group`, `inc-choice-group`, `inc-readonly-field`, and `inc-validation-summary`.

The forms layer MUST keep native `<form>`, `<input>`, `<select>`, `<textarea>`, `<fieldset>`, `<legend>`, `<label>`, `<button>`, and related browser controls native wherever possible. The Web Component layer MUST wrap and coordinate those native controls rather than reimplement their form-association semantics in v1.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-field>` | `label`, `hint`, `error`, `required`, `invalid`, `dense` | bubble native `input`/`change` from the control slot; `slotchange` | `focus()` pass-through | `label`, `control`, `hint`, `error`, `default` | `part="field label control hint error"`; `--inc-field-gap` | Wire labels, helper text, and error text to slotted native control | V1 |
| `<inc-input-group>` | `prefix`, `suffix`, `dense`, `expand` | bubble native `input`/`change` | `focus()` pass-through | `prefix`, `control`, `suffix`, `default` | `part="group prefix control suffix"` | Keep adornments noninteractive unless slotted content is interactive | V1 |
| `<inc-choice-group>` | `type`, `legend`, `orientation`, `inline`, `dense` | native `change`; `slotchange` | `focusFirst()` | `legend`, `item`, `hint`, `error`, `default` | `part="group legend item control hint error"` | Preserve checkbox, radio, and switch semantics | V1 |
| `<inc-readonly-field>` | `label`, `value`, `dense` | `slotchange` | none | `label`, `value`, `meta`, `default` | `part="field label value meta"` | Keep read-only display aligned with description-list semantics | V1 |
| `<inc-validation-summary>` | `title`, `count`, `live` | `slotchange` | `announce()` | `title`, `item`, `default` | `part="summary title list item"` | Keep error links and ordering stable | V1 |

The following forms and input-related surfaces are deferred from v1:

- `inc-filter-bar`
- `inc-filter-chip`
- `inc-file-dropzone`
- `inc-file-list`
- `inc-file-row`
- `inc-bulk-bar`

#### Acceptance criteria

- Slotted native controls must keep their browser form behavior.
- The component wrappers must keep label, hint, and error associations visible to assistive technology.
- The components must not force Shadow DOM on the control path in v1.
- The contract must stay declarative enough for plain HTML and imperative enough for JavaScript updates.
- File intake surfaces must remain declarative; upload execution and persistence stay application-owned.

## Feedback And Status

### REQ-UIK-WC-0040 Provide stateful feedback shells, atomic status controls, and live status surfaces

The Web Component layer MUST cover feedback surfaces that need runtime state or status announcements.

The v1 feedback surface MUST cover `inc-state-panel`, `inc-live-region`, `inc-auto-refresh`, `inc-theme-switcher`, `inc-badge`, and `inc-spinner`.

`inc-permission-banner` and `inc-toast` are deferred from v1.

Atomic presentation helpers such as `inc-progress`, `inc-meter`, `inc-loading`, `inc-loading-dots`, and `inc-skeleton` MUST remain CSS-only in v1.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-state-panel>` | `tone`, `variant`, `title`, `body`, `status`, `open` | `slotchange` | none | `icon`, `title`, `body`, `actions`, `default` | `part="panel icon title body actions"` | Keep state text and iconography slotted and visible | V1 |
| `<inc-live-region>` | `politeness`, `atomic`, `busy` | none | `announce(message)` | `default` | `part="region"` | Maintain a live announcement node for status updates | V1 |
| `<inc-auto-refresh>` | `seconds`, `label`, `loading-label`, `paused-label`, `pause-action-label`, `resume-action-label`, `paused` | `pause`, `resume`, `refresh`, `tick`, `statechange` | `pause()`, `resume()`, `toggle()`, `refresh()` | `countdown`, `status`, `toggle`, `default` | `part="countdown label value status toggle"` | Keep countdown, pause/resume, and visibility-change behavior synchronized | V1 |
| `<inc-badge>` | `tone`, `variant`, `pill` | none | none | `default` | Host class modifiers only: `inc-badge`, `inc-badge--tone`, `inc-badge--pill` | Light-DOM status chip with stable tone defaults and pill styling | V1 |
| `<inc-spinner>` | `variant`, `tone`, `size`, `label` | none | none | none | Host class modifiers only: `inc-spinner`, `inc-spinner--variant`, `inc-spinner--variant--sm`, `inc-spinner--variant--tone` | Self-contained loading indicator; `label` controls accessible status semantics | V1 |

#### Acceptance criteria

- State and status surfaces must expose observable DOM state, not styling alone.
- Auto-refresh must preserve the current helper behavior, including pause/resume and status transitions.
- Live-region surfaces must announce changes accessibly instead of relying on visual cues.
- Badge and spinner hosts must provide a small declarative contract for tone, size, and accessible loading labels without requiring app-specific class recipes.
- Other presentation-only atoms must stay CSS-only and remain usable without the Web Component runtime.

## Actions And Detail Shells

### REQ-UIK-WC-0045 Provide lightweight action and detail shells

The Web Component layer MUST provide small, declarative wrappers for repeated action, alert, empty-state, list, and key/value markup.

The v1 action/detail surface MUST cover `inc-button`, `inc-button-group`, `inc-button-toolbar`, `inc-close-button`, `inc-alert`, `inc-empty-state`, `inc-list-group`, `inc-key-value-grid`, and `inc-key-value`.

The action/detail shells MUST stay thin and native-first:

- `inc-button` MUST wrap a real `<button>` or `<a>` element and standardize the existing `inc-btn` tone, size, and loading classes.
- `inc-close-button` MUST wrap a real `<button>` element and keep the close affordance native.
- `inc-alert` MAY provide simple dismissible and timeout-driven dismissal modes, but it MUST not become a separate toast/lifecycle system.
- `inc-empty-state`, `inc-list-group`, and `inc-key-value*` MUST remain light DOM shells that project into the existing CSS vocabulary.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-button>` | `tone`, `variant`, `size`, `loading`, `href`, `type`, `disabled`, `label`, `target`, `rel`, `download` | native `click` | none | `default` | inner control `part="control"`; existing `inc-btn` modifier classes | Wrap a real button or anchor and mirror loading/disabled state | V1 |
| `<inc-button-group>` | `size`, `label` | none | none | `default` | `role="group"`; `inc-button-group--*` modifiers | Group multiple buttons and expose a stable accessible label | V1 |
| `<inc-button-toolbar>` | `label`, `orientation` | none | none | `default` | `role="toolbar"`; `aria-orientation` when vertical | Provide a labeled action rail without a bespoke toolbar system | V1 |
| `<inc-close-button>` | `label`, `variant` | native `click` | none | `default` | inner control `part="control"`; `inc-close-button--white` modifier | Keep the close affordance as a real button with a default accessible label | V1 |
| `<inc-alert>` | `tone`, `variant`, `dismissible`, `dismiss-label`, `timeout` | `dismiss` | `hide()`, `dismiss()` | `default` | host `part="alert"`, dismiss control `part="dismiss"`, timed progress `part="progress"` | Standardize alert tones plus optional dismiss and timeout behavior without introducing toast orchestration | V1 |
| `<inc-empty-state>` | none | none | none | `icon`, `actions`, `default` | `part="empty-state content icon body actions"` | Standardize the repeated icon/body/actions empty-state structure | V1 |
| `<inc-list-group>` | `flush`, `numbered`, `dense`, `interactive`, `label` | native child `click` events | none | `item`, `default` | `role="list"`; `inc-list-group--*` modifiers | Preserve list semantics while standardizing action rows and numbered lists | V1 |
| `<inc-key-value-grid>` | `columns`, `dense` | none | none | `item`, `default` | inline grid sizing via `columns`; dense gap adjustments | Keep description-list grids declarative and easy to repeat | V1 |
| `<inc-key-value>` | `label`, `value`, `meta`, `inline`, `dense`, `card`, `variant` | none | none | `label`, `value`, `meta`, `default` | inner `label/value/meta` parts and `inc-key-value--*` modifiers | Keep the label/value/meta pair readable and slot-friendly | V1 |

#### Acceptance criteria

- Action hosts must wrap or project native controls rather than reimplementing button semantics.
- Alert dismissal, optional timeout progress, close buttons, and loading states must stay thin and observable in the DOM.
- Empty-state, list-group, and key/value hosts must keep the current `inc-*` class vocabulary recognizable to CSS-first consumers.
- These shells must stay small enough that tables, vertical lists, and other larger data wrappers can still be deferred.

## Data Visualization

### REQ-UIK-WC-0048 Provide compact sparkline trend components

The Web Component layer MUST provide a reusable `inc-sparkline` element for compact trend evidence beside surrounding metric text.

The sparkline component MUST:

- accept simple `values` attributes and JavaScript `points` arrays
- render inline SVG through component-owned markup
- expose stable parts for `svg`, `line`, `area`, `marker`, `reference`, and `empty`
- handle empty, malformed, single-point, flat-line, negative, and mixed-sign data without throwing
- keep labels out of the graphic by default while exposing `<title>` and `<desc>` metadata for assistive technology

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-sparkline>` | `values`, `points`, `width`, `height`, `variant`, `tone`, `curve`, `show-last-marker`, `show-min-max`, `reference-value`, `empty-label`, `aria-label` | none | none | none | `part="svg line area marker reference empty"`; `--inc-sparkline-stroke`, `--inc-sparkline-fill`, `--inc-sparkline-marker`, `--inc-sparkline-reference`, `--inc-sparkline-muted` | Re-render on attribute/property changes; malformed data falls back to empty state | V1 |

#### Acceptance criteria

- The component must use D3 for scale and path generation, not for DOM mutation.
- The component must stay quiet and table-safe with stable dimensions from attributes or defaults.
- Surrounding product text must remain responsible for current values, deltas, and decisions; the sparkline is evidence-supporting.

## Overlays, Dialogs, Drawers, And Popovers

### REQ-UIK-WC-0050 Provide native-backed overlay components

The Web Component layer MUST cover the overlay and disclosure patterns that recur in the current kit.

The v1 overlay surface MUST cover `inc-disclosure`, `inc-dialog`, and `inc-drawer`.

Legacy modal/offcanvas shells MAY remain available as compatibility surfaces, but they MUST NOT become the preferred Web Component contract for new work.

`inc-popover` and `inc-tooltip` are deferred until the positioning and accessibility contract is explicit across the supported browsers.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-disclosure>` | `open`, `summary`, `toggleable` | `toggle`, `open`, `close` | `open()`, `close()`, `toggle()` | `summary`, `content`, `default` | `part="summary content"` | Prefer native `<details>` semantics where possible | V1 |
| `<inc-dialog>` | `open`, `modal`, `dismissible`, `size`, `label` | `open`, `close`, `cancel`, `dismiss` | `show()`, `showModal()`, `close()` | `header`, `body`, `footer`, `title`, `backdrop`, `default` | `part="surface backdrop header body footer close"` | Trap focus, restore focus, and sync `aria-hidden` or `aria-modal` | V1 |
| `<inc-drawer>` | `open`, `placement`, `modal`, `dismissible`, `size` | `open`, `close`, `dismiss` | `show()`, `close()` | `header`, `body`, `footer`, `title`, `backdrop`, `default` | `part="surface backdrop header body footer close"` | Preserve drawer-specific placement and dismissal behavior | V1 |

#### Acceptance criteria

- Overlay components must restore focus to the invoking control after dismissal.
- Overlay components must close on Escape where the interaction model expects it.
- Backdrop and outside-click dismissal must be explicit and testable.
- Native browser primitives such as `<details>` and `<dialog>` must be preferred when they already satisfy the semantic contract.
- Compatibility-only modal/offcanvas surfaces must be labeled as such and must not become a second public overlay contract.

## Tables And Data Presentation

### REQ-UIK-WC-0060 Keep larger table-like data presentation surfaces CSS-only in v1

The Web Component layer MUST keep the recurring table and data presentation surfaces CSS-only in v1.

The current table, vertical-list, timeline, bulk-bar, filter-bar, and file-review surfaces are deferred to a later pass that can define a bounded component contract.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-table>` | `dense`, `striped`, `sticky-header`, `responsive`, `row-state`, `selectable` | none in v1 | none in v1 | `caption`, `head`, `body`, `foot`, `toolbar`, `default` | none in v1 | Keep native `<table>` semantics untouched | Deferred |
| `<inc-vertical-list>` | `compact`, `trim`, `inset` | none in v1 | none in v1 | `item`, `default` | none in v1 | Keep the stacked list layout thin and composable | Deferred |
| `<inc-timeline>` | `dense`, `reverse`, `status` | none in v1 | none in v1 | `item`, `default` | none in v1 | Keep timeline entries slotted and readable | Deferred |
| `<inc-bulk-bar>` | `count`, `label`, `sticky`, `selected` | none in v1 | none in v1 | `meta`, `actions`, `default` | none in v1 | Preserve the selected-count and action cluster for grid workflows | Deferred |

#### Acceptance criteria

- The Web Component layer must not turn tables into a bespoke grid engine.
- Native semantics for table and other larger data content must remain intact.
- The responsive wrapper behavior must stay explicit and not hide content from assistive technology.
- Bulk selection and row-state presentation must remain available without requiring app-specific markup conventions.

## Theme Controls And Color Mode Switching

### REQ-UIK-WC-0070 Provide a theme switcher that reuses the existing theme helper contract

The Web Component layer MUST provide a declarative theme switcher that aligns with the current `IncTheme` helper and `data-inc-theme-*` hooks.

The v1 theme surface MUST cover `inc-theme-switcher`.

`inc-theme-toggle` MAY remain as a CSS/JS hook, but it is not required to become a separate custom element in v1.

#### Contract matrix

| Tag | Inputs | Events | Methods | Slots | Parts / custom properties | Lifecycle and state | V1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<inc-theme-switcher>` | `mode`, `variant`, `block`, `label`, `menu-label`, `heading`, `storage-key` | `inc-theme-change` | `getMode()`, `getResolvedTheme()`, `setMode()`, `cycleMode()` | `summary`, `panel`, `option`, `status`, `default` | `part="summary label status panel option option-body option-label option-detail"` | Sync with root theme attributes, storage, and system preference | V1 |

#### Acceptance criteria

- The theme switcher must use the existing light/dark/system contract.
- The component must update the root theme attributes and respond to external theme changes.
- Theme state must be visible in the DOM and accessible to assistive technology.
- The component must be usable as a declarative host in plain HTML and as an imperative control from JavaScript.

## CSS-Only And Deferred Surfaces

### REQ-UIK-WC-0080 Keep atomic presentation helpers and low-value utilities CSS-only in v1

The Web Component layer MUST NOT convert pure utility classes or typography helpers into custom elements in v1.

The following families MUST remain CSS-only in v1:

- typography and text helpers: `inc-text*`, `inc-heading*`, `inc-data*`
- utilities and layout primitives: `inc-u-*`, `inc-grid`, `inc-row`, `inc-col`, `inc-stack`, `inc-flex-*`
- atomic presentation helpers that stay CSS-only: `inc-btn`, `inc-progress`, `inc-meter`, `inc-loading`, `inc-loading-dots`, `inc-skeleton`

The following surfaces are deferred from v1:

- `inc-tooltip`
- `inc-popover`
- `inc-accordion*`
- `inc-collapse`
- `inc-native-menu*`
- `inc-dropdown*`
- `inc-modal*`
- `inc-offcanvas*`
- `inc-permission-banner`
- `inc-toast`
- `inc-menu`
- `inc-breadcrumb`
- `inc-pagination`
- `inc-sidebar-menu`
- `inc-nav-triad`
- advanced data-grid behaviors such as sorting, resizing, virtualization, and asynchronous data orchestration
- any future form-associated custom element model beyond the wrapper-based composites in this spec

### Acceptance criteria

- These surfaces must remain usable through the current CSS class API.
- Their omission from the Web Component layer must be documented as intentional, not accidental.
- Any future promotion of one of these surfaces into a custom element MUST come with a new requirement update rather than an implicit implementation change.

## Example And Documentation Coverage

### REQ-UIK-WC-0090 Provide explicit example coverage for every shipped v1 family

Every shipped v1 Web Component family MUST have in-repo example coverage.

At minimum, the examples MUST include:

- one reference-style snippet that shows the element contract directly
- one scenario page that shows the element in context with the existing CSS kit
- coverage of the family-specific default and interactive states that matter for that component

The public documentation MUST explain when to use:

- CSS classes directly
- Web Components
- native HTML primitives such as `<details>`, `<dialog>`, and native form controls

### Acceptance criteria

- Consumers must be able to learn the CSS-first and Web Component forms side by side.
- The reference surface must remain the CSS catalog, not a hidden component migration guide.
- The WC layer must remain obviously optional from the documentation alone.

## Traceability

This specification aligns with the existing family specs:

- [`SPEC-UIK-LAY`](SPEC-UIK-LAY.md)
- [`SPEC-UIK-NAV`](SPEC-UIK-NAV.md)
- [`SPEC-UIK-FRM`](SPEC-UIK-FRM.md)
- [`SPEC-UIK-INP`](SPEC-UIK-INP.md)
- [`SPEC-UIK-SEL`](SPEC-UIK-SEL.md)
- [`SPEC-UIK-GRP`](SPEC-UIK-GRP.md)
- [`SPEC-UIK-RO`](SPEC-UIK-RO.md)
- [`SPEC-UIK-CHO`](SPEC-UIK-CHO.md)
- [`SPEC-UIK-VAL`](SPEC-UIK-VAL.md)
- [`SPEC-UIK-FLT`](SPEC-UIK-FLT.md)
- [`SPEC-UIK-FDBK`](SPEC-UIK-FDBK.md)
- [`SPEC-UIK-OVL`](SPEC-UIK-OVL.md)
- [`SPEC-UIK-MET`](SPEC-UIK-MET.md)
- [`SPEC-UIK-LIST`](SPEC-UIK-LIST.md)
- [`SPEC-UIK-TBL`](SPEC-UIK-TBL.md)
- [`SPEC-UIK-FILE`](SPEC-UIK-FILE.md)
- [`SPEC-UIK-UTL`](SPEC-UIK-UTL.md)
- [`SPEC-UIK-TXT`](SPEC-UIK-TXT.md)
- [`SPEC-UIK-TOK`](SPEC-UIK-TOK.md)
- [`SPEC-UIK-INT`](SPEC-UIK-INT.md)

It also aligns with the current public surfaces in:

- [`src/inc-design-language.scss`](../../../reference.html)
- [`src/inc-design-language.js`](../../../reference.html)
- [`reference.html`](../../../reference.html)
- [`forms-and-validation.html`](../../../forms-and-validation.html)
- [`data-grid-advanced.html`](../../../data-grid-advanced.html)
- [`overlay-workflows.html`](../../../overlay-workflows.html)
- [`native-patterns.html`](../../../native-patterns.html)
- [`states.html`](../../../states.html)
- [`work-queue.html`](../../../work-queue.html)
- [`record-detail.html`](../../../record-detail.html)
