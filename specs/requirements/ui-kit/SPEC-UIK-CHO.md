---
artifact_id: SPEC-UIK-CHO
artifact_type: specification
title: Binary Choice Controls
domain: ui-kit
capability: binary-choice-controls
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - choices
  - checkboxes
  - radios
  - switches
---

# SPEC-UIK-CHO - Binary Choice Controls

## Purpose

Define the grouped choice controls used for boolean input.

## Scope

This specification covers checkbox, radio, and switch controls plus grouped and inline choice layouts.

## Context

Choice controls behave differently from editable controls, so the UI kit keeps them in a separate specification even though they share the form shell. The shared [`inc-form__check`](../../../reference.html) wrapper covers both checkbox and radio inputs, while [`inc-form__switch`](../../../reference.html) remains a checkbox presentation variant.

## REQ-UIK-CHO-0001 Provide checkbox choice wrappers
The UI kit MUST provide [`inc-form__check`](../../../reference.html), [`inc-form__check-input`](../../../reference.html), and [`inc-form__check-label`](../../../reference.html) for checkbox and radio choice controls that keep the native control and label association intact.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CHO-0002 Provide a switch presentation variant
The choice control surface MUST provide [`inc-form__switch`](../../../reference.html) as a switch presentation variant of the check control that remains a visual variant of checkbox semantics rather than a separate control type.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CHO-0003 Provide grouped and inline choice layouts
The UI kit MUST provide [`inc-form__choices`](../../../reference.html) and [`inc-form__choices--inline`](../../../reference.html) for grouped choice layouts that preserve readable label order and click targets across checkbox, radio, and switch variants.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CHO-0004 Preserve disabled choice semantics
The choice control surface MUST preserve native disabled semantics for checkbox, radio, and switch inputs, with disabled choice controls not responding to pointer or keyboard activation while their labels remain readable.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CHO-0005 Comply with shared naming, token, and accessibility rules
Choice surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-STD-0004`](SPEC-UIK-STD.md#req-uik-std-0004-forbid-element-of-element-names), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), and [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CHO-0006 Provide choice validity styling
The choice control surface MUST provide validity styling for [`inc-form__check`](../../../reference.html) and [`inc-form__switch`](../../../reference.html) states, including invalid labels and `aria-invalid` or equivalent hooks, while preserving the native checkbox and radio semantics defined by the family and aligning with [`REQ-UIK-VAL-0003`](SPEC-UIK-VAL.md#req-uik-val-0003-provide-shared-validity-hook-vocabulary).

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `forms-and-validation.html`
    - `demo.html`
    - `states.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
