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
The UI kit MUST provide `details.inc-disclosure`, `inc-disclosure-set`, `inc-disclosure__summary`, `inc-disclosure__title`, `inc-disclosure__meta`, `inc-disclosure__content`, `details.inc-native-menu`, `inc-native-menu--block`, `inc-native-menu--navbar`, `inc-native-menu__summary`, `inc-native-menu__panel`, `inc-native-menu__header`, `inc-native-menu__item`, and `inc-native-menu__section-title` as native browser-controlled surfaces for expandable content and menus that rely on native open/close behavior rather than JS-emulated dialog logic.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0002 Provide native dialog surfaces
The UI kit MUST provide `dialog.inc-native-dialog`, `dialog.inc-native-dialog--drawer`, `inc-native-dialog__surface`, `inc-native-dialog__header`, `inc-native-dialog__title`, `inc-native-dialog__body`, `inc-native-dialog__footer`, and `inc-native-dialog__close` for browser-native modal and drawer workflows that keep the title, body, footer, and close control visible inside the native dialog surface.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0003 Provide helper-managed accordion and collapse surfaces
The UI kit MUST provide `inc-accordion`, `inc-accordion__item`, `inc-accordion__header`, `inc-accordion__button`, `inc-accordion__collapse`, `inc-accordion__body`, and `inc-collapse` for helper-managed expandable content when native disclosure is not used with collapsed content hidden until the associated trigger expands it.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0004 Provide helper-managed modal surfaces
The UI kit MUST provide `inc-modal`, `inc-modal__backdrop`, `inc-modal__dialog`, `inc-modal__dialog--sm`, `inc-modal__dialog--lg`, `inc-modal__dialog--xl`, `inc-modal__dialog--fullscreen`, `inc-modal__content`, `inc-modal__header`, `inc-modal__title`, `inc-modal__body`, `inc-modal__footer`, `inc-modal__close`, and `body.inc-modal-open` for legacy or Bootstrap-like modal workflows that are not implemented with native `<dialog>` while opening above a backdrop, suppressing background interaction, and keeping their footprint stable across size variants.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0005 Provide helper-managed offcanvas surfaces
The UI kit MUST provide `inc-offcanvas`, `inc-offcanvas-start`, `inc-offcanvas-end`, `inc-offcanvas-top`, `inc-offcanvas-bottom`, `inc-offcanvas-backdrop`, `inc-offcanvas-header`, `inc-offcanvas-title`, `inc-offcanvas-body`, and `body.inc-offcanvas-open` for side-panel workflows that present as side sheets with a dismissible backdrop and visible open/closed body state.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0006 Provide drawer surfaces
The overlay surface MUST provide `inc-drawer`, `inc-drawer__header`, `inc-drawer__body`, and `inc-drawer__footer` for persistent side-drawer workflows that keep the three regions visually separated.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `data-grid-advanced.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0007 Provide contextual floating content surfaces
The overlay surface MUST provide `inc-dropdown`, `inc-dropdown__toggle`, `inc-dropdown__menu`, `inc-dropdown__menu--dark`, `inc-dropdown__menu--end`, `inc-dropdown__item`, `inc-dropdown__divider`, `inc-dropdown__header`, `inc-dropdown-actions`, `inc-dropdown-menu-actions`, `inc-tooltip`, `inc-tooltip__inner`, `inc-popover`, `inc-popover-header`, and `inc-popover-body` primitives for contextual auxiliary content that stay visually anchored to their trigger without covering unrelated content by default.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-OVL-0008 Comply with shared naming, accessibility, and interaction rules
Overlay and disclosure surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-A11Y-0001`, `REQ-UIK-A11Y-0004`, `REQ-UIK-INT-0001`, `REQ-UIK-INT-0002`, `REQ-UIK-INT-0004`, and `REQ-UIK-INT-0007`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `src/inc-design-language.js`
  - `reference.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`
