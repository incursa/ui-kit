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
The UI kit MUST provide `inc-form`, `inc-form--inline`, `inc-form--wrap`, `inc-form--nowrap`, `inc-form--responsive`, and `inc-form--gap-xs`, `inc-form--gap-sm`, `inc-form--gap-md`, `inc-form--gap-lg`, and `inc-form--gap-xl` for arranging related controls while preserving control meaning and tab order during reflow.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0002 Provide grouped field containers
The form shell MUST provide `inc-form__group`, `inc-form__field`, `inc-form__field--grow`, `inc-form__field--compact`, `inc-form__field--stack`, `inc-form__field--end`, `inc-form__fieldset`, and `inc-form__legend` for grouping related form content with fieldset and legend source-order association.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0003 Provide label and hint surfaces
The form shell MUST provide `inc-form__label`, `inc-form__label--required`, `inc-form__text`, `inc-form__hint`, `inc-form-text`, `inc-form-text--small`, and `inc-form-text--help` for field labeling, guidance, and helper text while keeping required markers visual indicators rather than the only requiredness signal.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0004 Provide field alignment modifiers
The form shell MUST provide `inc-form__field--grow`, `inc-form__field--compact`, `inc-form__field--stack`, and `inc-form__field--end` for field-level alignment that changes placement without obscuring labels or helper text.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0005 Provide floating-label shells
The form shell MUST provide `inc-form__floating` for floating-label layouts while keeping floating labels readable when a control contains user-entered content.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0006 Preserve accessible label and hint order
The form shell MUST keep `inc-form__label`, `inc-form__hint`, `inc-form__text`, `inc-form__fieldset`, and `inc-form__legend` aligned with the controls they describe so the visual order matches the reading order and group names remain intelligible to assistive technologies.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FRM-0007 Comply with shared naming, token, and accessibility rules
Form layout surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-CNV-0001` through `REQ-UIK-CNV-0006`, `REQ-UIK-TOK-0002`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0002`, and `REQ-UIK-A11Y-0006`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`
