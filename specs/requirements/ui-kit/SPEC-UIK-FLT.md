---
artifact_id: SPEC-UIK-FLT
artifact_type: specification
title: Filter and Bulk Action Bars
domain: ui-kit
capability: filter-and-bulk-action-bars
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - filters
  - bulk-actions
---

# SPEC-UIK-FLT - Filter and Bulk Action Bars

## Purpose

Define the toolbar-style surfaces used for search, filtering, and bulk actions.

## Scope

This specification covers the filter bar, filter chips, and bulk-action bar that sit above tables and workflow lists.

## Context

These surfaces are form-adjacent, but they behave like operating toolbars rather than general form layouts.

## REQ-UIK-FLT-0001 Provide a filter-bar surface
The UI kit MUST provide [`inc-filter-bar`](../../../reference.html), [`inc-filter-bar__main`](../../../reference.html), [`inc-filter-bar__field`](../../../reference.html), [`inc-filter-bar__field--grow`](../../../reference.html), [`inc-filter-bar__actions`](../../../reference.html), and [`inc-filter-bar__chips`](../../../reference.html) for filter toolbars that keep search fields, chips, and actions aligned while wrapping cleanly on narrow screens.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FLT-0002 Provide filter-chip affordances
The UI kit MUST provide [`inc-filter-chip`](../../../reference.html), [`inc-filter-chip--accent`](../../../reference.html), and [`inc-filter-chip__remove`](../../../reference.html) for active filter tokens with a visually obvious and discrete remove control.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FLT-0003 Provide a bulk-action bar
The UI kit MUST provide [`inc-bulk-bar`](../../../reference.html), [`inc-bulk-bar__meta`](../../../reference.html), [`inc-bulk-bar__count`](../../../reference.html), and [`inc-bulk-bar__actions`](../../../reference.html) for bulk-selection workflows that make the selected-count state and related actions visible together.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `data-grid-advanced.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FLT-0004 Provide accessible chip-removal actions
The filter surface MUST keep each [`inc-filter-chip__remove`](../../../reference.html) control separately operable with an accessible name while keeping the chip text readable when the remove control is present.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FLT-0005 Comply with shared naming and accessibility rules
Filter and bulk-action surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), and [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
