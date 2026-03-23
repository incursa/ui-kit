---
artifact_id: SPEC-UIK-CNV
artifact_type: specification
title: Control Surface Conventions
domain: ui-kit
capability: control-surface-conventions
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - controls
  - conventions
  - modifiers
---

# SPEC-UIK-CNV - Control Surface Conventions

## Purpose

Define the shared class, modifier, and state conventions used by interactive and entry controls.

## Scope

This specification covers layered base classes, shared density suffixes, inline-growth modifiers, and visual state hooks used across shipped control surfaces. It does not define the button, text-entry, select, or group surfaces themselves.

## Context

The SCSS keeps action buttons, text-entry controls, selects, input groups, and refresh toggles aligned by reusing the same modifier grammar instead of inventing a separate convention for each surface.

## REQ-UIK-CNV-0001 Keep control surfaces layered
Public control surfaces MUST express a stable base class plus explicit modifier classes for semantic, density, layout, or state changes instead of replacing the base class name.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `states.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CNV-0002 Reuse density modifier names
Public control surfaces that ship compact sizes MUST reuse the `--sm`, `--lg`, and `--micro` modifier names across related controls.

Notes:
- The repo intentionally allows `--micro` on supported control surfaces instead of reserving it for a touch-only tier.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `states.html`
  - `work-queue.html`
  - `record-detail.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CNV-0003 Reuse inline expansion modifiers
Public control surfaces that need to grow inside inline compositions MUST reuse `--expand` as the flex-growth modifier.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CNV-0004 Keep visual state hooks separate from native semantics
Visual state hooks such as `is-loading`, `is-valid`, `is-invalid`, and `is-paused` MUST change presentation without changing the underlying native role, label association, or focus target.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CNV-0005 Express control emphasis as modifiers
The UI kit MUST express public control emphasis such as primary, secondary, warning, error, or outline treatment as explicit modifiers on the control surface rather than by changing the base block or the native element meaning.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `overlay-workflows.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
  - `native-patterns.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-CNV-0006 Allow mixed public surfaces
Public surfaces MAY share a DOM node when the combined classes each remain independently meaningful.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `native-patterns.html`
  - `overlay-workflows.html`
  - `states.html`
  - `work-queue.html`
  - `data-grid-advanced.html`
- Verified By:
  - `VER-UIK-0001`
