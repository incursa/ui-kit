---
artifact_id: SPEC-UIK-LIST
artifact_type: specification
title: List and Collection Rows
domain: ui-kit
capability: list-and-collection-rows
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - lists
  - rows
---

# SPEC-UIK-LIST - List and Collection Rows

## Purpose

Define the list-style surfaces used for stacked collections and row-based navigation.

## Scope

This specification covers list-group items, action rows, and vertical-list density variants.

## Context

The kit uses list-like rows for menus, work queues, related records, and compact stacked collections.

## REQ-UIK-LIST-0001 Provide a stacked list-group surface
The UI kit MUST provide `inc-list-group`, `inc-list-group--flush`, `inc-list-group--numbered`, and `inc-list-group__item` for stacked collections of related rows that preserve row order while keeping flush and numbered variants visually distinct.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LIST-0002 Provide list-group item variants
The list surface MUST provide `inc-list-group__item--action`, `inc-list-group__item--primary`, `inc-list-group__item--secondary`, `inc-list-group__item--success`, `inc-list-group__item--danger`, `inc-list-group__item--warning`, `inc-list-group__item--info`, `inc-list-group__item--light`, and `inc-list-group__item--dark` for selectable or themed rows, with action rows remaining obviously clickable or focusable when used as navigation surfaces.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LIST-0003 Provide vertical-list density variants
The UI kit MUST provide `inc-vertical-list`, `inc-vertical-list--comfy`, `inc-vertical-list--compact`, `inc-vertical-list--trim`, `inc-vertical-list--inset`, and `inc-vertical-list__item` for compact stacked content that only alters spacing and inset treatment rather than content order.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LIST-0004 Preserve accessible action rows
The list surface MUST keep action rows keyboard reachable and labeled while keeping active or selected list items discernible to assistive technologies.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LIST-0005 Comply with shared naming and accessibility rules
List surfaces MUST comply with `REQ-UIK-STD-0001` and `REQ-UIK-A11Y-0001`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - `VER-UIK-0001`
