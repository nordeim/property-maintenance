# Session 202 — The Parity Continuation Plan (2026-11-15, the third continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-63a034e tree.
**Inputs:** the owner's session-201 logs (`docs/session_4.md` + the standing prompt), the plan-of-record (`docs/plans/2026-11-15-session201-audit-remediation.md` — its OPEN ledger is this round's brief), `worklog.md`.
**Scope:** close the session-201 open ledger — the F-201g cures (the booking inner form card + the faq layout offsets), the four-band drift-baseline re-derivation, the full post-cure e2e re-run — plus the round's own audit findings. The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

The corpus is the **Oasis public site on the kept NEO-CRM scaffold** with the s201 canvas parity ship landed (the public background canvas + the hero CTA metrics + the shadcn card tokens). The baseline gate on the fresh tree: **139/2800 unit** green (the count ladder HELD this round — both new pins extended existing `it`s, no new suites). The standing contracts re-verified: `.env` `DATABASE_URL="file:../db/custom.db"` · db census MATCH (15/24/10/23/12 + 4 users) · `bun audit` at the pinned census 10 (4h/5m/1l) · the 16-route sitemap + robots + manifest live-curled.

**The audit's own catch (F-202a):** the s201 round pushed two one-off diagnostic probes (`probe-201-hero-painter.ts` + `probe-201-landing-census.ts`) with untyped parameters — the s201 final tsc had run BEFORE their creation, so the pushed tree FAILED `bun run typecheck` (8 errors). This round's Phase A initially skipped tsc (repeating the same gap) — caught at the first cure, both probes now typed, **tsc 0 errors**. The lesson recorded: the baseline gate ALWAYS includes lint + tsc, not only the unit run.

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-202a | **The pushed s201 tree failed tsc** — the two diagnostic probes shipped untyped (8 TS errors in `scripts/`). | Medium (a gate-discipline breach) | **Cured** (typed; tsc 0) |
| F-201g-1 | **The booking opaque inner form card** — the reference wraps every step's FIELDS in `bg-white rounded-2xl border border-gray-100 p-8` (decoded live at 638×542/393, pad-32, radius-16, the 1px gray-100 border; censused on steps 1 AND 2) with the nav rows (Back/Continue/Confirm) BELOW the card; ours rode the /85 outer directly — the greenish tint showed through (the booking drift's dominant genus post-canvas). | High (visual parity) | **Cured** (TDD — the three-wrap pin; booking 41.98 → 26.68) |
| F-201g-2 | **The faq hero eyebrow** — the reference's faq hero runs 332px vs our 272: the missing 60px was the glassy eyebrow pill ABOVE the h1 (`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6` + the CircleHelp icon w-5 h-5 + `<span class="text-sm font-medium">We've Got Answers</span>` — decoded live, inner HTML verbatim). Its absence shifted every accordion header below by exactly 60px (theirs 494/819/1217/1542/1920 vs ours 434/743/1105/1413/1775). | High (visual parity) | **Cured** (TDD; faq 42.71 → 15.98) |
| F-201c | **The stale drift baselines** — about/contact/landing + the ten CRM pages still rode their neo-crm-era 0.1/2.9 floors against the Oasis reference; the quartet's s200 entries (45.1/38.8/69.0/80.3) went stale-high after the s201 canvas cure. | High (the standing gate cannot run) | **This round's Phase D** (the four-band re-derivation) |
| A-202a | The residuals post-cures: faq 15.98 (the accordion item-spacing micro-deltas, ~16-36px per card) + booking 26.68 (the form-interior micro-offsets) + the canvas animation drift (±5 between runs, the reference's blobs move). | — (the documented floor) | **Recorded** as the standing genera; the baselines sit at the floors + headroom |

## 3. The remediation items

- **R1 (F-202a)** — the two probes typed; tsc 0; the Phase-A gate now always lint+tsc+unit.
- **R2 (F-201g-1, TDD)** — the booking inner card: the RED pin (three wraps + the nav rows outside + the first wrap before Confirm) → the cure (the three steps' fields wrapped in the reference's own construction) → GREEN. The step-2 nav row moved OUT of the grid (below the card) mirroring the reference's anatomy.
- **R3 (F-201g-2, TDD)** — the faq eyebrow: the RED pin (the pill's exact class string + the icon + the text) → the cure (the decoded pill above the h1) → GREEN.
- **R4 (F-201c)** — the four-band re-derivation: the full 18-page map measured at 1440/390/768/1024 post-cures; every STANDING_BASELINES entry re-anchored at its measured floor + headroom (the s146 volatile-genus precedent, widened for the canvas-animation pages); the four `--fail-on-drift` gates GREEN.
- **R5** — the full post-cure e2e re-run (193, the mobile-menu battery included — the standing named focus) + the captures refresh of the cured surfaces (faq/booking).
- **R6** — the docs lockstep: this plan's record + the worklog Task-202 entry + the AGENTS section. The count ladder HELD (2800/193/2993 — no new its, no census moves).

## 4. The execution record (filled as the round lands)

- [x] The refresh (63a034e — the session_4.md archive) + the alignment validation (§1).
- [x] R1 the probes typed (tsc 0 errors).
- [x] R2 the booking inner card (TDD; booking 41.98 → 26.68 at 1440).
- [x] R3 the faq eyebrow (TDD; faq 42.71 → 15.98 at 1440).
- [x] R4 the four-band re-derivation — 72 entries re-anchored (the measured floors + headroom; the canvas-exposed pages carry the wider margin); the sweep-tool pin green (68/68); **ALL FOUR --fail-on-drift gates GREEN** (the first clean full-map standing drift gate against the Oasis reference).
- [x] R5 the production build GREEN · **e2e 193/193** (the post-cure tree, the mobile-menu battery included) · the captures 22-25 (the faq eyebrow + the booking inner card, desktop + phone — taken against the production standalone on :3100 after the dev server's chromium went flaky; all machine-verified non-blank).
- [x] R6 the docs lockstep (this record + the worklog Task-202 + the AGENTS section; the count ladder HELD: 2800/193/2993 — both new pins extended existing its).
- [x] The push (the SSH wrapper, main only).

### The four-band measurements (post-cures, the Oasis reference)

| page | 1440 | 390 | 768 | 1024 |
|---|---|---|---|---|
| dashboard | 22.80 | 14.28 | 39.42 | 31.79 |
| landing | 19.54 | 4.82 | 5.84 | 12.69 |
| services | 8.77 | 11.75 | 4.41 | 12.62 |
| gallery | 9.77 | 9.60 | 7.78 | 8.83 |
| faq | 15.98 | 13.10 | 9.79 | 12.37 |
| booking | 26.68 | 16.39 | 18.18 | 22.48 |
| about | 8.60 | 3.83 | 5.03 | 12.00 |
| contact | 15.20 | 17.35 | 24.04 | 14.15 |
| accounts | 21.91 | 12.46 | 38.52 | 30.72 |
| contacts | 21.96 | 10.86 | 38.42 | 31.32 |
| leads | 21.96 | 12.11 | 38.22 | 30.04 |
| calendar | 22.88 | 9.77 | 38.87 | 31.08 |
| activities | 23.17 | 11.90 | 39.17 | 31.59 |
| reports | 22.42 | 10.88 | 38.73 | 31.04 |
| settings | 22.31 | 9.88 | 39.08 | 30.07 |
| profile | 22.69 | 12.68 | 39.35 | 32.22 |
| login | 0.59 | 2.14 | 0.97 | 0.97 |
| not-found | 0.02 | 1.25 | 0.53 | 0.03 |
