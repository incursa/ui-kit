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
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0002 Expose the public typography token family
The theme layer MUST expose the canonical typography tokens `$inc-font-family-sans`, `$inc-font-family-mono`, `$inc-font-size-base`, `$inc-line-height-base`, `$inc-heading-weight`, and `$inc-button-weight`.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/_inc-tokens.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0003 Expose the public color scales
The theme layer MUST expose the canonical color scales `$inc-white`, `$inc-ink-*`, `$inc-brand-*`, `$inc-blue-*`, `$inc-accent-*`, `$inc-success-*`, `$inc-warning-*`, `$inc-danger-*`, and `$inc-secondary-fill`.

Notes:
- The current source uses those scales as the stable anchors for action, accent, success, warning, danger, and secondary styling.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0004 Expose semantic surface, border, and text tokens
The theme layer MUST expose semantic surface, border, and text tokens including `$inc-surface-primary`, `$inc-surface-secondary`, `$inc-surface-muted`, `$inc-surface-highlight`, `$inc-surface-strong`, `$inc-border-subtle`, `$inc-border-default`, `$inc-border-strong`, `$inc-text-primary`, `$inc-text-secondary`, `$inc-text-muted`, `$inc-text-inverse`, `$inc-text-link`, and `$inc-text-link-hover` as the shared palette for theme-driven component schemes.

Notes:
- The kit treats color mode as a global theme concern rather than a public component-class family.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0005 Keep the deeper token file canonical for composition values
`src/_inc-tokens.scss` MUST remain the canonical source for spacing, radius, shadow, z-index, shell, and Bootstrap override tokens.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - `package.json`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0006 Expose the composition token family
The token layer MUST expose the canonical scale tokens `$inc-space-*`, `$inc-radius-*`, `$inc-shadow-*`, `$inc-z-index-*`, `$inc-footer-height`, and `$inc-shell-max-width`.

Notes:
- The radius family includes the shipped aliases `$inc-radius-panel` and `$inc-radius-pill`.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0007 Map public tokens onto Bootstrap variables
The token layer MUST map the public token layer onto Bootstrap variables instead of hard-coding a second visual system.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0008 Expose the shared control-density token family
The token layer MUST expose the canonical control-density tokens `$inc-control-density-micro-padding-block`, `$inc-control-density-micro-padding-inline`, `$inc-control-density-micro-select-padding-inline-start`, `$inc-control-density-micro-select-arrow-inset-inline-end`, `$inc-control-density-micro-font-size`, `$inc-control-density-micro-line-height`, `$inc-control-density-micro-min-height`, `$inc-control-density-micro-border-radius`, `$inc-control-density-micro-select-arrow-width`, and `$inc-control-density-micro-select-arrow-height`.

Notes:
- The current source uses these values as the stable anchors for compact buttons, inputs, selects, and input-group surfaces.
- The repo intentionally permits the `--micro` density modifier on any supported control surface; touch-context warnings belong in tooling, not in this contract.

Trace:
- Code Refs:
  - `src/_inc-tokens.scss`
  - `src/inc-design-language.scss`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-TOK-0009 Use the root theme attribute as the global color-mode activation hook
The UI kit MUST use `data-bs-theme` on the document root or another outer theme scope as the public activation hook for global light and dark theme mappings while avoiding public component-level light and dark modifiers.

Trace:
- Code Refs:
  - `src/_inc-theme.scss`
  - `src/_inc-tokens.scss`
  - `dist/inc-design-language.css`
  - `reference.html`
  - `demo.html`
  - `index.html`
- Verified By:
  - `VER-UIK-0001`
