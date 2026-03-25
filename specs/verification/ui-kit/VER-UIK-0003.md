---
artifact_id: VER-UIK-0003
artifact_type: verification
title: UI Kit Playwright Browser Automation Coverage
domain: ui-kit
status: complete
owner: ui-kit-maintainers
verifies:
  - REQ-UIK-INT-0001
  - REQ-UIK-INT-0002
  - REQ-UIK-INT-0003
  - REQ-UIK-INT-0004
  - REQ-UIK-INT-0005
  - REQ-UIK-INT-0006
  - REQ-UIK-INT-0009
  - REQ-UIK-OVL-0002
  - REQ-UIK-OVL-0004
  - REQ-UIK-OVL-0005
tags:
  - ui-kit
  - verification
  - browser
  - playwright
---

# VER-UIK-0003 - UI Kit Playwright Browser Automation Coverage

## Purpose

Record the browser-level automation that proves the shipped helper contract against the static showcase pages.

## Scope

This verification covers representative runtime behavior for the helper-managed public surface: tab switching, focus restoration, modal and offcanvas open/close behavior, native dialog launch hooks, and the auto-refresh toggle state.

## Preconditions

- The repository has been built so the `dist/` artifacts exist.
- Chromium has been installed for Playwright, either through `npm run test:browser:install` or an equivalent local setup.

## Verification Method

Run the repository-local Playwright suite:

```bash
npm run test:browser
```

The browser suite checks:

- `work-queue.html` tab switching and arrow-key navigation
- `overlay-workflows.html` modal and offcanvas open/close behavior, focus restoration, and backdrop dismissal
- `native-patterns.html` native dialog launch hooks for [`dialog.inc-native-dialog`](../../../reference.html)
- `states.html` auto-refresh pause and resume state changes

`npm run test:browser:install` downloads the Chromium browser binary that the suite uses when it is not already present.

## Evidence

- `playwright.config.mjs`
- `tests/browser/_helpers.mjs`
- `tests/browser/auto-refresh.spec.mjs`
- `tests/browser/native-dialog.spec.mjs`
- `tests/browser/overlays.spec.mjs`
- `tests/browser/tabs.spec.mjs`
- `work-queue.html`
- `overlay-workflows.html`
- `native-patterns.html`
- `states.html`

## Status

Complete for the repo-local browser automation layer. This complements [`VER-UIK-0002`](VER-UIK-0002.md) rather than replacing the build, smoke, or package validation gates.
