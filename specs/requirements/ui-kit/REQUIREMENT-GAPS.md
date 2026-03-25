# UI Kit Requirement Gaps

This file tracks unresolved questions and assumptions after the shared-foundation split and the current source/dist alignment pass.

| Gap ID | Affected Specs | Question or ambiguity | Current assumption |
| --- | --- | --- | --- |
| GAP-UIK-0002 | [`SPEC-UIK-OVL`](SPEC-UIK-OVL.md), [`SPEC-UIK-INT`](SPEC-UIK-INT.md) | Should [`inc-modal`](../../../reference.html) and [`inc-offcanvas`](../../../reference.html) remain in the public surface as compatibility shells once native dialog and disclosure workflows cover more products? | This pass keeps them as compatibility surfaces while preferring native `<dialog>` and `<details>` where possible. |
| GAP-UIK-0003 | [`SPEC-UIK-UTL`](SPEC-UIK-UTL.md), [`SPEC-UIK-TXT`](SPEC-UIK-TXT.md) | Should additional public utility families be split into separate specs if the shipped class set grows further? | This pass keeps layout utilities in [`SPEC-UIK-UTL`](SPEC-UIK-UTL.md) and public text helpers in [`SPEC-UIK-TXT`](SPEC-UIK-TXT.md), and leaves the future family split question open until there is a clear usage need. |
| GAP-UIK-0005 | All verified specs | Should the verification layer stay source-review only, or should future passes add executable browser or visual verification? | This pass records a source-review verification baseline in [`VER-UIK-0001`](../../verification/ui-kit/VER-UIK-0001.md), adds a repo-local smoke gate in [`VER-UIK-0002`](../../verification/ui-kit/VER-UIK-0002.md), and still leaves runtime browser or visual automation as a future option. |

If you want the next pass to split or merge any of the current family-level specs, record that here before changing the file set so the trace history stays explicit.
