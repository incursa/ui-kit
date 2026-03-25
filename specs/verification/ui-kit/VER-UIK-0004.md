---
artifact_id: VER-UIK-0004
artifact_type: verification
title: UI Kit Web Component Browser Coverage
domain: ui-kit
status: complete
owner: ui-kit-maintainers
verifies:
  - REQ-UIK-WC-0001
  - REQ-UIK-WC-0002
  - REQ-UIK-WC-0003
  - REQ-UIK-WC-0004
  - REQ-UIK-WC-0005
  - REQ-UIK-WC-0006
  - REQ-UIK-WC-0010
  - REQ-UIK-WC-0050
  - REQ-UIK-WC-0060
  - REQ-UIK-WC-0080
tags:
  - ui-kit
  - verification
  - browser
  - playwright
  - web-components
---

# VER-UIK-0004 - UI Kit Web Component Browser Coverage

## Purpose

Record the browser-level verification that proves the Web Component layer is an additive, browser-native facade over the existing CSS-first UI kit.

## Scope

This verification covers the current WC runtime surface that exists in the repository today:

- layout and shell wrappers
- native-backed overlay and disclosure components
- document-theme propagation around WC content
- responsive composition of WC hosts at narrow and desktop widths
- stable visual snapshots for the representative WC shell and overlay regions

The browser suite is intentionally scoped to what can be exercised in a real browser without framework assumptions. The CSS-first surfaces remain canonical and are verified elsewhere.

## Preconditions

- The repository has been built so the `dist/` stylesheet is available for the fixture page.
- Playwright Chromium is installed.
- The WC source modules under `src/web-components/` are present and importable from a local file-based fixture page.

## Verification Method

Run the repository-local Playwright suite for the WC browser slice:

```bash
npm run test:browser -- tests/browser/web-components
```

The WC suite checks:

- host upgrade and rendering for the layout and overlay custom elements
- attribute reflection and slot projection on layout wrappers
- disclosure toggle behavior, dialog open/close behavior, and drawer dismissal behavior
- keyboard and focus behavior for the overlay surfaces, including focus restoration after dismissal
- theme switching at the document root so the WC hosts are proven against both light and dark presentation
- responsive composition at desktop and narrow widths
- screenshot baselines for stable WC preview regions only

## Coverage Notes

The WC browser coverage is DOM-first for behavior that is deterministic and easy to assert:

- custom-element upgrade and host class reflection
- slot placement and projected content
- emitted DOM events
- focus movement and restoration
- root theme attribute changes

It uses screenshots only for stable preview surfaces where a visual regression adds value and the rendered region is intentionally small enough to keep the baseline reliable.

The current browser coverage does not attempt to prove CSS-only families that remain intentionally outside the WC layer in v1, such as tables, key/value grids, list groups, timelines, bulk bars, filter bars, file review flows, or atom-level helpers.

## Evidence

- `tests/browser/web-components/fixture.html`
- `tests/browser/web-components/render.spec.mjs`
- `tests/browser/web-components/interactions.spec.mjs`
- `tests/browser/web-components/theme.spec.mjs`
- `tests/browser/web-components/responsive.spec.mjs`
- generated Playwright screenshot snapshots under `tests/browser/web-components/`

## Status

Complete for the current browser-level proof of the WC v1 surface. The suite is green, and the committed snapshot baselines capture the stable WC layout views in light, dark, and narrow states.
