---
artifact_id: SPEC-UIK-GRP
artifact_type: specification
title: Input Group Composition
domain: ui-kit
capability: input-group-composition
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - inputs
  - composition
---

# SPEC-UIK-GRP - Input Group Composition

## Purpose

Define the composed input surfaces used for inline adornments and compact control clusters.

## Scope

This specification covers the public input-group shell, its text adornment element, and the shipped density and expansion modifiers.

## Context

Input groups let the kit keep currency symbols, prefixes, suffixes, and other inline adornments aligned with the controls they belong to.

## REQ-UIK-GRP-0001 Provide input group composition
The UI kit MUST provide `inc-input-group` and `inc-input-group__text` for composed inputs with inline adornments.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-GRP-0002 Provide input-group density and expansion variants
The input-group surface MUST provide `inc-input-group--sm`, `inc-input-group--micro`, `inc-input-group--lg`, and `inc-input-group--expand` while complying with `REQ-UIK-TOK-0008`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-GRP-0003 Preserve noninteractive adornment behavior
The input-group surface MUST keep `inc-input-group__text` as noninteractive adornment content that does not intercept focus or obscure the editable control's keyboard behavior.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-GRP-0004 Comply with shared naming, token, and accessibility rules
Input-group surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-CNV-0001` through `REQ-UIK-CNV-0006`, `REQ-UIK-TOK-0002`, `REQ-UIK-TOK-0008`, and `REQ-UIK-A11Y-0001`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`
