---
artifact_id: ARC-UIK-0001
artifact_type: architecture
title: UI Kit Design Language Architecture
domain: ui-kit
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - architecture
  - design-system
  - packaging
---

# ARC-UIK-0001 - UI Kit Design Language Architecture

## Purpose

Describe how the Incursa UI kit is structured so the shipped public surface, the requirements suite, the examples, and the package artifacts stay aligned.

## Scope

This architecture covers the design-language goals and boundaries, token layering, public CSS naming, the optional JS helper contract, the native-browser primitive strategy, the role of the example/reference pages, and the intent of the packaged `dist` artifacts.

## Design Language Goals

The kit is a dense, practical business UI standard for admin and data-heavy workflows.

It is intentionally:

- compact rather than spacious
- readable rather than decorative
- generic rather than product-specific
- semantically grounded rather than runtime-heavy
- designed for repeated composition across forms, tables, overlays, and workflow states

The public surface is the [`inc-*`](../../../reference.html) class system plus the optional helper contract. The package does not try to be a full application framework.

## Boundary Model

The package is split into a few explicit layers:

1. Theme tokens establish the brand-facing color and typography values.
2. Deeper tokens establish spacing, radius, shadow, z-index, and Bootstrap override values.
3. The SCSS entrypoint composes the public [`inc-*`](../../../reference.html) class surface.
4. The JS helper adds only narrow interaction glue where browser primitives are not enough.
5. The example HTML files demonstrate the actual shipped surface.
6. The `dist` files are the package-ready artifacts.

Validation follows the same layered approach:

- [`SPEC-UIK-VAL`](../../requirements/ui-kit/SPEC-UIK-VAL.md) owns the shared summary, feedback, and validity-hook vocabulary.
- the editable-control families own their own valid and invalid presentation rules.
- the example pages show the shared hooks in context so the family split stays visible in shipped markup.

## Token Hierarchy

`src/_inc-theme.scss` is the canonical brand-facing token layer.

`src/_inc-tokens.scss` is the canonical composition layer for:

- spacing and density
- radius and shadow
- z-index and shell dimensions
- Bootstrap variable mapping

The two files serve different purposes:

- theme tokens describe what the kit looks like
- composition tokens describe how the kit is assembled

That separation keeps visual tuning and structural tuning from collapsing into a single blob of overrides.

## Public CSS Surface

[`src/inc-design-language.scss`](../../../reference.html) is the source of truth for the public CSS surface.

Rules for the public surface:

- use the [`inc-`](../../../reference.html) prefix for every public class
- use BEM-style elements and modifiers
- keep compatibility aliases only when they map to an existing canonical surface
- keep utility helpers under [`inc-u-`](../../../reference.html)
- avoid nested element names such as [`inc-block__element__child`](../../../reference.html)

The shipped surface intentionally includes both canonical and compatibility forms where the naming history requires it. For example, [`inc-page`](../../../reference.html) and [`inc-breadcrumb-body`](../../../reference.html) are compatibility-aligned wrappers, not separate product concepts.

## Optional JS Helper

[`src/inc-design-language.js`](../../../reference.html) is a dependency-free progressive-enhancement helper.

Its scope is intentionally narrow:

- menu, tab, and collapse toggles
- modal and offcanvas state
- native dialog launch hooks
- auto-refresh widgets

It does not own application data flow, business logic, or general-purpose UI runtime behavior.

Native browser behavior stays native:

- `<details>` remains browser-controlled
- `<dialog>` remains browser-controlled after launch
- form controls, progress, meter, and disclosure primitives are preferred when they fit the use case

If a surface can be expressed with native HTML first, that is the preferred path.

## Example and Reference Page Roles

The HTML pages serve two different documentation jobs:

- `reference.html` is the canonical copy/paste catalog for public markup patterns.
- scenario pages such as `demo.html`, `work-queue.html`, `record-detail.html`, `native-patterns.html`, `overlay-workflows.html`, `forms-and-validation.html`, `states.html`, and `data-grid-advanced.html` prove the surfaces in fuller composition.

The reference page should show the densest public primitive coverage, including:

- page framing wrappers
- summary and metric variants
- list and vertical-list variants
- tooltip and popover shells
- spinner variants
- the helper-managed and native overlay patterns

The scenario pages should show how those primitives combine into actual screens.

## Packaging Intent

The package is built around three shipped artifacts:

- [`dist/inc-design-language.css`](../../../reference.html)
- [`dist/inc-design-language.min.css`](../../../reference.html)
- [`dist/inc-design-language.js`](../../../reference.html)

The CSS files are built from the SCSS source and are the primary public payload.

The JS file is copied from source and should remain byte-for-byte identical between `src/` and `dist/`.

Packaging rules:

- `npm run build` must produce the distributable assets
- `npm run smoke` should check source/dist parity, example-page DOM coverage, and public-surface coverage
- `npm pack --dry-run` should validate the package payload before release

The package should remain honest about what is shipped: reusable public CSS, optional helper behavior, and the docs that explain how to compose them.

## Open Boundaries

The architecture intentionally leaves these as explicit non-goals unless a later requirement adds them:

- app-specific branding layers
- print/report-only styling
- heavy runtime component logic
- framework-specific wrappers
- decorative or one-off product classes

If a future surface is not generic enough for multiple admin or data products, it should stay out of the public package.
