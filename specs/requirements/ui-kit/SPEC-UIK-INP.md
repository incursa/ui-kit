---
artifact_id: SPEC-UIK-INP
artifact_type: specification
title: Text Entry Controls
domain: ui-kit
capability: text-entry-controls
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - inputs
  - text-entry
---

# SPEC-UIK-INP - Text Entry Controls

## Purpose

Define the editable text-entry controls used by the UI kit.

## Scope

This specification covers single-line and multiline text-entry controls, plus the public modifiers that adjust their density and expansion behavior.

## Context

Text-entry controls are shared across search forms, inline editors, and workflow dialogs, so they need one stable public class surface even when their HTML element types differ.

## REQ-UIK-INP-0001 Provide text-entry control surfaces
The UI kit MUST provide `inc-form__control` as the base class for single-line and multiline text-entry controls, including textarea surfaces, while keeping native text input semantics, keyboard editing, and disabled or readonly attributes intact.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0002 Provide density and expansion variants
The text-entry surface MUST provide `inc-form__control--sm`, `inc-form__control--lg`, `inc-form__control--micro`, `inc-form__control--expand`, `inc-form__control--warning`, and `inc-form__control--error` variants that only affect density, width, and visual emphasis rather than text-entry behavior.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `work-queue.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0003 Provide floating text-entry shells
The text-entry surface MUST provide `inc-form__floating` for floating-label text-entry layouts while keeping user-entered text visible and legible.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0004 Preserve disabled and readonly semantics
The text-entry surface MUST preserve native disabled and readonly semantics for `inc-form__control` surfaces, with disabled controls noninteractive and readonly controls visually distinct and focusable when the browser supports that behavior.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0005 Preserve native browser affordances
The text-entry surface MUST preserve native browser affordances for text selection, copy and paste, autocomplete, spellcheck, and platform-specific widgets or pickers for specialized input types such as search, email, date, and file.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0006 Preserve mobile keyboard behavior
The text-entry surface MUST keep the declared input type or equivalent input mode intact so mobile browsers can present the appropriate virtual keyboard and editing behavior for the field.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-INP-0007 Comply with shared naming, token, and accessibility rules
Text-entry surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0002`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0001`, and `REQ-UIK-A11Y-0002`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`
