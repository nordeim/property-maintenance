# Session 207 — The Fine Shapes + The Right Underlayer (2026-11-15, the eighth continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-ae49559 tree (the s206 ship + the owner's `session_9.md` archive).
**Inputs:** the owner's `docs/session_9.md` (the s206 transcript), the s206 plan's residual ledger (§4: the fine shapes + the moving sprites), `worklog.md`.
**Scope:** the s206 residual ledger's fine shapes retired — the hedge's vertical gradient, the right side's underlayer band (the G band + its teal patches + the blue element), the mass's sunlit rim + the deep band's true extent, the descent's bottom tip — plus the s206 dead-code cleanup (the five orphaned constants). The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

- The environment persisted (deps · the six-knob `.env` · census MATCH 15/24/10/23/12 + 4 users).
- The baseline gate on the s206 ship state: **lint 0/0 · tsc 0 · 139/2801 unit GREEN** — the s206 ship reproduced exactly.
- The docs re-verified in lockstep (worklog s206 head · SKILL v1.211.0 · pm-SKILL v1.3.0 · AGENTS Session-206 at L12941).

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-207a | **Five dead constants** — `MASS`, `MASS_DEEP`, `BUSH_LEFT`, `SOIL_GREEN`, `EDGE_GREEN` were orphaned by the s206 solid re-derivation (their blob call-sites became polygons; the constants left behind). Violates the corpus's dead-code doctrine (the s146 orphaned-test precedent). The s204 pin at tests/landing-page.test.ts:134 pins the retired `EDGE_GREEN` tone `30, 116, 48`. | Medium (the dead-code doctrine) | **Cure** (R1) |
| F-207b | **The hedge's vertical gradient** (the residual ledger's first item, decoded): the ref's hedge runs (49,160,72)@y698 → (15,95,26)@y788 — a smooth darkening; ours paints a flat (50,152,70) + a hard under-band, and its bottom-left narrows wrong (ref narrows below y770: right edge 101→85→55 with a brown soil patch (73-110, y780-805, (96,71,40))). | Medium (the y672 row's 44% cell) | **Cure** (R2) |
| F-207c | **The right side's underlayer band** (a whole genus ours lacks): a gray-green band (x1080-1255 → x1080-1240, y318-370, (173,174,129)) with TEAL patches (130,166,153) along its top edge + a stable BLUE element (30,54,89) at (1143-1173, y334-370 — a vertical slab, ~24px wide). Verified PAGE-SHARED (booking 370/landing 391 gray-green pixels; faq content-covered = 0) — canvas, not content. Also: the ref's mass carries a SUNLIT RIM (108,162,59) — a diagonal band inside the right slope ((1140,225)→(1252,297)) — and the DEEP band confined below y~275 (a wedge from (1161,276)→(1245,300)→full at y308); ours paints the deep band too high (the y282-297 rows). The descent's bottom TIP ends at y~375 (ours runs to 0.404). | High (the y336-448 rows × x1080-1440: the 44-48% cells — the booking's biggest remaining genus) | **Cure** (R3) |
| F-207d | The drifts hold at the s206 floors (booking 8.72 · landing 6.62 · faq 4.20 vs the ship's 8.86/6.66/4.21) + the ref STABLE (0.54% pair) — the s206 work introduced no regressions. The moving sprites (the red element + the warm diagonal streak at (1160,380-420)) stay the documented animation floor. | Verification | ✅ Confirmed |

## 3. The remediation record

- [x] R1 (F-207a): the five dead constants retired + the three s201/s204 tone pins re-anchored to the live carriers (HEDGE_GRAD_TOP · EDGE_DARK_SOLID · the corner-mass pin).
- [x] R2 (F-207b, TDD): the hedge re-derived — the multi-stop `polygonGradient()` (the flat hold to y~722, the convex knee (41,141,60)@y754, the bottom (15,95,26)@y788), the right slope widened, the rounded-top soil patch.
- [x] R3 (F-207c, TDD): the right side completed — the G band polygon (top edge y314) + the teal patches (the corrected fractions) + the blue slab + its light bottom cap; the sunlit rim; the deep band re-confined; the descent's lower anatomy (wide band to y355 + the lobe + the brown tip).
- [x] R3b (found mid-round, TDD): THE PHANTOM RETIREMENT — the two BUSH_RIGHT blobs ((1420,297) + (1404,400)) were s201-era misreads (the ref paints pure lawn there; verified by the light-green family scan); the (1404,400) fade was lightening the descent's lower section. Both + the constant + the tone pin retired; the descent zone 63.8 → 23.9.
- [x] R4: the drift matrix re-measured: **booking 8.72 → 7.18 · landing 6.62 → 5.08 · faq 4.20 → 3.74** — every page at its best-ever floor (the standing gates 16/12.5/9 hold with wide margin).
- [x] R5: the verification battery — lint 0/0 · tsc 0 · 139/2801 unit · build GREEN · smoke 14/14 · e2e 193/193 (the CI=1 fresh boot).
- [x] R6: the captures 47-49 + the docs lockstep (worklog + AGENTS + this plan + the SKILL head v1.212.0 + the pm-SKILL v1.4.0) + the push.

## 4. The residual ledger after this round

- **The moving sprites** (the red element + the diagonal streak): the standing animation floor.
- **The AA edges**: the ref's shapes carry 1-2px anti-aliased boundaries; ours are hard-edged — the hedge's boundary rows + the G band's edge bands remain (inside the sweep tolerance at the page level; kept as the documented floor).
- The pre-existing floors stand: the settings picklist genus · the login logo genus · the CRM superset genera · the faq collapse artifact.
