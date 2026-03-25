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
The UI kit MUST provide [`inc-input-group`](../../../reference.html) and [`inc-input-group__text`](../../../reference.html) for composed inputs with inline adornments.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-GRP-0002 Provide input-group density and expansion variants
The input-group surface MUST provide [`inc-input-group--sm`](../../../reference.html), [`inc-input-group--micro`](../../../reference.html), [`inc-input-group--lg`](../../../reference.html), and [`inc-input-group--expand`](../../../reference.html) while complying with [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-GRP-0003 Preserve noninteractive adornment behavior
The input-group surface MUST keep [`inc-input-group__text`](../../../reference.html) as noninteractive adornment content that does not intercept focus or obscure the editable control's keyboard behavior.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-GRP-0004 Comply with shared naming, token, and accessibility rules
Input-group surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-CNV-0001`](SPEC-UIK-CNV.md#req-uik-cnv-0001-keep-control-surfaces-layered) through [`REQ-UIK-CNV-0006`](SPEC-UIK-CNV.md#req-uik-cnv-0006-allow-mixed-public-surfaces), [`REQ-UIK-TOK-0002`](SPEC-UIK-TOK.md#req-uik-tok-0002-expose-the-public-typography-token-family), [`REQ-UIK-TOK-0008`](SPEC-UIK-TOK.md#req-uik-tok-0008-expose-the-shared-control-density-token-family), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
