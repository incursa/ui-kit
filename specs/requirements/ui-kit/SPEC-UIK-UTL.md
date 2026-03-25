---
artifact_id: SPEC-UIK-UTL
artifact_type: specification
title: Public Utility and Helper Classes
domain: ui-kit
capability: public-utility-and-helper-classes
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - utilities
  - layout
---

# SPEC-UIK-UTL - Public Utility and Helper Classes

## Purpose

Define the public utility classes that are emitted into the compiled CSS and used directly by consumers.

## Scope

This specification covers public spacing, visibility, layout, and flex helper classes. It does not cover compile-time-only Sass tokens or variables that do not appear in the shipped CSS.

## Context

The package ships a small set of utility classes because some layout and density decisions are easier to express as reusable public helpers than as one-off component modifiers.

## REQ-UIK-UTL-0001 Provide public spacing utilities
The UI kit MUST provide [`inc-u-stack-xs`](../../../reference.html), [`inc-u-stack-sm`](../../../reference.html), [`inc-u-stack-md`](../../../reference.html), [`inc-u-stack-lg`](../../../reference.html), [`inc-u-gap-xs`](../../../reference.html), [`inc-u-gap-sm`](../../../reference.html), [`inc-u-gap-md`](../../../reference.html), [`inc-u-gap-lg`](../../../reference.html), [`inc-u-p-0`](../../../reference.html), [`inc-u-p-xs`](../../../reference.html), [`inc-u-p-sm`](../../../reference.html), [`inc-u-p-md`](../../../reference.html), [`inc-u-p-lg`](../../../reference.html), [`inc-u-px-md`](../../../reference.html), and [`inc-u-py-md`](../../../reference.html) spacing utilities that affect spacing only.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-UTL-0002 Provide public visibility utilities
The UI kit MUST provide [`inc-u-hidden`](../../../reference.html), [`inc-u-hidden-mobile`](../../../reference.html), [`inc-u-hidden-desktop`](../../../reference.html), and [`inc-u-visually-hidden`](../../../reference.html) visibility utilities, including [`inc-u-visually-hidden`](../../../reference.html) to keep content available to assistive technologies while removing it from the visual flow.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-UTL-0003 Provide grid, row, and column composition utilities
The UI kit MUST provide [`inc-grid`](../../../reference.html), [`inc-grid--cols-2`](../../../reference.html), [`inc-grid--cols-3`](../../../reference.html), [`inc-grid--cols-4`](../../../reference.html), [`inc-grid--cols-6`](../../../reference.html), [`inc-grid--gap-sm`](../../../reference.html), [`inc-grid--gap-md`](../../../reference.html), [`inc-grid--gap-lg`](../../../reference.html), [`inc-grid--gap-xl`](../../../reference.html), [`inc-grid--equal-height`](../../../reference.html), [`inc-row`](../../../reference.html), [`inc-row--gap-sm`](../../../reference.html), [`inc-row--gap-md`](../../../reference.html), [`inc-row--gap-lg`](../../../reference.html), [`inc-row--gap-xl`](../../../reference.html), [`inc-row--nowrap`](../../../reference.html), [`inc-row--center`](../../../reference.html), [`inc-row--end`](../../../reference.html), [`inc-row--between`](../../../reference.html), [`inc-row--align-center`](../../../reference.html), [`inc-col`](../../../reference.html), [`inc-col--auto`](../../../reference.html), [`inc-col--grow`](../../../reference.html), [`inc-col--shrink`](../../../reference.html), [`inc-col--w-25`](../../../reference.html), [`inc-col--w-33`](../../../reference.html), [`inc-col--w-50`](../../../reference.html), [`inc-col--w-66`](../../../reference.html), [`inc-col--w-75`](../../../reference.html), [`inc-col--w-100`](../../../reference.html), [`inc-stack`](../../../reference.html), [`inc-stack--gap-sm`](../../../reference.html), [`inc-stack--gap-md`](../../../reference.html), [`inc-stack--gap-lg`](../../../reference.html), [`inc-stack--gap-xl`](../../../reference.html), [`inc-stack--center`](../../../reference.html), and [`inc-stack--stretch`](../../../reference.html) composition utilities that only control arrangement rather than document order or meaning.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `states.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-UTL-0004 Provide flex alignment helpers
The UI kit MUST provide [`inc-flex-between`](../../../reference.html), [`inc-flex-end`](../../../reference.html), [`inc-flex-center`](../../../reference.html), [`inc-flex-col-center`](../../../reference.html), and [`inc-flex-col`](../../../reference.html) flex helpers that adjust alignment only.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-UTL-0005 Comply with shared naming rules
Utility helpers MUST comply with [`REQ-UIK-STD-0003`](SPEC-UIK-STD.md#req-uik-std-0003-reserve-the-utility-prefix).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `AI-AGENT-INSTRUCTIONS.md`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
