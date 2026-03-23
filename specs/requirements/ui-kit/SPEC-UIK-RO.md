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
The UI kit MUST provide `inc-readonly-field` for non-editable values that should visually match a form control.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-RO-0002 Preserve read-only affordances
The read-only field surface MUST remain visually aligned with adjacent editable form controls while keeping its value readable as plain content and preventing user editing.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-RO-0003 Comply with shared naming, token, and accessibility rules
Read-only field surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0004`, and `REQ-UIK-A11Y-0001`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `record-detail.html`
  - `reference.html`
- Verified By:
  - `VER-UIK-0001`
