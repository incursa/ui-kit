---
title: "Conformance and Compatibility"
---

# Conformance and Compatibility

UI Kit is the sole authority for shared tokens, public [`inc-*`](../reference.html) classes,
framework-neutral components, semantic icons, generic interaction behavior, and
component accessibility. Framework adapters emit this contract; they do not
ship a second stylesheet, browser runtime, icon set, or accessibility model.

## Exact automated baseline

| UI Kit | Source revision | Browser automation | Semantic, interaction, automated accessibility, bounded visual, shell |
| --- | --- | --- | --- |
| `1.10.0-pf-m3.3.0` (local, unreleased) | baseline revision `68e2ad425cdd4d13a4fec6fce218177edeeac47d` plus this worktree | Playwright `1.58.2`, Chromium `145.0.7632.6` (`1208`), Darwin arm64 | `conformance/` and `tests/browser/conformance.spec.mjs` |

This is a tested automation tuple, not a supported-browser claim. Adapter
repositories publish their own exact UI Kit, adapter, framework/runtime, and
automation tuple. Applications pin exact versions in both the authoritative
manifest and lockfile.

## Reusable suites

- `@incursa/ui-kit/conformance/shell` audits landmarks, skip-link targeting,
  unique IDs, control names, current-page state, protected logout, and textual
  version/revision evidence.
- `@incursa/ui-kit/conformance/playwright` runs the semantic audit, axe-core
  WCAG automation, native shell interaction checks, and consumer-owned bounded
  screenshot baselines. Consumers of this optional test entrypoint install
  compatible `@playwright/test` and `@axe-core/playwright` peer packages.
- `@incursa/ui-kit/conformance/manifest` records exact package, revision,
  entrypoint, and automation evidence metadata.

Automated checks do not replace keyboard-only, 200% zoom/reflow,
forced-colors, reduced-motion, error-recovery, or screen-reader review.

## Bounded owner decisions

The supported browser/assistive-technology matrix and the owner/retention
policy for manual accessibility evidence are intentionally unselected. Until
the portfolio owner selects both, maintainers may report automated Chromium
results and bounded visual evidence, but must not claim the manual WCAG 2.2 AA
release gate has passed.
