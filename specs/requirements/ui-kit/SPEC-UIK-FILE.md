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
The UI kit MUST provide `inc-file-dropzone`, `inc-file-dropzone__content`, `inc-file-dropzone__title`, `inc-file-dropzone__text`, and `inc-file-dropzone--active` as the intake surface for drag-and-drop or click-to-upload workflows with an obvious active state when files are dragged over the dropzone.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FILE-0002 Provide file list and file row surfaces
The file workflow surface MUST provide `inc-file-list`, `inc-file-row`, `inc-file-row__meta`, `inc-file-row__name`, `inc-file-row__detail`, and `inc-file-row__actions` surfaces for ordered file review that keep the file name prominent with metadata and actions visually secondary.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FILE-0004 Preserve accessible file-row actions
The file row surface MUST keep file actions separately operable with accessible button or link labels while preventing action controls from obscuring the file name or metadata when present.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FILE-0003 Preserve file-row interaction affordances
The file workflow surface MUST keep file rows, row metadata, and row actions separately readable while keeping any row action obviously clickable or focusable without obscuring the file name.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FILE-0005 Comply with shared naming, token, and accessibility rules
File review surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0001`, and `REQ-UIK-A11Y-0002`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `overlay-workflows.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`
