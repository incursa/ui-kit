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
The UI kit MUST provide [`inc-card`](../../../reference.html), [`inc-card__header`](../../../reference.html), [`inc-card__header--compact`](../../../reference.html), [`inc-card__body`](../../../reference.html), [`inc-card__body--flush`](../../../reference.html), and [`inc-card__footer`](../../../reference.html) as neutral content container surfaces for grouped information that preserve a clear top-to-bottom reading order.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CARD-0002 Provide card content and media helpers
The card surface MUST provide [`inc-card__title`](../../../reference.html), [`inc-card__subtitle`](../../../reference.html), [`inc-card__text`](../../../reference.html), [`inc-card__link`](../../../reference.html), [`inc-card__img`](../../../reference.html), [`inc-card__img--top`](../../../reference.html), [`inc-card__img--bottom`](../../../reference.html), and [`inc-card__img-overlay`](../../../reference.html) helpers for card content, imagery, and linked actions while keeping titles and actions readable when imagery is present.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CARD-0003 Provide a titled section shell
The UI kit MUST provide [`inc-header-body`](../../../reference.html), [`inc-header-body--card`](../../../reference.html), [`inc-header-body--panel`](../../../reference.html), [`inc-header-body--flush`](../../../reference.html), [`inc-header-body--compact`](../../../reference.html), [`inc-header-body__header`](../../../reference.html), [`inc-header-body__header--simple`](../../../reference.html), [`inc-header-body__header--complex`](../../../reference.html), [`inc-header-body__body`](../../../reference.html), [`inc-header-body__title`](../../../reference.html), [`inc-header-body__subtitle`](../../../reference.html), and [`inc-header-body__actions`](../../../reference.html) for titled sections with actions that keep the title, subtitle, and action regions visually grouped.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CARD-0004 Preserve accessible card and section labels
The card and titled section surfaces MUST keep titles, subtitles, body content, and action regions in a readable source order while exposing any linked or clickable card treatment as one clear accessible label instead of multiple unlabeled targets.

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-CARD-0005 Comply with shared naming, token, and accessibility rules
Card and section surfaces MUST comply with [`REQ-UIK-STD-0001`](SPEC-UIK-STD.md#req-uik-std-0001-use-stable-public-naming), [`REQ-UIK-TOK-0004`](SPEC-UIK-TOK.md#req-uik-tok-0004-expose-semantic-surface-border-and-text-tokens), and [`REQ-UIK-A11Y-0001`](SPEC-UIK-A11Y.md#req-uik-a11y-0001-keep-interactive-surfaces-keyboard-operable-and-visibly-focused).

Trace:
- Code Refs:
  - [`src/inc-design-language.scss`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
