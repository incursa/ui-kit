# Getting Started

Incursa UI Kit is a reusable UI package for data-heavy business applications. It gives you a CSS-first design language, optional JavaScript helpers, optional browser-native Web Components, icons, examples, and generated MCP resources from one npm package.

## Install

```bash
npm install @incursa/ui-kit
```

Use a local tarball while testing unpublished changes:

```bash
npm pack
npm install ./incursa-ui-kit-x.y.z.tgz
```

## Choose A Surface

| Need | Use |
| --- | --- |
| Existing HTML needs the Incursa look | [`dist/inc-design-language.css`](../reference.html) |
| Existing HTML needs tabs, menus, collapses, auto-refresh, theme switching, or dialog launch hooks | [`dist/inc-design-language.js`](../reference.html) with the CSS |
| A consumer app wants to tune fonts, colors, density, or Bootstrap defaults at build time | [`src/inc-design-language.scss`](../reference.html) |
| Plain HTML/JavaScript wants declarative custom elements for supported families | `@incursa/ui-kit/web-components` with `@incursa/ui-kit/web-components/style.css` |
| A consumer needs semantic icons without coupling to Lucide names | `@incursa/ui-kit/icons` |

## Import Examples

Compiled CSS:

```js
import "@incursa/ui-kit/dist/inc-design-language.css";
```

Optional helper runtime:

```js
import "@incursa/ui-kit/dist/inc-design-language.js";
```

Optional Web Components:

```js
import "@incursa/ui-kit/web-components/style.css";
import "@incursa/ui-kit/web-components";
```

SCSS source:

```scss
@import "@incursa/ui-kit/src/inc-design-language";
```

## What To Read Next

- Start with `reference.html` for copy/paste CSS-first component markup.
- Use `web-components.html` when you want the browser-native layer.
- Use `docs/component-catalog.md` to find the right source files, examples, specs, and generated catalog entries.
- Use `docs/style-control.md` before overriding colors, fonts, density, or Bootstrap-level tokens.

