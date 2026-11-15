# Session 209 — The Animation Port: The Flying Birds + The Growing Bush (2026-11-16, the tenth continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-c35d5b9 tree (the s208 ship + the owner's `session_11.md` archive).
**Inputs:** the owner's `docs/session_11.md` (the s208 transcript), the s208 plan's residual ledger (§4: the moving sprites + the AA edges), `worklog.md`.
**Scope:** the standing animation floor RETIRED — the two sprites decoded by the rapid-fire tracker (22 frames @ 1s) and ported as real animations: the flying red birds + the growing/vanishing bush strip. The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

- The sandbox was RECYCLED again: the fresh clone (c35d5b9) + `bun install` + `.env` + `db:push`/`db:seed` — the census MATCH (15/24/10/23/12 + 4 users) + the playwright chromium reinstall (the v1248 build).
- The baseline gate on the s208 ship state: **lint 0/0 · tsc 0 · 139/2801 unit GREEN** — reproduced exactly.
- The docs verified in lockstep (worklog s208 head · SKILL v1.213.0 · pm-SKILL v1.5.0 · AGENTS Session-208 at L12941).

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-209a | **The flying birds** (decoded by the 22-frame tracker): a two-part red sprite — the leading band (a small ~13x8 wedge at y356-362) + the bird body (a wing-spread ~48x16 shape at y382-394, tones (199,66,62) core + (185,100,82) edge) — translating right at ~46px/s, entering at x~50 and exiting at x~355, cycling every ~17s; the cycle's second pass is a **two-bird flock** (both shapes side-by-side at y408-424, entering lower). Page-shared (booking shows it; landing/faq captures caught it between passes). | High (the drift map's left-band hotspots) | **Cure** (R1, TDD) |
| F-209b | **The growing bush strip** (the "bush" of s208 re-decoded): the light-green (176-187,214-220,160-170) strip at y430-502 GROWS from the right edge (x1317) leftward to x1080 over ~9s, holds ~1s, VANISHES for ~8s, then regrows — a repeating cycle. The s208 static bush was a mid-cycle snapshot. | High (the drift map's right-band hotspots) | **Cure** (R2, TDD) |
| F-209c | The descent-top shimmer: a subtle tone oscillation ((68,149,80)↔(92,165,98)) at y280-284, x1400-1436 — amplitude ~10px worth of pixels, inside the capture noise. | Low (inside noise) | **Defer** (the documented floor) |
| F-209d | The ref STABLE (pairs 0.56/0.80/0.74 — no redesign) + our drifts at the s208 floors (booking 5.60/landing 4.82/faq 3.26). | Verification | ✅ Confirmed |

## 3. The remediation record

- [x] R1 (F-209a, TDD): the bird animation — `drawBird` (the leading band + the two wings + the body as absolute-pixel polygons) translating right at ~46px/s from x~-60 to x~420 on the 22s cycle; the second pass is the two-bird flock at y417.
- [x] R2 (F-209b, TDD): the bush-strip animation — `drawBushStrip`: the FIXED right bush (its right lobe extending 1410→1435) + the LEFT lobe growing x1317→x1080 over 5s with its blossom cluster riding the tip; hold 3s; vanish 8s; a 16s cycle. The ref's two-lobe decode (the gap x1218-1264 shows the G band).
- [x] R3: the static-paint compatibility — the t=0 state reproduces the s208 seed (the strip's right bush only + no bird in frame); the s208 static bush block RETIRED (its geometry lives on as the strip's right lobe).
- [x] R4: the drift matrix re-measured: **booking 5.68 · landing 4.72 (best-ever) · faq 3.26** — all at or below the s208 floors (5.60/4.82/3.26); phase-matched: seed 5.65 · full-growth 6.19 · vanished 6.32.
- [x] R5: the verification battery — lint 0/0 · tsc 0 · 139/2801 unit · build GREEN · smoke 14/14 · e2e 193/193 (the CI=1 fresh boot — the animated canvas holds the corpus).
- [x] R6: the captures 53-55 + the docs lockstep (the worklog + the AGENTS section + this plan + the SKILL head v1.214.0 + the pm-SKILL v1.6.0) + the push.

## 4. The residual ledger after this round

- **The AA edges**: the ref's shapes carry 1-2px anti-aliased boundaries; ours are hard-edged — the hedge's boundary rows + the G band's edge bands remain (inside the sweep tolerance at the page level; kept as the documented floor).
- The pre-existing floors stand: the settings picklist genus · the login logo genus · the CRM superset genera · the faq collapse artifact · the descent-top shimmer (F-209c).
