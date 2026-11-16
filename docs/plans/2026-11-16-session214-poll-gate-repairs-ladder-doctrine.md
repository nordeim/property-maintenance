# Session-214 — The Standing Rotation: The Poll-Gate Repairs + The Ladder Doctrine Debt (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `a1b40d2` (the owner's
session_18.md archive — the s213 execution record) · **Head at start:**
`a1b40d2` · **Baseline:** lint 0/0 · tsc 0 · **139 suites / 2811 unit
GREEN** · census MATCH · probe:ref **STABLE** (bundle `ee166dd5` — no
parity event) · **THE s213 CARRY-OVER DEBT RESOLVED: the e2e battery
193/193 GREEN** (6.4m, zero failures — the stable-4 cures passed the
full public-site battery).

## The audit (the b342ebb collateral rotation)

Nine findings, none Critical/High; the shipped delta verified clean in
7 areas (the negative-ladder removals, the census runtime under the
empty list, the de-labeling, the F-214 canvas code, the five flips,
config/docs truth, security).

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-215 | Med | `interior-census.ts:1740-1743` | the scroll-reveal settle-gate predicate requires `transform === "none"` for EVERY main element — the hero pill's static `-translate-x-1/2`, the step badge's translates, and the bouncing chevron make it false at every poll; the 10s cap always burns out; the settle gate NEVER engages (the 2000ms fixed wait is the only real guard) |
| F-216 | Med | `interior-census.ts:1558-1568` | waitQuiescent's fingerprint oscillates forever (the bouncing chevron's `top` moves ~5px per sample) — permanently at the 12s ceiling on the census's only page |
| F-217 | Low | `interior-census.ts:1500` | the \|docH\| ≤ 4 floor is page-wide but decoded/documented as phone-only (desktop byte-equal) — a ≤4px regression at tablet/landscape/desktop absorbs silently |
| F-218 | Low | `docs-counts.test.ts` + `dialog-geometry-parity.test.ts` | the s192 doctrine skipped: no negatives for the retired 2805 forms; the README badge site (`tests-3004%20checks`) pinned nowhere (positive) and `tests-2998%20checks` not negatived |
| F-219 | Low | `property-maintenance_SKILL.md:17` | `last_updated: 2026-11-17` — a day ahead of the commit date |
| F-220 | Low | `interior-census.ts:2011-2019, 2127-2134` | the zero-data phase is vestigial under the empty interior list (zeroes + re-seeds the db for a static page that reads no DB; the never-zeroed risk window for nothing) |
| F-221 | Low | `interior-census-tool.test.ts:1042` + `docs-counts.test.ts:1346-1351` | stale narration: the legs-contract it-title still narrates the s156 join above the s213 retirement body; the orphaned s197 header now asserts the opposite of the file's state |
| F-222 | Info | `scripts/settings-rhythm.ts:1-2` | the lineage observation instrument carries no s213 retirement annotation |
| F-223 | Info | `scripts/sweep.ts:273-325` | the STANDING_BASELINES per-entry comments narrate the neo-crm-era 0.1 floors above the s202 Oasis values (24.5-27) — comments lie, values correct |

## The cures (TDD — every code pin RED-first)

- **R-01 (F-215) the settle-gate predicate**: drop the `transform ===
  "none"` conjunct — the reveal genus is `translateY(20px) + opacity:0`;
  un-revealed and mid-transition states both fail `opacity === "1"`
  while static translates and the chevron pass. Pin: the predicate
  tests opacity, never transform.
- **R-02 (F-216) the quiescence fingerprint**: exclude elements whose
  `animationName !== "none" && animationIterationCount === "infinite"`
  from the fingerprint accumulation (the same genus the capture skips).
  Pin: the exclusion form present.
- **R-03 (F-217) the floor scoped**: `&& r.axis === "phone"` + the
  comment matches. Pin: the verdict — Δ4 at phone GREEN, Δ4 at tablet
  RED (the verdict is a pure seam, pinable without a browser).
- **R-04 (F-218) the ladder doctrine**: the 2805 negatives next to the
  s197 block + the badge pair (`not.toMatch(/tests-2998%20checks/)` +
  a positive `tests-${UNIT + 193}%20checks` form).
- **R-05 (F-219)**: the SKILL date `2026-11-16`.
- **R-06 (F-220)**: the zero-data phase guarded `if (pages.length > 0)`
  (the same guard the pre-flight login uses) + the annotation.
- **R-07 (F-221)**: the two stale narrations re-titled.
- **R-08 (F-222)**: the settings-rhythm header annotation.
- **R-09 (F-223)**: the sweep baseline comments refreshed to the s202
  Oasis re-derivation story.

## The verification battery

lint 0/0 · tsc 0 · unit (the new count) · the four band sweeps CLEAN ·
fullpage CLEAN · census CLEAN (and FASTER — the poll-gate repairs
recover the idle burn) · the mobile-nav walk at 390 · captures · the
docs lockstep (the count ladder + the SKILL v1.10.1 + session_19 +
the worklog) · commit + push via the SSH wrapper.

## Execution ledger

- [x] R-01 the settle-gate predicate (TDD) — opacity-only, the transform conjunct retired; pins GREEN
- [x] R-02 the quiescence fingerprint (TDD) — the infinite-animation genus excluded; pins GREEN
- [x] R-03 the docH floor scoped to phone (TDD) — the pure-seam verdict pin: Δ4 phone GREEN, Δ4 tablet RED, Δ5 phone RED
- [x] R-04 the ladder doctrine — the 2805 negatives + the badge pinned both ways (tests-2998 negative · tests-3009 positive) + the orphaned s197 header rewritten
- [x] R-05 the SKILL date — 2026-11-16
- [x] R-06 the zero-data phase guarded (pages.length > 0, both spawnSync sites) — the census no longer zeroes/re-seeds for the static landing
- [x] R-07 the stale narrations — the legs-contract title + the s197 header
- [x] R-08 the settings-rhythm annotation — the lineage retirement note
- [x] R-09 the sweep baseline comments — the F-223 annotation inside the object (the 1100-char doc window preserved)
- [x] R-10 the verification battery — lint 0/0 · tsc 0 · unit 139/2816 · the drift-gate battery re-run · the mobile-nav walk byte-MATCH at 390 (no Tailwind v4 bug) · SEO standing verified (16-url sitemap · robots · manifest) · capture 68; pushed via the SSH wrapper
