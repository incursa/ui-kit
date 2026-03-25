---
artifact_id: SPEC-UIK-INT
artifact_type: specification
title: Interaction Helper Contract
domain: ui-kit
capability: interaction-helper-contract
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - interaction
  - javascript
---

# SPEC-UIK-INT - Interaction Helper Contract

## Purpose

Define the behavior of the optional vanilla-JS helper shipped with the UI kit.

## Scope

This specification covers the helper-managed state transitions for menus, tabs, collapse, modal, offcanvas, and auto-refresh controls, plus the public launch hook used to open native `<dialog>` surfaces. Native `<details>` workflows are handled by the browser, and native `<dialog>` behavior remains browser-native after launch.

## Context

Most of the kit is CSS-only, but the shipped helper gives the design language a small state layer for the handful of primitives that still need it. Native browser primitives are preferred whenever the platform already provides the behavior, and the dialog launch hook exists only to open the native element rather than emulate one.

## REQ-UIK-INT-0001 Recognize helper-managed toggle triggers
The helper MUST recognize [`data-inc-toggle="menu"`](../../../src/inc-design-language.js), [`data-inc-toggle="tab"`](../../../src/inc-design-language.js), [`data-inc-toggle="collapse"`](../../../src/inc-design-language.js), [`data-inc-toggle="modal"`](../../../src/inc-design-language.js), and [`data-inc-toggle="offcanvas"`](../../../src/inc-design-language.js) triggers while leaving native `<details>` behavior to the browser.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0002 Resolve helper targets consistently
The helper MUST resolve targets from [`data-inc-target`](../../../src/inc-design-language.js), `href`, or `aria-controls` when a trigger references a target surface while ignoring malformed or missing targets without throwing.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0003 Synchronize helper-managed state
The helper MUST synchronize `aria-expanded`, `aria-selected`, `active`, `show`, `hidden`, `collapsed`, and `aria-hidden` states for the supported toggle surfaces.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0004 Support dismiss and focus-restoration behavior
The helper MUST support [`data-inc-dismiss`](../../../src/inc-design-language.js) triggers for modal and offcanvas surfaces and restore focus to the invoking control when possible, while trapping focus inside open overlays.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0005 Support auto-refresh toggle controls
The helper SHOULD support auto-refresh widgets exposed with [`data-inc-auto-refresh`](../../../src/inc-design-language.js) and [`data-inc-action="auto-refresh-toggle"`](../../../src/inc-design-language.js) hooks while keeping the toggle state reflected in `aria-pressed` and visible status text sourced from [`data-inc-refresh-seconds`](../../../src/inc-design-language.js), [`data-inc-refresh-label`](../../../src/inc-design-language.js), [`data-inc-refresh-loading-label`](../../../src/inc-design-language.js), [`data-inc-refresh-paused-label`](../../../src/inc-design-language.js), [`data-inc-refresh-pause-action-label`](../../../src/inc-design-language.js), and [`data-inc-refresh-resume-action-label`](../../../src/inc-design-language.js).

Trace:
  - Code Refs:
    - [`src/inc-design-language.js`](../../../reference.html)
    - `reference.html`
    - `states.html`
    - `demo.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0006 Support keyboard navigation for menus and tabs
The helper MUST support arrow-key, Home, and End navigation for menu and tab toggle sets while moving focus to the expected item or pane when navigation changes.

Trace:
  - Code Refs:
    - [`src/inc-design-language.js`](../../../reference.html)
    - `reference.html`
    - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0007 Support helper-managed dropdown menus
The helper MUST manage [`data-inc-toggle="menu"`](../../../src/inc-design-language.js) triggers for [`inc-dropdown__menu`](../../../reference.html) surfaces by syncing `aria-expanded` and `aria-controls`, closing other open menus when a new menu opens, restoring focus to the trigger when the menu closes, and supporting ArrowDown, ArrowUp, Home, End, and Escape navigation within the menu.

Trace:
  - Code Refs:
    - [`src/inc-design-language.js`](../../../reference.html)
    - `reference.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0008 Comply with shared naming and accessibility rules
The helper MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-STD-0002`](SPEC-UIK-STD.md#req-uik-std-0002-allow-compatibility-aliases), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), [`REQ-UIK-A11Y-0004`](SPEC-UIK-A11Y.md#req-uik-a11y-0004-restore-focus-after-overlay-dismissal), and [`REQ-UIK-A11Y-0005`](SPEC-UIK-A11Y.md#req-uik-a11y-0005-keep-dense-public-surfaces-usable-on-narrow-screens).

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `overlay-workflows.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INT-0009 Support native dialog open hooks
The helper MUST recognize [`data-inc-native-dialog-open`](../../../src/inc-design-language.js) triggers and open the referenced native `<dialog>` surface without replacing the dialog's native close, backdrop, or focus behavior.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `native-patterns.html`
  - [`dist/inc-design-language.js`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
