---
title: "Documentation"
---

# Documentation

These docs are the consumer-facing map for `@incursa/ui-kit`. They are intentionally Markdown-first so they can become the source material for a future documentation site without inventing a second documentation system today.

## Start Here

- `docs/getting-started.md`: choose the right package surface and install it.
- `docs/component-catalog.md`: find the maintained component, class, example, and Web Component sources.
- `docs/style-control.md`: understand the controlled style and token layers.
- `docs/maintainer-readiness.md`: operate the package, validation, preview, release, and readiness flow.
- `docs/documentation-maintenance.md`: keep docs, examples, specs, generated MCP resources, and package exports aligned.
- `docs/contributor-agreement-automation.md`: operate the Incursa Contributor Agreement check and required status.

## Source Of Truth

| Topic | Maintained source |
| --- | --- |
| Package identity and exports | `package.json` |
| CSS-first class catalog | `reference.html` |
| Full-page examples | `demo.html`, `work-queue.html`, `record-detail.html`, `native-patterns.html`, `forms-and-validation.html`, `data-grid-advanced.html`, `states.html`, `overlay-workflows.html` |
| Web Component landing page | `web-components.html` |
| Web Component source | `src/web-components/` |
| Token and theme source | `src/_inc-theme.scss`, `src/_inc-tokens.scss`, [`src/inc-design-language.scss`](../reference.html) |
| Public requirements | `specs/requirements/ui-kit/_index.md` |
| Verification baseline | `specs/verification/ui-kit/_index.md` |
| Maintainer readiness | `docs/maintainer-readiness.md`, `RELEASING.md`, `scripts/verify-ui-kit.mjs`, `playwright.config.mjs` |
| Contributor agreement automation | `CONTRIBUTOR-AGREEMENT.md`, `.github/workflows/contributor-agreement.yml`, `docs/contributor-agreement-automation.md` |
| AI and MCP catalog inputs | `LLMS.txt`, `AI-AGENT-INSTRUCTIONS.md`, `scripts/generate-mcp.mjs` |

## Hosted Examples

The GitHub Pages showcase remains the easiest way to browse the current visual surface: https://incursa.github.io/ui-kit

Use these Markdown docs when you need repository-local context, contribution guidance, or a future-docs-site source that is easier to review than generated HTML.
