# Session-218 — The Standing Rotation: The Twin-Pin Debt + The Replay Completion (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `7438dcd` (the owner's session_26.md
archive — the s217 execution record) · **Head at start:** `7438dcd` ·
**Baseline:** lint 0/0 · tsc 0 · **141 suites / 2826 unit** — EXCEPT the
round opened with the shipped state already RED (F-219a, below) · db census
MATCH (15/24/10/23/12 + 4 users) · probe:ref **STABLE** (bundle `ee166dd5` —
no parity event) · the mobile-nav walk at 390 verified live: geometry
`{70,0,320,844}` byte-MATCH · 8-link vocabulary MATCH · animation
`enter/0.5s` MATCH (**no Tailwind v4 bug** — the vendored tw-animate.css
chain fires).

## The audit (the 6236cb6 collateral rotation — web-application skill dimensions)

Eight findings (1 High, 4 Medium, 2 Low, 1 Info — one Critical-free round):

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-219a | High | `tests/sweep-tool.test.ts:96,642` | the s217 phone-baseline re-anchor (login 3→3.8, not-found 2→2.9, the s148 reference-side-shift precedent) updated `scripts/sweep.ts:413,417` but NOT the twin pins in the sweep-tool suite — the SHIPPED s217 tree fails `bun run test` 2/2826. The same pin-gap genus as F-218a: the source site moved, the test twin never did |
| F-220a | Med | `src/lib/rate-limit.ts:12` | the F-218c "all four sites" cure missed a FIFTH site twelve lines above the trued one: "the 7 rate-limited routes" (the true census is 9) |
| F-220b | Med | `tests/rate-limit.test.ts:121` | the retired "13+ call sites" form survives in the unpinned twin test file — the F-218c negative pin only reads `src/lib/rate-limit.ts` |
| F-220c | Med | `scripts/count-ladder-217.py:118` | the ladder's pm-SKILL pair anchors `- **Unit (Vitest, 140 suites):**` — a form that never existed (the pre-s217 file carried the stale 139; the 139→141 flip rode an unrecorded edit). A from-scratch replay over 32c3ea7 exits 1 mid-walk. The F-218b genus (the script is not the record of the artifact) reborn inside the F-218b cure session |
| F-220d | Med | `scripts/skill-head-217.py` | two of the six neo-crm_SKILL.md re-anchors (§11 gate block :1168 + Appendix B unit-total :6969) were done by an unrecorded manual step — the script performs only 4 flips. Replay == shipped artifact everywhere except exactly those two lines. Mitigated live (docs-counts pins both sites GREEN), so Medium not High |
| F-220e | Low | `.env.example:66-75` | HEADLESS — consumed by four drift-gate tools (sweep.ts · drift-probe.ts · interior-census.ts · recon-199.ts) — is missing from the parity-tools block that claims to list the tools' knobs |
| F-220f | Info | `tests/session-217-audit.test.ts:34` · `scripts/skill-head-217.py` (S217_LAYER) · the shipped head layer | the replay narration says "git: 32c3ea7^" but the code correctly uses `git show 32c3ea7:` — the caret names the pre-s216 tree (67a0c09), which would fail the replay. Code right, comment wrong; the wrong form is baked into the shipped SKILL head text |
| F-220g | Low | `src/app/sitemap.xml/route.ts:4-6` | the head comment still describes the retired neo-crm priority scheme ("1.0" for the dashboard) — the live array gives `/` the 1.0. ADJUDICATED: the `/dashboard` omission from the 16-entry list is PARITY-CORRECT (the reference's own sitemap lists its 8 app pages + root without a dashboard entry — its root IS the app; ours mirrors that crawl surface), so the cure is comment-only, no ROUTES change |

## The cures (TDD — every pin RED-first or teeth/mutation-proven)

- **R-01 (F-219a)** the sweep-tool twins trued to the adjudicated s217
  baselines (`phone.login 3.8` · `not-found 2.9`, with the s217
  adjudication comments) — applied during baseline triage, teeth-proven
  against the retired 3/2 forms.
- **R-02 (F-220a/b)** the two stale narration sites trued (rate-limit.ts:12
  "the 9 rate-limited routes"; rate-limit.test.ts:121 the 9-site census).
- **R-03 (F-220c)** the ladder's pm-SKILL pair re-anchored to the REAL
  transition (139→141) so a replay over 32c3ea7 reproduces the shipped
  pm-SKILL byte-for-byte.
- **R-04 (F-220d)** skill-head-217.py gains the two missing `must_replace`
  pairs (the §11 gate block + the Appendix B unit-total row) — the
  script's replay now equals the shipped artifact at every site it
  touched.
- **R-05 (F-220e)** `.env.example` documents `HEADLESS=0` in the
  parity-tools block.
- **R-06 (F-220f)** the caret-misname trued at all three sites (the test
  comment, the script's S217_LAYER string, the shipped SKILL head line)
  — keeping the script == artifact property intact while fixing the
  narration.
- **R-07 (F-220g)** the sitemap head comment reworded to the live scheme
  (+ the /dashboard omission recorded as the parity-mirroring decision).
- **R-08** the pins: `tests/session-218-audit.test.ts` (the 142nd suite)
  carries the eight findings as source-pins; the negatives widened
  (the retired "7 rate-limited"/"13+ call sites"/caret forms can never
  return).

## The verification battery

lint 0/0 · tsc 0 · unit (the new count) · build · smoke 14/14 · e2e
193/193 (the CI=1 fresh boot) · the drift-gate battery (four band sweeps +
fullpage + census) · the mobile-nav walk at 390 · captures 73-75 (the
standing round's evidence) · the docs lockstep · commit + push via the
SSH wrapper.

## Execution ledger

- [x] R-01 the sweep-tool twins (F-219a) — teeth-proven
- [x] R-02 the two narration trues (F-220a/b)
- [x] R-03 the ladder replay repair (F-220c)
- [x] R-04 the head-script replay completion (F-220d)
- [x] R-05 the HEADLESS doc row (F-220e)
- [x] R-06 the caret-misname trues (F-220f)
- [x] R-07 the sitemap comment true (F-220g)
- [x] R-08 the 142nd suite + the verification battery + the docs lockstep;
      pushed via the SSH wrapper
