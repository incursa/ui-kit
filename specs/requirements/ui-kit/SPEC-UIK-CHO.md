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

Choice controls behave differently from editable controls, so the UI kit keeps them in a separate specification even though they share the form shell. The shared `inc-form__check` wrapper covers both checkbox and radio inputs, while `inc-form__switch` remains a checkbox presentation variant.

## REQ-UIK-CHO-0001 Provide checkbox choice wrappers
The UI kit MUST provide `inc-form__check`, `inc-form__check-input`, and `inc-form__check-label` for checkbox and radio choice controls that keep the native control and label association intact.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CHO-0002 Provide a switch presentation variant
The choice control surface MUST provide `inc-form__switch` as a switch presentation variant of the check control that remains a visual variant of checkbox semantics rather than a separate control type.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CHO-0003 Provide grouped and inline choice layouts
The UI kit MUST provide `inc-form__choices` and `inc-form__choices--inline` for grouped choice layouts that preserve readable label order and click targets across checkbox, radio, and switch variants.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CHO-0004 Preserve disabled choice semantics
The choice control surface MUST preserve native disabled semantics for checkbox, radio, and switch inputs, with disabled choice controls not responding to pointer or keyboard activation while their labels remain readable.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CHO-0005 Comply with shared naming, token, and accessibility rules
Choice surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-STD-0004`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0001`, `REQ-UIK-A11Y-0002`, and `REQ-UIK-A11Y-0006`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`
