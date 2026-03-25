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
The UI kit MUST provide [`inc-alert`](../../../reference.html), [`inc-alert-container`](../../../reference.html), [`inc-alert--primary`](../../../reference.html), [`inc-alert--secondary`](../../../reference.html), [`inc-alert--success`](../../../reference.html), [`inc-alert--danger`](../../../reference.html), [`inc-alert--warning`](../../../reference.html), [`inc-alert--info`](../../../reference.html), [`inc-alert--dismissible`](../../../reference.html), and [`inc-alert__heading`](../../../reference.html) surfaces for inline and block-level messages with severity variants readable without relying on color alone.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0002 Provide empty-state and state-panel surfaces
The feedback surface MUST provide [`inc-empty-state`](../../../reference.html), [`inc-empty-state__content`](../../../reference.html), [`inc-empty-state__icon`](../../../reference.html), [`inc-empty-state__form`](../../../reference.html), [`inc-empty-state__actions`](../../../reference.html), [`inc-state-panel`](../../../reference.html), [`inc-state-panel__head`](../../../reference.html), [`inc-state-panel__icon`](../../../reference.html), [`inc-state-panel__title`](../../../reference.html), [`inc-state-panel__body`](../../../reference.html), [`inc-state-panel__actions`](../../../reference.html), [`inc-state-panel--empty`](../../../reference.html), [`inc-state-panel--results`](../../../reference.html), [`inc-state-panel--loading`](../../../reference.html), [`inc-state-panel--error`](../../../reference.html), and [`inc-state-panel--locked`](../../../reference.html) surfaces for absence and workflow-state messaging that present their message, supporting copy, and actions in a stable vertical order.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0003 Provide permission and announcement surfaces
The feedback surface MUST provide [`inc-permission-banner`](../../../reference.html), [`inc-permission-banner__icon`](../../../reference.html), [`inc-permission-banner__title`](../../../reference.html), [`inc-permission-banner__text`](../../../reference.html), and [`inc-live-region`](../../../reference.html) for permission notices and screen-reader announcements while keeping the live-region surface present for assistive technologies even when the notice is visually subtle.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0004 Provide loading and spinner surfaces
The feedback surface MUST provide [`inc-loading`](../../../reference.html), [`inc-skeleton`](../../../reference.html), [`inc-skeleton--title`](../../../reference.html), [`inc-skeleton--text`](../../../reference.html), [`inc-skeleton--text-sm`](../../../reference.html), [`inc-skeleton--chip`](../../../reference.html), [`inc-skeleton--avatar`](../../../reference.html), [`inc-skeleton--button`](../../../reference.html), [`inc-loading-dots`](../../../reference.html), [`inc-spinner`](../../../reference.html), [`inc-spinner--border`](../../../reference.html), [`inc-spinner--border--sm`](../../../reference.html), [`inc-spinner--border--primary`](../../../reference.html), [`inc-spinner--border--secondary`](../../../reference.html), [`inc-spinner--border--success`](../../../reference.html), [`inc-spinner--border--danger`](../../../reference.html), [`inc-spinner--border--warning`](../../../reference.html), [`inc-spinner--border--info`](../../../reference.html), [`inc-spinner--grow`](../../../reference.html), and [`inc-spinner--grow--sm`](../../../reference.html) for asynchronous flows that preserve the surrounding layout footprint where possible and serve as the shared busy-state vocabulary for controls and workflow surfaces.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0005 Provide toast surfaces
The feedback surface MUST provide [`inc-toast`](../../../reference.html), [`inc-toast__header`](../../../reference.html), [`inc-toast__body`](../../../reference.html), [`inc-toast-container`](../../../reference.html), [`inc-toast-stack`](../../../reference.html), [`inc-toast-card`](../../../reference.html), [`inc-toast-card__icon`](../../../reference.html), [`inc-toast-card__title`](../../../reference.html), and [`inc-toast-card__text`](../../../reference.html) for transient notifications that stack predictably without blocking the primary page flow.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0006 Provide activity-history and refresh-status surfaces
The feedback surface SHOULD provide [`inc-timeline`](../../../reference.html), [`inc-timeline__item`](../../../reference.html), [`inc-timeline__rail`](../../../reference.html), [`inc-timeline__dot`](../../../reference.html), [`inc-timeline__dot--warning`](../../../reference.html), [`inc-timeline__dot--danger`](../../../reference.html), [`inc-timeline__dot--success`](../../../reference.html), [`inc-timeline__content`](../../../reference.html), [`inc-timeline__header`](../../../reference.html), [`inc-timeline__meta`](../../../reference.html), [`inc-timeline__title`](../../../reference.html), [`inc-timeline__body`](../../../reference.html), [`inc-auto-refresh`](../../../reference.html), [`inc-auto-refresh--inline`](../../../reference.html), [`inc-auto-refresh__countdown`](../../../reference.html), [`inc-auto-refresh__status`](../../../reference.html), [`inc-auto-refresh__label`](../../../reference.html), [`inc-auto-refresh__status-text`](../../../reference.html), [`inc-auto-refresh__value`](../../../reference.html), [`inc-auto-refresh__spinner`](../../../reference.html), [`inc-auto-refresh__toggle`](../../../reference.html), and [`inc-auto-refresh__toggle-text`](../../../reference.html) for ordered activity history and refresh status with a readable pause/resume state.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0007 Announce feedback and status surfaces
The feedback surface MUST expose alerts, banners, empty states, toast cards, and live status text through alert or live-region semantics when they communicate important state while remaining readable without depending on color alone.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `overlay-workflows.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-FDBK-0008 Comply with shared naming, token, and accessibility rules
Feedback and operational-state surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), [`REQ-UIK-CNV-0004`](SPEC-UIK-CNV.md#req-uik-cnv-0004-keep-visual-state-hooks-separate-from-native-semantics), [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused), [`REQ-UIK-A11Y-0003`](SPEC-UIK-A11Y.md#req-uik-a11y-0003-announce-shared-status-surfaces-through-semantics-rather-than-styling-alone), and [`REQ-UIK-A11Y-0006`](SPEC-UIK-A11Y.md#req-uik-a11y-0006-keep-disabled-controls-perceivable-and-noninteractive).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `states.html`
  - `demo.html`
  - `data-grid-advanced.html`
  - `work-queue.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
