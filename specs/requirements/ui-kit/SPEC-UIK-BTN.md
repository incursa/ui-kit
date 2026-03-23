---
artifact_id: SPEC-UIK-BTN
artifact_type: specification
title: Button and Action Controls
domain: ui-kit
capability: buttons-and-actions
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - buttons
  - actions
---

# SPEC-UIK-BTN - Button and Action Controls

## Purpose

Define the reusable button surface for action-oriented UI in the UI kit.

## Scope

This specification covers the public button base class, semantic and outline variants, compact sizes, grouped action patterns, the close-button helper, and the in-progress button state.

## Context

Buttons are the primary action primitive in this kit and appear in forms, tables, nav surfaces, overlays, and workflow pages.

## REQ-UIK-BTN-0001 Provide a base button primitive
The UI kit MUST provide `inc-btn` as the base class for button controls used with actionable button or link semantics in markup rather than as a decorative wrapper.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0002 Provide semantic action variants
The button primitive MUST provide semantic modifiers for primary, secondary, success, danger, warning, info, light, dark, link, outline-primary, outline-secondary, outline-success, outline-danger, outline-warning, outline-info, outline-light, and outline-dark actions that communicate action hierarchy through visible emphasis rather than changing control meaning.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0003 Provide compact size variants
The button primitive MUST provide `inc-btn--sm`, `inc-btn--lg`, `inc-btn--micro`, and `inc-btn--nowrap` variants for dense workflows that only change density and text flow rather than the underlying button behavior.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
  - `forms-and-validation.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0004 Support grouped action clusters
The button surface MUST provide `inc-button-group`, `inc-button-group--sm`, `inc-button-group--lg`, `inc-button-group--micro`, and `inc-button-toolbar` for compact clusters of related actions, with grouped buttons visually collapsing shared borders while keeping each action reachable.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0005 Support an in-progress state
The button surface MUST provide the `is-loading` state on `inc-btn` so the control can indicate in-progress work without changing the surrounding layout while suppressing pointer activation, preserving the button footprint, and keeping a readable accessible label in markup.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `states.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
    - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0006 Preserve disabled and focus-visible states
The button surface MUST expose disabled, hover, active, and focus-visible states for `inc-btn` and `inc-close-button`, with disabled buttons suppressing pointer activation while remaining readable in the layout.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `states.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
  - Verified By:
    - `VER-UIK-0001`

## REQ-UIK-BTN-0007 Preserve accessible close actions
The button surface MUST keep `inc-close-button` and `inc-close-button--white` as icon-sized dismissal controls with an accessible name in markup even when no visible text label is rendered.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `states.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
  - Verified By:
    - `VER-UIK-0001`

## REQ-UIK-BTN-0008 Comply with shared naming, token, and accessibility rules
Button surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0003`, `REQ-UIK-TOK-0004`, and `REQ-UIK-A11Y-0001`.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `states.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
    - `record-detail.html`
    - `data-grid-advanced.html`
    - `work-queue.html`
  - Verified By:
    - `VER-UIK-0001`
