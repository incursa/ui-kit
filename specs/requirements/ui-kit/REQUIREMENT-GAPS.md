# UI Kit Requirement Gaps

This file tracks unresolved questions and assumptions after the shared-foundation split and the current source/dist alignment pass.

| Gap ID | Affected Specs | Question or ambiguity | Current assumption |
| --- | --- | --- | --- |
| GAP-UIK-0002 | `SPEC-UIK-OVL`, `SPEC-UIK-INT` | Should `inc-modal` and `inc-offcanvas` remain in the public surface as compatibility shells once native dialog and disclosure workflows cover more products? | This pass keeps them as compatibility surfaces while preferring native `<dialog>` and `<details>` where possible. |
| GAP-UIK-0003 | `SPEC-UIK-UTL`, `SPEC-UIK-TXT` | Should additional public utility families be split into separate specs if the shipped class set grows further? | This pass keeps layout utilities in `SPEC-UIK-UTL` and public text helpers in `SPEC-UIK-TXT`, and leaves the future family split question open. |
| GAP-UIK-0004 | `SPEC-UIK-VAL` | Should validation stay centralized, or should some control-specific validation rules eventually move into per-control specs if the behavior diverges? | This pass keeps validation centralized because the same feedback pattern still applies across multiple controls. |
| GAP-UIK-0005 | All verified specs | Should the verification layer stay source-review only, or should future passes add executable browser or visual verification? | This pass records a source-review verification baseline in `VER-UIK-0001` and does not yet add runtime automation. |
| GAP-UIK-0012 | `SPEC-UIK-BTN`, `SPEC-UIK-FDBK` | The button loading state now references the shared busy-state vocabulary, and the source exposes shared loading helper surfaces, but the current button indicator still renders locally. Should future passes migrate the button markup to the shared helper surface, or keep the current pseudo-element fallback? | This pass treats the loading vocabulary as shared and leaves the button rendering path open. |

If you want the next pass to split or merge any of the current family-level specs, record that here before changing the file set so the trace history stays explicit.
