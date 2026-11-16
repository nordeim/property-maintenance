# Session-213 — The Standing Rotation: The Reference-Contract Re-Anchor + The Reduced-Motion Bush (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `57e2acd` (the owner's session_16.md
archive — the s212 execution record) · **Head at start:** `57e2acd`
· **Baseline:** lint 0/0 · tsc 0 · **139 suites / 2805 unit GREEN** · census
MATCH (15/24/10/23/12 + 4 users) · probe:ref vs the Oasis reference
**STABLE** (bundle `ee166dd5…` · census 12/6/21 STANDING · all layers
standing — no parity event; the s212 byte-parity verdicts hold by
transitivity).

## The evidence

1. **The stale-reference genus (the F-98a1 genus, reference-axis):** the
   bare `bun run probe:ref` run against the repo's own documented
   invocation false-failed — it probed `neo-crm-8ab2c17c.base44.app`
   (the scaffold lineage's reference) while every standing expectation
   in the tool is Oasis-derived. The sweep-family audit found the genus
   in FIVE live tools + the gate wiring + three docs identity sites.
2. **The drift battery, re-run post-s212 (the first time since the
   remediation):** desktop · phone 390 · tablet 768 · landscape 1024 —
   **all four bands CLEAN** (the FAB + the F-212b card padding + the
   brown tip hold at/below the standing Oasis floors). Fullpage EXIT 1
   (the F-213f confirmation — the tool is HARDCODED to the neo-crm
   reference and its baselines are the s149 neo-crm-landing values).
   census:interior mass-RED expected (the F-213e confirmation — the
   page map walks 12 CRM interiors the Oasis reference 404s).
3. **The audit rotation (skills/web-application v-rubric):** 12
   findings, 8 areas verified clean (the s212 deltas, security, config,
   docs counts, the lineage-reference adjudication).

## The execution addenda (the rounds the plan grew)

- **The stable-4 decode** (the census's residual events after the reveal
  pass): the estimate band's CTA read "Book a Service" where the
  reference ships "Book with this estimate" (w261 vs w136) WITH the
  calendar-check glyph, its button carries `px-8` (ours the px-4 default
  — the w229-vs-w261 delta), and the yard-size header was a
  label-wrapped block where the reference ships a bare flex row
  (div > p + span). All cured TDD; the census then read unexplained 0.
- **The EADDRINUSE/stale-server lessons** (two self-inflicted races,
  both cured): never build while the gates measure the running server
  (the s213 instance: the rewritten standalone assets served 500s to the
  running process — the N-69a dev-server-lies genus), and pkill patterns
  must never match the restarting shell's own cmdline (kill by PID).
- **The reference's scroll-reveal** (the head genus): its below-fold
  marketing elements start at translateY(20px) + opacity 0
  (matrix(1,0,0,1,0,20) live-confirmed) — the captures see the
  un-revealed state; the census's settle pass (scroll-through + the
  completed-transitions poll) + the fullpage floors absorb it.

## The findings ledger

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-213a | High | `scripts/drift-probe.ts:35,46` | default REF_URL = neo-crm; expectations are Oasis-derived; bare `probe:ref` false-fails |
| F-213b | High | `scripts/sweep.ts:97,786` + `package.json` gate:full | same default; `gate:full` chains the sweeps WITHOUT REF_URL — the advertised one-command gate compares against the wrong app |
| F-213c | Med | PAD:34-36, :1896 | the PAD opening + glossary still identify THIS repo as the neo-crm clone |
| F-213d | Med | `scripts/sweep-state.ts:63` | the shared auth-pair module carries the same stale default |
| F-213e | High | `scripts/interior-census.ts:1762` + the INTERIOR_PAGES map | same default + the page map/ledgers are neo-crm-era; the Oasis reference 404s the CRM interiors |
| F-213f | High | `scripts/fullpage-sweep.ts:39,54-63` | `REF` is a bare const (not even env-overridable) + the baselines/explained are the s149 neo-crm-landing values |
| F-213g | Low | AGENTS:13984, PAD:1275 | the stale `sweep.ts:741-744` line ref + the phantom-artifact claim (the D-204a1 pins live upstream, not in this fork) |
| F-213h | Med | README:20-31 | the Overview opens with the neo-crm identity prose in live tense |
| F-213i | Low | `.env.example:19` | the pg example db name `neo_crm` |
| F-214 | Med | `src/components/site/background-canvas.tsx:1186-1215` | **the reduced-motion gate drops the seed-state bush** — the strip paints ONLY inside the RAF loop; under `prefers-reduced-motion: reduce` at mount no frame ever runs, so a standing scene element (the bush's base, x1323-1410, visible even at growFrac 0) is permanently absent — contradicting the gate's own contract comment ("the sprites hold their first-frame state"; the first frame WOULD include `drawBushStrip(ctx, 0)`) |
| F-215 | Info | `eslint.config.mjs:47` | six ignore entries for directories that do not exist in this fork |
| F-216 | Info | `scripts/sweep.ts:284-293` ×4 blocks | the quartet baseline comments narrate the superseded s200 maiden values above the s204 re-derived floors |

**Verified clean:** call-fab.tsx (SSR-safe, a11y, z-40 under the z-50
menu/header, valid anchor-as-button) · booking-flow hooks/labels · the
data-epoch marker · security (no key material tracked, Zod on all 31
routes, the public bookings POST rate-limited pre-parse) · config
hygiene (env contract complete) · docs counts (139/2805/193, 31 routes,
11 models, 16-URL sitemap) · the lineage references that correctly stay
neo-crm (the walk50-67 decode-freezes, the lineage skill/worklog, the
s199 plan's calibration note).

## The cures (TDD — every pin RED-first)

- **R-01 (F-214) the reduced-motion seed-state paint.** Unit pin: the
  canvas source must paint the seed state under the gate (the
  `motionQuery.matches` branch calls `drawBushStrip(ctx2, 0)` after the
  static render; the stop path re-blits + draws the seed state). Cure:
  the branch in `background-canvas.tsx` + the `onMotionChange` stop
  path. Live verification: a reduced-motion probe (playwright
  `emulateMedia({ reducedMotion: 'reduce' })`) — the bush-strip pixels
  present in the static scene.
- **R-02 (F-213a/b/d/e-defaults + the rider) the reference-contract
  flip.** RED-first: a new pin (in `tests/facts-census.test.ts`, the
  D-204a1 contract recreated for THIS fork) asserting all FIVE live
  tools (drift-probe · sweep · sweep-state · interior-census ·
  fullpage-sweep) default to
  `https://oasis-property-maintenance.base44.app` (fullpage-sweep gains
  the `process.env.REF_URL ??` form) + the negative (the neo-crm
  default never returns in the five live tools) + the `.env.example`
  parity-tools block. Cure: the five default flips. gate:full inherits
  with zero package.json edits (the gate-script pin stays green).
- **R-03 (F-213f) the fullpage maiden re-derivation.** With R-02's
  env-override in place: the maiden fullpage run vs the Oasis landing →
  the new baselines (desktop/phone) + the explained genera → re-anchor
  `STANDING_FULLPAGE_BASELINES`/`STANDING_EXPLAINED` +
  `tests/fullpage-sweep-tool.test.ts:57-58` (the 0.14/0.49 pins) + the
  gate re-run GREEN.
- **R-04 (F-213e) the census:interior Oasis re-derivation.** Adjudicate
  the INTERIOR_PAGES map from the running mass-RED census: the pages
  that exist on BOTH apps keep their ledgers; the CRM interiors are
  OURS-ONLY supersets (the s200 sweep-page adjudication applied to the
  census axis) — the map narrows to the both-apps set, the pins
  (`interior-census-tool.test.ts:57-85`) re-anchor, the gate re-runs
  GREEN.
- **R-05 (F-213c/h/g/i) the docs identity re-anchor.** PAD opening +
  glossary (Oasis the product, neo-crm the lineage) · README Overview
  restructure · the AGENTS/PAD stale line refs annotated · the
  `.env.example` pg db name.
- **R-06 (F-215/216) the informational cleanups.** The six absent-dir
  eslint ignores retired · the quartet comments annotated with the s204
  re-derivation.

## The verification battery

lint 0/0 · tsc 0 · unit 139 suites (2805 + the new pins) · build · the
four band sweeps CLEAN · fullpage CLEAN (re-derived) · census:interior
CLEAN (re-derived) · the reduced-motion live probe · the mobile-nav
390 spot-walk (the standing byte-parity re-check) · captures under
`docs/screenshots/` · the docs lockstep (worklog + session_17 + this
ledger + the pm-SKILL v1.10.0) · commit + push to main via the SSH
wrapper.

## Execution ledger

- [x] R-01 the reduced-motion seed-state paint (TDD) — pin GREEN + live-verified (brown=144 greenMass=3435 under reduce; capture 66)
- [x] R-02 the reference-contract flip (TDD) — 5 tools + the .env.example block + the facts-census pins (4 RED-first) all GREEN
- [x] R-03 the fullpage re-derivation — the maiden 5.83/8.34 at byte-equal heights; floors 6.5/9.0; the gate GREEN; the pins re-anchored (12/12)
- [x] R-04 the census re-scope — the anchor (main.relative.z-10) + the scroll-reveal settle pass + the infinite-animation skip + the interiors RETIRED (the maiden decode: the phone-band slate-50 zero-data shells, the product-iteration deltas, the login's 14 unexplained) + the |docH| ≤ 4 phone floor; ALL axes GREEN (unexplained 0)
- [x] R-05 the docs identity re-anchor — the README Overview + the PAD opening/glossary + the AGENTS/PAD line refs + the .env.example db name
- [x] R-06 the informational cleanups — the six absent-dir eslint ignores retired + the quartet s204 annotation
- [x] R-07 the verification battery — lint 0/0 · tsc 0 · unit 139/2811 · build · smoke 14/14 · the four band sweeps CLEAN · fullpage CLEAN · census CLEAN (docH Δ0, unexplained 0) · the mobile-nav walk (geometry/animation/vocabulary byte-MATCH at 390; the Esc-close superset standing) · captures 66-67b; the stable-4 product cures (the estimate CTA + the yard header) landed TDD; the e2e battery re-run; pushed via the SSH wrapper
