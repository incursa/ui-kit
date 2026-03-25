---
artifact_id: SPEC-UIK-OVL
artifact_type: specification
title: Overlays and Disclosures
domain: ui-kit
capability: overlays-and-disclosures
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - overlays
  - disclosure
---

# SPEC-UIK-OVL - Overlays and Disclosures

## Purpose

Define the surfaces used for expandable content, menus, dialogs, and floating helper content.

## Scope

This specification covers native disclosure stacks, native menus, native dialogs, helper-managed accordion/collapse surfaces, modal and offcanvas shells, drawer surfaces, dropdowns, popovers, tooltips, and related floating content.

## Context

Native browser primitives are the preferred first choice whenever they exist. Helper-managed overlay shells remain available for compatibility workflows that cannot use a native primitive.

## REQ-UIK-OVL-0001 Provide native disclosure and menu surfaces
The UI kit MUST provide [`details.inc-disclosure`](../../../reference.html), [`inc-disclosure-set`](../../../reference.html), [`inc-disclosure__summary`](../../../reference.html), [`inc-disclosure__title`](../../../reference.html), [`inc-disclosure__meta`](../../../reference.html), [`inc-disclosure__content`](../../../reference.html), [`details.inc-native-menu`](../../../reference.html), [`inc-native-menu--block`](../../../reference.html), [`inc-native-menu--navbar`](../../../reference.html), [`inc-native-menu__summary`](../../../reference.html), [`inc-native-menu__panel`](../../../reference.html), [`inc-native-menu__header`](../../../reference.html), [`inc-native-menu__item`](../../../reference.html), and [`inc-native-menu__section-title`](../../../reference.html) as native browser-controlled surfaces for expandable content and menus that rely on native open/close behavior rather than JS-emulated dialog logic.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0002 Provide native dialog surfaces
The UI kit MUST provide [`dialog.inc-native-dialog`](../../../reference.html), [`dialog.inc-native-dialog--drawer`](../../../reference.html), [`inc-native-dialog__surface`](../../../reference.html), [`inc-native-dialog__header`](../../../reference.html), [`inc-native-dialog__title`](../../../reference.html), [`inc-native-dialog__body`](../../../reference.html), [`inc-native-dialog__footer`](../../../reference.html), and [`inc-native-dialog__close`](../../../reference.html) for browser-native modal and drawer workflows that keep the title, body, footer, and close control visible inside the native dialog surface.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0003 Provide helper-managed accordion and collapse surfaces
The UI kit MUST provide [`inc-accordion`](../../../reference.html), [`inc-accordion__item`](../../../reference.html), [`inc-accordion__header`](../../../reference.html), [`inc-accordion__button`](../../../reference.html), [`inc-accordion__collapse`](../../../reference.html), [`inc-accordion__body`](../../../reference.html), and [`inc-collapse`](../../../reference.html) for helper-managed expandable content when native disclosure is not used, with [`data-inc-accordion`](../../../src/inc-design-language.js) acting as the helper-managed grouping hook for accordion roots that coordinate mutually exclusive collapse panels.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0004 Provide helper-managed modal surfaces
The UI kit MUST provide [`inc-modal`](../../../reference.html), [`inc-modal__backdrop`](../../../reference.html), [`inc-modal__dialog`](../../../reference.html), [`inc-modal__dialog--sm`](../../../reference.html), [`inc-modal__dialog--lg`](../../../reference.html), [`inc-modal__dialog--xl`](../../../reference.html), [`inc-modal__dialog--fullscreen`](../../../reference.html), [`inc-modal__content`](../../../reference.html), [`inc-modal__header`](../../../reference.html), [`inc-modal__title`](../../../reference.html), [`inc-modal__body`](../../../reference.html), [`inc-modal__footer`](../../../reference.html), [`inc-modal__close`](../../../reference.html), and [`body.inc-modal-open`](../../../reference.html) for legacy or Bootstrap-like modal workflows that are not implemented with native `<dialog>`, while using [`data-inc-dismiss="modal"`](../../../src/inc-design-language.js) and [`data-inc-initial-focus`](../../../src/inc-design-language.js) hooks to support dismissal and initial focus placement above a backdrop.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0005 Provide helper-managed offcanvas surfaces
The UI kit MUST provide [`inc-offcanvas`](../../../reference.html), [`inc-offcanvas-start`](../../../reference.html), [`inc-offcanvas-end`](../../../reference.html), [`inc-offcanvas-top`](../../../reference.html), [`inc-offcanvas-bottom`](../../../reference.html), [`inc-offcanvas-backdrop`](../../../reference.html), [`inc-offcanvas-header`](../../../reference.html), [`inc-offcanvas-title`](../../../reference.html), [`inc-offcanvas-body`](../../../reference.html), and [`body.inc-offcanvas-open`](../../../reference.html) for side-panel workflows that present as side sheets with a dismissible backdrop and visible open/closed body state, while using [`data-inc-dismiss="offcanvas"`](../../../src/inc-design-language.js) and [`data-inc-backdrop-for`](../../../src/inc-design-language.js) hooks to support dismissal and backdrop targeting.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0006 Provide drawer surfaces
The overlay surface MUST provide [`inc-drawer`](../../../reference.html), [`inc-drawer__header`](../../../reference.html), [`inc-drawer__body`](../../../reference.html), and [`inc-drawer__footer`](../../../reference.html) for persistent side-drawer workflows that keep the three regions visually separated.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `data-grid-advanced.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0007 Provide contextual floating content surfaces
The overlay surface MUST provide [`inc-dropdown`](../../../reference.html), [`inc-dropdown__toggle`](../../../reference.html), [`inc-dropdown__menu`](../../../reference.html), [`inc-dropdown__menu--end`](../../../reference.html), [`inc-dropdown__item`](../../../reference.html), [`inc-dropdown__divider`](../../../reference.html), [`inc-dropdown__header`](../../../reference.html), [`inc-dropdown-actions`](../../../reference.html), [`inc-dropdown-menu-actions`](../../../reference.html), [`inc-tooltip`](../../../reference.html), [`inc-tooltip__inner`](../../../reference.html), [`inc-popover`](../../../reference.html), [`inc-popover-header`](../../../reference.html), and [`inc-popover-body`](../../../reference.html) primitives for contextual auxiliary content that stay visually anchored to their trigger without covering unrelated content by default.

Notes:
- [`inc-tooltip`](../../../reference.html) and [`inc-popover`](../../../reference.html) are styling shells for host-managed floating content; the package does not provide a general-purpose positioning runtime for them.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-OVL-0008 Comply with shared naming, accessibility, and interaction rules
Overlay and disclosure surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0004`](SPEC-UIK-A11Y.md#req-uik-a11y-0004-restore-focus-after-overlay-dismissal), [`REQ-UIK-INT-0001`](SPEC-UIK-INT.md#req-uik-int-0001-recognize-helper-managed-toggle-triggers), [`REQ-UIK-INT-0002`](SPEC-UIK-INT.md#req-uik-int-0002-resolve-helper-targets-consistently), [`REQ-UIK-INT-0004`](SPEC-UIK-INT.md#req-uik-int-0004-support-dismiss-and-focus-restoration-behavior), and [`REQ-UIK-INT-0007`](SPEC-UIK-INT.md#req-uik-int-0007-support-helper-managed-dropdown-menus).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
