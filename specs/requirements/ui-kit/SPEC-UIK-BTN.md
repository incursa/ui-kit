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
The UI kit MUST provide [`inc-btn`](../../../reference.html) as the base class for actionable `button` and `a` markup while keeping the underlying button or link semantics intact and complying with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0002 Provide semantic action variants
The button surface MUST provide [`inc-btn--primary`](../../../reference.html), [`inc-btn--secondary`](../../../reference.html), [`inc-btn--success`](../../../reference.html), [`inc-btn--danger`](../../../reference.html), [`inc-btn--warning`](../../../reference.html), [`inc-btn--info`](../../../reference.html), [`inc-btn--link`](../../../reference.html), [`inc-btn--outline-primary`](../../../reference.html), [`inc-btn--outline-secondary`](../../../reference.html), [`inc-btn--outline-success`](../../../reference.html), [`inc-btn--outline-danger`](../../../reference.html), [`inc-btn--outline-warning`](../../../reference.html), and [`inc-btn--outline-info`](../../../reference.html) modifiers to express action emphasis using the shared color families defined in [`REQ-UIK-TOK-0003`](SPEC-UIK-TOK.md#req-uik-tok-0003-expose-the-public-color-scales), the shared surface and text tokens defined in [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), and the modifier pattern in [`REQ-UIK-CNV-0005`](SPEC-UIK-CNV.md#req-uik-cnv-0005-express-control-emphasis-as-modifiers).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0003 Provide compact size variants
The button surface MUST provide [`inc-btn--sm`](../../../reference.html), [`inc-btn--lg`](../../../reference.html), and [`inc-btn--micro`](../../../reference.html) modifiers for dense workflows while complying with [`REQ-UIK-CNV-0002`](SPEC-UIK-CNV.md#req-uik-cnv-0002-reuse-density-modifier-names) and [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0004 Provide a no-wrap variant
The button surface MUST provide [`inc-btn--nowrap`](../../../reference.html) to keep labels on one line and clip overflow instead of reflowing the control.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0005 Provide grouped action shells
The UI kit MUST provide [`inc-button-group`](../../../reference.html), [`inc-button-group--sm`](../../../reference.html), [`inc-button-group--lg`](../../../reference.html), [`inc-button-group--micro`](../../../reference.html), and [`inc-button-toolbar`](../../../reference.html) for compact action clusters that collapse shared borders while keeping each action reachable.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0006 Support an in-progress state
The button surface MUST provide [`is-loading`](../../../reference.html) on [`inc-btn`](../../../reference.html) so the control indicates asynchronous work without changing layout, while suppressing pointer activation, keeping an accessible label in markup, and using the shared loading helper surfaces defined in [`REQ-UIK-FDBK-0004`](SPEC-UIK-FDBK.md#req-uik-fdbk-0004-provide-loading-and-spinner-surfaces) while complying with [`REQ-UIK-CNV-0004`](SPEC-UIK-CNV.md#req-uik-cnv-0004-keep-visual-state-hooks-separate-from-native-semantics).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0007 Preserve disabled and focus-visible states
The button surface MUST preserve disabled, hover, active, and focus-visible states on [`inc-btn`](../../../reference.html) and [`inc-close-button`](../../../reference.html), with disabled buttons remaining noninteractive and readable while complying with [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0008 Preserve accessible close actions
The button surface MUST provide [`inc-close-button`](../../../reference.html) and [`inc-close-button--white`](../../../reference.html) as icon-sized dismissal controls with an accessible name in markup even when no visible text label is rendered.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0009 Comply with shared foundation rules
Button surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered) through [`REQ-UIK-CNV-0006`](SPEC-UIK-CNV.md#req-uik-cnv-0006-allow-mixed-public-surfaces), [`REQ-UIK-TOK-0002`](SPEC-UIK-TOK.md#req-uik-tok-0002-expose-the-public-typography-token-family) through [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), and [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0010 Keep button and anchor presentations equivalent
The [`inc-btn`](../../../reference.html) surface MUST render the same visual treatment on native `<button>` and `<a>` markup when the same modifier classes are applied.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-BTN-0011 Prefer semantic native elements by action intent
Authors SHOULD use native `<button>` for in-place actions and native `<a>` for navigation targets when applying [`inc-btn`](../../../reference.html).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `states.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
