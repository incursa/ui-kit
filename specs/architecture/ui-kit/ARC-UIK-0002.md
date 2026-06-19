---
artifact_id: ARC-UIK-0002
artifact_type: architecture
title: Web Component Layer Architecture
domain: ui-kit
status: draft
owner: ui-kit-maintainers
satisfies:
  - REQ-UIK-WC-0001
  - REQ-UIK-WC-0002
  - REQ-UIK-WC-0003
  - REQ-UIK-WC-0004
  - REQ-UIK-WC-0005
  - REQ-UIK-WC-0006
  - REQ-UIK-WC-0010
  - REQ-UIK-WC-0020
  - REQ-UIK-WC-0030
  - REQ-UIK-WC-0040
  - REQ-UIK-WC-0050
  - REQ-UIK-WC-0060
  - REQ-UIK-WC-0070
  - REQ-UIK-WC-0080
  - REQ-UIK-WC-0090
tags:
  - ui-kit
  - web-components
  - architecture
  - packaging
  - parity
---

# ARC-UIK-0002 - Web Component Layer Architecture

## Purpose

Explain how the optional Web Component layer satisfies the approved parity scope without replacing the current CSS-first UI kit.

## Scope

This architecture covers the component base model, naming and registry strategy, light DOM versus Shadow DOM policy, reuse of existing tokens and helper logic, package entrypoints, and the docs and verification impacts of the new layer.

It does not redefine the product boundary. The product boundary is fixed by [`SPEC-UIK-WC`](../../requirements/ui-kit/SPEC-UIK-WC.md).

## Decision Summary

- Keep the current CSS kit canonical.
- Ship the Web Component layer in the same package, not a second package.
- Use open Shadow DOM selectively for shell and interaction-heavy widgets.
- Keep wrapper-first form and data surfaces light DOM so they can continue to reuse the current [`inc-*`](../../../reference.html) styling hooks directly.
- Reuse the current [`inc-*`](../../../reference.html) naming vocabulary and the existing token system.
- Refactor shared helper behavior into internal utilities that both entrypoints can consume.
- Keep the Web Component runtime opt-in through a layered entrypoint.

## Boundary Model

The package has two public surfaces:

1. CSS-first classes, tokens, and helper behavior remain the primary contract.
2. Web Components provide an additive declarative layer for the approved v1 families.

The Web Component layer is not a second design system. It is a DOM-native facade over the same design language:

- the same visual tokens
- the same interaction expectations
- the same accessibility contract
- the same public naming language

Anything that is still a better fit as a class, utility, or native HTML element stays that way.

## Base Component Model

Use autonomous custom elements, one common base class, and a small set of shared controllers instead of a deep inheritance tree or customized built-ins.

Recommended shape:

- `IncElement` as the common `HTMLElement` base for public components
- shared controllers for reflection, focus handling, roving selection, overlay management, and theme state
- family-specific components composing those controllers rather than reimplementing them

The base class should own only the mechanics that are common across the public surface:

- lifecycle setup and teardown
- attribute/property reflection
- slot discovery and slotchange wiring
- DOM event helpers
- state synchronization
- compatibility hooks for current helper behavior

Specialized behavior should stay in small controllers or mixins:

- selection and roving tabindex for tabs and menus
- overlay stack and focus restoration for dialogs and drawers
- theme persistence and color-mode sync for theme controls
- native-control proxying for wrapper-first form surfaces

V1 form components should remain wrapper-first. They should proxy to native controls and not require form-associated custom elements unless a later pass makes that a hard requirement.

## Shadow DOM Policy

V1 should prefer light DOM for wrapper-first surfaces, but it may use open Shadow DOM for shell and interaction-heavy widgets when encapsulation materially improves correctness or maintainability.

Reasoning:

- the current kit is CSS-first and depends on shared global tokens and class hooks
- light DOM keeps the existing CSS layer usable without duplicating styles inside shadow trees
- light DOM makes parity easier to verify against the current reference pages
- open Shadow DOM gives the shell widgets a stable internal structure when that reduces implementation risk
- closed shadow roots are not a good fit because they make parity verification and theming harder

Shadow DOM candidates in v1 are the components where a stable internal structure actually helps:

- app shell
- card
- navbar
- tabs
- dialog
- drawer
- theme switcher

Wrapper-first form, feedback, and data surfaces should remain light DOM unless a later pass proves that shadow encapsulation is worth the styling cost.

Any shadowed component must expose a stable part vocabulary that mirrors the same semantic structure the CSS kit already documents. Light DOM components do not need that extra layer.

Reserved part names for any future shadowed component:

- `surface`
- `header`
- `body`
- `footer`
- `panel`
- `item`
- `label`
- `value`
- `icon`
- `toggle`
- `summary`
- `content`
- `backdrop`
- `close`

## Naming And Registry Strategy

Use the [`inc-`](../../../reference.html) prefix for all public custom elements.

Naming rules:

- prefer the same noun the CSS family already uses when that noun is stable and clear
- use singular element names for single surfaces
- keep the public tag name aligned with the existing CSS vocabulary where possible
- avoid introducing new nouns when the current family name already expresses the contract

Recommended v1 tag family:

- [`inc-app-shell`](../../../reference.html)
- [`inc-page`](../../../reference.html)
- [`inc-page-header`](../../../reference.html)
- [`inc-card`](../../../reference.html)
- [`inc-summary-overview`](../../../reference.html)
- [`inc-summary-block`](../../../reference.html)
- [`inc-footer-bar`](../../../reference.html)
- [`inc-navbar`](../../../reference.html)
- [`inc-tabs`](../../../reference.html)
- [`inc-user-menu`](../../../reference.html)
- [`inc-field`](../../../reference.html)
- [`inc-input-group`](../../../reference.html)
- [`inc-choice-group`](../../../reference.html)
- [`inc-readonly-field`](../../../reference.html)
- [`inc-validation-summary`](../../../reference.html)
- [`inc-state-panel`](../../../reference.html)
- [`inc-live-region`](../../../reference.html)
- [`inc-auto-refresh`](../../../reference.html)
- [`inc-theme-switcher`](../../../reference.html)
- [`inc-dialog`](../../../reference.html)
- [`inc-drawer`](../../../reference.html)
- [`inc-disclosure`](../../../reference.html)

Registration strategy:

- define components through one idempotent registry function, preferably `defineAll()`
- keep the registry in the Web Component entrypoint, not the CSS/helper root entrypoint
- auto-register only from the dedicated `web-components` entrypoint
- allow bundler consumers to call an explicit `registerIncWebComponents()` helper if they want control over when registration occurs
- guard every definition with `customElements.get(name)` so repeated imports do not fail

This keeps the Web Component runtime opt-in and prevents the root package from paying for the component registry unless a consumer asks for it.

## Styling And Token Reuse

The styling rule is simple: reuse the existing design language before adding anything new.

The Web Component layer should:

- consume the current [`--inc-*`](../../../reference.html) token family
- continue to rely on Bootstrap-derived `--bs-*` variables where the CSS kit already does
- emit the current BEM-style class structure in light DOM where that makes the existing styles apply naturally
- for shadowed components, expose the same semantics through CSS parts and custom properties instead of inventing a second theme system
- add component-local custom properties only when a surface needs a narrow host-level parameter that the existing token system does not cover

Component-local custom properties should follow the same prefix and naming discipline:

- [`--inc-<component>-<token>`](../../../reference.html)
- for example [`--inc-dialog-width`](../../../reference.html), [`--inc-drawer-width`](../../../reference.html), [`--inc-tabs-gap`](../../../reference.html), [`--inc-field-gap`](../../../reference.html)

CSS parts are only needed on the shadowed v1 widgets. The reserved names above are the public part vocabulary for those components, not a new design language.

## Helper Reuse And Interoperability

The current helper logic is already the right starting point for several v1 behaviors. The Web Component runtime should reuse that logic instead of rewriting it.

Shared internal utilities should cover:

- theme mode persistence and synchronization
- focus trap and focus restoration
- roving tabindex and arrow-key navigation
- open/close and dismiss semantics
- target resolution for trigger-based interactions
- auto-refresh countdown and pause/resume state

The existing helper entrypoint should remain available for current consumers. The new Web Component entrypoint should share the same internal utility layer so the two public surfaces cannot drift into subtly different behavior.

Compatibility note:

- keep current helper-visible events and root state hooks where they already exist
- prefer native DOM events for standard control behavior
- use namespaced custom events only when no native event fits the contract or when compatibility with the current helper surface matters

## Packaging And Entrypoints

Recommendation: ship one package with layered entrypoints.

The package should keep the current CSS-first root entrypoint intact and add a separate Web Component entrypoint beside it.

Suggested source shape:

```text
src/
  inc-design-language.scss
  inc-design-language.js
  web-components/
    index.js
    registry.js
    base-element.js
    controllers/
      focus.js
      overlay.js
      selection.js
      theme.js
    components/
      app-shell.js
      page.js
      navbar.js
      tabs.js
      user-menu.js
      field.js
      input-group.js
      choice-group.js
      readonly-field.js
      validation-summary.js
      state-panel.js
      live-region.js
      auto-refresh.js
      theme-switcher.js
      dialog.js
      drawer.js
      disclosure.js
```

The package export shape should follow the same layered model:

- root `.` remains the CSS-first/helper surface
- `./web-components` exposes the optional Web Component runtime
- the Web Component runtime should not be pulled in by default from the root export

Why layered entrypoints instead of a second package:

- one release train
- one token system
- one documentation set
- one compatibility story for current CSS consumers
- no duplicated branding or package maintenance

This is the cleanest fit for a CSS-first library with an additive browser-native layer.

## Component Family Model

### Layouts And Shells

These are wrapper components, with the shell-heavy ones allowed to use open Shadow DOM when a stable internal structure helps.

Recommended public tags:

- [`inc-app-shell`](../../../reference.html)
- [`inc-page`](../../../reference.html)
- [`inc-page-header`](../../../reference.html)
- [`inc-card`](../../../reference.html)
- [`inc-summary-overview`](../../../reference.html)
- [`inc-summary-block`](../../../reference.html)
- [`inc-footer-bar`](../../../reference.html)

Contract notes:

- use named slots for structural regions such as header, breadcrumbs, body, actions, and footer
- avoid hard-coded templates that prevent composition
- keep the host semantic and the content composable
- prefer light DOM for page-level wrappers such as [`inc-page`](../../../reference.html), [`inc-page-header`](../../../reference.html), [`inc-summary-overview`](../../../reference.html), [`inc-summary-block`](../../../reference.html), and [`inc-footer-bar`](../../../reference.html)
- allow open Shadow DOM for the shell surfaces where a stable internal scaffold improves implementation safety, especially [`inc-app-shell`](../../../reference.html) and [`inc-card`](../../../reference.html)

The goal is to preserve the current shell vocabulary in a browser-native wrapper, not to invent a new page framework.

### Navigation

Navigation needs a mix of wrapper behavior and interaction management.

Recommended public tags:

- [`inc-navbar`](../../../reference.html)
- [`inc-tabs`](../../../reference.html)
- [`inc-user-menu`](../../../reference.html)

Contract notes:

- [`inc-navbar`](../../../reference.html) stays a light DOM shell with slots for brand, nav, utilities, and collapse content
- [`inc-tabs`](../../../reference.html) owns roving focus, selection state, and panel activation
- [`inc-user-menu`](../../../reference.html) owns menu toggling, keyboard dismissal, and focus restoration
- use the existing active and selected state vocabulary rather than introducing new status terms

[`inc-tabs`](../../../reference.html) is a strong open-Shadow-DOM candidate because it benefits from a stable internal tablist/panel structure.

[`inc-navbar`](../../../reference.html) can also use open Shadow DOM if the responsive shell needs a stable internal collapse scaffold.

[`inc-user-menu`](../../../reference.html) can stay light DOM as long as it continues to preserve the current focus and dismissal behavior.

### Forms And Inputs

Forms in v1 should remain native-first and wrapper-driven.

Recommended public tags:

- [`inc-field`](../../../reference.html)
- [`inc-input-group`](../../../reference.html)
- [`inc-choice-group`](../../../reference.html)
- [`inc-readonly-field`](../../../reference.html)
- [`inc-validation-summary`](../../../reference.html)

Contract notes:

- keep native controls native
- use slots for label, control, hint, feedback, prefix, and suffix
- proxy value-like state to the slotted control instead of replacing the control with a form-associated custom element
- preserve label association, help text ordering, error ordering, disabled state, and readonly state
- expose ergonomic methods only when they proxy an actual native control behavior, such as focus or validity checks

This is the strongest example of why the layer should be additive rather than replacement-oriented.

### Feedback And Status

These surfaces should stay simple and accessible.

Recommended public tags:

- [`inc-state-panel`](../../../reference.html)
- [`inc-live-region`](../../../reference.html)
- [`inc-auto-refresh`](../../../reference.html)
- [`inc-theme-switcher`](../../../reference.html)

Contract notes:

- [`inc-state-panel`](../../../reference.html) uses slots for icon, title, body, and actions and can stay light DOM
- [`inc-live-region`](../../../reference.html) is a semantic announcement wrapper, not just a styled container, and should stay light DOM
- [`inc-auto-refresh`](../../../reference.html) owns countdown and pause/resume behavior and can stay light DOM unless a later pass proves it needs a shadowed scaffold
- [`inc-theme-switcher`](../../../reference.html) owns color-mode state and keeps the current root theme contract in sync; it is the best feedback/status candidate for open Shadow DOM because it benefits from a stable summary/panel layout

Pure visual atoms such as alerts, badges, spinners, progress, meter, and loading dots remain CSS-only in v1.

### Overlays And Disclosures

These surfaces should be native-backed whenever possible.

Recommended public tags:

- [`inc-dialog`](../../../reference.html)
- [`inc-drawer`](../../../reference.html)
- [`inc-disclosure`](../../../reference.html)

Contract notes:

- prefer `<dialog>` and `<details>` as the behavioral substrate
- expose `open`, `close`, `toggle`, and `cancel` behaviors through DOM-native events where possible
- preserve focus restoration and dismissal semantics
- use slots for title, body, footer, and close actions
- prefer open Shadow DOM for [`inc-dialog`](../../../reference.html) and [`inc-drawer`](../../../reference.html) because the internal scaffold and focus handling are easier to keep stable behind a native-backed surface

Tooltip and popover remain deferred until their interaction model is explicit enough to justify a public component contract.

### Tables And Data Presentation

This family stays CSS-only in v1.

Current table, list, vertical-list, key-value, timeline, bulk-bar, filter-bar, and file-review surfaces remain on the class API until a later pass defines a bounded component contract.

This is intentional. The current CSS kit already handles these surfaces well, and turning them into custom elements too early would create a data-grid abstraction the product has not asked for.

### Utility Controls And Theme Controls

Theme control is the only utility-like surface that should become a v1 Web Component.

Recommended public tag:

- [`inc-theme-switcher`](../../../reference.html)

Everything else in the utility family remains CSS-only in v1:

- button and action atoms
- typography helpers
- spacing utilities
- layout utilities
- close-button atoms

That keeps the layer CSS-first instead of turning every atomic class into a component.

## Docs, Examples, And Tests

The repository should document the two surfaces side by side, not blend them into one ambiguous story.

Recommended doc shape:

- keep [`reference.html`](../../../reference.html) as the canonical CSS copy/paste catalog
- add a dedicated Web Component showcase page or a dedicated WC section in the demo hub
- add a short Web Components section to [`README.md`](../../../README.md) after the CSS-first quick start
- keep the public story explicit that CSS classes remain the primary surface and the Web Component layer is optional
- update [`LLMS.txt`](../../../LLMS.txt) and agent guidance so tooling understands the layered model

Recommended verification shape:

- browser matrix across Chromium, Firefox, and WebKit
- desktop and narrow viewport coverage
- keyboard, focus, and dismissal coverage for navigation and overlays
- accessibility assertions for roles, labels, busy state, and announcements
- theming checks for light, dark, and system mode
- packaging checks that confirm the Web Component layer lives in the same package and remains opt-in
- example-page coverage for every v1 family

## Rejected Alternatives

### A second package

Rejected because it would split the design language, docs, and release train without solving a technical problem.

### Shadow DOM everywhere

Rejected because it would break the current styling model and make parity with the CSS-first surface harder to verify.

### Form-associated custom elements for every form control

Rejected for v1 because it is unnecessary for wrapper-first parity and would add complexity without improving the current kit’s core contract.

### Turning tables and utilities into custom elements

Rejected because those families are already well served by the CSS layer and do not need a runtime contract in v1.

### Auto-registering Web Components from the root export

Rejected because CSS-only consumers should not incur the runtime cost of the optional layer.

## Risks And Invariants

The design only works if the following remain true:

- the CSS kit stays canonical
- the Web Component layer stays additive
- light DOM remains the default
- current tokens and helper behavior continue to work
- native controls remain native wherever possible
- deferred surfaces do not leak partial runtime contracts into v1

The biggest delivery risk is parity drift: a component layer that looks aligned but subtly changes keyboard, focus, theming, or validation behavior. That is why the shared helper utilities, DOM-visible state reflection, and browser-level verification are part of the architecture instead of afterthoughts.
