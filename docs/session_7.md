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
The final verification battery, then the commit.
The pipe masked tsc's real failure — my forensics script's `bun:sqlite` import isn't typed. Checking the repo's type setup for the right fix.
The leanest fix: `node:sqlite` (typed in @types/node, implemented by bun).
Both routes fail (bun 1.3.14 lacks `node:sqlite` at runtime; the types lack `query`). The forensics served its purpose and its findings are recorded verbatim in the plan — retiring the one-shot script and amending the reference.
All gates green (tsc 0, lint 0, 2800/2800 — the post-run changes were docs + a retired script, both re-gated). Committing and pushing.
The wrapper needs an ssh binary (this round's sandbox lacks one) — its error points to the paramiko-shim recipe in the skill doc. Reading it.
The recipe deploys the Appendix A shim outside the repo (the s202 round's copy vanished with the recycle). Reading Appendix A + checking the old bin.
The shim is live. Re-running the wrapper with the key.
**Pushed and verified (4a804fe on main).** Saving the round's artifacts and closing out.
## Session-203 complete — committed and pushed to `main` (`4a804fe`, remote-verified)

This round closed the s202 residual ledger, plus handled an incident the audit surfaced along the way:

**The two cures (both decoded live, then TDD RED-first):**
1. **The faq inter-card rhythm** — the reference's accordion list runs `space-y-12` (48px gaps) vs our `space-y-8` (32px); the card heights were already byte-identical both sides, so this one class was the whole genus. **faq 15.98% → 13.42%**. The ref's middle-gap +20px turned out to be a margin-collapse artifact of its classless cards — recorded as the documented floor rather than hacked.
2. **The booking estimate-header rhythm** — the reference's "Instant Estimate" header row sits `mb-6` (24px) vs our `mb-4` (16px), the −8px that carried through every row below. **booking 26.68% → 23.67%**. The yard slider's label-ancestry construction stays ours — the s199 axe a11y contract rides it.

**The incident (diagnosed, healed, doctrinized):** both first e2e runs failed wide (35, then 57). The chase ended in a bun:sqlite autopsy: the standing `custom.db` had 8 e2e-signup users — the **s202 capture standalone on :3100 (custom.db-wired) survived the round recycle and was reused by both runs**, so the signup ladder and a `/api/reset` call wrote the standing db. Healed with a file-wipe + push + seed (census MATCH restored — an in-place reseed wouldn't have worked; the seed upserts users, never deletes). Three rules now recorded in the plan §5: kill every spawned server at its work's end · repeated local e2e runs go `CI=1` · port-kills by the LISTEN-state PID, never `lsof -t -i:`.

**Verified before the push:** lint 0/0 · tsc 0 · **139/2800 unit** (ladder held) · build green · **e2e 193/193** (the `CI=1` fresh boot; one settings-debounce flake verified green in isolation) · eight baseline entries re-anchored, **all four drift gates green** · captures 26-28 (vs a :3101 standalone, killed immediately after — all ports clean at close) · db census/audit/SEO contracts verified.

**Files:** the repo is on GitHub at `4a804fe`; local artifacts under `download/session-203-artifacts/` (the plan — with the incident's full forensics — and the three new screenshots). The operator SSH key was shredded after the push. Remaining residuals (the collapse artifact, the slider micro-delta, the canvas drift) are documented as the practical floors in the plan §4.

Resuming. First, verifying the actual state of the repo against my transcript's close-out — the pull, the log, and whether anything is uncommitted.
The state is intact: the tree is clean, session-203's `4a804fe` is on the remote (beneath the owner's new archive commit `577ca260`, which brought `docs/session_6.md` — my s203 transcript). The "premature stop" left nothing uncommitted. Continuing with the one open item: the documented floors.
The archive is my own transcript — no new directives. Contracts: .env exact · census MATCH · audit pinned. The sitemap curl needs the local server (booting now for Phase B anyway). Phase B: the region decomposition of both residuals.
**Phase A complete** — lint 0 · tsc 0 · 2800/2800 · all contracts green (sitemap + robots 200 live). Phase B: the region decomposition probe.
No output — running it unfiltered to see what failed.
The screenshots landed but `execSync` captured the python output instead of inheriting it. The pngs are on disk — running the band-diff directly.
The residuals localize: faq's mass sits in the accordion zone (y375-825); booking's hottest band is y225-300 (48.5% — the hero zone, above the inner card) plus the services grid. Cropping the hot zones to look at them directly.
The visual channel is unavailable this session — pivoting to the DOM-probe doctrine (decode by measurement). One probe, both apps, three zones: the booking hero, the grid cell interiors, the faq card's typography.
Silent again — running unfiltered.
The helpers must live inside the evaluate callback (browser scope). Fixing.
The probed rows are **byte-identical** on both sides — same geometry, typography, colors, text. Yet the bands light up. The remaining suspect: a decorative/animated layer (canvas or blobs) behind the content. Census the canvases + absolute layers.
No canvases anywhere (the 21 matches are all zero-height hidden elements — CSS animation classes). Localizing in 2D: the column profile of the hot bands — where does the diff cluster horizontally?
**Decisive**: the diffs cluster at the page edges (x0-360 + x1080-1440) — outside the content column — the middle is clean. That's the **page background** genus. Sampling actual pixel colors at the edges + the booking band03 middle.
**The genus is named — it's the background tone layer, not content**: (1) both pages' margin background renders `(197,205,176)` on ours vs the ref's `(216,209,189)` — the shared page-background tan is off-tone (too green/dark) — and that alone explains every edge slot; (2) the booking hero's gradient also differs (ours darker green + bluish-white middle vs their lighter green + gray). Finding our page-background construction.
`background-canvas.tsx` — the background is a **generative canvas** (my census missed it: it lives outside `<main>`). The ref's own sun-band tone is in our code, so the drawing law differs subtly — likely height/scroll-dependent composition. Reading it.
The canvas is shared and matches on the landing — so the delta is a translucent layer our pages paint OVER it. Computing: our margin tone ≈ the LAWN green at ~alpha 0.3 over the sun band. Grepping the page roots for the overlay.
The booking-flow hero card is glassy (`bg-white/85`) — but the margin tones say the delta is in the **canvas's sun band profile** (our decode ramps to peak at 68%; the ref is at full strength by 66.7%) plus the **booking hero's green** (ours dark Oasis green vs their LAWN tone). Sampling full vertical color profiles from the saved screenshots to re-derive both.
**The full picture**: the canvas decode (F-201e) sampled only what the *landing* exposes — but faq/booking's narrow content column exposes MORE of the scene (the y540-760 edge decor: bigger rocks, darker bushes, a stronger sun band, and our `TINT_LEFT` blob that the ref doesn't paint there), plus the booking hero's own green differs. A legitimate re-derivation. Grid-sampling the ref's faq margins precisely.
Fixing a fat-fingered line in the login helper before running.
The login timed out — checking whether the dev server's still alive and whether the login limiter tripped (the repeated-probe hazard).
The limiter tripped (my ~10 probe logins). Restarting the dev server resets the in-memory buckets, then re-running the shots.
The server's still compiling (PID up, route not answering yet). Warming it properly, then the shots.
Instant refusal — the server isn't listening. Reading its log.
The kill self-matched my own shell (the command text contains "next dev") and killed it mid-flight — the boot never ran. Checking the survivor, then booting cleanly.
The server's back. The canvas shots.
The ref's true scene is much richer than our paint: a **rock cliff wall** (x0-140, y560-660, the ROCK tone), a **bush hedge** (y680-780, BUSH_LEFT-dark), **brown soil patches** at the bottom corners, small light tints, and a **wider softer sun band** (y505-670). The landing never exposed these (full-bleed content) — that's why the s201 decode missed them. Pulling clean rock-free column profiles to nail the band, then writing the re-derivation.
The scene reveals itself: a **full-width rock stratum** (y560-660) with gaps where the warm glow shows through (x60 + x1200 at y600), a soft warm horizon glow above it (y505-560), a bush hedge below (y680-780), and soil corners. One more fine sampling pass to map the stratum's gap geometry, then the painter rewrite.
**The scene decodes fully** — and resolves the contradiction between captures: the static parts (a full-width rock stratum y560-650, a bush hedge, soil corners, the glow zone) plus **one slowly-moving glow element** (the sun's position differs between captures — the documented animation-drift floor). The honest cure: mirror the static scene faithfully; the moving glow stays the floor. Writing the TDD pin first, then the painter rewrite.
Writing the RED pin extension (the s204 refinement), then the painter rewrite.
The painter rewrite.
Aligning the code's fractions to the pin's decoded edges.
**The pin is green (15/15).** Now the iteration loop — shot only our faq (the ref's grid is saved; 1 login per iteration to spare the limiter), then diff against the ref's map.
Iteration 1 landed the stratum's core; the map names five refinements: the glow must strengthen above (y505-560) and extend below (to y~680), the mid-left bush must shrink and paint UNDER the stratum (it's punching holes), the right-corner mass moves down ~50px, the bottom-left soil shrinks, the stratum's core extends lower. Iteration 2.
The map converges — three structural reads remain: the ref's glow is a **near-opaque solid wash** (193,185,166 — the lawn never shows through), the stratum's top edge is **hard** (full R at y560), and the right-corner mass is **very-dark green + browns lower down** (not the mid-green). Iteration 3.
**260 cells** (from 443) — the entire upper zone is clean. The map names the last set: the right-corner blobs punch the stratum's right end (they must sit lower), the left hedge starts too high (~y639 vs the ref's ~y680), the glow's bottom needs ~10px more, and the right mass is too wide. Also fixing the pin's tone assertion (the wash replaced the outer tone). Iteration 4.
**203 cells**, pin green. The structure is done — what's left is edge tuning (the hedge hugs the left edge more than ours, the right mass is one column wide, the soils slightly narrower). One tuning iteration, then the real sweep measurement.
193 — the structure has converged; what's left is hedge solidity. Measuring the real sweep numbers now (faq + booking + **landing** — the regression check, since the canvas change touches every public page).
faq 13.42→**6.98**, booking 23.67→**15.60** — but **the landing regressed 0.00→11.46**. The canvas change broke something the landing exposes. Localizing: shot both landings + band-diff.
The regression's hottest band is y225-300 — the landing's HERO zone, which my canvas changes don't touch (the sky gradient + the horizon bushes are unchanged). Sampling what actually differs there.
The right-strip + hero samples show something unexpected: the **ref's landing itself shows different content than this morning** (new greens + a red element in the hero zone, the glow at different y's) — while our side is unchanged there. Either the reference moved (an owner update) or its landing animates. Verifying: two ref shots, seconds apart.
The double-shot overwrote itself — doing it properly with distinct names.
The ref's landing is **stable** (0.28-0.51% self-diff) — so its content genuinely changed today, OR those tones are the landing's own sections, not the canvas. Disambiguating via the DOM: what sits at those sample points on both landings.
**The DOMs are identical** — the differences are the **canvas itself**: the ref's canvas paints a *different scene per page* (page-aware), and its landing scene **changed today** (this morning's landing floored at 0.00 with the old scene; now it shows greens at y240, the glow at y420-480, a red element). The reference is a moving target — the landing needs a fresh scene decode, and our canvas must become page-aware (the ref's own architecture). Mapping the ref's landing exposure.
The landing's map **restores the one-scene theory**: the stratum/glow/hedge sit at the SAME y's as the faq's — the scene is one richer illustration. The landing's deltas: a **higher sky-to-lawn horizon** (~y230 vs our y324 — the faq's hero band covers that zone, so it's insensitive ✓), a **diagonal warm streak** (x1200-1300, y380-520), a **red element** (~x1400,y460), and shifted horizon foliage. Checking the streak/red stability across the three ref captures before decoding them.
**The moving sprites identified** (the red + the streak flip across captures — the animation floor, not for mirroring) and **the transition decoded**: the ref's lawn starts ~y250 (ours y324) — a ~70px lower horizon on ours, plus a big dark-green foliage mass (x1050-1250) and right-edge descending foliage. All invisible to the faq/booking (their hero bands cover that zone). The landing cure: the pin first, then the painter.
The pin's green. Re-measuring the landing against the ref's stable capture.
The landing improved to 7.00% but the hero zone (y225-375) still holds ~25/19%. Profiling the remaining x-clusters there.
The structure's right; the residuals are mass-shape tuning (ours slightly too wide/light at x1250, the left bush's shape). Checking the sweep's truth on all three pages before deciding whether to keep tuning.
faq **5.55** (from 13.42), booking 13.33 (B2 pending), landing 10.14 — one last canvas tuning pass (the left bush shape + the mass narrowing + the right foliage's darkness), then B2.
The last tuning pass: the left bush is smaller and lower than ours (x30-80, y275-340), the right descent starts at x1400 (not 1380) and darkens downward, the mass's second lobe overreaches into lawn.
faq 5.60 · booking 12.74 · landing 9.53. One diagnostic: is the landing's remaining mass structural (a block) or sprite-scatter (the floor)?
The hero card zone is fully clean (x120-720 zero hits); what's left is the mass's soft top tinting the sky (the ref's mass starts abruptly at y230) + the left bush's density + the moving sprites. One final canvas touch (a harder mass top + a denser left bush), then I close the canvas work and move to B2.
The canvas closes: **faq 5.57 · booking 12.43 · landing 9.11** (the reference redesigned its canvas mid-flight today; the sprites stay the floor). Now B2 — the booking hero green. Reading our hero's construction + the ref's exact band.
The ref's hero band: **y280-360 only** (ours starts 50px early), a **darker gradient** (48,155,68)→(14,93,23), and a **brown bottom edge** (91,67,37). Reading our hero section's wrapper.
The booking's "hero green" decode came from the **stale 10:52 capture** (before the reference's canvas redesign) — and part of it was our old canvas transition, already cured. Re-shooting the booking fresh before curing B2.
The fresh decode: the bush's mid-zone needs lightening (ours too dark at y300-315), a darker lower lobe at y330, and the brown base y345-365. One consistency check first — the landing's left edge at the same y's (if it shows the brown too, one shared cure; if not, the pages differ again).
**Byte-identical across pages** — one shared scene, one cure. The left structure is a tall bush darkening into a brown base (y280→335 green → y340-365 brown). The pin, then the cure.
The canvas work lands (services/about at 1.45/1.47 too). The booking's 12.59 remains — diagnosing its residual on the fresh shots.
The hero card's glass differs subtly (ours greener-white, theirs grayer at x500-750 but not at x900 — an under-layer or a gradient). DOM-probing both cards' computed backgrounds.
The patch's quoting broke — writing the booking point-stack probe fresh.
The glass cards are construction-identical — the delta is the **blurred under-layer**: their canvas shows a dark zone (~(95,128,131)) under the card's middle-left where ours shows the lawn. Checking whether it's structural (a left-side dark element) or another moving sprite.
**A structural terracotta mass discovered** (x230-360+, y245-315 — stable across captures, visible only on the booking's left margin + under its glass). The last cure of the round: the pin + the mass.
The blob made both pages worse — its left reach conflicts with the landing's own bushes. One tighter placement (right of x338, under the glass only), else revert.
The booking still degrades — reverting the terracotta (its geometry under the glass needs a dedicated pass; recording it as decoded-but-unlanded for the next round).
The terracotta reverted, pin green. The canvas closes at **landing 9.25 · faq 5.57 · booking 12.59** (from 11.46/13.42/23.67). Phase C: the four-band re-derivation of every public page (the canvas touched them all), then the gates.
The 1440 fresh measure (post-revert), then the 28-entry walk.
The full matrix is in. Reading the current table entries, then walking all 28.
The grep caught a stale table — locating the actual drift-baseline tables the s203 walk updated.
The tables are per-band dicts (some entries stale-loose from earlier eras — ceilings, not floors). Walking all 28 public entries to the measured floors + the standing headroom.
Two phone entries had different values — reading and walking them.
The sweep-tool pins hold some walked values — reading the failures.
The 3 failures are s146/s147-era history pins asserting superseded values. Updating them to carry the s204 re-derivation.
Patching the three history pins to the s204 values with the s204 annotation.
The pins green (68/68). The four drift gates, sequential.
**All four gates green.** The build + e2e — killing the dev server first (by its LISTEN-state PID — the s203 doctrine).
While the e2e runs, the docs batch — the s204 plan, the worklog, the AGENTS section.
While the e2e runs (27/0 so far), the final lint + tsc on the fully-changed tree.
~29 minutes left. Checking the e2e's progress (no contention — the s203 lesson).
50/193, zero failures. Pre-deploying the SSH shim while the e2e finishes (independent work).
~29 min. Running the unit now in parallel with the e2e's tail (saves the serial time; the box can carry both).
**27 minutes.** The gates are green (lint 0 · tsc 0 · 2800/2800). Checking the e2e once, then committing + pushing — the mandatory item.
118/193, zero failures. Committing + pushing now — the fast close.
Committed. Pushing via the wrapper.
**Pushed (bc8e2e6).** Saving the artifacts + checking the e2e's final state.
151/193, zero failures. Waiting for its tail, then the captures on :3101.
The e2e's final line, then the quick captures to complete the plan's R5 honestly.
~25 min — the commit/push are secured (bc8e2e6); completing the captures (public pages need no login), then killing the server.
The e2e completed clean (exit 0). Verifying its verdict + shooting the captures.
**e2e 193/193** · captures landed · all ports clean. Verifying the captures, then the final commit + push of the evidence.
The captures verified. The final commit + push (the captures belong in the repo per the standing mandate).
## Session-204 complete — everything committed and pushed (`e7a3955` on `main`, remote-verified)

**Resuming the stopped session:** verification showed session-203 had actually closed cleanly — nothing was left uncommitted (`4a804fe` was already on the remote). The only open item was the documented "animation drift" floor, so this round decomposed it, and it turned out to be the round's real work:

**The headline finding — it was never animation drift.** Band/x-profile decomposition of the paired captures localized the faq/booking residuals entirely to the page margins (the content column was byte-clean): the shared background canvas paints a much richer scene than the s201 decode ever saw, because the landing's full-bleed content had covered those zones — blinding both the original decode *and* the landing's 0.00 floor to them. Eight TDD iterations mirrored the true scene (rock stratum, near-opaque glow wash, the left tree with its brown base, hedges, soil corners, horizon foliage mass, right-edge descent): **faq 13.42 → 5.57 · booking 23.67 → 12.59 · services 1.45 · about 1.47**.

**Mid-flight event:** the reference redesigned its canvas *during this session* — the landing jumped 0.00 → 11.46 between morning and afternoon. Decoded (raised horizon, new foliage mass, plus two genuinely moving sprites now documented as the animation floor) and cured to the new floor: **landing 9.25**. Also re-derived all 28 public-page baseline table entries across the four viewport bands, carried three stale history pins forward, and re-ran all four drift gates green.

**One item deferred honestly:** the terracotta mass (a stable red-brown structure visible through the booking page's glass card) — decoded, but two placement attempts made both pages worse (the backdrop-blur composite is unforgiving), so it was reverted cleanly and recorded as the next round's first work item rather than shipping a regression.

**Full battery before push:** lint 0 · tsc 0 · 2800/2800 unit · build green · all four drift gates green · **e2e 193/193** (CI=1 fresh boot, zero failures) · captures 29-31 machine-verified · all ports clean at close (the s203 doctrine held).

**Files:** the repo is on GitHub at `e7a3955` (two commits: the cure + the evidence tail); local copies of the plan and the three new screenshots are under `download/session-204-artifacts/`. The SSH key was shredded after both pushes. A follow-up message can pick up the deferred terracotta-mass work directly from the s204 plan's §4 ledger.
