---
artifact_id: SPEC-UIK-INP
artifact_type: specification
title: Editable Form Controls
domain: ui-kit
capability: editable-form-controls
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - inputs
  - editable
  - text-entry
---

# SPEC-UIK-INP - Editable Form Controls

## Purpose

Define the editable form-control surfaces used by the UI kit.

## Scope

This specification covers editable `input` and `textarea` controls, the density and attention modifiers that apply to them, and the native-editing behaviors that remain intact on the underlying element. The surface is intended for the editable form-field family rather than text entry alone. Floating-label wrappers are owned by [`SPEC-UIK-FRM`](SPEC-UIK-FRM.md), and the remaining native form-field families are covered by [`SPEC-UIK-SEL`](SPEC-UIK-SEL.md), [`SPEC-UIK-CHO`](SPEC-UIK-CHO.md), and [`SPEC-UIK-BTN`](SPEC-UIK-BTN.md).

## Context

Editable form controls are shared across search forms, inline editors, workflow dialogs, and native picker-style fields, so they need one stable public class surface even when the native input type differs. The shipped examples already apply [`inc-form__control`](../../../reference.html) to text, search, email, date, and file inputs, so this pass canonizes the broader editable-control matrix instead of leaving it example-only.

## REQ-UIK-INP-0001 Provide the base editable-control surface
The UI kit MUST provide [`inc-form__control`](../../../reference.html) as the base class for native editable `input` and `textarea` controls, including the broader editable input types shown in the shipped examples, while keeping native editing semantics intact and complying with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0002 Provide density and inline-growth variants
The editable-control surface MUST provide [`inc-form__control--sm`](../../../reference.html), [`inc-form__control--lg`](../../../reference.html), [`inc-form__control--micro`](../../../reference.html), and [`inc-form__control--expand`](../../../reference.html) modifiers for dense inline compositions while complying with [`REQ-UIK-CNV-0002`](SPEC-UIK-CNV.md#req-uik-cnv-0002-reuse-density-modifier-names), [`REQ-UIK-CNV-0003`](SPEC-UIK-CNV.md#req-uik-cnv-0003-reuse-inline-expansion-modifiers), and [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0003 Provide attention-state modifiers
The editable-control surface MUST provide [`inc-form__control--warning`](../../../reference.html) and [`inc-form__control--error`](../../../reference.html) modifiers for non-validity emphasis using the shared color families defined in [`REQ-UIK-TOK-0003`](SPEC-UIK-TOK.md#req-uik-tok-0003-expose-the-public-color-scales), while keeping validity styling separate from those attention states and using the shared hook vocabulary defined in [`REQ-UIK-VAL-0003`](SPEC-UIK-VAL.md#req-uik-val-0003-provide-shared-validity-hook-vocabulary) and respecting [`REQ-UIK-CNV-0005`](SPEC-UIK-CNV.md#req-uik-cnv-0005-express-control-emphasis-as-modifiers).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0004 Preserve disabled and readonly semantics
The editable-control surface MUST preserve native disabled and readonly behavior for [`inc-form__control`](../../../reference.html) surfaces, with disabled controls remaining noninteractive and readonly controls remaining perceivable as readonly while still allowing browser-supported selection or copy behavior and complying with [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0005 Preserve native browser affordances
The editable-control surface MUST preserve native browser affordances for selection, copy and paste, autocomplete, spellcheck, and platform-specific widgets or pickers on specialized input types already styled with [`inc-form__control`](../../../reference.html).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0006 Preserve mobile keyboard behavior
The editable-control surface MUST keep the declared input type or equivalent input mode intact so mobile browsers can present the appropriate virtual keyboard and editing behavior.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0007 Comply with shared foundation rules
Editable-control surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered) through [`REQ-UIK-CNV-0006`](SPEC-UIK-CNV.md#req-uik-cnv-0006-allow-mixed-public-surfaces), [`REQ-UIK-TOK-0002`](SPEC-UIK-TOK.md#req-uik-tok-0002-expose-the-public-typography-token-family) through [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive), and [`REQ-UIK-FRM-0002`](SPEC-UIK-FRM.md#req-uik-frm-0002-provide-grouped-field-containers) through [`REQ-UIK-FRM-0006`](SPEC-UIK-FRM.md#req-uik-frm-0006-preserve-accessible-label-and-hint-order).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-INP-0008 Provide editable-control validity styling
The editable-control surface MUST provide validity styling for [`inc-form__control`](../../../reference.html) states, including [`is-valid`](../../../reference.html), [`is-invalid`](../../../reference.html), and `aria-invalid`, with adjacent feedback and helper text remaining readable and the styling staying aligned to [`REQ-UIK-VAL-0003`](SPEC-UIK-VAL.md#req-uik-val-0003-provide-shared-validity-hook-vocabulary) and [`REQ-UIK-VAL-0005`](SPEC-UIK-VAL.md#req-uik-val-0005-announce-validation-feedback-accessibly).

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `forms-and-validation.html`
    - `demo.html`
    - `overlay-workflows.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
    - `states.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
