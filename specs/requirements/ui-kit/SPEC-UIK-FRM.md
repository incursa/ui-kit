---
artifact_id: SPEC-UIK-FRM
artifact_type: specification
title: Form Layout and Grouping
domain: ui-kit
capability: form-layout-and-grouping
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - forms
  - layout
---

# SPEC-UIK-FRM - Form Layout and Grouping

## Purpose

Define the structural form shell used to arrange related controls in dense workflows.

## Scope

This specification covers form containers, field grouping, labels, helper text, floating-label shells, and layout modifiers. It does not define the individual input controls themselves.

## Context

The UI kit separates form structure from the control widgets so the layout shell can stay stable even when specific inputs vary.

## REQ-UIK-FRM-0001 Provide dense form layout variants
The UI kit MUST provide [`inc-form`](../../../reference.html), [`inc-form--inline`](../../../reference.html), [`inc-form--wrap`](../../../reference.html), [`inc-form--nowrap`](../../../reference.html), [`inc-form--responsive`](../../../reference.html), and [`inc-form--gap-xs`](../../../reference.html), [`inc-form--gap-sm`](../../../reference.html), [`inc-form--gap-md`](../../../reference.html), [`inc-form--gap-lg`](../../../reference.html), and [`inc-form--gap-xl`](../../../reference.html) for arranging related controls while preserving control meaning and tab order during reflow.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0002 Provide grouped field containers
The form shell MUST provide [`inc-form__group`](../../../reference.html), [`inc-form__field`](../../../reference.html), [`inc-form__field--grow`](../../../reference.html), [`inc-form__field--compact`](../../../reference.html), [`inc-form__field--stack`](../../../reference.html), [`inc-form__field--end`](../../../reference.html), [`inc-form__fieldset`](../../../reference.html), and [`inc-form__legend`](../../../reference.html) for grouping related form content with fieldset and legend source-order association.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0003 Provide label and hint surfaces
The form shell MUST provide [`inc-form__label`](../../../reference.html), [`inc-form__label--required`](../../../reference.html), [`inc-form__text`](../../../reference.html), [`inc-form__hint`](../../../reference.html), [`inc-form-text`](../../../reference.html), [`inc-form-text--small`](../../../reference.html), and [`inc-form-text--help`](../../../reference.html) for field labeling, guidance, and helper text while keeping required markers visual indicators rather than the only requiredness signal.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0004 Provide field alignment modifiers
The form shell MUST provide [`inc-form__field--grow`](../../../reference.html), [`inc-form__field--compact`](../../../reference.html), [`inc-form__field--stack`](../../../reference.html), and [`inc-form__field--end`](../../../reference.html) for field-level alignment that changes placement without obscuring labels or helper text.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0005 Provide floating-label shells
The form shell MUST provide [`inc-form__floating`](../../../reference.html) for floating-label layouts while keeping floating labels readable when a control contains user-entered content.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0006 Preserve accessible label and hint order
The form shell MUST keep [`inc-form__label`](../../../reference.html), [`inc-form__hint`](../../../reference.html), [`inc-form__text`](../../../reference.html), [`inc-form__fieldset`](../../../reference.html), and [`inc-form__legend`](../../../reference.html) aligned with the controls they describe so the visual order matches the reading order and group names remain intelligible to assistive technologies.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FRM-0007 Comply with shared naming, token, and accessibility rules
Form layout surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered) through [`REQ-UIK-CNV-0006`](SPEC-UIK-CNV.md#req-uik-cnv-0006-allow-mixed-public-surfaces), [`REQ-UIK-TOK-0002`](SPEC-UIK-TOK.md#req-uik-tok-0002-expose-the-public-typography-token-family), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), and [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
