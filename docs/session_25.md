# Session-25 (session-217) — The Standing Rotation: The Doc-Truth Stragglers + The Head-Script Reproducibility Debt

**Rotation trigger:** `a0ee91f` (the owner's session_24.md archive) ·
**Head at start:** `a0ee91f` · **Plan:**
`docs/plans/2026-11-16-session217-doc-truth-stragglers-head-script-reproducibility.md`

## The round

The s216 archive landed (the workspace had been recycled — the
environment rebuilt: bun install · db seed · census MATCH · chromium
v1248 reinstall). The standing rotation ran: the baseline gate GREEN
at the exact s216 ship state (lint 0/0 · tsc 0 · 140/2822) ·
probe:ref **STABLE** (bundle ee166dd5 — no parity event) · the
mobile-nav walk at 390 re-verified live: geometry {70,0,320,844}
byte-MATCH · 8-link vocabulary · animation `enter/0.5s` (**no
Tailwind v4 bug**). The audit rotation over the 32c3ea7 collateral
found three findings (2 Medium, 1 Low — none Critical/High; the s216
cures verified still in place).

## The findings and cures (TDD)

- **F-218a the "139 suites" straggler (Med):** the pm-SKILL's own §7
  test-corpus bullet shipped "139 suites" — a live-tense site
  disagreeing with its own heading (2822) and its §2 row (140),
  born at s215, survived the s216 stale-narration round. The root
  cause was a pin gap: the pm-SKILL lockstep family pinned the
  frontmatter, §2 rows, and §7 heading — never the §7 Unit bullet.
  **Cured**: the bullet trued, and the family gained the
  §7-Unit-bullet pin (RED-first at birth — it failed against the
  shipped 139 before the fix).
- **F-218b the head-script reproducibility debt (Med):** the
  skill-head-216.py splice demoted the prior head WITH its
  `project_state: ` marker still attached — the shipped demoted line
  was marker-less only because an unrecorded manual strip step ran
  after the script. The committed script was not the record of the
  committed artifact; a from-scratch replay would plant the
  stray-marker genus and fail the layer-axis pin. **Cured**: the
  LINE-BOUNDED splice repair in both head-surgery scripts
  (skill-head-216.py + the latent twin skill-head-215.py) — the
  demotion strips the marker IN THE SCRIPT, bounded to the head
  line's own extent. **The replay teeth-proof**: the new pin runs
  the script's arithmetic against git history (32c3ea7) and asserts
  the produced demoted line == the shipped line byte-for-byte;
  mutation-proven: the old unbounded splice re-planted makes the pin
  RED exactly at the replay face.
- **F-218c the stale numeric narration (Low):** "13+ call sites"
  (the real census is 9 limiter'd routes) and "the auth family's 7
  routes" (the real auth family is 6) — trued at all four sites
  (rate-limit.ts + the s215 test's head comment + both public POST
  routes' comments).

## The verification battery

lint 0/0 · tsc 0 · **141 suites / 2826 unit GREEN** (+4 pins,
tests/session-217-audit.test.ts the 141st suite) · build GREEN ·
smoke 14/14 · the e2e battery 193/193 (the CI=1 fresh boot) · the
drift-gate battery (four band sweeps + fullpage + census) · the
mobile-nav walk at 390 · captures 72 (the standing round's evidence).

## The count ladder + docs lockstep

2822 → **2826** (+4) · suites 140 → **141** · badge 3015 → **3019** —
every live-tense site re-anchored (README badge + Tested row +
file-tree + commands comment + suite list · AGENTS commands table +
gate paragraph · CLAUDE gate + commands + Unit row + seam line + the
four dialog-geometry carriers · PAD file-tree + totals row + HEAD
note + checklist + scripts table + the §11 rate-limit row 133 → 135
· pm-SKILL frontmatter + §2 row + §7 heading + §7 bullet · the
SKILL Appendix B + wall-clock phrase + §11 gate block) · the retired
2822/140/3015 forms join the negatives ladder · the neo-crm SKILL
head surgery v1.218.0 → **v1.219.0** (the s217 layer live, the s216
head demoted marker-less — by the repaired script itself) · the
pm-SKILL v1.12.0 → **v1.13.0** (+ the §7 session-layer note) · this
session_25 log + the worklog Task 217 entry + the plan's execution
ledger.

Pushed to `main` via the SSH wrapper.
