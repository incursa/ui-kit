---
artifact_id: SPEC-UIK-CARD
artifact_type: specification
title: Card and Section Surfaces
domain: ui-kit
capability: card-and-section-surfaces
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - cards
  - sections
---

# SPEC-UIK-CARD - Card and Section Surfaces

## Purpose

Define the reusable card and titled section surfaces used for grouped content.

## Scope

This specification covers the card container, card header and body regions, card content/media helpers, and the titled section shell used for card-like content.

## Context

Cards and titled sections are the default way to group related content without committing to a heavier page layout.

## REQ-UIK-CARD-0001 Provide a neutral card container
The UI kit MUST provide `inc-card`, `inc-card__header`, `inc-card__header--compact`, `inc-card__body`, `inc-card__body--flush`, and `inc-card__footer` as neutral content container surfaces for grouped information that preserve a clear top-to-bottom reading order.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CARD-0002 Provide card content and media helpers
The card surface MUST provide `inc-card__title`, `inc-card__subtitle`, `inc-card__text`, `inc-card__link`, `inc-card__img`, `inc-card__img--top`, `inc-card__img--bottom`, and `inc-card__img-overlay` helpers for card content, imagery, and linked actions while keeping titles and actions readable when imagery is present.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CARD-0003 Provide a titled section shell
The UI kit MUST provide `inc-header-body`, `inc-header-body--card`, `inc-header-body--panel`, `inc-header-body--flush`, `inc-header-body--compact`, `inc-header-body__header`, `inc-header-body__header--simple`, `inc-header-body__header--complex`, `inc-header-body__body`, `inc-header-body__title`, `inc-header-body__subtitle`, and `inc-header-body__actions` for titled sections with actions that keep the title, subtitle, and action regions visually grouped.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CARD-0004 Preserve accessible card and section labels
The card and titled section surfaces MUST keep titles, subtitles, body content, and action regions in a readable source order while exposing any linked or clickable card treatment as one clear accessible label instead of multiple unlabeled targets.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CARD-0005 Comply with shared naming, token, and accessibility rules
Card and section surfaces MUST comply with `REQ-UIK-STD-0001`, `REQ-UIK-TOK-0004`, and `REQ-UIK-A11Y-0001`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - `VER-UIK-0001`
