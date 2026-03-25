---
artifact_id: SPEC-UIK-TOK
artifact_type: specification
title: Theme Tokens and Value Contract
domain: ui-kit
capability: theme-tokens
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - tokens
  - theme
  - values
---

# SPEC-UIK-TOK - Theme Tokens and Value Contract

## Purpose

Define the shared token names and token-layer responsibilities that the component specs depend on.

## Scope

This specification covers the theme-facing token file, the deeper token file, the public color and typography scales, the shared spacing and shape scales, and the Bootstrap override mapping built on top of those tokens.

## Context

The kit already exposes a token layer in source, so the specification should describe the stable named values rather than restate the compiled CSS output.

## REQ-UIK-TOK-0001 Keep the theme-facing token file canonical for brand-facing values
`src/_inc-theme.scss` MUST remain the canonical source for brand-facing font and color tokens.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `package.json`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0002 Expose the public typography token family
The theme layer MUST expose the canonical typography tokens [`$inc-font-family-sans`](../../../reference.html), [`$inc-font-family-mono`](../../../reference.html), [`$inc-font-size-base`](../../../reference.html), [`$inc-line-height-base`](../../../reference.html), [`$inc-heading-weight`](../../../reference.html), and [`$inc-button-weight`](../../../reference.html).

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/_inc-tokens.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0003 Expose the public color scales
The theme layer MUST expose the canonical color scales [`$inc-white`](../../../reference.html), [`$inc-ink-*`](../../../reference.html), [`$inc-brand-*`](../../../reference.html), [`$inc-blue-*`](../../../reference.html), [`$inc-accent-*`](../../../reference.html), [`$inc-success-*`](../../../reference.html), [`$inc-warning-*`](../../../reference.html), [`$inc-danger-*`](../../../reference.html), and [`$inc-secondary-fill`](../../../reference.html).

Notes:
- The current source uses those scales as the stable anchors for action, accent, success, warning, danger, and secondary styling.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0004 Expose semantic surface, border, and text tokens
The theme layer MUST expose semantic surface, border, and text tokens including [`$inc-surface-primary`](../../../reference.html), [`$inc-surface-secondary`](../../../reference.html), [`$inc-surface-muted`](../../../reference.html), [`$inc-surface-highlight`](../../../reference.html), [`$inc-surface-strong`](../../../reference.html), [`$inc-border-subtle`](../../../reference.html), [`$inc-border-default`](../../../reference.html), [`$inc-border-strong`](../../../reference.html), [`$inc-text-primary`](../../../reference.html), [`$inc-text-secondary`](../../../reference.html), [`$inc-text-muted`](../../../reference.html), [`$inc-text-inverse`](../../../reference.html), [`$inc-text-link`](../../../reference.html), and [`$inc-text-link-hover`](../../../reference.html) as the shared palette for theme-driven component schemes.

Notes:
- The kit treats color mode as a global theme concern rather than a public component-class family.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0005 Keep the deeper token file canonical for composition values
`src/_inc-tokens.scss` MUST remain the canonical source for spacing, radius, shadow, z-index, shell, and Bootstrap override tokens.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - `package.json`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0006 Expose the composition token family
The token layer MUST expose the canonical scale tokens [`$inc-space-*`](../../../reference.html), [`$inc-radius-*`](../../../reference.html), [`$inc-shadow-*`](../../../reference.html), [`$inc-z-index-*`](../../../reference.html), [`$inc-footer-height`](../../../reference.html), and [`$inc-shell-max-width`](../../../reference.html).

Notes:
- The radius family includes the shipped aliases [`$inc-radius-panel`](../../../reference.html) and [`$inc-radius-pill`](../../../reference.html).

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0007 Map public tokens onto Bootstrap variables
The token layer MUST map the public token layer onto Bootstrap variables instead of hard-coding a second visual system.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0008 Expose the shared control-density token family
The token layer MUST expose the canonical control-density tokens [`$inc-control-density-micro-padding-block`](../../../reference.html), [`$inc-control-density-micro-padding-inline`](../../../reference.html), [`$inc-control-density-micro-select-padding-inline-start`](../../../reference.html), [`$inc-control-density-micro-select-arrow-inset-inline-end`](../../../reference.html), [`$inc-control-density-micro-font-size`](../../../reference.html), [`$inc-control-density-micro-line-height`](../../../reference.html), [`$inc-control-density-micro-min-height`](../../../reference.html), [`$inc-control-density-micro-border-radius`](../../../reference.html), [`$inc-control-density-micro-select-arrow-width`](../../../reference.html), and [`$inc-control-density-micro-select-arrow-height`](../../../reference.html).

Notes:
- The current source uses these values as the stable anchors for compact buttons, inputs, selects, and input-group surfaces.
- The repo intentionally permits the `--micro` density modifier on any supported control surface; touch-context warnings belong in tooling, not in this contract.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - [`src/inc-design-language.scss`](../../../reference.html)
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)

## REQ-UIK-TOK-0009 Use the root theme attribute as the global color-mode activation hook
The UI kit MUST use `data-bs-theme` on the document root or another outer theme scope as the public activation hook for global light and dark theme mappings while avoiding public component-level light and dark modifiers.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/_inc-tokens.scss`
  - [`dist/inc-design-language.css`](../../../reference.html)
  - `reference.html`
  - `demo.html`
  - `index.html`
- Verified By:
  - [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md)
