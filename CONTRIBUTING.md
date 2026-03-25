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
- If you touch markdown docs, run `node scripts/linkify-markdown-docs.mjs --check` before opening a pull request.

## Before opening a pull request

```bash
npm run build
```

If you changed the showcase, verify the relevant HTML pages in a browser.
