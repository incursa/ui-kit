---
artifact_id: SPEC-UIK-VAL
artifact_type: specification
title: Validation and Error Feedback
domain: ui-kit
capability: validation-and-error-feedback
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - validation
  - feedback
---

# SPEC-UIK-VAL - Validation and Error Feedback

## Purpose

Define the feedback surfaces used to validate form content and summarize errors.

## Scope

This specification covers aggregated error summaries, field-level feedback, and validity state styling for editable controls.

## Context

Validation is cross-cutting, but the kit keeps the shared error-summary and feedback vocabulary together while the control-family specs own their own validity styling.

## REQ-UIK-VAL-0001 Provide an error-summary surface
The UI kit MUST provide [`inc-form__error-summary`](../../../reference.html), [`inc-form__error-summary-title`](../../../reference.html), and [`inc-form__error-summary-list`](../../../reference.html) for aggregated validation errors with a readable top-level message and the individual issues listed beneath it.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-VAL-0002 Provide field-level feedback surfaces
The validation surface MUST provide [`inc-form__feedback`](../../../reference.html), [`inc-form__feedback--error`](../../../reference.html), [`inc-form__feedback--success`](../../../reference.html), [`inc-form__valid-feedback`](../../../reference.html), [`inc-form__invalid-feedback`](../../../reference.html), [`inc-form__valid-tooltip`](../../../reference.html), and [`inc-form__invalid-tooltip`](../../../reference.html) for field-level messaging that appears adjacent to the affected control with distinct visual treatment for success and error states.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-VAL-0003 Provide shared validity hook vocabulary
The validation surface MUST define the shared validity hooks used by the control-family specs, including [`is-valid`](../../../reference.html), [`is-invalid`](../../../reference.html), `aria-invalid`, and the related feedback-linking affordances, so editable inputs, selects, and choice controls can present family-specific styling without inventing separate validation semantics.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-VAL-0004 Preserve error-order context
The validation surface MUST keep the error-summary list in the same order as the affected fields or fieldsets appear in the form, preserving the mapping between each issue and the related control or group.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `forms-and-validation.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-VAL-0005 Announce validation feedback accessibly
The validation surface MUST expose error summaries and field feedback in a way assistive technologies can announce, with invalid controls connecting their visible feedback to the control state through `aria-invalid` or equivalent description hooks.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `forms-and-validation.html`
    - `overlay-workflows.html`
    - `states.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

Notes:
- The examples currently use [`is-valid`](../../../reference.html) and [`is-invalid`](../../../reference.html) state classes on controls and selects, while the source also exposes wrapper-level validity helpers.

## REQ-UIK-VAL-0006 Comply with shared naming and accessibility rules
Validation surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0004`](SPEC-UIK-CNV.md#req-uik-cnv-0004-keep-visual-state-hooks-separate-from-native-semantics), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), [`REQ-UIK-A11Y-0003`](SPEC-UIK-A11Y.md#req-uik-a11y-0003-announce-shared-status-surfaces-through-semantics-rather-than-styling-alone), and [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
