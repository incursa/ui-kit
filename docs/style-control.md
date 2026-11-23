---
title: "Controlled Styles And Tokens"
---

# Controlled Styles And Tokens

The package exposes controlled style layers so consumers can get the Incursa look quickly, tune it deliberately, and avoid private one-off overrides.

## Layer Order

| Layer | File or entrypoint | Use when |
| --- | --- | --- |
| Compiled CSS | [`dist/inc-design-language.css`](../reference.html) | A consumer app wants the finished look with no Sass pipeline. |
| Canonical tokens | `@incursa/ui-kit/tokens` | Tooling or a consumer needs the versioned machine-readable design values. |
| Token custom properties | `@incursa/ui-kit/tokens.css` | A consumer needs the generated [`--inc-*`](../reference.html) token surface without the component stylesheet. |
| Generated theme variables | `src/_inc-theme.scss` | A Sass consumer needs the generated fonts, brand colors, semantic surfaces, or text colors. |
| Token and Bootstrap wiring | `src/_inc-tokens.scss` | A consumer needs deeper spacing, radius, shadow, density, z-index, or Bootstrap variable tuning. |
| Main SCSS entrypoint | [`src/inc-design-language.scss`](../reference.html) | A consumer wants the full source build with Bootstrap Sass available. |
| Helper runtime | [`dist/inc-design-language.js`](../reference.html) | A consumer needs standardized interaction behavior for supported data attributes. |
| Web Component stylesheet | `@incursa/ui-kit/web-components/style.css` | A consumer uses the custom-element layer and wants the default look. |

## Recommended Customization Order

1. Change shared values in `tokens/incursa.tokens.json` and run `npm run build:tokens`.
2. Keep product-only values in the product rather than adding them to the shared token contract.
3. Override Bootstrap-facing composition through `src/_inc-tokens.scss` only when it is not a shared design token.
4. Rebuild the CSS.
5. Add local product CSS only for product-specific layout or content that does not belong in the shared package.
6. Propose a new [`inc-*`](../reference.html) block only when the pattern is reusable across data-heavy business applications.

Do not edit `src/_inc-theme.scss`, `src/_inc-composition-tokens.scss`, or
`dist/incursa-tokens.css` directly. They are generated and `npm run
check:tokens` rejects drift.

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

## Direction

- Put `dir="rtl"` or `dir="ltr"` on the document or the nearest direction-changing scope.
- Use the same component and utility classes in both directions.
- Physical `--left` and `--right` alignment modifiers remain physical by contract; ordinary layout follows logical inline start and end.

## What Not To Override

- Do not reach into private generated markup inside a Web Component unless that contract is documented.
- Do not create product-specific backgrounds, report styles, customer-specific shells, or print rules in this package.
- Do not fork the token vocabulary for the Web Component layer. It uses the same CSS and token system as the CSS-first surface.

