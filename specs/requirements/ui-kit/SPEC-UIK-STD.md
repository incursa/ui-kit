---
artifact_id: SPEC-UIK-STD
artifact_type: specification
title: Public Surface Standards
domain: ui-kit
capability: public-surface-standards
status: draft
owner: ui-kit-maintainers
tags:
  - ui-kit
  - standards
  - naming
---

# SPEC-UIK-STD - Public Surface Standards

## Purpose

Define the naming baseline that applies to every public `inc-*` surface in the UI kit.

## Scope

This specification covers public class naming, BEM structure, compatibility aliases, and the reserved utility prefix. It does not define component-specific visuals or layouts.

## Context

The component specs stay more useful when they inherit one explicit baseline for naming instead of repeating the same assumptions in every file.

## REQ-UIK-STD-0001 Use stable public naming
The UI kit MUST use the `inc-` prefix for all public CSS classes and BEM-style naming with `__` for elements and `--` for modifiers.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `README.md`
  - `LLMS.txt`
  - `reference.html`
  - `demo.html`
  - `forms-and-validation.html`
  - `data-grid-advanced.html`
  - `overlay-workflows.html`
  - `native-patterns.html`
  - `work-queue.html`
  - `record-detail.html`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-STD-0002 Allow compatibility aliases
Compatibility aliases MAY remain when they map to an existing canonical public surface and do not introduce a second contract.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-STD-0003 Reserve the utility prefix
Atomic utility classes MUST use the `inc-u-` prefix.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `demo.html`
  - `AI-AGENT-INSTRUCTIONS.md`
  - `states.html`
- Verified By:
  - `VER-UIK-0001`

## REQ-UIK-STD-0004 Forbid element-of-element names
Public BEM element names MUST NOT use nested element separators such as `inc-block__element__child`.

Trace:
- Code Refs:
  - `src/inc-design-language.scss`
  - `reference.html`
  - `forms-and-validation.html`
  - `LLMS.txt`
- Verified By:
  - `VER-UIK-0001`
