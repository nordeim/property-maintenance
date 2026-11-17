# Session-216 — The Standing Rotation: The Pin-Containment Debt + The Stale-Narration Hygiene (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `67a0c09` (the owner's
session_22.md archive — the s215 execution record) · **Head at start:**
`67a0c09` · **Baseline:** lint 0/0 · tsc 0 · **140 suites / 2822 unit
GREEN** · db census MATCH (15/24/10/23/12 + 4 users) · probe:ref
**STABLE** (bundle `ee166dd5` — no parity event; every standing layer
STANDING) · the mobile-nav walk at 390 re-verified live: geometry
`{70,0,320,844}` byte-MATCH · 8-link vocabulary MATCH · animation
`enter/0.5s` MATCH (**no Tailwind v4 bug**).

## The audit (the 5e8f73d collateral rotation)

Four findings (1 Medium-reasoned, 1 Low, 2 Info — none
Critical/High); the s215 cures themselves verified placement-correct
across all nine limiter routes, leap-year-correct, side-effect-free
(no test spies the console.info; the e2e consumes the response
payload), and the docs truth holds at 2822/140/badge-3015 in every
file — no disagreement anywhere.

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-217a | Med (reasoned) | `src/lib/schemas.ts:740-758` | the past-date gate's day comparison runs on the SERVER's local clock while the UI mirror runs on the CLIENT's — cross-TZ skew both directions (server-ahead: the client's "today" is the server's yesterday → a false rejection; server-behind: the client's disabled "yesterday" passes). The in-code comment claims the local-day mirror "keeps its today," which only holds when deployment TZ == user TZ. A DISPOSITION, not a cure, this round: the reference's own booking flow carries NO server validation at all (its submit target is unobserved — ours is the documented SUPERSET), so any tolerance window is already stricter than parity; the single-TZ self-hosted deployment (the repo's own contract — one deployable unit, Gold Coast audience) is the documented audience. The window stays as-shipped; the comment gains the honest cross-TZ caveat (F-217a1, the Info-grade narration fix) |
| F-217b | Low | `tests/session-215-audit.test.ts:55-62,77-88` | the F-216a pins are ordering proxies (`logAt > gateAt` via indexOf), not containment pins — a refactor hoisting `console.info` after the closing brace (below the gate, outside the branch) still passes; the F-216b sweep pins assert the call's EXISTENCE, not its placement after the limiter and before the denied return. Both under-specify the contract their own comments narrate |
| F-217c | Info | `src/app/api/auth/signup/route.ts:70-76` | the block comment still narrates "the code is logged to the SERVER console … never shipped to the client" unconditionally — under `NEO_DISABLE_IN_APP_OTP=1` the log is now silenced (F-216a), leaving two adjacent comments telling different stories |
| F-217d | Info | `scripts/count-ladder-215.py:1-30` | the docstring opens "SUITES 139 HELD" then self-corrects mid-file ("Wait — SUITES: … 139 -> 140"); the first line is wrong-as-written. The script's AGENTS.md walk also missed the file-tree row site (line 738, "140 Vitest suites — 2822 checks" — re-anchored out-of-band), contradicting the "every live-tense site re-anchored" claim |

## The cures (TDD — every code pin RED-first)

- **R-01 (F-217a) the TZ caveat (the narration half):** the
  schemas.ts comment gains the honest cross-TZ caveat — the
  single-TZ self-hosted deployment is the documented contract, the
  cross-TZ skew is the known tolerance, the parity note (the
  reference validates nothing) is the standing disposition. No
  behavioral change.
- **R-02 (F-217b) the containment pins:** both F-216a pins upgrade
  from ordering to CONTAINMENT — extract the `if
  (inAppOtpEnabled)` block (the gate's brace window) and assert the
  `console.info` line sits INSIDE it (the block slice contains it;
  the post-block slice does not); both F-216b sweep pins gain the
  placement pin — the `sweepRateLimits()` call sits between the
  `rateLimit(` call and the `if (!rl.allowed)` denied return (the
  login route's exact idiom, already placement-verified clean in
  all 9 routes this round).
- **R-03 (F-217c) the stale narration:** the signup route's block
  comment carries the F-216a caveat ("the log rides the same gate —
  under NEO_DISABLE_IN_APP_OTP=1 nothing is logged; see the
  F-216a note below") — the two comments now tell ONE story.
- **R-04 (F-217d) the docstring truth:** the count-ladder-215.py
  docstring's first line corrected (140 suites, the file IS the
  140th); the walk-list note gains the file-tree row site so the
  documented inventory matches what shipped.

## The verification battery

lint 0/0 · tsc 0 · unit (the new count) · build · smoke 14/14 · e2e
193/193 (the CI=1 fresh boot) · the drift-gate battery (four band
sweeps + fullpage + census) · the mobile-nav walk at 390 · captures
71 (the standing round's evidence) · the docs lockstep · commit +
push via the SSH wrapper.

## Execution ledger

- [x] R-01 the TZ caveat (F-217a1) — the honest narration on the past-date gate's clock
- [x] R-02 the containment pins (F-217b) — the F-216a brace-window + the F-216b placement; teeth proven by live plants (RED → revert → GREEN)
- [x] R-03 the signup comment unification (F-217c)
- [x] R-04 the count-ladder docstring truth (F-217d)
- [x] R-05 the verification battery — lint · tsc · 140/2822 unit · build · smoke 14/14 · e2e 193/193 · the drift gates · the mobile-nav walk · captures 71 · the docs lockstep; pushed via the SSH wrapper
