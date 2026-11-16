I'll start by reading the uploaded instructions and setting up my workspace. Let me create a plan first.
I've read and internalized the operating instructions (six-phase workflow, evidence-based verification, audit discipline, TDD). Now let me set up the workspace — it has been reset, so I'll clone the repo fresh.
The repo is cloned. The core docs are very large (AGENTS.md ~942KB, Project_Architecture_Document.md ~592KB). Let me check the structure first, then delegate the large-document reviews to parallel subagents while I review the session docs myself.
The repo is already mature (26 sessions). Let me check key config files and the size of the session docs, then delegate large-document reviews to parallel subagents.
Session 25/26 tell me the project is at session-217 ship state (6236cbb). Now let me read the worklog and the pm-SKILL, and delegate the giant docs (AGENTS.md ~942KB, PAD ~592KB, README ~144KB, CLAUDE.md ~55KB) to parallel Explore agents.
The worklog shows a "standing rotation" pattern — each session audits the previous round's collateral and remediates with TDD. Now let me delegate the giant core docs to parallel Explore agents while I review the skills and repo files myself.
I now have a thorough understanding. This is a mature project at session-217 ship state, and my task maps to the next "standing rotation" (session-218), triggered by the owner's session_26.md archive (7438dcd). The user's asks (env, vitest/playwright configs, sitemap/SEO, mobile-nav parity, screenshots, .env.example, SKILL doc, push via SSH wrapper) all map onto the established rotation protocol.

Let me update my plan and start environment setup in the background while I read the skills.
**Progress update:** bun install is done. I've read the web-application, TDD, clone-app-pat-pro, and agent-browser skills. Now setting up the environment (.env with `DATABASE_URL="file:../db/custom.db"` as you requested) and checking the tailwind-v4 skill.
Environment is up: db seeded at `db/custom.db` (repo root), census MATCH. Now installing Playwright chromium (background) while I run the baseline gates and read the remaining skill files.
2 test failures in the baseline — this is exactly the kind of finding the rotation is designed to surface. Let me identify them.
Both failures are the **same genus**: session-217's phone baseline re-anchor (login 3→3.8, not-found 2→2.9 per the s148 precedent, documented in session_25.md) updated `scripts/sweep.ts` but missed the twin expectations in `tests/sweep-tool.test.ts`. The shipped state was NOT actually green — a genuine finding. Let me verify:
**Finding F-219a (High):** session-217 re-anchored the phone baselines in `scripts/sweep.ts` (login 3→3.8, not-found 2→2.9) but left the twin pins in `tests/sweep-tool.test.ts:96,642` at the retired values. The shipped s217 state is NOT green — `bun run test` fails 2/2826. This is my first remediation target. Let me continue the baseline gate (build) while starting the audit.
Confirmed — the s217 re-anchor updated `scripts/sweep.ts` but not its test twins (a pin gap, the same genus as F-218a). The cure is to true the pins to the adjudicated s217 baselines. This is the RED state already; applying the cure:
F-219a cured — sweep-tool 68/68 green. Now let me run the reference probe and mobile-nav walk against the live Oasis site while the build finishes. First checking what the probe needs:
**probe:ref STABLE** (bundle `ee166dd5`, all layers STANDING — no parity event) and the **build is GREEN**. Now the mobile-nav walk at 390 against our dev/prod app. Let me check the walk script and boot our app:
**Mobile-nav walk: byte-MATCH** — geometry `{70,0,320,844}`, 8-link vocabulary, `enter/0.5s` animation (no Tailwind v4 bug), Esc-close + focus-return + navigation all working. The operator's standing parity focus holds.

Now the audit. Let me delegate the broad code audit to a subagent while I audit the s217 collateral myself (the head-surgery scripts, count narration, and docs lockstep sites).
Audit complete — 7 findings (F-219a cured; F-220a–g: 4 Medium, 2 Low, 1 Info). Smoke 14/14. Now let me batch-read the files I need to cure, then write the remediation plan + RED pins.
Audit findings are in. Now I'll validate the cure targets against pinned surfaces (to avoid breaking the gate), and read the SSH push runbook — both in parallel.
Step budget is tightening — I'll batch aggressively now. First, extract the exact bytes I need for the pins (neo-SKILL lines, e2e sitemap test, metadata pins), and skim the distill skills:
Step budget is tight — switching to batched execution. Let me grab the last validation greps and skim the distill skills in one call:
Step budget is critical — batching everything now. Collecting all exact anchor strings for the cures and count ladder in one call:
Step budget is now critical — executing the remediation in large batches. Writing the plan + RED pins now:
Step budget critical — batching aggressively. First: prove the pins RED, then apply all cures in one pass:
7/8 RED (F-219a was cured during triage — teeth-proven at birth). Now applying all cures in one batched pass — each edit is surgical:
One site remains — the shipped SKILL head layer itself carries the caret form. Fixing, then verifying all pins GREEN:
Two pin assertion mismatches (a line-wrap in my cure and an over-broad negative). Fixing both, then running the full unit suite:
Step budget is nearly exhausted — switching to pure batch mode. First: restore the corrupted docs-counts (my ladder re-run flipped a negative assertion — restoring from git), identify the 1 remaining RED pin, and collect all count-ladder anchors:
Step budget is nearly exhausted — pure batch mode now. Fixing the F-220g negative (it must target the dashboard form, not the generic phrase) and finishing everything in as few calls as possible:
Now running the full unit suite to get the new count and catch any line-count pin drift from my edits:
Step budget nearly exhausted — pure batch execution now. Fixing the pin wording and writing the full docs-lockstep script in one pass:
**Progress update:** All 8 cures applied; count ladder run (2834/142/3027); 3 lockstep pins need re-anchoring (the ladder scripts I must true). Batching the remaining work tightly now — fix pins, verify, docs, build+e2e, screenshots, then push.
**Unit suite: 142 suites / 2834 checks ALL GREEN.** Now the final battery — lint, tsc, build, session logs, screenshots — batched into minimal calls:
Captures 73-75 verified non-blank. Now the e2e battery (193 expected), then commit + push:
## Session-218 — Status Report

The standing rotation (session-218) is **complete except the final commit + push**, which the step limit cut off. Everything is sitting in the working tree at `/home/z/my-project/property-maintenance`, ready to commit.

### Verified complete (all evidence executed)

1. **Environment**: re-cloned, `bun install`, `.env` with `DATABASE_URL="file:../db/custom.db"` (db/ at repo root) + fresh `AUTH_SECRET`, db push/seed, **census MATCH** (15/24/10/23/12 + 4 users), chromium installed.
2. **Baseline audit — the shipped s217 tree was RED**: `bun run test` failed 2/2826 (**F-219a, High**): the s217 phone-baseline re-anchor (login 3→3.8, not-found 2→2.9) updated `scripts/sweep.ts` but not its twin pins in `tests/sweep-tool.test.ts`.
3. **Full audit** (web-application skill dimensions over the 6236cb6 collateral): 8 findings — F-219a (High), F-220a–d (Medium: two missed narration sites, the ladder's phantom pm-SKILL anchor, two unrecorded-manual neo-SKILL re-anchors), F-220e/g (Low), F-220f (Info). Plan saved at `docs/plans/2026-11-16-session218-twin-pin-debt-replay-completion.md` with the ledger flipped.
4. **TDD cures**: `tests/session-218-audit.test.ts` (the 142nd suite) — 7 of 8 pins RED-first at birth; all cures applied (rate-limit narration ×2, ladder replay repair, head-script completion, `.env.example` HEADLESS row, caret-misname trues ×3, sitemap comment true).
5. **Parity verification**: **probe:ref STABLE** (bundle `ee166dd5`); **mobile-nav walk at 390 byte-MATCH** — geometry `{70,0,320,844}`, 8 links, `enter/0.5s` (**no Tailwind v4 bug**); mobile menu Esc-close/focus-return/navigation all working.
6. **Verification battery**: lint 0/0 · tsc 0 · **142 suites / 2834 unit GREEN** · build GREEN · **smoke 14/14** · **e2e 193/193** (5.9m, CI fresh boot).
7. **Docs lockstep**: count ladder 2826→**2834**, 141→**142**, badge 3019→**3027** via `scripts/count-ladder-218.py` (idempotent); pm-SKILL bumped **v1.14.0**; neo-crm SKILL s218 head layer prepended (line-bounded, marker stripped in-script); `docs/session_27.md`, `worklog.md` Task 218, layer-axis pins re-anchored.
8. **Screenshots**: captures 73/74/75 saved to `docs/screenshots/` (landing 1440, mobile menu open 390, booking 390) — machine-verified non-blank (0.996/0.273/0.642).

### Not finished (why)

- **Git commit + push via the SSH wrapper** — step budget exhausted before this step. The working tree holds all changes; nothing is committed yet.
- **The six drift-gate sweeps** (`gate:full`'s sweep ×4 bands + fullpage + census) were not run this round (time); the mobile-nav walk, probe:ref, smoke, and e2e battery all passed.

### How to continue

Send a follow-up message and I will: run `git status` review → commit with the conventional message (`:tada: feat(session-218): the standing rotation — the twin-pin debt + the replay completion (TDD)`) → deploy the paramiko ssh shim (no `ssh` binary in this sandbox; `pip install paramiko` needed) → push via `docs/ssh_git_wrapper_v3.py --key-file ... --remote git@github.com:nordeim/property-maintenance.git` → verify the remote ref == local HEAD → shred the key. Optionally run the six drift gates first.

I'll continue from where the previous session stopped. Let me update the todo list and verify the workspace state first.
The wrapper is clear: needs an `ssh` binary on PATH, `--remote git@github.com:nordeim/property-maintenance.git`, key file outside the repo. The previous session found no `ssh` binary — let me verify and read the runbook's Appendix A (the paramiko shim recipe):
I have the full shim recipe. Deploying it outside the repo, writing the operator key to a 0600 file, and verifying the key parses with its fingerprint:
Key parses (ed25519, SHA256:uHkU1C8…). Now checking the drift battery progress and the untracked-files situation for the commit (db binaries must not be committed):
The battery is still capturing (it boots its own servers and walks the reference site — it will take a while; 4 sweeps + fullpage + census, likely 15-25 min total). While it runs, let me verify the mobile-nav walk still passes with the current build and prepare the commit message:
While the drift battery runs, let me commit the changes locally (the battery operates against the working tree/build, not the git index, so committing now is safe — the push happens only after the battery verdict):
Staged exactly the 26 session-218 files (no db/.env/skills — those are git-ignored or untouched). Now committing with the conventional message:
Committed `85ed531` to main. Now the dry-run push (proves the key authenticates + the shim works; touches no refs) while the battery continues:
Dry-run succeeded — auth works via the shim, remote at `7438dcd`, our commit `85ed531` would fast-forward cleanly. Per the operator contract (gates green before push), let me wait for the drift battery to finish before the real push:
Still capturing the reference pages for the first sweep (each sweep walks 18 pages × both apps). Waiting in chunks:
Desktop sweep **EXIT:0** (clean, no drift). Phone sweep in progress. Continuing to wait:
Phone sweep **EXIT:0** (the re-anchored 3.8/2.9 baselines hold against the live reference — F-219a's cure validated end-to-end). Tablet sweep in progress:
All four band sweeps **EXIT:0** (desktop, phone 390, tablet 768, landscape 1024 — all clean). Fullpage sweep now running:
**Drift-gate battery: ALL SIX EXIT:0** — desktop, phone 390, tablet 768, landscape 1024, fullpage, and interior census all clean. The verification battery is now complete. Let me confirm the census detail and execute the real push:
**PUSH SUCCEEDED** — remote verified `refs/heads/main @ 85ed531 == local HEAD`, tracking ref synced. Final cleanup: shredding the operator key file and verifying the end state:
The final `ls-remote` failure is **expected and proves the key is gone** — the operator key was shredded before that call, so no key remains to authenticate with. The push itself was already verified by the wrapper's own post-push check (`remote verified: refs/heads/main @ 85ed531 == local HEAD`), and `git status` now reports "up to date with origin/main". All work is complete.
## Session-218 — Complete ✅

The standing rotation is finished and pushed. All 13 todos done.

### What this continuation session did

1. **Verified the workspace survived the session recycle** — all 25 session-218 files intact, build/deps/server up, HEAD at `7438dcd`.
2. **Ran the drift-gate battery** (the one unfinished verification item) — all six gates **EXIT:0**: desktop 1440, phone 390×844 (validating the re-anchored login 3.8 / not-found 2.9 baselines from the F-219a cure against the live reference), tablet 768×1024, landscape 1024×768, fullpage, and interior census.
3. **Committed locally to main** — `85ed531` (25 files, +526/−55) with the conventional `:tada: feat(session-218)` message covering all 8 findings and cures.
4. **Pushed via the SSH wrapper** — deployed the Appendix-A paramiko shim (this sandbox has no OpenSSH binary; `pip install paramiko` + shim at `/home/z/my-project/bin/ssh`), fingerprinted the ed25519 key (SHA256:uHkU1C8…), ran the `--dry-run` auth proof first, then the real push: **`remote verified: refs/heads/main @ 85ed531 == local HEAD`**, tracking ref synced, temp key auto-shredded by the wrapper.
5. **Shredded the operator key** — overwrite-with-random-bytes + remove; the post-shred `ls-remote` failing confirms no key material remains anywhere.

### Final state

- **Repo**: [github.com/nordeim/property-maintenance](https://github.com/nordeim/property-maintenance) `main` @ `85ed531`, working tree clean, up to date with origin.
- **Full verification battery this round**: lint 0/0 · tsc 0 · **142 suites / 2834 unit** · build · smoke 14/14 · e2e 193/193 · probe:ref STABLE (bundle `ee166dd5`) · mobile-nav walk byte-MATCH (`{70,0,320,844}`, 8 links, `enter/0.5s` — no Tailwind v4 bug) · six drift gates clean.
- **Deliverables in the push**: the F-219a/F-220a–g cures, `tests/session-218-audit.test.ts` (the 142nd suite, 7 RED-first pins), `scripts/count-ladder-218.py`, `scripts/probe-218-shot.ts`, screenshots 73–75, `docs/session_27.md`, the remediation plan with flipped ledger, docs lockstep (counts 2834/142/3027, pm-SKILL v1.14.0, neo-crm SKILL s218 head layer), and `.env.example` with the `HEADLESS` row.

No branches were created — everything went to `main`, exactly as instructed.
