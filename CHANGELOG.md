# Changelog

## 0.3.4

- Refined `.inc-btn` to use inline flex alignment so button icons and labels center consistently.
- Hid empty `.inc-alert` and `.alert` containers to avoid rendering blank alert chrome.
- Added a release-time changelog check so patch, minor, and major bumps fail locally if the matching changelog section is missing.

## 0.3.3

- Refined `.inc-btn` to use inline flex alignment so button icons and labels center consistently.
- Hid empty `.inc-alert` and `.alert` containers to avoid rendering blank alert chrome.

## 0.3.2

- Removed unused runtime dependency metadata so the published package no longer advertises Sass and watcher internals as consumer dependencies.
- Kept the package focused on compiled CSS, optional helper JavaScript, and SCSS source entry points.

## 0.3.1

- Fixed the npm Trusted Publishing workflow to follow npm's documented requirements more closely.
- Upgraded npm in the publish job before publishing with provenance.
- Removed manual workflow dispatch from the publish workflow and documented that failed publishes should be retried from the original tag-triggered run.

## 0.3.0

- Added a guided PowerShell release helper and switched npm publishing to a tag-driven workflow.
- Added spacing and visibility utility classes to reduce Bootstrap utility dependence.
- Added named table families for review, analytics, and spreadsheet-style grids.
- Added modal and offcanvas overlay workflow examples plus helper JS support.

## 0.2.1

- Renamed the package identity to `@incursa/ui-kit` for publication.
- Finalized the public-ready package shape.
- Added B2B workflow patterns for validation, filter bars, states, advanced grids, files, timelines, and drawers.
- Added showcase pages for states, forms and validation, and advanced data-grid workflows.
- Added native-first disclosure, menu, and dialog patterns.
- Tuned the theme palette toward indigo primary with brighter warning and danger accents.
