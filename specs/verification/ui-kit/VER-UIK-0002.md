---
artifact_id: VER-UIK-0002
artifact_type: verification
title: UI Kit Packaged Surface Smoke Validation
domain: ui-kit
status: complete
owner: ui-kit-maintainers
verifies:
  - REQ-UIK-STD-0001
  - REQ-UIK-STD-0002
  - REQ-UIK-LAY-0002
  - REQ-UIK-LAY-0003
  - REQ-UIK-LIST-0001
  - REQ-UIK-LIST-0003
  - REQ-UIK-MET-0001
  - REQ-UIK-MET-0003
  - REQ-UIK-OVL-0007
  - REQ-UIK-INT-0009
  - REQ-UIK-VAL-0001
  - REQ-UIK-VAL-0002
  - REQ-UIK-VAL-0003
  - REQ-UIK-VAL-0005
  - REQ-UIK-BTN-0006
  - REQ-UIK-FDBK-0004
  - REQ-UIK-FDBK-0006
  - REQ-UIK-INP-0008
  - REQ-UIK-SEL-0005
  - REQ-UIK-CHO-0006
tags:
  - ui-kit
  - verification
  - smoke
  - packaging
---

# VER-UIK-0002 - UI Kit Packaged Surface Smoke Validation

## Purpose

Record the executable repo-local smoke gate for the packaged UI kit surface.

## Scope

This verification covers the existence of the shipped package files, the JS source/dist copy check, selected CSS selector presence in the compiled stylesheet, and DOM-level coverage for the reference and workflow pages that demonstrate the public surfaces expanded during this pass.

## Preconditions

- The repository has been built so the `dist/` artifacts exist.
- The repository contains the reference page and the architecture / verification documentation added in this pass.

## Verification Method

Run the repository-local smoke script:

```bash
npm run smoke
```

The script checks:

- required repository files
- byte-for-byte equality between [`src/inc-design-language.js`](../../../reference.html) and [`dist/inc-design-language.js`](../../../reference.html)
- presence of the selected public selectors in [`dist/inc-design-language.css`](../../../reference.html)
- reference and workflow-page coverage for the newly documented page-frame, list, metric, overlay, shared-helper loading button, validation-hook, and spinner variants
- basic size sanity for the compiled CSS outputs

`npm run verify` layers this smoke gate on top of `npm run build` and `npm pack --dry-run`, and `preversion` routes through `npm run verify`.

## Evidence

- `scripts/verify-ui-kit.mjs`
- `package.json`
- [`dist/inc-design-language.css`](../../../reference.html)
- [`dist/inc-design-language.min.css`](../../../reference.html)
- [`dist/inc-design-language.js`](../../../reference.html)
- `reference.html`
- `forms-and-validation.html`
- `data-grid-advanced.html`
- `states.html`
- `specs/architecture/_index.md`
- `specs/architecture/ui-kit/ARC-UIK-0001.md`

## Status

Complete for the repo-local package smoke gate. This does not replace browser-level runtime automation if the project later decides to add it.
