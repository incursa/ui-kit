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
The UI kit MUST provide [`inc-navbar`](../../../reference.html), [`inc-navbar--app`](../../../reference.html), [`inc-navbar--expand-sm`](../../../reference.html), [`inc-navbar--expand-md`](../../../reference.html), [`inc-navbar--expand-lg`](../../../reference.html), [`inc-navbar__brand`](../../../reference.html), [`inc-navbar__text`](../../../reference.html), [`inc-navbar__toggler`](../../../reference.html), [`inc-navbar__toggler-icon`](../../../reference.html), [`inc-navbar__collapse`](../../../reference.html), [`inc-navbar__nav`](../../../reference.html), [`inc-navbar__utilities`](../../../reference.html), [`inc-navbar-expand-xl`](../../../reference.html), and [`inc-navbar-expand-xxl`](../../../reference.html) for app chrome that keeps brand, primary navigation, and utility actions visually separated.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - [`dist/inc-design-language.css`](../../../reference.html)
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
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0002 Provide navigation link surfaces
The navigation surface MUST provide [`inc-nav`](../../../reference.html), [`inc-nav-link`](../../../reference.html), [`inc-nav-tabs`](../../../reference.html), [`inc-nav-pills`](../../../reference.html), [`inc-nav-fill`](../../../reference.html), and [`inc-nav-justified`](../../../reference.html) surfaces for inline navigation and tab-like switches that make hover, focus, and active states visually obvious.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
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
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0003 Provide triad and breadcrumb surfaces
The navigation surface MUST provide [`inc-nav-triad`](../../../reference.html), [`inc-nav-triad__container`](../../../reference.html), [`inc-nav-triad__back`](../../../reference.html), [`inc-nav-triad__breadcrumb`](../../../reference.html), [`inc-nav-triad__origin`](../../../reference.html), [`inc-breadcrumb`](../../../reference.html), and [`inc-breadcrumb__item`](../../../reference.html) surfaces for breadcrumb-backed section switching that preserve a clear hierarchy between back, breadcrumb, and origin regions.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
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
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0004 Provide sidebar and user menu surfaces
The navigation surface MUST provide [`inc-sidebar-menu`](../../../reference.html), [`inc-sidebar-menu__section`](../../../reference.html), [`inc-sidebar-menu__label`](../../../reference.html), [`inc-sidebar-menu__item`](../../../reference.html), [`inc-sidebar-menu__item--active`](../../../reference.html), [`inc-sidebar-menu__text`](../../../reference.html), [`inc-sidebar-menu__hint`](../../../reference.html), [`inc-user-menu`](../../../reference.html), [`inc-user-menu__toggle`](../../../reference.html), [`inc-user-menu__avatar`](../../../reference.html), [`inc-user-menu__meta`](../../../reference.html), [`inc-user-menu__name`](../../../reference.html), and [`inc-user-menu__detail`](../../../reference.html) surfaces for secondary navigation and account controls that retain visible focus and active feedback.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
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
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0005 Provide responsive navbar collapse behavior
The navbar surface MUST provide [`inc-navbar__toggler`](../../../reference.html) and [`inc-navbar__collapse`](../../../reference.html) as a paired responsive control area that hides and reveals the primary navigation without changing the brand or utility ordering.

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - `reference.html`
    - `demo.html`
    - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0006 Provide tab and pagination surfaces
The navigation surface MUST provide [`inc-tabs-folder`](../../../reference.html), [`inc-tabs-line`](../../../reference.html), [`inc-tabs-nav`](../../../reference.html), [`inc-tab`](../../../reference.html), [`inc-tab-icon`](../../../reference.html), [`inc-tab-content`](../../../reference.html), [`inc-tab-pane`](../../../reference.html), [`inc-pagination`](../../../reference.html), [`inc-pagination--sm`](../../../reference.html), [`inc-pagination--lg`](../../../reference.html), [`inc-pagination__item`](../../../reference.html), and [`inc-pagination__link`](../../../reference.html) surfaces for switching between related content regions and paginated result sets that keep the active tab or current page visually distinct from inactive content.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-NAV-0007 Comply with shared layout, naming, accessibility, and interaction rules
Navigation surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-STD-0002`](SPEC-UIK-STD.md#req-uik-std-0002-allow-compatibility-aliases), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0002`](SPEC-UIK-A11Y.md#req-uik-a11y-0002-keep-form-and-control-associations-intact), [`REQ-UIK-LAY-0001`](SPEC-UIK-LAY.md#req-uik-lay-0001-provide-an-application-shell), [`REQ-UIK-INT-0001`](SPEC-UIK-INT.md#req-uik-int-0001-recognize-helper-managed-toggle-triggers), [`REQ-UIK-INT-0006`](SPEC-UIK-INT.md#req-uik-int-0006-support-keyboard-navigation-for-menus-and-tabs), and [`REQ-UIK-INT-0007`](SPEC-UIK-INT.md#req-uik-int-0007-support-helper-managed-dropdown-menus).

Trace:
  - Code Refs:
    - [`src/inc-design-language.scss`](../../../reference.html)
    - [`src/inc-design-language.js`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `states.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
