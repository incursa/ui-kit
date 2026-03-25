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
The UI kit MUST provide [`inc-text`](../../../reference.html), [`inc-text--large`](../../../reference.html), [`inc-text--large-semibold`](../../../reference.html), [`inc-text--large-regular`](../../../reference.html), [`inc-text--medium`](../../../reference.html), [`inc-text--medium-semibold`](../../../reference.html), [`inc-text--medium-regular`](../../../reference.html), [`inc-text--regular`](../../../reference.html), [`inc-text--regular-semibold`](../../../reference.html), [`inc-text--regular-regular`](../../../reference.html), [`inc-text--small`](../../../reference.html), [`inc-text--small-semibold`](../../../reference.html), [`inc-text--small-regular`](../../../reference.html), [`inc-text--xs`](../../../reference.html), [`inc-text--xs-semibold`](../../../reference.html), [`inc-text--xs-regular`](../../../reference.html), [`inc-text--muted`](../../../reference.html), [`inc-text--lead`](../../../reference.html), [`inc-text--body`](../../../reference.html), [`inc-text-body`](../../../reference.html), [`inc-text-muted`](../../../reference.html), and [`inc-text-lead`](../../../reference.html) for body copy and supporting text.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TXT-0002 Provide public heading helpers
The UI kit MUST provide [`inc-heading`](../../../reference.html), [`inc-heading--display`](../../../reference.html), [`inc-heading--h1`](../../../reference.html), [`inc-heading--h2`](../../../reference.html), [`inc-heading--h3`](../../../reference.html), [`inc-heading--h4`](../../../reference.html), [`inc-heading--h5`](../../../reference.html), [`inc-heading--h6`](../../../reference.html), [`inc-heading--large`](../../../reference.html), [`inc-heading--overline`](../../../reference.html), [`inc-heading-1`](../../../reference.html), [`inc-heading-2`](../../../reference.html), [`inc-heading-3`](../../../reference.html), [`inc-heading-4`](../../../reference.html), [`inc-heading-5`](../../../reference.html), and [`inc-heading-6`](../../../reference.html) for page and section titles.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TXT-0003 Provide context-specific text helpers
The UI kit MUST provide [`inc-data`](../../../reference.html), [`inc-data--display`](../../../reference.html), [`inc-data--regular`](../../../reference.html), [`inc-data--regular-semibold`](../../../reference.html), [`inc-data--regular-regular`](../../../reference.html), [`inc-data--small`](../../../reference.html), [`inc-data--small-semibold`](../../../reference.html), [`inc-data--small-regular`](../../../reference.html), [`inc-button-text`](../../../reference.html), [`inc-button-text--large`](../../../reference.html), [`inc-button-text--small`](../../../reference.html), [`inc-form-text`](../../../reference.html), [`inc-form-text--small`](../../../reference.html), [`inc-form-text--help`](../../../reference.html), [`inc-table-text`](../../../reference.html), [`inc-table-text--small`](../../../reference.html), and [`inc-table-text--data`](../../../reference.html) for monospace values and component-adjacent text.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
    - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TXT-0004 Preserve semantic document behavior
The typography surface MUST apply its classes without changing the underlying HTML semantics, focusability, or interaction model while keeping text helpers used for headings, body copy, data, button labels, form help, and table text presentation-only.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `record-detail.html`
  - Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TXT-0005 Comply with shared naming, typography token, and accessibility rules
Text helpers MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-STD-0002`](SPEC-UIK-STD.md#req-uik-std-0002-allow-compatibility-aliases), [`REQ-UIK-TOK-0002`](SPEC-UIK-TOK.md#req-uik-tok-0002-expose-the-public-typography-token-family), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `forms-and-validation.html`
    - `work-queue.html`
    - `data-grid-advanced.html`
    - `record-detail.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
