# Session 222 — The EADDRINUSE Row Round: The Owner's Second Fresh-Clone Report

The owner's `docs/session_34.md` (the s221 execution record) + the
updated `docs/start_server_error.txt` archive (`0cfe160`) triggered the
rotation. The workspace was reset again — the round began with the
mandated fresh `git clone`.

## The owner's report (the s221 verification leg — their machine is green)

Their updated `start_server_error.txt` re-runs the full setup:
`bun install` picked up **next@16.4.6** (the s221 cure riding through
their checkout), `bun run db:push` + `db:seed` pristine (the census
numbers match the seed contract), and `bun run build` **compiled clean
in 28.2s** — the TS2307 genus resolved on their side (their checkout
was refreshed). The standalone server then booted `✓ Ready in 0ms`
after one **`EADDRINUSE` retry**: "Error: Failed to start server. Is
port 3000 in use?" on the first `bun run start` — a lingering :3000
process from the earlier session held the port.

## The baseline (the pristine-clone verification)

The full gate on the fresh clone: lint 0/0 · tsc 0 · **145 suites /
2859 unit GREEN** · build ✓ (24.2s) · smoke 14/14 · **e2e 193/193
(6.1m)** · probe:ref STABLE (bundle `ee166dd5`, all census layers
STANDING) · the drift battery: sweep desktop + phone EXIT:0 · fullpage
EXIT:0 (desktop 5.723% / phone 8.108%, both under their baselines) ·
interior census byte-parity zero margin EXIT:0 · the mobile-nav drawer
battery (panel 288px @ x0 · 8 links · Esc-close · the resize-past-md
release — no Tailwind v4 bug) · db census MATCH at `<repo>/db/custom.db`.

## The audit (the web-application skill §12/§16/§18 dimensions over 0cfe160)

The s221 cures verified still in place, all nine: the next@16.4.6
lockfile pin · the `bun audit` census 10 (4 high / 5 moderate / 1 low
— the next advisory retired) · the PAD §10 RE-TRIAGED session-221
clause · the AGENTS gate-order tail · the docs-counts D-198a2 pin ·
the README TS2307 row · the pm-SKILL v1.17.0 + its Session-221 history
entry · the neo-crm SKILL v1.222.0 + s221 head layer · the
README/PAD/neo-crm 16.4.6 version carriers. Every security seam
verified at line level: the Zod boundary (23 route files) · the
bounded reader · the rate-limit family · force-dynamic discipline
(zero misses) · zero dangerouslySetInnerHTML · the single
PrismaClient · the db-path seam · the env-knob parity · the docs
count-lockstep (112 pins green across the three suites touched this
round).

Two findings, both at the operator-facing low end:

- **F-224a (Low):** the owner's live `EADDRINUSE` names a genus the
  README Troubleshooting table does not cover — a lingering process
  holding :3000 (an earlier session's dev/standalone server). The
  smoke leg is immune (its own :3210 + trap-kill); the documented
  commands are where the genus bites.
- **F-224b (Info):** the `db/` scratch family accumulates
  (`custom.db` + `e2e.db` + `smoke.db` — all gitignored, zero tree
  impact). Recorded as the operator-facing listing note; no cure owed.

## The cures (TDD — `tests/session-222-audit.test.ts`, the 146th suite, 4 pins, 2 RED at birth)

- **R-01 (F-224a):** the README Troubleshooting row for the EADDRINUSE
  genus — the symptom in the operator's exact phrasing ("Is port 3000
  in use?"), the cause (a lingering process), and the fix
  (`lsof -ti :3000 | xargs kill` / `npx kill-port 3000`, then retry).
- **R-02:** the verification battery on the cured tree — the full unit
  suite re-run (the 146th suite rides it), lint + tsc, and the drift
  battery re-run for the round's own evidence.
- **R-03:** the docs lockstep — this record · the worklog Task 222 ·
  the plan ledger flip · the pm-SKILL v1.18.0 + its own Session-222
  history entry · the neo-crm SKILL v1.223.0 + the s222 head layer ·
  the count ladder 2859 → 2863 (+4 pins) · suites 145 → 146 · badge
  3052 → 3056.

## The verification battery

lint 0/0 · tsc 0 · **146 suites / 2863 unit** (+4 pins) · build ·
smoke 14/14 · e2e 193/193 · probe:ref STABLE · the drift battery EXIT:0 ·
captures 85-87. Pushed via the SSH wrapper.
