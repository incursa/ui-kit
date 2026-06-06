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

This specification covers summary blocks, overview layouts, key-value detail surfaces, badges, progress indicators, meter surfaces, and compact sparkline trend evidence.

## Context

This kit frequently presents status and operational data more than consumer-style content, so compact numeric and label-value surfaces are first-class.

## REQ-UIK-MET-0001 Provide summary metric surfaces
The UI kit MUST provide [`inc-summary-overview`](../../../reference.html), [`inc-summary-overview--2-col`](../../../reference.html), [`inc-summary-overview--3-col`](../../../reference.html), [`inc-summary-overview--4-col`](../../../reference.html), [`inc-summary-block`](../../../reference.html), [`inc-summary-block__header`](../../../reference.html), [`inc-summary-block__header--with-action`](../../../reference.html), [`inc-summary-block__header-action`](../../../reference.html), [`inc-summary-block__body`](../../../reference.html), [`inc-summary-block__body--left`](../../../reference.html), [`inc-summary-block__body--right`](../../../reference.html), [`inc-summary-block__body--status-count`](../../../reference.html), [`inc-summary-block__value`](../../../reference.html), [`inc-summary-block__value--large`](../../../reference.html), [`inc-summary-block__value--medium`](../../../reference.html), [`inc-summary-block__value--small`](../../../reference.html), [`inc-summary-block__status`](../../../reference.html), [`inc-summary-block__status--horizontal`](../../../reference.html), [`inc-summary-block__status-count`](../../../reference.html), [`inc-summary-block__status-badge`](../../../reference.html), [`inc-summary-block__status-badge--pending`](../../../reference.html), [`inc-summary-block__status-badge--approved`](../../../reference.html), [`inc-summary-block__status-badge--rejected`](../../../reference.html), [`inc-summary-block__status-badge--info`](../../../reference.html), and [`inc-summary-block__status-badge--neutral`](../../../reference.html) surfaces for dashboard-level metrics that present header, value, status, and action areas as one readable unit.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0002 Provide key-value detail surfaces
The metrics surface MUST provide [`inc-key-value-grid`](../../../reference.html), [`inc-key-value`](../../../reference.html), [`inc-key-value--card`](../../../reference.html), [`inc-key-value__label`](../../../reference.html), [`inc-key-value__value`](../../../reference.html), [`inc-key-value__value--data`](../../../reference.html), and [`inc-key-value__value--strong`](../../../reference.html) surfaces for read-only detail display that keep label/value pairs obvious at a glance.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `native-patterns.html`
  - `record-detail.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0003 Provide compact status indicators
The metrics surface MUST provide [`inc-badge`](../../../reference.html), [`inc-badge--primary`](../../../reference.html), [`inc-badge--secondary`](../../../reference.html), [`inc-badge--success`](../../../reference.html), [`inc-badge--danger`](../../../reference.html), [`inc-badge--warning`](../../../reference.html), [`inc-badge--info`](../../../reference.html), [`inc-badge--pill`](../../../reference.html), [`inc-progress`](../../../reference.html), [`inc-progress--sm`](../../../reference.html), [`inc-progress--success`](../../../reference.html), [`inc-progress--warning`](../../../reference.html), [`inc-progress--danger`](../../../reference.html), [`inc-meter`](../../../reference.html), [`inc-meter--success`](../../../reference.html), [`inc-meter--warning`](../../../reference.html), and [`inc-meter--danger`](../../../reference.html) indicators for compact status and completion signaling that communicate state with both text and visual emphasis where appropriate.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `data-grid-advanced.html`
    - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0004 Provide responsive summary-overview layouts
The summary overview surface MUST arrange summary blocks in a responsive row or grid layout that collapses to fewer columns on narrow screens without reordering the blocks or hiding their values.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `overlay-workflows.html`
    - `native-patterns.html`
    - `work-queue.html`
  - Verified By:
    - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0005 Preserve accessible metric labels
The metrics surface MUST keep textual labels visible for badges, progress, meters, and summary blocks while ensuring compact status indicators do not rely on color or shape alone to communicate meaning.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `data-grid-advanced.html`
    - `overlay-workflows.html`
    - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0007 Provide compact sparkline trends
The metrics surface MUST provide [`inc-sparkline`](../../../reference.html) for compact trend evidence next to current values, deltas, and comparison labels without introducing a full charting surface.

The sparkline surface MUST support simple numeric values, timestamped points, line and area rendering, quiet empty states, marker/reference affordances, and semantic tone variants that can be themed through CSS custom properties.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - [`src/web-components/components/visualizations.js`](../../../src/web-components/components/visualizations.js)
    - `reference.html`
    - `web-components.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-MET-0006 Comply with shared naming, token, and accessibility rules
Metric and status surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0003`](SPEC-UIK-TOK.md#req-uik-tok-0003-expose-the-public-color-scales), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), and [`REQ-UIK-A11Y-0003`](SPEC-UIK-A11Y.md#req-uik-a11y-0003-announce-shared-status-surfaces-through-semantics-rather-than-styling-alone).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
