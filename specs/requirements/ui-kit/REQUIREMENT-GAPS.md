# UI Kit Requirement Gaps

This file tracks unresolved questions and assumptions after the shared-foundation split and the current source/dist alignment pass.

| Gap ID | Affected Specs | Question or ambiguity | Current assumption |
| --- | --- | --- | --- |
| GAP-UIK-0002 | `SPEC-UIK-OVL`, `SPEC-UIK-INT` | Should `inc-modal` and `inc-offcanvas` remain in the public surface as compatibility shells once native dialog and disclosure workflows cover more products? | This pass keeps them as compatibility surfaces while preferring native `<dialog>` and `<details>` where possible. |
| GAP-UIK-0003 | `SPEC-UIK-UTL`, `SPEC-UIK-TXT` | Should additional public utility families be split into separate specs if the shipped class set grows further? | This pass keeps layout utilities in `SPEC-UIK-UTL` and public text helpers in `SPEC-UIK-TXT`, and leaves the future family split question open until there is a clear usage need. |
| GAP-UIK-0005 | All verified specs | Should the verification layer stay source-review only, or should future passes add executable browser or visual verification? | This pass records a source-review verification baseline in `VER-UIK-0001`, adds a repo-local smoke gate in `VER-UIK-0002`, and still leaves runtime browser or visual automation as a future option. |

If you want the next pass to split or merge any of the current family-level specs, record that here before changing the file set so the trace history stays explicit.
