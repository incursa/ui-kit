# Contributing

## Local setup

```bash
npm install
npm run build
```

Open the static showcase pages from the repo root with any simple local server.

## Change policy

- Keep the public class surface under the `inc-*` prefix.
- Prefer extending existing generic blocks over adding feature-specific one-offs.
- Keep examples aligned with the reusable package, not the other way around.
- Treat `dist/` as build output, but keep it current in commits so the package is directly usable from GitHub.

## Before opening a pull request

```bash
npm run build
```

If you changed the showcase, verify the relevant HTML pages in a browser.

