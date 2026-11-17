# Session 208 — The Mid-Distance + The Far-Left Diagonal (2026-11-16, the ninth continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-9b7cd60 tree (the s207 ship + the owner's `session_10.md` archive).
**Inputs:** the owner's `docs/session_10.md` (the s207 transcript), the s207 plan's residual ledger (§4: the moving sprites + the AA edges), `worklog.md`.
**Scope:** the drift map's remaining hotspots decoded + cured — the far-left horizon's DIAGONAL (a genus ours leaves flat), the booking form's connector + slider styling (the live-DOM comparison), the left crown's true geometry, the right-side bush, and the mid-distance structures behind the glass. The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

- The sandbox was RECYCLED: the fresh clone (9b7cd60) + `bun install` + `.env` from `.env.example` + `db:push`/`db:seed` — the census MATCH (15/24/10/23/12 + 4 users).
- The baseline gate on the s207 ship state: **lint 0/0 · tsc 0 · 139/2801 unit GREEN** — reproduced exactly.
- The docs verified in lockstep (worklog s207 head · SKILL v1.212.0 · pm-SKILL v1.4.0 · AGENTS Session-207 at L12941).

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-208a | **The booking step-dots connector**: the ref's connectors are `w-8 h-0.5` (32x2) SIBLINGS of the dot groups inside a `gap-2` flex; ours are `w-8 sm:w-12 h-px mx-2` (48x1) NESTED inside each group — visible as the 41% drift cell at the dots row (y302) and a width offset (our groups start x436 vs ref x460; the step-1 group's own connector is missing on the ref — only 2 connectors between the 3 groups). | Medium (the booking card's top rows) | **Cure** (R1) |
| F-208b | **The yard-size slider fill**: the ref's fill is CHARCOAL `rgb(23,23,23)` (`bg-primary` on the base44 stack — the shadcn default); ours paints brand-green `#2E7D5F`. Also the ref's thumb border is `border-primary/50` (charcoal-tinted) vs ours `border-[#2E7D5F]/50`. | Low (but a live-DOM mismatch) | **Cure** (R2) |
| F-208c | **The far-left horizon diagonal**: the ref's sky→lawn boundary at the far-left corner is a DIAGONAL — sky holds to y278@x0 → y266@x20 → y253@x40 → y241@x60 → flat y231@x80+ — page-shared (booking + landing agree; the faq content-covers). Ours paints the flat 0.257→0.262 blend everywhere: the whole x0-80 corner shows lawn where the ref shows sky (the y224 row's 30% cell). | High (the far-left corner genus) | **Cure** (R3) |
| F-208d | **The left crown's true top**: the ref's crown rises to (43,272) — a taller oval (runs: (30-55)@277 → (12-82)@307 → (67,343) tapering); ours peaks at (43,272)... our polygon's top is (43,272) but the sky-side boundary is wrong per F-208c (the crown merges with the diagonal). The crown's darker-green family (48,157,69) matches ours — only the boundary geometry needs the F-208c cure. | Medium | **Cure** (R3, same polygon re-derivation) |
| F-208e | **The right-side bush**: the ref has a light-green + brown bush structure at (x1310-1430, y440-500) — tones (187,220,170) light-green + (165-176,123-137,72-92) brown + a dark (26,30,27) spot — ours paints pure lawn there. | Medium (the y448 row's 40% cell) | **Cure** (R4) |
| F-208f | **The mid-distance structures behind the glass**: unmixing the ref's booking card (white/85) reveals darker structures at x460-620 (unmixed ~(10,100,20) — a dark-green tree mass) + x660-800 (unmixed ~(55,75,100) — a blue-gray structure, y265-310). Ours leaves pure lawn behind the glass. The landing shows the same tints at (660,290): ref (237,240,240) vs ours (244,249,243). | Medium (the 41% glass cell) | **Cure** (R5) |
| F-208g | The ref STABLE (pairs 0.53/0.99/0.78 — no redesign) + our drifts reproduce the s207 floors (7.32/5.21/3.80 vs the ship's 7.18/5.08/3.74 — capture noise). The sprites stay the documented floor. | Verification | ✅ Confirmed |

## 3. The remediation record

- [x] R1 (F-208a): the step-dots row re-derived — the flat gap-2 flex + the two sibling connectors via a reduce-interleave; the nested connector retired.
- [x] R2 (F-208b): the slider's fill + thumb border → the literal #171717 charcoal (the ref's shadcn primary; OUR --primary is blue, so the literal tone); the track's mint tint stays.
- [x] R3 (F-208c+d, TDD): BOTH horizon diagonals — the far-left patch ((0,278)→(80,231)) + the mid-round-discovered far-right patch ((1370,235)→(1430,273)); the crown verified already at (43,272).
- [x] R4 (F-208e, TDD): the right-side FLOWERING bush — five polygons (the body + the red blossoms + the dark core + the red foot + the brown patch + the foot's dark rows); 3 geometry iterations.
- [x] R5 (F-208f, TDD): the mid-distance structures — the dark-green tree mass + the blue-gray structure behind the glass.
- [x] R5b (decoded mid-round, TDD): the corner-mass TWO-LAYER gradient — the horizontal base + the vertical darkening veil; the flat EDGE_DARK_SOLID retired there; the polygonHGradient painter born.
- [x] R6: the drift matrix re-measured: **booking 7.32 → 5.60 · landing 5.21 → 4.82 · faq 3.80 → 3.26** — every page at its best-ever floor.
- [x] R7: the verification battery — lint 0/0 · tsc 0 · 139/2801 unit · build GREEN · smoke 14/14 · e2e 193/193 (the CI=1 fresh boot).
- [x] R8: the captures 50-52 + the docs lockstep (the worklog + the AGENTS section + this plan + the SKILL head v1.213.0 + the pm-SKILL v1.5.0) + the push.

## 4. The residual ledger after this round

- **The moving sprites** (the red element + the diagonal streak): the standing animation floor.
- **The AA edges**: the ref's shapes carry 1-2px anti-aliased boundaries; ours are hard-edged — the hedge's boundary rows + the G band's edge bands remain (inside the sweep tolerance at the page level; kept as the documented floor).
- The pre-existing floors stand: the settings picklist genus · the login logo genus · the CRM superset genera · the faq collapse artifact.
