---
artifact_id: SPEC-UIK-MET
artifact_type: specification
title: Metrics and Status Surfaces
domain: ui-kit
capability: metrics-and-status-surfaces
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - metrics
  - status
---

# SPEC-UIK-MET - Metrics and Status Surfaces

## Purpose

Define the surfaces used for dashboard metrics, read-only detail values, and compact status signaling.

## Scope

This specification covers summary blocks, overview layouts, key-value detail surfaces, badges, progress indicators, and meter surfaces.

## Context

This kit frequently presents status and operational data more than consumer-style content, so compact numeric and label-value surfaces are first-class.

## REQ-UIK-MET-0001 Provide summary metric surfaces
The UI kit MUST provide `inc-summary-overview`, `inc-summary-overview--2-col`, `inc-summary-overview--3-col`, `inc-summary-overview--4-col`, `inc-summary-block`, `inc-summary-block__header`, `inc-summary-block__header--with-action`, `inc-summary-block__header-action`, `inc-summary-block__body`, `inc-summary-block__body--left`, `inc-summary-block__body--right`, `inc-summary-block__body--status-count`, `inc-summary-block__value`, `inc-summary-block__value--large`, `inc-summary-block__value--medium`, `inc-summary-block__value--small`, `inc-summary-block__status`, `inc-summary-block__status--horizontal`, `inc-summary-block__status-count`, `inc-summary-block__status-badge`, `inc-summary-block__status-badge--pending`, `inc-summary-block__status-badge--approved`, `inc-summary-block__status-badge--rejected`, `inc-summary-block__status-badge--info`, and `inc-summary-block__status-badge--neutral` surfaces for dashboard-level metrics that present header, value, status, and action areas as one readable unit.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-MET-0002 Provide key-value detail surfaces
The metrics surface MUST provide `inc-key-value-grid`, `inc-key-value`, `inc-key-value--card`, `inc-key-value__label`, `inc-key-value__value`, `inc-key-value__value--data`, and `inc-key-value__value--strong` surfaces for read-only detail display that keep label/value pairs obvious at a glance.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `record-detail.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-MET-0003 Provide compact status indicators
The metrics surface MUST provide `inc-badge`, `inc-badge--primary`, `inc-badge--secondary`, `inc-badge--success`, `inc-badge--danger`, `inc-badge--warning`, `inc-badge--info`, `inc-badge--light`, `inc-badge--dark`, `inc-badge--pill`, `inc-progress`, `inc-progress--sm`, `inc-progress--success`, `inc-progress--warning`, `inc-progress--danger`, `inc-meter`, `inc-meter--success`, `inc-meter--warning`, and `inc-meter--danger` indicators for compact status and completion signaling that communicate state with both text and visual emphasis where appropriate.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `data-grid-advanced.html`
    - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-MET-0004 Provide responsive summary-overview layouts
The summary overview surface MUST arrange summary blocks in a responsive row or grid layout that collapses to fewer columns on narrow screens without reordering the blocks or hiding their values.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
    - `work-queue.html`
  - Verified By:
    - `VER-UIK-0001`

## REQ-UIK-MET-0005 Preserve accessible metric labels
The metrics surface MUST keep textual labels visible for badges, progress, meters, and summary blocks while ensuring compact status indicators do not rely on color or shape alone to communicate meaning.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `data-grid-advanced.html`
    - `overlay-workflows.html`
    - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-MET-0006 Comply with shared naming, token, and accessibility rules
Metric and status surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0003`, `REQ-UIK-TOK-0004`, `REQ-UIK-A11Y-0001`, and `REQ-UIK-A11Y-0003`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`
