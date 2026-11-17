I'll start by reading the uploaded instructions and checking the workspace state.
I've read the operating instructions. Now let me set up a comprehensive plan and clone the repository since the workspace has been reset.
Now let me validate my understanding against the actual codebase — checking the key structural claims (mobile nav, site routes, sitemap, db-path):
**Progress update — understanding validated.** I've now read the core docs and validated them against the codebase. Key findings so far:

- **Session-32/start_server_error.txt is the owner's fresh report**: they cloned the repo and hit a **build failure**: `playwright.config.ts(2,25): error TS2307: Cannot find module './tests/e2e/e2e-port'` and `tests/e2e/crm.spec.ts(2,25): error TS2307: Cannot find module './e2e-port'`. Both files EXIST in the repo — so this is a stale-clone/hidden-file issue on the owner's machine, but I must verify the build passes here.
- The repo is a mature 220-session codebase: Next.js 16 + React 19 + Tailwind v4 CSS-first + Prisma/SQLite + 144 Vitest suites (2853 checks) + 193 Playwright e2e checks + drift-gate battery.
- `db-path.ts` seam is the sanctioned DB URL resolver; `.env` is missing locally (needs creating from `.env.example`).
- Sitemap/robots/SEO layer already exists and is pinned by tests.

Now let me verify the baseline gates actually pass in this environment (install deps, typecheck, unit tests):
**Baseline verified green**: lint 0/0 · tsc 0 · **144 suites / 2853 unit checks all passing** · db census MATCH at `<repo>/db/custom.db`. The TS2307 error in `start_server_error.txt` does not reproduce in a fresh clone here (files exist; likely a stale/partial clone on the owner's machine). Let me verify the build too since that's what failed for the owner:
**Full gate verified GREEN in this environment**: lint 0/0 · tsc 0 · 144/2853 unit · build ✓ · smoke 14/14 · **e2e 193/193 (6.0m)**. The owner's build failure doesn't reproduce here. Let me update progress and check the mobile navigation parity against the live reference:
Now let me boot the dev server and probe the live reference for parity comparison, focusing on the mobile navigation menu:
**Drift-gate battery fully verified on the fresh clone**: sweep 4-band (desktop + phone) EXIT:0 · fullpage EXIT:0 · interior census byte-parity EXIT:0. The reference itself is STABLE (probe:ref — bundle `ee166dd5`). The mobile menu is byte-MATCH at 390 with sheet edge at x=71 (matching standing record {70,0,320,844}).

Now let me review the neo-crm repo's key docs for tech-stack patterns, then audit the remaining web-application skill dimensions:
SEO layer verified live. Now the core audit — checking the web-application skill's security dimensions against the actual code (the §16 checklist):
Now writing the remediation plan (session-221), following the repo's plan conventions:
Now let me write the RED-first TDD pin for session-221, then apply the cures. First the test suite (the 145th):
**All 6 pins RED at birth** — TDD discipline held. Now applying the cures. R-01: the next@16.4.6 patch bump via the package manager (never hand-editing manifests/lockfiles):
**R-01 cure verified**: next@16.4.6 locked; the advisory census is now **10 (4 high / 5 moderate / 1 low)** — the next advisory retired (net: pre-cure 11 → post-cure 10 since the vite family had grown by 2 moderates). The `bun update next@16.4.6` also pinned the manifest spec to `^16.4.6` — that's the package-manager-owned edit, fine. I need to update my pin which asserted `^16.4.2`:
Now R-02: re-anchor the PAD §10 ledger row, the AGENTS note, and the docs-counts pin. First the PAD ledger row:
Now the AGENTS.md gate-order note census clause:
Now update the existing docs-counts pin (the D-198a2 section) to the new live census, and R-03 — the README troubleshooting row:
Now write `docs/session_33.md` (the F-223c pin needs it), then run the pins to check remaining REDs:
**All 6 s221 pins GREEN.** Now the full suite run to catch collateral (the docs-counts suite pins the AGENTS/PAD claims):
**145 suites / 2859 unit checks ALL GREEN** (+6 pins from the s221 suite). Now lint + typecheck on the cured tree, then build:
**e2e 193/193 on the 16.4.6 build.** Now the drift battery on the cured tree (runtime dep changed — the s221 plan's R-04 requirement):
**R-04 complete — full verification battery on the cured tree (16.4.6)**: lint 0/0 · tsc 0 · 145/2859 unit · build ✓ · smoke 14/14 · e2e 193/193 (6.1m) · `bun audit` post-cure 10 (4h/5m/1l) — next advisory retired · probe:ref STABLE · sweep desktop+phone EXIT:0 · fullpage EXIT:0 · census EXIT:0.

Now R-05: the count ladder (2853→2859, 144→145 suites, badge 3046→3052) across every live-tense site:
Now I'll write `scripts/count-ladder-221.py` following the exact same pattern (2853→2859, 143→144... wait, 144→145 suites, badge 3046→3052):
28 flips. Now check the docs-counts pin that requires the neo-crm SKILL head layer (the layer-axis pin demands `session-221 layer` as head). Let me look at how the head-layer works:
Now writing `scripts/skill-head-221.py` (the s221 head layer for neo-crm_SKILL.md):
Replay fully NOOP-idempotent. Now update the pm-SKILL (bump to v1.17.0 with its own Session-221 history entry — the F-221a/F-222a genus discipline), the worklog Task 221, and the plan ledger:
Now the worklog Task 221 entry and the plan ledger flip:
Now the s221 captures (82-84) — following the probe-220-shot.ts pattern:
All three captures verified non-blank (0.996/0.273/0.642 — the standing s220 profile). Now the final full unit suite to confirm everything holds after all doc edits:
The s220 head-layer pin needs the standard per-round re-anchor (the s221 surgery demoted the s220 layer — the frozen-record doctrine):
**145 suites / 2859 unit ALL GREEN · lint 0/0 · tsc 0.** Now kill the prod server, finalize git state, and commit + push:
Now the push via the SSH wrapper. First materialize the key and check the wrapper's requirements:
No `ssh` binary and paramiko is now installed — the Appendix A shim path. Deploying the shim OUTSIDE the repo (per the skill's rules):
Key parses (ed25519). Dry-run first (auth pre-flight, no refs touched):
## Session-221 — Complete ✅

The standing rotation finished and pushed. `main` @ **`9cbdced`**, working tree clean, remote verified `refs/heads/main @ 9cbdced == local HEAD` (wrapper + HTTPS ls-remote), operator key and shim shredded.

### What this round did

1. **Refreshed the workspace** — fresh `git clone` (the workspace had been reset), then read all five root docs + `session_31/32.md`, the s220 plan, `worklog.md`, and `start_server_error.txt`, and validated that understanding against the codebase.

2. **Baseline fully green on the pristine clone** — the exact environment your `start_server_error.txt` describes: lint 0/0 · tsc 0 · 144/2853 unit · build ✓ · smoke 14/14 · **e2e 193/193** · probe:ref STABLE (bundle `ee166dd5`) · the full drift battery EXIT:0 · db census MATCH at `<repo>/db/custom.db`.

3. **Your build error root-caused (not reproducible here)**: `TS2307: Cannot find module './tests/e2e/e2e-port'` — both files are git-tracked, present, and not gitignored; two consecutive builds compiled clean. It's a **stale/partial-checkout genus on the operator machine** — cure: `git checkout -- tests/e2e/ playwright.config.ts` (or re-clone). Documented as a README troubleshooting row.

4. **Audit** (web-application skill §12/§16/§18 over the whole tree): all security seams verified clean. One actionable genus: **the `bun audit` census drifted 10 → 11** — the new moderate **GHSA-mfr8-8qww-v76h on next@16.4.2** (first advisory on a direct runtime dependency; dormant in this tree — zero `unstable_cache` call sites) plus the vite family growing to 3 advisories.

5. **TDD cures** (the 145th suite, 6 pins RED-first at birth): the **next 16.4.2 → 16.4.6 patch bump** (`bun update` — a patch-level bump, the s176 recharts precedent, not a toolchain major), retiring the only runtime-direct advisory; the PAD §10 ledger + AGENTS gate-order note + docs-counts pin re-anchored at the post-cure census (10: 4h/5m/1l); README badge/PAD stack table/neo-crm §2 row flipped at the facts-census lockstep; the count ladder 2853→2859 · suites 144→145 · badge 3046→3052; neo-crm SKILL v1.222.0 + s221 head layer; pm-SKILL v1.17.0 + its own Session-221 history entry.

6. **Verification run to completion on the cured tree**: lint 0/0 · tsc 0 · **145/2859 unit** · build · smoke 14/14 · **e2e 193/193 (6.1m)** · audit post-cure 10 · drift battery re-run (a runtime dependency changed): sweep desktop+phone, fullpage, census — all EXIT:0; captures 82–84 machine-verified (0.996/0.273/0.642).

7. **Mobile navigation / Tailwind v4 check** (your standing focus): byte-MATCH at 390 — sheet edge x=71 (the standing {70,0,320,844} record), 8 links, Esc-close + focus-return + navigation all working; **no Tailwind v4 bug**.

8. **Pushed via the SSH wrapper** (`docs/ssh_git_wrapper_v3.py` + the Appendix-A paramiko shim, deployed outside the repo, removed after) — remote ref verified, key shredded.

### Requested items not applicable this round (honest disclosure)
- **Mobile-menu remediation, Tailwind v4 bug fix, vitest/playwright configs, sitemap/SEO work, `.env` `DATABASE_URL` fix, `.env.example`, screenshots, SKILL distillation, docs updates**: all already existed and were verified live this round (the repo is 220 sessions deep on exactly these surfaces), so the "remediation" landed as the advisory-census truth round + the TS2307 documentation cure — the only genuine gaps the audit found. The next rotation triggers when you archive `docs/session_33.md`.
