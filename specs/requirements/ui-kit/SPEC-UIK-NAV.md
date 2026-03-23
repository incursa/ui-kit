---
artifact_id: SPEC-UIK-NAV
artifact_type: specification
title: Navigation Shell and Menus
domain: ui-kit
capability: navigation-shell-and-menus
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - navigation
  - menus
---

# SPEC-UIK-NAV - Navigation Shell and Menus

## Purpose

Define the app-wide navigation surfaces used by the UI kit.

## Scope

This specification covers the navbar shell, navigation links, breadcrumb-backed triads, sidebar menus, user menus, tabs, and pagination. It does not cover page framing.

## Context

The kit uses navigation as part of the page shell, so the app chrome has its own spec boundary rather than being mixed into generic layout documentation.

## REQ-UIK-NAV-0001 Provide a navbar shell
The UI kit MUST provide `inc-navbar`, `inc-navbar--app`, `inc-navbar--expand-sm`, `inc-navbar--expand-md`, `inc-navbar--expand-lg`, `inc-navbar__brand`, `inc-navbar__text`, `inc-navbar__toggler`, `inc-navbar__toggler-icon`, `inc-navbar__collapse`, `inc-navbar__nav`, `inc-navbar__utilities`, `inc-navbar-expand-xl`, and `inc-navbar-expand-xxl` for app chrome that keeps brand, primary navigation, and utility actions visually separated.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `dist/inc-design-language.css`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0002 Provide navigation link surfaces
The navigation surface MUST provide `inc-nav`, `inc-nav-link`, `inc-nav-tabs`, `inc-nav-pills`, `inc-nav-fill`, and `inc-nav-justified` surfaces for inline navigation and tab-like switches that make hover, focus, and active states visually obvious.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0003 Provide triad and breadcrumb surfaces
The navigation surface MUST provide `inc-nav-triad`, `inc-nav-triad__container`, `inc-nav-triad__back`, `inc-nav-triad__breadcrumb`, `inc-nav-triad__origin`, `inc-breadcrumb`, and `inc-breadcrumb__item` surfaces for breadcrumb-backed section switching that preserve a clear hierarchy between back, breadcrumb, and origin regions.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0004 Provide sidebar and user menu surfaces
The navigation surface MUST provide `inc-sidebar-menu`, `inc-sidebar-menu__section`, `inc-sidebar-menu__label`, `inc-sidebar-menu__item`, `inc-sidebar-menu__item--active`, `inc-sidebar-menu__text`, `inc-sidebar-menu__hint`, `inc-user-menu`, `inc-user-menu__toggle`, `inc-user-menu__avatar`, `inc-user-menu__meta`, `inc-user-menu__name`, and `inc-user-menu__detail` surfaces for secondary navigation and account controls that retain visible focus and active feedback.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `work-queue.html`
    - `record-detail.html`
    - `native-patterns.html`
  - `overlay-workflows.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0005 Provide responsive navbar collapse behavior
The navbar surface MUST provide `inc-navbar__toggler` and `inc-navbar__collapse` as a paired responsive control area that hides and reveals the primary navigation without changing the brand or utility ordering.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `reference.html`
    - `demo.html`
    - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0006 Provide tab and pagination surfaces
The navigation surface MUST provide `inc-tabs-folder`, `inc-tabs-line`, `inc-tabs-nav`, `inc-tab`, `inc-tab-icon`, `inc-tab-content`, `inc-tab-pane`, `inc-pagination`, `inc-pagination--sm`, `inc-pagination--lg`, `inc-pagination__item`, and `inc-pagination__link` surfaces for switching between related content regions and paginated result sets that keep the active tab or current page visually distinct from inactive content.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-NAV-0007 Comply with shared layout, naming, accessibility, and interaction rules
Navigation surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-STD-0002`, `REQ-UIK-A11Y-0001`, `REQ-UIK-A11Y-0002`, `REQ-UIK-LAY-0001`, `REQ-UIK-INT-0001`, `REQ-UIK-INT-0006`, and `REQ-UIK-INT-0007`.

Trace:
  - Code Refs:
    - `src/inc-design-language.scss`
    - `src/inc-design-language.js`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`
