---
title: "Maintainer Readiness"
---

# Maintainer Readiness

This page is the maintainer-facing operating map for `@incursa/ui-kit`. It explains what must stay true before a package or documentation change is ready to publish.

## Purpose And Consumers

Incursa UI Kit is a reusable UI foundation for data-heavy business applications. Its primary consumers are Incursa applications, Razor or ASP.NET Core screens, static HTML examples, and plain JavaScript applications that need a consistent Incursa UI language without adopting a framework-specific component library.

Use the package when a consuming app needs:

- the canonical [`inc-*`](../reference.html) CSS class surface;
- compiled CSS that already includes the Bootstrap layer;
- source SCSS for controlled theme and token customization;
- optional vanilla JavaScript helpers for stateful primitives;
- optional same-package Web Components for supported browser-native families;
- generated MCP resources for tool and agent consumers.

Do not put product-specific report styles, customer-specific layouts, private assets, or app-only workflow code in this repository.

## Package And App Boundaries

| Boundary | Maintained files | Notes |
| --- | --- | --- |
| Public package metadata | [`package.json`](../package.json), [`package-lock.json`](../package-lock.json) | Defines npm identity, exports, package files, runtime dependencies, scripts, and publish access. |
| CSS-first design language | [`src/inc-design-language.scss`](../src/inc-design-language.scss), [`src/_inc-theme.scss`](../src/_inc-theme.scss), [`src/_inc-tokens.scss`](../src/_inc-tokens.scss), [`reference.html`](../reference.html) | This remains the canonical public surface. |
| Optional helper runtime | [`src/inc-design-language.js`](../src/inc-design-language.js), [`dist/inc-design-language.js`](../dist/inc-design-language.js) | Owns menus, tabs, collapses, dialog launch hooks, auto-refresh, and theme controls. |
| Optional Web Components | [`src/web-components/`](../src/web-components), [`web-components.html`](../web-components.html), [`dist/web-components/`](../dist/web-components) | Additive browser-native entrypoint over the same design language. |
| Icons | [`src/icons/`](../src/icons), [`dist/icons/`](../dist/icons) | Exposes semantic Incursa icon names with a default Lucide-backed renderer. |
| Static examples | [`index.html`](../index.html), [`demo.html`](../demo.html), [`work-queue.html`](../work-queue.html), [`record-detail.html`](../record-detail.html), [`native-patterns.html`](../native-patterns.html), [`forms-and-validation.html`](../forms-and-validation.html), [`data-grid-advanced.html`](../data-grid-advanced.html), [`states.html`](../states.html), [`overlay-workflows.html`](../overlay-workflows.html) | These are the local preview and behavior proof surfaces. |
| MCP resources | [`scripts/generate-mcp.mjs`](../scripts/generate-mcp.mjs), [`src/mcp/worker.ts`](../src/mcp/worker.ts), [`dist/mcp/`](../dist/mcp) | Generated from package docs, examples, specs, and metadata. |
| Specifications and verification | [`specs/requirements/ui-kit/`](../specs/requirements/ui-kit), [`specs/architecture/`](../specs/architecture), [`specs/verification/ui-kit/`](../specs/verification/ui-kit) | Keep requirements, rationale, and verification evidence aligned with public behavior. |

The repository is a package plus examples and generated docs resources. It is not an application shell for a single product.

## Design System Conventions

- Keep public classes in the [`inc-*`](../reference.html) namespace.
- Keep the BEM-style shape: [`inc-block`](../reference.html), [`inc-block__element`](../reference.html), and [`inc-block--modifier`](../reference.html).
- Keep CSS-first markup canonical; Web Components wrap stable families instead of replacing the class vocabulary.
- Keep native controls native when possible. Use wrappers for labels, hints, validation, density, and layout consistency.
- Use `data-bs-theme` as the global light/dark hook. Do not add separate light/dark component class families.
- Use semantic Incursa icon names instead of coupling consumers to Lucide names.
- Add new Web Component contracts only when the behavior is declarative, reusable, testable, and worth a runtime boundary.
- Update examples, specs, docs, and generated MCP output together when a public surface changes.

## Component And Shell Architecture

The CSS layer is organized around reusable page, form, table, status, action, overlay, and layout primitives. The practical component map is in [`docs/component-catalog.md`](component-catalog.md), with copy/paste markup in [`reference.html`](../reference.html).

The Web Component layer follows this shape:

1. Shared base behavior in [`src/web-components/base-element.js`](../src/web-components/base-element.js), [`src/web-components/shared.js`](../src/web-components/shared.js), and [`src/web-components/registry.js`](../src/web-components/registry.js).
2. Controllers for focus, selection, overlay, and theme behavior under [`src/web-components/controllers/`](../src/web-components/controllers).
3. Family modules under [`src/web-components/components/`](../src/web-components/components).
4. A thin public bootstrap in [`src/web-components/index.js`](../src/web-components/index.js).

Keep family modules small. Prefer shared controllers before adding duplicated focus, dismissal, theme, or selection logic.

## Local Development Commands

Install dependencies:

```bash
npm install
```

Run the markdown policy check after docs edits:

```bash
npm run docs:check
```

Rebuild package outputs:

```bash
npm run build
```

Run the package smoke gate:

```bash
npm run smoke
```

Run MCP tests:

```bash
npm run test:mcp
```

Run the full local package gate:

```bash
npm run verify
```

Create a local tarball for consumer validation:

```bash
npm pack --dry-run
npm pack
```

## Preview And Browser Validation

There is no Storybook project in this repository. Use the static HTML examples and Playwright browser tests.

Open the local examples directly in a browser when checking layout or copy/paste markup:

- [`index.html`](../index.html)
- [`reference.html`](../reference.html)
- [`web-components.html`](../web-components.html)
- [`forms-and-validation.html`](../forms-and-validation.html)
- [`data-grid-advanced.html`](../data-grid-advanced.html)
- [`states.html`](../states.html)

Run the Playwright browser suite:

```bash
npm run test:browser
```

If Chromium is missing on a new machine:

```bash
npm run test:browser:install
```

For focused checks, call Playwright against the relevant spec file, for example:

```bash
npx playwright test tests/browser/web-components/rendering.spec.mjs
```

## Release And Versioning

The package is public npm package [`@incursa/ui-kit`](../package.json), licensed Apache-2.0. Normal releases are tag-driven through [`release.ps1`](../release.ps1) and [`RELEASING.md`](../RELEASING.md).

Use this local readiness path before versioning:

```bash
npm run verify
git diff --check
```

Versioning expectations:

- `patch`: fixes, polish, non-breaking docs, examples, CSS, JS, or generated MCP updates.
- `minor`: backward-compatible components, tokens, utilities, package entrypoints, or behavior.
- `major`: breaking public class, markup, token, attribute, event, package export, or runtime behavior changes.

Do not claim npm Trusted Publishing, GitHub branch rules, Cloudflare secrets, or required status checks are configured unless they have been verified in the relevant external system.

## Current Readiness Status

The repository is ready for local package maintenance when these commands pass:

```bash
npm run docs:check
npm run build
npm run smoke
npm run test:mcp
npm run test:browser
npm pack --dry-run
git diff --check
```

Maintainer readiness observations:

- The public package metadata, exports, source files, generated outputs, specs, examples, and browser tests are present.
- The CSS-first surface, optional helper runtime, optional Web Components, icons, MCP worker, and static examples have clear repository boundaries.
- The local smoke gate checks required files, package metadata, source/dist parity, MCP freshness, and HTML marker coverage.
- The browser suite covers helper behavior, static showcase pages, and Web Component rendering and interaction flows.
- The docs spine now exists under [`docs/`](README.md), with command-oriented pages for consumers and maintainers.

## Known Gaps And Cleanup Needs

- The repository does not use Storybook. Static HTML pages and Playwright are the preview and regression surfaces.
- `CONTRIBUTORS.md` or `AUTHORS.md` is not present. Add one only if the project needs a maintained contributor rollup.
- `CODEOWNERS` is not present. Add one only after ownership and review routing are agreed.
- The open-source audit expects `NOTICE.md`, while the package ships [`NOTICE`](../NOTICE). Keep the package file name unless the release policy changes.
- The audit script does not recognize [`npm-publish.yml`](../.github/workflows/npm-publish.yml) as a release workflow name. Treat that as an audit-tool naming mismatch unless the workflow itself changes.
- [`specs/README.md`](../specs) is not present. The current spec indexes live under [`specs/architecture/_index.md`](../specs/architecture/_index.md), [`specs/requirements/ui-kit/_index.md`](../specs/requirements/ui-kit/_index.md), and [`specs/verification/ui-kit/_index.md`](../specs/verification/ui-kit/_index.md).
- `npm install` reports dependency audit findings. Triage with `npm audit` before a release and avoid `npm audit fix --force` unless the resulting breaking updates are reviewed.
- The Web Component build emits non-fatal esbuild warnings for `module.exports` compatibility guards inside ESM source files. Clean those guards up only after confirming no supported consumer path relies on them.
- GitHub Pages, Cloudflare Worker deployment, npm Trusted Publishing, branch protection, CLA status requirements, and vulnerability reporting settings require external verification. Local checks do not prove those settings.
