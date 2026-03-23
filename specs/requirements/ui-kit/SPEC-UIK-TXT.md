---
artifact_id: SPEC-UIK-TXT
artifact_type: specification
title: Typography and Text Helpers
domain: ui-kit
capability: typography-and-text-helpers
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - typography
  - text
---

# SPEC-UIK-TXT - Typography and Text Helpers

## Purpose

Define the public text, heading, and data-formatting helpers used directly in markup.

## Scope

This specification covers the public text, heading, monospace data, button label, form text, and table text helpers that appear in the shipped CSS. It does not cover compile-time-only Sass tokens or variables.

## Context

The UI kit uses a small typography layer so pages, controls, and utility blocks can share the same text scale without inventing one-off classes.

## REQ-UIK-TXT-0001 Provide public body text helpers
The UI kit MUST provide `inc-text`, `inc-text--large`, `inc-text--large-semibold`, `inc-text--large-regular`, `inc-text--medium`, `inc-text--medium-semibold`, `inc-text--medium-regular`, `inc-text--regular`, `inc-text--regular-semibold`, `inc-text--regular-regular`, `inc-text--small`, `inc-text--small-semibold`, `inc-text--small-regular`, `inc-text--xs`, `inc-text--xs-semibold`, `inc-text--xs-regular`, `inc-text--muted`, `inc-text--lead`, `inc-text--body`, `inc-text-body`, `inc-text-muted`, and `inc-text-lead` for body copy and supporting text.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TXT-0002 Provide public heading helpers
The UI kit MUST provide `inc-heading`, `inc-heading--display`, `inc-heading--h1`, `inc-heading--h2`, `inc-heading--h3`, `inc-heading--h4`, `inc-heading--h5`, `inc-heading--h6`, `inc-heading--large`, `inc-heading--overline`, `inc-heading-1`, `inc-heading-2`, `inc-heading-3`, `inc-heading-4`, `inc-heading-5`, and `inc-heading-6` for page and section titles.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TXT-0003 Provide context-specific text helpers
The UI kit MUST provide `inc-data`, `inc-data--display`, `inc-data--regular`, `inc-data--regular-semibold`, `inc-data--regular-regular`, `inc-data--small`, `inc-data--small-semibold`, `inc-data--small-regular`, `inc-button-text`, `inc-button-text--large`, `inc-button-text--small`, `inc-form-text`, `inc-form-text--small`, `inc-form-text--help`, `inc-table-text`, `inc-table-text--small`, and `inc-table-text--data` for monospace values and component-adjacent text.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
    - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TXT-0004 Preserve semantic document behavior
The typography surface MUST apply its classes without changing the underlying HTML semantics, focusability, or interaction model while keeping text helpers used for headings, body copy, data, button labels, form help, and table text presentation-only.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `record-detail.html`
  - Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TXT-0005 Comply with shared naming, typography token, and accessibility rules
Text helpers MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-STD-0002`, `REQ-UIK-TOK-0002`, and `REQ-UIK-A11Y-0001`.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
    - `record-detail.html`
  - Verified By:
    - `VER-UIK-0001`
