---
artifact_id: SPEC-UIK-FILE
artifact_type: specification
title: File Review Surfaces
domain: ui-kit
capability: file-review-surfaces
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - files
  - review
---

# SPEC-UIK-FILE - File Review Surfaces

## Purpose

Define the surfaces used for file intake and document review workflows.

## Scope

This specification covers file dropzones, file lists, file rows, and the metadata and action areas within those rows.

## Context

File review flows recur in operational applications, and the kit needs a consistent way to represent attachments, documents, and review actions.

## REQ-UIK-FILE-0001 Provide a file intake surface
The UI kit MUST provide [`inc-file-dropzone`](../../../reference.html), [`inc-file-dropzone__content`](../../../reference.html), [`inc-file-dropzone__title`](../../../reference.html), [`inc-file-dropzone__text`](../../../reference.html), and [`inc-file-dropzone--active`](../../../reference.html) as the intake surface for drag-and-drop or click-to-upload workflows with an obvious active state when files are dragged over the dropzone.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FILE-0002 Provide file list and file row surfaces
The file workflow surface MUST provide [`inc-file-list`](../../../reference.html), [`inc-file-row`](../../../reference.html), [`inc-file-row__meta`](../../../reference.html), [`inc-file-row__name`](../../../reference.html), [`inc-file-row__detail`](../../../reference.html), and [`inc-file-row__actions`](../../../reference.html) surfaces for ordered file review that keep the file name prominent with metadata and actions visually secondary.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FILE-0004 Preserve accessible file-row actions
The file row surface MUST keep file actions separately operable with accessible button or link labels while preventing action controls from obscuring the file name or metadata when present.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FILE-0003 Preserve file-row interaction affordances
The file workflow surface MUST keep file rows, row metadata, and row actions separately readable while keeping any row action obviously clickable or focusable without obscuring the file name.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FILE-0005 Comply with shared naming, token, and accessibility rules
File review surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), and [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
