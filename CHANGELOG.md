# Changelog

## 1.7.0

- Made the file workflow examples functional with shared browse, drag-drop, and removable file-row behavior.
- Added dismissible and timeout-driven alert behavior, fixed close-button rendering, and tightened the auto-refresh controls and loading-button examples.
- Improved dark-mode contrast across filter chips, review-grid row states, and related showcase surfaces, with expanded browser coverage and refreshed generated assets.

## 1.6.1

- Published the expanded Web Components and visual hierarchy updates in a corrected follow-up after the failed v1.6.0 tag run.
- Regenerated the MCP manifest outputs so release verification and published artifacts stay in sync.
- Hardened the PowerShell release helper so failed native commands stop the release before any commit, tag, or push.

## 1.6.0

- Added new Web Components for buttons, alerts, badges, spinners, empty states, list groups, and key-value layouts, and split the runtime into clearer component modules.
- Refined the visual hierarchy across cards, tabs, alerts, outline buttons, empty states, validation surfaces, and the auto-refresh control with subtle surfaced styling.
- Expanded browser/reference coverage and refreshed the generated package, MCP assets, and runtime documentation to match the new component surface.

## 1.5.0

- Refactored the shared source, published bundles, and Web Components entrypoints to improve readability and maintainability.
- Expanded browser coverage with a new reference-page spec and refreshed theme/layout snapshots.
- Refreshed the showcase, reference, and agent guidance docs so the published surface stays aligned.

## 1.2.0

Added support for Web Components

## 1.1.0

- Added the packaged browser-native Web Components layer under `@incursa/ui-kit/web-components`, including layouts, navigation, forms, feedback, overlays, and theme controls.
- Added paired showcase pages for the CSS-first and Web Components layers, with browser tests and dark-mode parity coverage.
- Hardened the shared showcase styling and Web Components runtime so direct-file loading, dark mode, and attribute reflection stay stable.

## 1.0.1

- Moved validity styling into the control-family requirements while keeping the shared validation vocabulary centralized.
- Normalized loading-button examples to use the shared spinner helper markup and expanded the repo-local smoke gate with DOM coverage.
- Tightened the architecture and release docs so the packaged surface, examples, and release flow stay aligned.

## 1.0.0

- Reworked the shared Spec Trace foundation into explicit naming, token, control-convention, accessibility, and interaction layers.
- Renamed binary choice child elements to flat BEM names and canonized `data-bs-theme` as the global theme activation hook.
- Traced the helper data attributes for accordion grouping, modal and offcanvas dismissal, auto-refresh labels, and native dialog launch.
- Refreshed the published CSS, JS helper, examples, and verification notes to match the revised public surface.

## 0.4.1

- Added pause and resume controls to the inc-auto-refresh widget.
- Updated the helper JavaScript to preserve remaining time while paused and resume from the same countdown.
- Refreshed the reference examples, showcase, and published assets for the updated widget markup.

## 0.4.0

- Added a reusable inc-auto-refresh widget with fixed and inline presentation modes.
- Extended the optional helper JavaScript to drive countdown rendering, hidden-tab deadline handling, and reload-state transitions.
- Documented the new pattern in the reference catalog, operational states showcase, and README.

## 0.3.7

Update Sass build commands and token imports

Why:
- The Sass build process needed improvements for better handling of deprecation warnings and to reduce output noise during compilation.

What:
- Updated the uild:css and uild:css:min scripts in package.json to include options for quieting deprecation warnings and reducing output verbosity.
- Changed the import method in _inc-tokens.scss from @import to @forward and @use for better modularity and to align with the latest Sass best practices.
- Updated inc-design-language.scss to use the new token import method.

Notes / risks:
- Ensure that all styles are still correctly compiled after these changes.
- Review any potential impacts on existing styles due to the new import structure.

Tests:
- Tests: Existing unit tests for styles should cover these changes.

## 0.3.6

Add guidance for table-body header layout variant

## 0.3.5

- Added `.inc-header-body--table-body` to pad table-body content and remove nested table bottom margins.
- Regenerated the published CSS artifacts for the new table-body layout variant.

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
