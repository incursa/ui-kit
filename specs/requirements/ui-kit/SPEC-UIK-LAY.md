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

This specification covers the application shell, page framing wrappers, footer-bar surfaces, and responsive column layouts. Top-level navigation surfaces are documented separately in [`SPEC-UIK-NAV`](SPEC-UIK-NAV.md).

## Context

The kit is designed for dense internal applications, so the page shell and layout surfaces are part of the design language rather than afterthoughts. Low-level grid, row, column, stack, and flex helpers are documented separately in [`SPEC-UIK-UTL`](SPEC-UIK-UTL.md).

## REQ-UIK-LAY-0001 Provide an application shell
The UI kit MUST provide [`inc-app-shell`](../../../reference.html) with header, body, sidebar, main, content, and footer regions as a reusable page frame.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LAY-0002 Provide page framing primitives
The UI kit MUST provide [`inc-page`](../../../reference.html), [`inc-page__breadcrumbs`](../../../reference.html), [`inc-page__body`](../../../reference.html), [`inc-page-header`](../../../reference.html), [`inc-page-header__title`](../../../reference.html), [`inc-page-header__actions`](../../../reference.html), [`inc-section-container`](../../../reference.html), [`inc-breadcrumb-body`](../../../reference.html), [`inc-footer-bar`](../../../reference.html), [`inc-footer-bar__menu`](../../../reference.html), and [`inc-footer-bar__meta`](../../../reference.html) as page-framing wrappers.

Notes:
- [`inc-page`](../../../reference.html) is the preferred canonical wrapper; [`inc-breadcrumb-body`](../../../reference.html) remains a compatibility alias that maps to the same layout contract.
- [`inc-footer-bar__menu`](../../../reference.html) is a compact action cluster inside the footer bar, not a separate navigation system.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LAY-0003 Provide multi-column layout primitives
The UI kit MUST provide [`inc-two-column-layout`](../../../reference.html), [`inc-two-column-layout__sidebar`](../../../reference.html), [`inc-two-column-layout__content`](../../../reference.html), [`inc-three-column-layout`](../../../reference.html), [`inc-three-column-layout__left`](../../../reference.html), [`inc-three-column-layout__main`](../../../reference.html), and [`inc-three-column-layout__right`](../../../reference.html) composition primitives for record and queue screens that preserve reading order while collapsing to fewer columns at narrower breakpoints.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `record-detail.html`
  - `native-patterns.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-LAY-0004 Preserve compact page framing at narrow widths
The layout surface MUST keep page framing readable at narrow widths by reflowing, wrapping, or scrolling instead of clipping primary labels, values, or actions.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
