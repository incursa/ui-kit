---
artifact_id: SPEC-UIK-TBL
artifact_type: specification
title: Tables and Data Grids
domain: ui-kit
capability: tables-and-data-grids
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - tables
  - grids
---

# SPEC-UIK-TBL - Tables and Data Grids

## Purpose

Define the tabular surfaces used for dense operational data.

## Scope

This specification covers the base table, responsive wrappers, header and cell modifiers, row states, table text helpers, and table-in-section composition.

## Context

Tables are a primary UI kit strength and are used for queue views, review workflows, spreadsheet-like screens, and analytics grids.

## REQ-UIK-TBL-0001 Provide a base table primitive
The UI kit MUST provide [`inc-table`](../../../reference.html), [`inc-table--sm`](../../../reference.html), [`inc-table--sticky-header`](../../../reference.html), [`inc-table--striped-columns`](../../../reference.html), [`inc-table--bordered`](../../../reference.html), [`inc-table--borderless`](../../../reference.html), [`inc-table--align-top`](../../../reference.html), [`inc-table--align-middle`](../../../reference.html), [`inc-table--align-bottom`](../../../reference.html), [`inc-table--primary`](../../../reference.html), [`inc-table--secondary`](../../../reference.html), [`inc-table--success`](../../../reference.html), [`inc-table--danger`](../../../reference.html), [`inc-table--warning`](../../../reference.html), [`inc-table--info`](../../../reference.html), [`inc-table--text-small`](../../../reference.html), [`inc-table--text`](../../../reference.html), [`inc-table--text-medium`](../../../reference.html), [`inc-table--data-table`](../../../reference.html), [`inc-table--review-grid`](../../../reference.html), [`inc-table--analytics-grid`](../../../reference.html), and [`inc-table--spreadsheet-grid`](../../../reference.html) as the base surfaces for tabular data that keep the underlying table semantics intact.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0002 Provide cell and header alignment modifiers
The table surface MUST provide [`inc-table__header`](../../../reference.html), [`inc-table__header--sticky`](../../../reference.html), [`inc-table__header--primary`](../../../reference.html), [`inc-table__header--secondary`](../../../reference.html), [`inc-table__header--success`](../../../reference.html), [`inc-table__header--danger`](../../../reference.html), [`inc-table__header--warning`](../../../reference.html), [`inc-table__header--info`](../../../reference.html), [`inc-table__header--center`](../../../reference.html), [`inc-table__header--center-h`](../../../reference.html), [`inc-table__header--center-v`](../../../reference.html), [`inc-table__header--right`](../../../reference.html), [`inc-table__header--left`](../../../reference.html), [`inc-table__cell`](../../../reference.html), [`inc-table__cell--active`](../../../reference.html), [`inc-table__cell--primary`](../../../reference.html), [`inc-table__cell--secondary`](../../../reference.html), [`inc-table__cell--success`](../../../reference.html), [`inc-table__cell--danger`](../../../reference.html), [`inc-table__cell--warning`](../../../reference.html), [`inc-table__cell--info`](../../../reference.html), [`inc-table__cell--action`](../../../reference.html), [`inc-table__cell--fit`](../../../reference.html), [`inc-table__cell--center`](../../../reference.html), [`inc-table__cell--center-h`](../../../reference.html), [`inc-table__cell--center-v`](../../../reference.html), [`inc-table__cell--right`](../../../reference.html), [`inc-table__cell--left`](../../../reference.html), [`inc-table__cell--nowrap`](../../../reference.html), [`inc-table__cell--wrap`](../../../reference.html), [`inc-table__cell--text-small`](../../../reference.html), [`inc-table__cell--text`](../../../reference.html), [`inc-table__cell--text-medium`](../../../reference.html), [`inc-table__cell--text-large`](../../../reference.html), [`inc-table__cell--data-small`](../../../reference.html), [`inc-table__cell--data`](../../../reference.html), [`inc-table__cell--numeric-small`](../../../reference.html), [`inc-table__cell--numeric`](../../../reference.html), [`inc-table__cell--semibold`](../../../reference.html), [`inc-table__cell--regular-weight`](../../../reference.html), [`inc-table__cell--min`](../../../reference.html), [`inc-table__cell--auto`](../../../reference.html), [`inc-table__cell--expand`](../../../reference.html), [`inc-table__cell--bundle`](../../../reference.html), [`inc-table__cell--w-25`](../../../reference.html), [`inc-table__cell--w-33`](../../../reference.html), [`inc-table__cell--w-50`](../../../reference.html), and [`inc-table__cell--sticky`](../../../reference.html) modifiers for dense data presentation that keep numeric, action, and sticky cells readable.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0003 Provide row-state and bundle modifiers
The table surface MUST provide [`inc-table__row`](../../../reference.html), [`inc-table__row--active`](../../../reference.html), [`inc-table__row--selected`](../../../reference.html), [`inc-table__row--primary`](../../../reference.html), [`inc-table__row--secondary`](../../../reference.html), [`inc-table__row--success`](../../../reference.html), [`inc-table__row--danger`](../../../reference.html), [`inc-table__row--warning`](../../../reference.html), [`inc-table__row--info`](../../../reference.html), [`inc-table__row--locked`](../../../reference.html), [`inc-table__group-divider`](../../../reference.html), [`inc-table__bundle`](../../../reference.html), [`inc-table__bundle-title`](../../../reference.html), and [`inc-table__bundle-hint`](../../../reference.html) for row selection and grouped record display with state rows that communicate selection or status without obscuring cell content.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`dist/inc-design-language.css`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0004 Provide responsive and sticky table wrappers
The table surface MUST provide [`inc-table-container`](../../../reference.html), [`inc-table-responsive`](../../../reference.html), [`inc-table-responsive--sm`](../../../reference.html), [`inc-table-responsive--md`](../../../reference.html), [`inc-table-responsive--lg`](../../../reference.html), [`inc-table-responsive--xl`](../../../reference.html), [`inc-table-responsive--xxl`](../../../reference.html), [`inc-table-responsive--sticky`](../../../reference.html), [`inc-table-responsive__caption`](../../../reference.html), [`inc-table-responsive__footer`](../../../reference.html), and [`inc-table-responsive__pagination`](../../../reference.html) wrappers for dense scrollable grids that preserve horizontal scrolling rather than collapsing the table content.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0005 Provide table text helpers and section padding behavior
The UI kit MUST provide [`inc-table-text`](../../../reference.html), [`inc-table-text--small`](../../../reference.html), [`inc-table-text--data`](../../../reference.html), [`inc-table__caption`](../../../reference.html), [`inc-table__caption--bottom`](../../../reference.html), and [`inc-header-body--table-body`](../../../reference.html) when a table lives inside a titled section with intact section body padding and captions attached to the table they describe.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `README.md`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0006 Provide accessible selection controls
The table surface MUST provide accessible selection controls for bulk-select and row-select workflows with any disabled or locked selection control remaining visibly disabled and noninteractive while the row content stays readable.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TBL-0007 Comply with shared naming, token, and accessibility rules
Table surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), and [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`dist/inc-design-language.css`](../../../reference.html)
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
