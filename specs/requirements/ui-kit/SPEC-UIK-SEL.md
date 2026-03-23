---
artifact_id: SPEC-UIK-SEL
artifact_type: specification
title: Select Controls
domain: ui-kit
capability: select-controls
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - selects
  - inputs
---

# SPEC-UIK-SEL - Select Controls

## Purpose

Define the native select controls used by the UI kit.

## Scope

This specification covers the public select surface and the modifiers that adjust its density and width behavior.

## Context

Select controls stay native HTML controls, but they still need a stable public class surface so dense forms can style them consistently with text-entry widgets.

## REQ-UIK-SEL-0001 Provide select control surfaces
The UI kit MUST provide `inc-form__select` as the base class for native select controls attached to a native `<select>` element so browser keyboard and menu behavior stay intact.

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

## REQ-UIK-SEL-0002 Provide density and expansion variants
The select surface MUST provide `inc-form__select--sm`, `inc-form__select--lg`, `inc-form__select--micro`, `inc-form__select--expand`, and `inc-form__select--warning` variants that only affect density, width, and visual emphasis rather than native select behavior.

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

## REQ-UIK-SEL-0003 Preserve disabled select semantics
The select surface MUST preserve native disabled semantics for `inc-form__select` controls, with disabled selects remaining noninteractive while staying visually distinguishable from active selects.

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

## REQ-UIK-SEL-0004 Comply with shared naming, token, and accessibility rules
Select surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0002`, `REQ-UIK-TOK-0004`, and `REQ-UIK-A11Y-0001`.

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
