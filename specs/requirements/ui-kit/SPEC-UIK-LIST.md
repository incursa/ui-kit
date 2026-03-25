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
The UI kit MUST provide [`inc-list-group`](../../../reference.html), [`inc-list-group--flush`](../../../reference.html), [`inc-list-group--numbered`](../../../reference.html), and [`inc-list-group__item`](../../../reference.html) for stacked collections of related rows that preserve row order while keeping flush and numbered variants visually distinct.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LIST-0002 Provide list-group item variants
The list surface MUST provide [`inc-list-group__item--action`](../../../reference.html), [`inc-list-group__item--primary`](../../../reference.html), [`inc-list-group__item--secondary`](../../../reference.html), [`inc-list-group__item--success`](../../../reference.html), [`inc-list-group__item--danger`](../../../reference.html), [`inc-list-group__item--warning`](../../../reference.html), and [`inc-list-group__item--info`](../../../reference.html) for selectable or themed rows, with action rows remaining obviously clickable or focusable when used as navigation surfaces.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LIST-0003 Provide vertical-list density variants
The UI kit MUST provide [`inc-vertical-list`](../../../reference.html), [`inc-vertical-list--comfy`](../../../reference.html), [`inc-vertical-list--compact`](../../../reference.html), [`inc-vertical-list--trim`](../../../reference.html), [`inc-vertical-list--inset`](../../../reference.html), and [`inc-vertical-list__item`](../../../reference.html) for compact stacked content that only alters spacing and inset treatment rather than content order.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LIST-0004 Preserve accessible action rows
The list surface MUST keep action rows keyboard reachable and labeled while keeping active or selected list items discernible to assistive technologies.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LIST-0005 Comply with shared naming and accessibility rules
List surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming) and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
