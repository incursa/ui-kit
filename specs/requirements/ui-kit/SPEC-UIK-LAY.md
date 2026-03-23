---
artifact_id: SPEC-UIK-LAY
artifact_type: specification
title: Layout Primitives and Shell
domain: ui-kit
capability: layout-and-page-shell
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - layout
  - shell
---

# SPEC-UIK-LAY - Layout Primitives and Shell

## Purpose

Define the shared page-framing surfaces that other component specs rely on.

## Scope

This specification covers the application shell, page framing wrappers, footer-bar surfaces, and responsive column layouts. Top-level navigation surfaces are documented separately in `SPEC-UIK-NAV`.

## Context

The kit is designed for dense internal applications, so the page shell and layout surfaces are part of the design language rather than afterthoughts. Low-level grid, row, column, stack, and flex helpers are documented separately in `SPEC-UIK-UTL`.

## REQ-UIK-LAY-0001 Provide an application shell
The UI kit MUST provide `inc-app-shell` with header, body, sidebar, main, content, and footer regions as a reusable page frame.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LAY-0002 Provide page framing primitives
The UI kit MUST provide `inc-page`, `inc-page__breadcrumbs`, `inc-page__body`, `inc-page-header`, `inc-page-header__title`, `inc-page-header__actions`, `inc-section-container`, `inc-breadcrumb-body`, `inc-footer-bar`, `inc-footer-bar__menu`, and `inc-footer-bar__meta` as page-framing wrappers.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LAY-0003 Provide multi-column layout primitives
The UI kit MUST provide `inc-two-column-layout`, `inc-two-column-layout__sidebar`, `inc-two-column-layout__content`, `inc-three-column-layout`, `inc-three-column-layout__left`, `inc-three-column-layout__main`, and `inc-three-column-layout__right` composition primitives for record and queue screens that preserve reading order while collapsing to fewer columns at narrower breakpoints.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `record-detail.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-LAY-0004 Preserve compact page framing at narrow widths
The layout surface MUST keep page framing readable at narrow widths by reflowing, wrapping, or scrolling instead of clipping primary labels, values, or actions.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`
