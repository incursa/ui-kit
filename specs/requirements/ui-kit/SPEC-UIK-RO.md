---
artifact_id: SPEC-UIK-RO
artifact_type: specification
title: Read-only Field Display
domain: ui-kit
capability: readonly-field-display
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - readonly
  - forms
---

# SPEC-UIK-RO - Read-only Field Display

## Purpose

Define the non-editable field surface used when content should visually match a form control.

## Scope

This specification covers the public read-only field class and its use as a stable display primitive.

## Context

Read-only values appear in review pages and detail forms, and they need to align visually with adjacent editable controls instead of looking like arbitrary text blocks.

## REQ-UIK-RO-0001 Provide a read-only field surface
The UI kit MUST provide [`inc-readonly-field`](../../../reference.html) for non-editable values that should visually match a form control.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-RO-0002 Preserve read-only affordances
The read-only field surface MUST remain visually aligned with adjacent editable form controls while keeping its value readable as plain content and preventing user editing.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-RO-0003 Comply with shared naming, token, and accessibility rules
Read-only field surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
