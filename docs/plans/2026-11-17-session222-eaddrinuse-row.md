# Session-222 Remediation Plan — The EADDRINUSE Row Round (The Owner's Second Fresh-Clone Report)

**Date:** 2026-11-17 · **Rotation trigger:** the owner's `0cfe160` (`docs/session_34.md` — the s221 execution record — + the updated `docs/start_server_error.txt`).
**Baseline at 0cfe160 (fresh clone, this sandbox):** lint 0/0 · tsc 0 · **145 suites / 2859 unit GREEN** · build ✓ (compiled clean 24.2s) · smoke 14/14 · **e2e 193/193 (6.1m)** · probe:ref STABLE (bundle `ee166dd5`, all census layers STANDING) · the drift battery: sweep desktop + phone EXIT:0 · fullpage EXIT:0 · interior census byte-parity zero margin EXIT:0 · the mobile-nav drawer battery (panel 288px @ x0 · 8 links · Esc-close · resize-release) · db census MATCH at `<repo>/db/custom.db`.

**The owner's report (the s221 verification leg):** their machine re-ran the full setup — `bun install` picked up **next@16.4.6** (the s221 cure riding through), `bun run db:push` + `db:seed` pristine, and `bun run build` **compiled clean in 28.2s** — the TS2307 genus resolved on their side too (their checkout was refreshed). The standalone server then booted `✓ Ready` after one **`EADDRINUSE` retry** — a lingering :3000 process from the earlier session held the port on the first attempt.

## The audit (the web-application skill §12/§16/§18 dimensions over the 0cfe160 tree)

The s221 cures verified still in place (9/9: the next@16.4.6 lockfile pin · the audit census 10 [4h/5m/1l] · the PAD §10 RE-TRIAGED session-221 clause · the AGENTS gate-order tail · the docs-counts D-198a2 pin · the README TS2307 row · the pm-SKILL v1.17.0 + its Session-221 history entry · the neo-crm SKILL v1.222.0 + s221 head layer · the README/PAD/neo-crm 16.4.6 version carriers). All security seams verified at line level (the boot gate · the Zod boundary [23 route files] · force-dynamic discipline [zero misses] · zero dangerouslySetInnerHTML · the single PrismaClient · the db-path seam · the env-knob parity). Two findings, both Low/Info:

| ID | Severity | Site | Finding |
|---|---|---|---|
| F-224a | Low | `README.md` Troubleshooting | The owner's live `EADDRINUSE` ("Error: Failed to start server. Is port 3000 in use?" on the first `bun run start`, resolved by the retry) names a genus the Troubleshooting table does not cover: a lingering process holding :3000 (a dev server, an earlier `bun run start`, or an orphaned `next-server`) after the standalone build. The smoke leg solves this on its own port (:3210 with a trap-kill), so the genus only bites the operator at the documented commands. |
| F-224b | Info | `db/` on dev machines | The `db/` family accumulates scratch artifacts (`custom.db` + `e2e.db` + `smoke.db` — all gitignored, zero tree impact). No cure owed; recorded as the operator-facing listing note. |

## The cures (TDD — every pin RED-first at birth)

- **R-01 (F-224a):** the README Troubleshooting row for the EADDRINUSE genus — the symptom (`Is port 3000 in use?` / `EADDRINUSE` at `bun run start` or `bun run dev`), the cause (a lingering process on :3000 — the earlier session's dev/standalone server), and the fix (find + kill the holder: `lsof -ti :3000 | xargs kill` / `npx kill-port 3000`, or wait out the process; the retry succeeding is the same genus). Pinned in the session-222 suite so the row cannot silently disappear.
- **R-02:** the verification battery on the cured tree — the standing gate re-run (lint · tsc · unit · build · smoke · e2e) with the unit suite carrying the +pins; the drift battery re-run for the round's own evidence.
- **R-03:** the docs lockstep — `docs/session_35.md` (the round record) · the worklog Task 222 · the plan ledger flip · the pm-SKILL v1.18.0 + its own Session-222 history entry (the F-221a/F-222a genus discipline) · the neo-crm SKILL v1.223.0 + the s222 head layer (LINE-BOUNDED, replay NOOP-idempotent) · the count ladder (2859 → +pins · suites 145 → 146 · badge 3052 → +pins).

## Execution ledger

- [x] R-01 the README EADDRINUSE troubleshooting row (F-224a) — the symptom in the owner's exact phrasing + the cause + the lsof/kill-port fix
- [x] R-02 the verification battery on the cured tree — lint 0/0 · tsc 0 · 146/2863 · build · smoke 14/14 · e2e 193/193 · the drift battery EXIT:0
- [x] R-03 the docs lockstep + the count ladder (2859→2863/145→146/3052→3056) + the pm-SKILL v1.18.0 entry + the neo-crm v1.223.0 head layer + the push via the SSH wrapper
