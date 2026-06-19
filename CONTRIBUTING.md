# Contributing

## Local setup

```bash
npm install
npm run build
```

Open the static showcase pages from the repo root with any simple local server.

## Change policy

- Keep the public class surface under the [`inc-*`](reference.html) prefix.
- Prefer extending existing generic blocks over adding feature-specific one-offs.
- Keep examples aligned with the reusable package, not the other way around.
- Treat [`dist/`](dist) as build output, but keep it current in commits so the package is directly usable from GitHub.
- Use code-formatted relative links for repo-local references in markdown, and reserve absolute URLs for external targets.
- If you touch markdown docs, run `npm run docs:check` before opening a pull request.
- Keep consumer-facing documentation under [`docs/`](docs), and keep detailed source-of-truth contracts in [`package.json`](package.json), [`reference.html`](reference.html), [`web-components.html`](web-components.html), [`src/web-components/`](src/web-components), and [`specs/requirements/ui-kit/`](specs/requirements/ui-kit).
- If you change package exports, component families, examples, specs, or MCP catalog inputs, update the relevant docs and generated manifests together.
- Review [`CONTRIBUTOR-AGREEMENT.md`](CONTRIBUTOR-AGREEMENT.md) before opening a pull request. Non-allowlisted contributors must satisfy the Contributor Agreement check by commenting exactly:

  ```text
  I have read the Incursa Contributor Agreement and I hereby assign my contribution rights as described.
  ```

## Before opening a pull request

```bash
npm run verify
```

For markdown-only changes, `npm run docs:check` is the minimum gate. If you changed the showcase or browser behavior, verify the relevant HTML pages in a browser or run the smallest relevant Playwright test.

Unless a file already carries a different notice, treat contributions as licensed under the repository Apache 2.0 license.
