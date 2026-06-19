---
title: "Controlled Styles And Tokens"
---

# Controlled Styles And Tokens

The package exposes controlled style layers so consumers can get the Incursa look quickly, tune it deliberately, and avoid private one-off overrides.

## Layer Order

| Layer | File or entrypoint | Use when |
| --- | --- | --- |
| Compiled CSS | [`dist/inc-design-language.css`](../reference.html) | A consumer app wants the finished look with no Sass pipeline. |
| Theme variables | `src/_inc-theme.scss` | A consumer needs to change fonts, brand colors, semantic surfaces, or text colors. |
| Token and Bootstrap wiring | `src/_inc-tokens.scss` | A consumer needs deeper spacing, radius, shadow, density, z-index, or Bootstrap variable tuning. |
| Main SCSS entrypoint | [`src/inc-design-language.scss`](../reference.html) | A consumer wants the full source build with Bootstrap Sass available. |
| Helper runtime | [`dist/inc-design-language.js`](../reference.html) | A consumer needs standardized interaction behavior for supported data attributes. |
| Web Component stylesheet | `@incursa/ui-kit/web-components/style.css` | A consumer uses the custom-element layer and wants the default look. |

## Recommended Customization Order

1. Override fonts and colors through `src/_inc-theme.scss`.
2. Override spacing, radius, density, and Bootstrap-facing defaults through `src/_inc-tokens.scss`.
3. Rebuild the CSS.
4. Add local product CSS only for product-specific layout or content that does not belong in the shared package.
5. Propose a new [`inc-*`](../reference.html) block only when the pattern is reusable across data-heavy business applications.

## Theme Hooks

- `data-bs-theme` is the global light/dark activation hook.
- [`data-inc-theme-mode`](../src/inc-design-language.js), [`data-inc-theme-toggle`](../src/inc-design-language.js), and [`data-inc-theme-select`](../src/inc-design-language.js) are helper/runtime hooks.
- `window.IncTheme` can set, persist, and mount the bundled theme switcher.
- Public components should not invent separate light/dark modifier classes when the global theme hook already covers the case.

## Density And State

- Use the shared micro-density tokens from `src/_inc-tokens.scss` for compact controls.
- Use documented [`inc-*`](../reference.html) modifiers from `reference.html` for size, tone, expansion, and state.
- Keep native disabled, readonly, hidden, focus, and validation semantics intact.
- Use data attributes from [`src/inc-design-language.js`](../reference.html) only when the optional helper owns the behavior.

## What Not To Override

- Do not reach into private generated markup inside a Web Component unless that contract is documented.
- Do not create product-specific backgrounds, report styles, customer-specific shells, or print rules in this package.
- Do not fork the token vocabulary for the Web Component layer. It uses the same CSS and token system as the CSS-first surface.

