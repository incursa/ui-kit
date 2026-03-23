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
The UI kit MUST provide `inc-u-stack-xs`, `inc-u-stack-sm`, `inc-u-stack-md`, `inc-u-stack-lg`, `inc-u-gap-xs`, `inc-u-gap-sm`, `inc-u-gap-md`, `inc-u-gap-lg`, `inc-u-p-0`, `inc-u-p-xs`, `inc-u-p-sm`, `inc-u-p-md`, `inc-u-p-lg`, `inc-u-px-md`, and `inc-u-py-md` spacing utilities that affect spacing only.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-UTL-0002 Provide public visibility utilities
The UI kit MUST provide `inc-u-hidden`, `inc-u-hidden-mobile`, `inc-u-hidden-desktop`, and `inc-u-visually-hidden` visibility utilities, including `inc-u-visually-hidden` to keep content available to assistive technologies while removing it from the visual flow.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-UTL-0003 Provide grid, row, and column composition utilities
The UI kit MUST provide `inc-grid`, `inc-grid--cols-2`, `inc-grid--cols-3`, `inc-grid--cols-4`, `inc-grid--cols-6`, `inc-grid--gap-sm`, `inc-grid--gap-md`, `inc-grid--gap-lg`, `inc-grid--gap-xl`, `inc-grid--equal-height`, `inc-row`, `inc-row--gap-sm`, `inc-row--gap-md`, `inc-row--gap-lg`, `inc-row--gap-xl`, `inc-row--nowrap`, `inc-row--center`, `inc-row--end`, `inc-row--between`, `inc-row--align-center`, `inc-col`, `inc-col--auto`, `inc-col--grow`, `inc-col--shrink`, `inc-col--w-25`, `inc-col--w-33`, `inc-col--w-50`, `inc-col--w-66`, `inc-col--w-75`, `inc-col--w-100`, `inc-stack`, `inc-stack--gap-sm`, `inc-stack--gap-md`, `inc-stack--gap-lg`, `inc-stack--gap-xl`, `inc-stack--center`, and `inc-stack--stretch` composition utilities that only control arrangement rather than document order or meaning.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `record-detail.html`
  - `states.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-UTL-0004 Provide flex alignment helpers
The UI kit MUST provide `inc-flex-between`, `inc-flex-end`, `inc-flex-center`, `inc-flex-col-center`, and `inc-flex-col` flex helpers that adjust alignment only.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-UTL-0005 Comply with shared naming rules
Utility helpers MUST comply with `REQ-UIK-STD-0003`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `AI-AGENT-INSTRUCTIONS.md`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`
