# Agent Instructions

Use `@delivery_director` to triage and delegate when the request spans strategy, docs, release, validation, and repository maintenance. If the task is clearly a single-lane edit, skip delegation and use the narrowest specialist.

## Order Of Operations

1. Check `git status --short --branch` before editing.
2. Read [`README.md`](README.md), [`docs/README.md`](docs/README.md), [`AI-AGENT-INSTRUCTIONS.md`](AI-AGENT-INSTRUCTIONS.md), and the relevant source or spec files before changing the public surface.
3. Keep the CSS-first [`inc-*`](reference.html) class API canonical. Treat the Web Component layer as additive.
4. Keep generated and built surfaces aligned when behavior, docs, examples, or package exports change.

## Documentation Rules

- Consumer-facing docs belong under [`docs/`](docs).
- Keep source-of-truth details in [`package.json`](package.json), [`reference.html`](reference.html), [`web-components.html`](web-components.html), [`src/web-components/`](src/web-components), [`specs/requirements/ui-kit/`](specs/requirements/ui-kit), and generated MCP inputs.
- Do not duplicate every selector, attribute, or event in prose. Point to the maintained reference, spec, source module, or generated catalog.
- When markdown changes, run `node scripts/linkify-markdown-docs.mjs --check`.

## Validation

Use the narrowest gate that proves the change:

- Markdown-only changes: `npm run docs:check`.
- Package docs or manifest-source changes: `npm run build:mcp:manifests` plus the markdown link check.
- Runtime, component, style, or package export changes: `npm run verify`.
- Browser behavior changes: `npm run test:browser` or the smallest relevant Playwright project/file.

## Guardrails

- Preserve unrelated worktree changes.
- Do not commit local logs, test screenshots, [`test-results/`](test-results), `playwright-report/`, tarballs, credentials, private transcripts, or private paths.
- Do not modify CLA or other legal terms without owner approval. This repository follows the Incursa baseline in [`CONTRIBUTOR-AGREEMENT.md`](CONTRIBUTOR-AGREEMENT.md), [`.github/workflows/contributor-agreement.yml`](.github/workflows/contributor-agreement.yml), and [`docs/contributor-agreement-automation.md`](docs/contributor-agreement-automation.md).
- Do not claim GitHub settings, npm Trusted Publishing, Cloudflare secrets, branch rules, private vulnerability reporting, or required status checks are configured unless verified.
