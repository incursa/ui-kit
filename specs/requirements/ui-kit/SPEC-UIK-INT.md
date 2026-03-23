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

This specification covers the helper-managed state transitions for menus, tabs, collapse, modal, offcanvas, and auto-refresh controls. Native `<details>` and `<dialog>` workflows are handled by the browser and are intentionally outside this helper contract.

## Context

Most of the kit is CSS-only, but the shipped helper gives the design language a small state layer for the handful of primitives that still need it. Native browser primitives are preferred whenever the platform already provides the behavior.

## REQ-UIK-INT-0001 Recognize helper-managed toggle triggers
The helper MUST recognize `data-inc-toggle="menu"`, `data-inc-toggle="tab"`, `data-inc-toggle="collapse"`, `data-inc-toggle="modal"`, and `data-inc-toggle="offcanvas"` triggers while leaving native `<details>` and `<dialog>` behavior to the browser.

Trace:
- Code Refs:
  - `src/inc-design-language.js`
  - `src/inc-design-language.scss`
  - `reference.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INT-0002 Resolve helper targets consistently
The helper MUST resolve targets from `data-inc-target`, `href`, or `aria-controls` when a trigger references a target surface while ignoring malformed or missing targets without throwing.

Trace:
- Code Refs:
  - `src/inc-design-language.js`
  - `reference.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INT-0003 Synchronize helper-managed state
The helper MUST synchronize `aria-expanded`, `aria-selected`, `active`, `show`, `hidden`, `collapsed`, and `aria-hidden` states for the supported toggle surfaces.

Trace:
- Code Refs:
  - `src/inc-design-language.js`
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INT-0004 Support dismiss and focus-restoration behavior
The helper MUST support dismiss triggers for modal and offcanvas surfaces and restore focus to the invoking control when possible, while trapping focus inside open overlays.

Trace:
- Code Refs:
  - `src/inc-design-language.js`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INT-0005 Support auto-refresh toggle controls
The helper SHOULD support auto-refresh widgets with pause and resume controls while keeping the toggle state reflected in `aria-pressed` and visible status text.

Trace:
  - Code Refs:
    - `src/inc-design-language.js`
    - `reference.html`
    - `states.html`
    - `demo.html`
  - Verified By:
    - `VER-UIK-0001`

## REQ-UIK-INT-0006 Support keyboard navigation for menus and tabs
The helper MUST support arrow-key, Home, and End navigation for menu and tab toggle sets while moving focus to the expected item or pane when navigation changes.

Trace:
  - Code Refs:
    - `src/inc-design-language.js`
    - `reference.html`
    - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INT-0007 Support helper-managed dropdown menus
The helper MUST manage `data-inc-toggle="menu"` triggers for `inc-dropdown__menu` surfaces by syncing `aria-expanded` and `aria-controls`, closing other open menus when a new menu opens, restoring focus to the trigger when the menu closes, and supporting ArrowDown, ArrowUp, Home, End, and Escape navigation within the menu.

Trace:
  - Code Refs:
    - `src/inc-design-language.js`
    - `reference.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
  - Verified By:
    - `VER-UIK-0001`

## REQ-UIK-INT-0008 Comply with shared naming and accessibility rules
The helper MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-STD-0002`, `REQ-UIK-A11Y-0001`, `REQ-UIK-A11Y-0002`, `REQ-UIK-A11Y-0004`, and `REQ-UIK-A11Y-0005`.

Trace:
- Code Refs:
  - `src/inc-design-language.js`
  - `src/inc-design-language.scss`
  - `overlay-workflows.html`
  - `reference.html`
- Verified By:
  - `VER-UIK-0001`
