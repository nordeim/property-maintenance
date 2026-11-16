# Session-217 — The Standing Rotation: The Doc-Truth Stragglers + The Head-Script Reproducibility Debt (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `a0ee91f` (the owner's
session_24.md archive — the s216 execution record) · **Head at
start:** `a0ee91f` · **Baseline:** lint 0/0 · tsc 0 · **140 suites /
2822 unit GREEN** · db census MATCH (15/24/10/23/12 + 4 users) ·
probe:ref **STABLE** (bundle `ee166dd5` — no parity event) · the
mobile-nav walk at 390 re-verified live: geometry `{70,0,320,844}`
byte-MATCH · 8-link vocabulary MATCH · animation `enter/0.5s` MATCH
(**no Tailwind v4 bug**).

## The audit (the 32c3ea7 collateral rotation)

Three findings (2 Medium, 1 Low — none Critical/High); the s216
cures verified still in place (the containment pins robust on the
live sources — the `${email}`/`${code}` template pairs balance the
depth walk; the placement anchors real and ordered; the shipped
head surgery artifact-free; the scripts NOOP-idempotent today).

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-218a | Med | `property-maintenance_SKILL.md:254` | a live-tense "139 suites" bullet inside §7 The Test Corpus (the heading itself says 2822/193, the §2 row and ship line say 140 — the file disagrees with itself). Born at s215 (the round that minted suite 140), survived the s216 stale-narration round. Root cause is a pin gap: the pm-SKILL lockstep family pins the frontmatter, §2 rows, §7 heading — never the §7 suite bullet |
| F-218b | Med | `scripts/skill-head-216.py:85` | the splice `src[:idx] + LAYER + "\n + + beneath it " + src[idx:]` demotes the prior head WITH its `project_state: ` marker still attached — the shipped line 17 is marker-less because an unrecorded manual strip step ran after the script. The committed script is not the record of the committed artifact; a from-scratch replay would plant the stray-marker genus and fail the layer-axis pin. The latent genus is historical (skill-head-215.py:96 has the identical form) |
| F-218c | Low | `src/lib/rate-limit.ts:26` · `tests/session-215-audit.test.ts:21` · `src/app/api/bookings/route.ts:32` · `src/app/api/quote-requests/route.ts:27` | stale numeric narration: "13+ call sites" (actual sweep call sites in src/ = 9) and "the auth family's 7 routes" (the limiter'd auth family is 6 routes; the s216 head's own "all nine limiter routes" is the correct census) |

## The cures (TDD — every pin RED-first or teeth-proven)

- **R-01 (F-218a) the pm-SKILL §7 suite bullet + the pin gap:**
  the bullet's "139 suites" → "140 suites" (the live-tense truth),
  and the pm-SKILL lockstep family gains the suite-bullet pin
  (RED-first: the pin asserts `140 suites` at the §7 Unit bullet —
  it fails against the shipped 139 before the fix).
- **R-02 (F-218b) the head-script splice repair:** the splice in
  skill-head-216.py strips the demoted line's `project_state: `
  marker in the script itself (replace `"\n + + beneath it "` with
  `"\n + + beneath it "` + the marker-strip on `src[idx:]`) so the
  script's replay equals the shipped artifact byte-for-byte. The
  teeth proof: an in-memory replay against the pre-surgery file
  must produce the shipped head line exactly (asserted in the new
  test). skill-head-215.py gains the same repair (the latent twin).
- **R-03 (F-218c) the count narration trues:** rate-limit.ts
  "13+ call sites" → "9 call sites (the six auth routes + the two
  public POSTs + upload)"; the "auth family's 7 routes" trio → "the
  auth family's 6 routes + the two public POSTs" (the census truth
  at all four sites).

## The verification battery

lint 0/0 · tsc 0 · unit (the new count) · build · smoke 14/14 · e2e
193/193 (the CI=1 fresh boot) · the drift-gate battery (four band
sweeps + fullpage + census) · the mobile-nav walk at 390 · captures
72 (the standing round's evidence) · the docs lockstep · commit +
push via the SSH wrapper.

## Execution ledger

- [x] R-01 the pm-SKILL §7 suite bullet + the suite-bullet pin (F-218a) — RED-first at birth
- [x] R-02 the head-script splice repair + the replay teeth-proof (F-218b) — line-bounded, marker stripped in-script, mutation-proven
- [x] R-03 the count narration trues at the four sites (F-218c)
- [x] R-04 the verification battery — lint 0/0 · tsc 0 · 141/2826 · build · smoke 14/14 · e2e 193/193 · the drift gates · the mobile-nav walk · captures 72 · the docs lockstep; pushed via the SSH wrapper
