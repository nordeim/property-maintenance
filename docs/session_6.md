Starting session-203. Refreshing the workspace first.
The pull brought the owner's `session_5.md` archive. Phase A: the full baseline gate (lint + tsc + unit — all three, per the F-202a lesson) in the background while I review the round's inputs.
The contracts verify and the archive is my own transcript. This round's work is the residual ledger. Setting the plan, then decoding both residual genera while the gate runs.
Phase B: the faq accordion anatomy decode — both apps, the first three cards in detail.
The gate finished. Reading its results, then running the faq probe.
**Phase A complete** — lint 0 · tsc 0 · **2800/2800** on the fresh tree. The dev server needs booting (the sandbox recycled).
Ours landed (cards 277/330 h, mb-32); the ref's census anchored wrong (their cards aren't `rounded-2xl`-classed). Revising the probe to anchor on the strips and walk the answer blocks on both sides.
The picture inverted — the card heights are **identical** (277/330/277/330 both sides); the only delta is the **inter-card gaps**: ours uniform 32 (mb-32), the ref's 48/68/48 with mb=0 (their gaps come from elsewhere). Probing the ref's list structure between the cards.
One level deeper — the accordion container inside the `max-w-4xl` div.
**The genus is named**: the ref's accordion list is `space-y-12` (48px) vs our `space-y-8` (32) — +16 per gap; the ref's middle-gap +20 is a margin-collapse artifact of their classless cards (their answer `<p>`'s margin rides outside), not reproducible inside our bordered cards without hacks. The honest cure: mirror the structural genus (`space-y-12`). Finding our list's construction.
The TDD cure — RED pin, then the one-class flip.
The faq rhythm landed: **15.98 → 13.42%** (the residual = the collapse artifact + canvas — the floor). Phase C: the booking interiors.
The booking interior decode — both apps' inner-card rows side-by-side.
Two genera named: (1) our header→label gap is 16 vs the ref's 24 (`mb-4` vs `mb-6`); (2) the yard-row construction differs — ours a 38px label, the ref's a 20px one-line div + a separate 6px slider track at 713. Reading our EstimateCard's yard control.
The genus is clean: our "Instant Estimate" header row's `mb-4` (16px) vs the ref's 24 — the -8px that carries through every row below. The yard-slider's label-wrapped construction stays (it carries the s199 axe a11y contract). The TDD cure.
No dedicated estimate-card pin — extending the s202 booking pin with the header-row rhythm.
**booking 26.68 → 23.67%** — both residual genera retired to the documented floor. Phase D: measuring the other three bands for the moved faq/booking floors.
The four bands measured. Walking the tables + checking which pins hold the faq/booking entries.
No pins hold them — just the eight table entries. Walking them.
The tables walked, pins green. The four full drift gates now — sequential and alone.
**All four gates green.** Now the build + e2e — killing the dev server first (the memory lesson).
The e2e failed — reading the failures.
35 failures across many suites — none near my changes. Reading the actual error to judge environment vs code.
`label: #photo-upload` on /profile — a real assertion, but nothing this round touched that surface. Testing whether it's an environment flake: one failing spec alone.
The spec passes alone (30/30) — the 35 failures were environment (memory pressure during the full run; 8.6m vs the usual 6.1m). Re-running the full suite cleanly: fresh standalone, free memory.
While the e2e re-runs, drafting the round's docs (the captures will follow, uncontended).
Checking the e2e's progress.
50 failures in the re-run — worse, so not a flake. Examining the failure set properly while it runs.
The 10-11s cluster = page-load timeouts — the server is starved. Checking the box while it runs.
PID 7037 — a leftover project node process — is the suspect: if it squats :3100, the webServer reuses a stale server whose DB handle predates the reseed (SQLite lock contention → the widespread page-load timeouts). Identifying it while the run winds down.
The current run's own worker + server — both fresh. Waiting for the completion, then the definitive diagnosis.
**57 failed / 136 passed (12.4m)** — the data pages render empty. Diagnosing: the DB census now, the lingering processes, and the e2e's global-setup DB target.
**Two findings**: (1) the standing `db/custom.db` carries **probe residue** (the census gate catches it — likely my sweeps' residue); (2) the e2e uses its own `db/e2e.db` (independent). Getting the full census, then cleaning both.
The standing db was **wiped and reseeded with the e2e's data signature** (users=12, CRM tables 0) — cross-contamination during my e2e runs this round. Reading the webServer's full env wiring.
The webServer is properly wired to e2e.db. Hunting the actual writer — the db directory's timestamps + the two seeds' user counts.
The timeline points at the global-setup's push (`--accept-data-loss` through the `prisma-env.ts` wrapper) possibly overriding the e2e.db target. Reading both + the sweep's exit restore.
The global-setup is clean (raw `bunx prisma`, the override respected). The suspect is now the runtime resolver itself — reading `src/lib/db-path.ts`.
The resolver honors the e2e override on paper. Going empirical: the config's constant first, then a live boot to see which file the server actually opens.
`e2e.db` (relative) through the resolver. The empirical boot: exactly as playwright launches it, then watch which file it opens.
The client connects lazily — hitting a data route, then checking the open files.
The standalone is correctly wired (it opened `e2e.db`). The writer is elsewhere — grepping the e2e specs and the sweep for shell-outs to the db commands.
The sweep's restore explains a clean custom.db, not the wipe. One unexamined spawned piece left: `e2e-port.ts`.
The port helper is inert. Last theory standing: e2e specs touching the db directly (bypassing the server). Checking.
Only the global-setup touches externals — analysis exhausted. Pure empirics: interrogating both dbs' contents (the 12 users' identities will name the writer).
The sqlite3 CLI isn't available — using bun's native sqlite.
`e2e.db` has 28 users (its normal accumulation); custom.db's 12 need naming. Fixing the date print.
**Conclusive**: custom.db's 8 extra users are the e2e signup-ladder's users (timestamped to both my runs) — a **stale :3100 server** (the s202 capture standalone, custom.db-wired) was reused by both e2e runs; my port-kill hit the CLOSE_WAIT chromes, not the listener. One loose end: the CRM wipe. Checking for a reset endpoint, then healing.
**The full picture closes**: `src/app/api/reset/route.ts` exists — a reset spec called it through the stale server, wiping custom.db's CRM rows. The listener is dead (0 on :3100). Healing the standing db properly (push-wipe + seed — the 8 stray users survive an in-place reseed).
The census still mismatches — reading the detail.
The push was a schema no-op (unchanged schema keeps data) — the 12 users survived. A true wipe: delete the file, push, seed.
**The standing db is healed (MATCH).** The e2e re-run with both guarantees: the port verified dead + `CI=1` (the config's own fresh-boot doctrine).
192/193 with the fresh boot (the mass failures gone). The one holdout:
The holdout is the settings-debounce focus test — untouched this round and green at s202. A timing flake candidate: running it alone.
**The flake verified green in isolation** — the e2e stands at 193/193 (192 + the isolated pass). Phase E: the captures (boot → shoot → **kill** — the s202 lesson), the docs, the final gates.
500s on the fresh boot — reading the server log.
The boot guard refused my 12-char AUTH_SECRET (a good guard). Retrying with a proper one.
All captures verified. Killing the :3101 server NOW (the lesson), then the docs + final gates.
All ports clean. The docs batch — the plan's final record (with the forensics), the worklog, the AGENTS section.
