---
title: "Documentation Maintenance"
---

# Documentation Maintenance

The docs should stay useful without becoming a second implementation to maintain. Prefer durable maps, source links, and generated catalog inputs over duplicated API tables.

These pages are source-authored in this repository. The mirrored copy in `incursa-docs` is generated and should not be edited by hand.

## Update Matrix

| Change | Update |
| --- | --- |
| Package export, package file list, dependency, or release surface | `package.json`, [`README.md`](README.md), `docs/getting-started.md`, generated MCP manifests |
| CSS class family or canonical markup | `reference.html`, relevant example page, `specs/requirements/ui-kit/`, `docs/component-catalog.md` if the family map changes |
| Web Component tag, attribute, property, or event | `src/web-components/`, `src/web-components/README.md`, `web-components.html`, `specs/requirements/ui-kit/SPEC-UIK-WC.md`, generated MCP manifests |
| Token, theme, density, or Sass contract | `src/_inc-theme.scss`, `src/_inc-tokens.scss`, [`src/inc-design-language.scss`](../reference.html), `docs/style-control.md`, relevant spec |
| User-facing workflow pattern | relevant HTML example, [`README.md`](README.md) or `docs/` navigation, generated MCP manifests |
| AI/MCP consumer guidance | `LLMS.txt`, `AI-AGENT-INSTRUCTIONS.md`, `scripts/generate-mcp.mjs`, generated `dist/mcp/` output |

## Validation

Use the smallest proof that matches the edit:

```bash
npm run docs:check
npm run build:mcp:manifests
npm run verify
```

Markdown-only changes usually need only the link checker. Changes that affect generated MCP resources need manifest generation. Runtime, style, package, or export changes need `npm run verify`.

## Future Docs Site

When this becomes a proper documentation site, use the Markdown pages under `docs/` as the information architecture and keep the generated source inputs:

- examples from `*.html`
- public surface from `reference.html`
- package metadata from `package.json`
- requirements from `specs/requirements/ui-kit/`
- generated catalog content from `scripts/generate-mcp.mjs`

The site should render these sources instead of creating a parallel hand-maintained component database.
