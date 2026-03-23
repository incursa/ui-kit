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
The UI kit MUST provide `inc-table`, `inc-table--sm`, `inc-table--sticky-header`, `inc-table--striped-columns`, `inc-table--bordered`, `inc-table--borderless`, `inc-table--align-top`, `inc-table--align-middle`, `inc-table--align-bottom`, `inc-table--primary`, `inc-table--secondary`, `inc-table--success`, `inc-table--danger`, `inc-table--warning`, `inc-table--info`, `inc-table--text-small`, `inc-table--text`, `inc-table--text-medium`, `inc-table--data-table`, `inc-table--review-grid`, `inc-table--analytics-grid`, and `inc-table--spreadsheet-grid` as the base surfaces for tabular data that keep the underlying table semantics intact.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0002 Provide cell and header alignment modifiers
The table surface MUST provide `inc-table__header`, `inc-table__header--sticky`, `inc-table__header--primary`, `inc-table__header--secondary`, `inc-table__header--success`, `inc-table__header--danger`, `inc-table__header--warning`, `inc-table__header--info`, `inc-table__header--center`, `inc-table__header--center-h`, `inc-table__header--center-v`, `inc-table__header--right`, `inc-table__header--left`, `inc-table__cell`, `inc-table__cell--active`, `inc-table__cell--primary`, `inc-table__cell--secondary`, `inc-table__cell--success`, `inc-table__cell--danger`, `inc-table__cell--warning`, `inc-table__cell--info`, `inc-table__cell--action`, `inc-table__cell--fit`, `inc-table__cell--center`, `inc-table__cell--center-h`, `inc-table__cell--center-v`, `inc-table__cell--right`, `inc-table__cell--left`, `inc-table__cell--nowrap`, `inc-table__cell--wrap`, `inc-table__cell--text-small`, `inc-table__cell--text`, `inc-table__cell--text-medium`, `inc-table__cell--text-large`, `inc-table__cell--data-small`, `inc-table__cell--data`, `inc-table__cell--numeric-small`, `inc-table__cell--numeric`, `inc-table__cell--semibold`, `inc-table__cell--regular-weight`, `inc-table__cell--min`, `inc-table__cell--auto`, `inc-table__cell--expand`, `inc-table__cell--bundle`, `inc-table__cell--w-25`, `inc-table__cell--w-33`, `inc-table__cell--w-50`, and `inc-table__cell--sticky` modifiers for dense data presentation that keep numeric, action, and sticky cells readable.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0003 Provide row-state and bundle modifiers
The table surface MUST provide `inc-table__row`, `inc-table__row--active`, `inc-table__row--selected`, `inc-table__row--primary`, `inc-table__row--secondary`, `inc-table__row--success`, `inc-table__row--danger`, `inc-table__row--warning`, `inc-table__row--info`, `inc-table__row--locked`, `inc-table__group-divider`, `inc-table__bundle`, `inc-table__bundle-title`, and `inc-table__bundle-hint` for row selection and grouped record display with state rows that communicate selection or status without obscuring cell content.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `dist/inc-design-language.css`
  - `reference.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0004 Provide responsive and sticky table wrappers
The table surface MUST provide `inc-table-container`, `inc-table-responsive`, `inc-table-responsive--sm`, `inc-table-responsive--md`, `inc-table-responsive--lg`, `inc-table-responsive--xl`, `inc-table-responsive--xxl`, `inc-table-responsive--sticky`, `inc-table-responsive__caption`, `inc-table-responsive__footer`, and `inc-table-responsive__pagination` wrappers for dense scrollable grids that preserve horizontal scrolling rather than collapsing the table content.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0005 Provide table text helpers and section padding behavior
The UI kit MUST provide `inc-table-text`, `inc-table-text--small`, `inc-table-text--data`, `inc-table__caption`, `inc-table__caption--bottom`, and `inc-header-body--table-body` when a table lives inside a titled section with intact section body padding and captions attached to the table they describe.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `README.md`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0006 Provide accessible selection controls
The table surface MUST provide accessible selection controls for bulk-select and row-select workflows with any disabled or locked selection control remaining visibly disabled and noninteractive while the row content stays readable.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TBL-0007 Comply with shared naming, token, and accessibility rules
Table surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0001`, and `REQ-UIK-A11Y-0002`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `dist/inc-design-language.css`
  - `reference.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`
