---
artifact_id: SPEC-UIK-A11Y
artifact_type: specification
title: Accessibility Baseline and Semantic Behavior
domain: ui-kit
capability: accessibility-baseline
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - accessibility
  - semantics
  - behavior
---

# SPEC-UIK-A11Y - Accessibility Baseline and Semantic Behavior

## Purpose

Define the accessibility obligations that apply across the UI kit surface.

## Scope

This specification covers keyboard use, focus visibility, labels, disabled-state expectations, live status regions, overlay focus management, and the narrow-screen usability baseline for dense admin-style interfaces.

## Context

Many UI kit surfaces are reused inside data-heavy workflows, so the shared accessibility contract needs to stay separate from component-specific styling rules and explicitly cover focus, labels, disabled state, live status, and narrow-screen behavior.

## REQ-UIK-A11Y-0001 Keep interactive surfaces keyboard operable and visibly focused
Interactive public surfaces MUST remain keyboard operable while preserving a visible focus indicator.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-A11Y-0002 Keep form and control associations intact
Form and control surfaces MUST preserve accessible names, label associations, and hint or feedback order.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-A11Y-0003 Announce shared status surfaces through semantics rather than styling alone
Public surfaces that announce progress, loading, or workflow status MUST use an appropriate semantic or live-region pattern instead of relying on visual styling alone.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`src/inc-design-language.js`](../../../reference.html)
  - `states.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-A11Y-0004 Restore focus after overlay dismissal
Overlay and disclosure surfaces MUST restore focus to the originating trigger when they are dismissed.

Trace:
- Code Refs:
  - [`src/inc-design-language.js`](../../../reference.html)
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-A11Y-0005 Keep dense public surfaces usable on narrow screens
Dense public surfaces SHOULD remain usable on narrow screens without requiring hover-only interaction.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `demo.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-A11Y-0006 Keep disabled controls perceivable and noninteractive
Interactive public surfaces MUST keep disabled controls perceivable as disabled and noninteractive, whether the disabled state comes from native attributes or a helper-managed state hook.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
    - `states.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
