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

This specification covers the public button base class, semantic and outline variants, density and text-flow modifiers, grouped action shells, the close-button helper, the in-progress state, and the authoring rule for button versus anchor markup.

## Context

Buttons are the primary action primitive in this kit and appear in forms, tables, nav surfaces, overlays, and workflow pages.

Buttons stay visually consistent whether authors use native `<button>` or `<a>` markup, but the underlying element still needs to match the action intent.

## REQ-UIK-BTN-0001 Provide a base button primitive
The UI kit MUST provide `inc-btn` as the base class for actionable `button` and `a` markup while keeping the underlying button or link semantics intact and complying with `REQ-UIK-STD-0001`, `REQ-UIK-CNV-0001`, and `REQ-UIK-A11Y-0001`.

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
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0002 Provide semantic action variants
The button surface MUST provide `inc-btn--primary`, `inc-btn--secondary`, `inc-btn--success`, `inc-btn--danger`, `inc-btn--warning`, `inc-btn--info`, `inc-btn--link`, `inc-btn--outline-primary`, `inc-btn--outline-secondary`, `inc-btn--outline-success`, `inc-btn--outline-danger`, `inc-btn--outline-warning`, and `inc-btn--outline-info` modifiers to express action emphasis using the shared color families defined in `REQ-UIK-TOK-0003`, the shared surface and text tokens defined in `REQ-UIK-TOK-0004`, and the modifier pattern in `REQ-UIK-CNV-0005`.

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
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0003 Provide compact size variants
The button surface MUST provide `inc-btn--sm`, `inc-btn--lg`, and `inc-btn--micro` modifiers for dense workflows while complying with `REQ-UIK-CNV-0002` and `REQ-UIK-TOK-0008`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0004 Provide a no-wrap variant
The button surface MUST provide `inc-btn--nowrap` to keep labels on one line and clip overflow instead of reflowing the control.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0005 Provide grouped action shells
The UI kit MUST provide `inc-button-group`, `inc-button-group--sm`, `inc-button-group--lg`, `inc-button-group--micro`, and `inc-button-toolbar` for compact action clusters that collapse shared borders while keeping each action reachable.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0006 Support an in-progress state
The button surface MUST provide `is-loading` on `inc-btn` so the control indicates asynchronous work without changing layout, while suppressing pointer activation, keeping an accessible label in markup, and using the shared loading helper surfaces defined in `REQ-UIK-FDBK-0004` while complying with `REQ-UIK-CNV-0004`.

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
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0007 Preserve disabled and focus-visible states
The button surface MUST preserve disabled, hover, active, and focus-visible states on `inc-btn` and `inc-close-button`, with disabled buttons remaining noninteractive and readable while complying with `REQ-UIK-A11Y-0006`.

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

## REQ-UIK-BTN-0008 Preserve accessible close actions
The button surface MUST provide `inc-close-button` and `inc-close-button--white` as icon-sized dismissal controls with an accessible name in markup even when no visible text label is rendered.

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

## REQ-UIK-BTN-0009 Comply with shared foundation rules
Button surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-CNV-0001` through `REQ-UIK-CNV-0006`, `REQ-UIK-TOK-0002` through `REQ-UIK-TOK-0008`, `REQ-UIK-A11Y-0001`, and `REQ-UIK-A11Y-0006`.

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

## REQ-UIK-BTN-0010 Keep button and anchor presentations equivalent
The `inc-btn` surface MUST render the same visual treatment on native `<button>` and `<a>` markup when the same modifier classes are applied.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-BTN-0011 Prefer semantic native elements by action intent
Authors SHOULD use native `<button>` for in-place actions and native `<a>` for navigation targets when applying `inc-btn`.

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
