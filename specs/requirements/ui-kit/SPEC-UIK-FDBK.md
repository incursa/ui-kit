---
artifact_id: SPEC-UIK-FDBK
artifact_type: specification
title: Feedback and Operational States
domain: ui-kit
capability: feedback-and-operational-states
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - feedback
  - states
---

# SPEC-UIK-FDBK - Feedback and Operational States

## Purpose

Define the surfaces used for alerts, empty states, transient notifications, and asynchronous status.

## Scope

This specification covers alerts, banners, empty states, state panels, toast surfaces, loading indicators, live-region support, and activity timelines.

## Context

Operational UIs need explicit messaging for success, warning, failure, absence, and loading states without forcing application-specific styling.

## REQ-UIK-FDBK-0001 Provide alert and banner surfaces
The UI kit MUST provide `inc-alert`, `inc-alert-container`, `inc-alert--primary`, `inc-alert--secondary`, `inc-alert--success`, `inc-alert--danger`, `inc-alert--warning`, `inc-alert--info`, `inc-alert--dismissible`, and `inc-alert__heading` surfaces for inline and block-level messages with severity variants readable without relying on color alone.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0002 Provide empty-state and state-panel surfaces
The feedback surface MUST provide `inc-empty-state`, `inc-empty-state__content`, `inc-empty-state__icon`, `inc-empty-state__form`, `inc-empty-state__actions`, `inc-state-panel`, `inc-state-panel__head`, `inc-state-panel__icon`, `inc-state-panel__title`, `inc-state-panel__body`, `inc-state-panel__actions`, `inc-state-panel--empty`, `inc-state-panel--results`, `inc-state-panel--loading`, `inc-state-panel--error`, and `inc-state-panel--locked` surfaces for absence and workflow-state messaging that present their message, supporting copy, and actions in a stable vertical order.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0003 Provide permission and announcement surfaces
The feedback surface MUST provide `inc-permission-banner`, `inc-permission-banner__icon`, `inc-permission-banner__title`, `inc-permission-banner__text`, and `inc-live-region` for permission notices and screen-reader announcements while keeping the live-region surface present for assistive technologies even when the notice is visually subtle.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0004 Provide loading and spinner surfaces
The feedback surface MUST provide `inc-loading`, `inc-skeleton`, `inc-skeleton--title`, `inc-skeleton--text`, `inc-skeleton--text-sm`, `inc-skeleton--chip`, `inc-skeleton--avatar`, `inc-skeleton--button`, `inc-loading-dots`, `inc-spinner`, `inc-spinner--border`, `inc-spinner--border--sm`, `inc-spinner--border--primary`, `inc-spinner--border--secondary`, `inc-spinner--border--success`, `inc-spinner--border--danger`, `inc-spinner--border--warning`, `inc-spinner--border--info`, `inc-spinner--grow`, and `inc-spinner--grow--sm` for asynchronous flows that preserve the surrounding layout footprint where possible and serve as the shared busy-state vocabulary for controls and workflow surfaces.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0005 Provide toast surfaces
The feedback surface MUST provide `inc-toast`, `inc-toast__header`, `inc-toast__body`, `inc-toast-container`, `inc-toast-stack`, `inc-toast-card`, `inc-toast-card__icon`, `inc-toast-card__title`, and `inc-toast-card__text` for transient notifications that stack predictably without blocking the primary page flow.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0006 Provide activity-history and refresh-status surfaces
The feedback surface SHOULD provide `inc-timeline`, `inc-timeline__item`, `inc-timeline__rail`, `inc-timeline__dot`, `inc-timeline__dot--warning`, `inc-timeline__dot--danger`, `inc-timeline__dot--success`, `inc-timeline__content`, `inc-timeline__header`, `inc-timeline__meta`, `inc-timeline__title`, `inc-timeline__body`, `inc-auto-refresh`, `inc-auto-refresh--inline`, `inc-auto-refresh__countdown`, `inc-auto-refresh__status`, `inc-auto-refresh__label`, `inc-auto-refresh__status-text`, `inc-auto-refresh__value`, `inc-auto-refresh__spinner`, `inc-auto-refresh__toggle`, and `inc-auto-refresh__toggle-text` for ordered activity history and refresh status with a readable pause/resume state.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0007 Announce feedback and status surfaces
The feedback surface MUST expose alerts, banners, empty states, toast cards, and live status text through alert or live-region semantics when they communicate important state while remaining readable without depending on color alone.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-FDBK-0008 Comply with shared naming, token, and accessibility rules
Feedback and operational-state surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0004`, `REQ-UIK-CNV-0004`, `REQ-UIK-A11Y-0001`, `REQ-UIK-A11Y-0003`, and `REQ-UIK-A11Y-0006`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - `VER-UIK-0001`
