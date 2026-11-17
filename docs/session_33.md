# Session 221 — The Audit-Census Truth Round: The Owner's Fresh-Clone Report + The Advisory Drift

The owner's `docs/session_32.md` + `docs/start_server_error.txt` archive
(`f758fb0`) triggered the rotation. The workspace was reset, so the
round began with the mandated fresh `git clone` — the exact environment
the owner's report describes.

## The baseline (the pristine-clone verification — F-223c's own evidence)

`bun install` (542 packages) → `cp .env.example .env` → `bun run
db:push` (the census-seam boot: `db/custom.db` created at the repo
root) → `bun run db:seed` (15/24/10/23/12 + 4 users — MATCH) → the full
gate: lint 0/0 · tsc 0 · **144 suites / 2853 unit GREEN** · build ✓
(compiled clean, 22/22 static pages — **the owner's TS2307 is not reproducible on
the pristine clone**: `tests/e2e/e2e-port.ts` and `playwright.config.ts` are
both git-tracked, both present, both NOT gitignored; two consecutive
builds compiled clean) · smoke 14/14 · **e2e 193/193 (6.0m, after
`npx playwright install chromium` — the sandbox had only the older
headless-shell cache)** · probe:ref STABLE (bundle `ee166dd5`, all
census layers STANDING) · the drift battery: sweep desktop + phone
bands EXIT:0 · fullpage EXIT:0 · interior census byte-parity zero
margin EXIT:0.

The mobile-nav walk (the operator's standing parity focus, the
Tailwind v4 watch): the sheet edge at x=71 (the standing
{70,0,320,844} record), 8 links, Esc-close + focus-return + navigation
— byte-MATCH, **no Tailwind v4 bug**. The s215 probe's generic
`[role="dialog"]` locator collided with the Next 16 dev overlay's own
error-dialog (a dev-mode-only strict-mode artifact, not a product
defect) — the s220 probe family remains the sanctioned walker.

## The audit (the web-application skill §12/§16/§18 dimensions over f758fb0)

The security seams all verified at line level: the boot gate
(`boot-env.ts` refuses a secretless production boot), the Zod boundary
(23 route files ride `parseBody`), the bounded reader (content-type
CSRF gate + declared-length check), the rate-limit family (per-route
buckets, proxy-hop fail-closed), the single `PrismaClient`
construction (db.ts + the seed + census, all through the db-path seam),
force-dynamic on every data route (zero misses), `useShallow`
discipline (zero allocating selectors), no
`dangerouslySetInnerHTML`, the `cursor: pointer` base rule, the docs
count-lockstep (42 pins green). The sitemap/robots/manifest/OG family
verified live (16-URL byte-format sitemap, the Sitemap line in robots,
manifest 200, per-route OG/Twitter/canonical).

One actionable genus: **the `bun audit` advisory census drifted
10 → 11** — F-223a the NEW moderate GHSA-mfr8-8qww-v76h on
next@16.4.2 (the FIRST advisory riding a direct RUNTIME dependency —
the framework itself; DORMANT in our tree: zero
`unstable_cache`/`'use cache'` call sites in src/) with a same-minor
patch cure available (16.4.5/16.4.6) · F-223b the vite advisory family
grew 1 → 3 (2 NEW moderates riding vitest › @vitest/mocker › vite —
dev-toolchain, zero runtime exposure) · F-223c the owner's TS2307
report — a stale/partial-checkout genus on the operator side (not
reproducible on the pristine clone), cured as the README
troubleshooting row.

## The cures (TDD — `tests/session-221-audit.test.ts`, the 145th suite, 6 pins RED-first at birth)

- **R-01:** the next patch bump `16.4.2 → 16.4.6` via `bun update
  next@16.4.6` (the package manager owns the manifest edit — the spec
  moved to `^16.4.6`), retiring the only advisory on a runtime direct
  dependency. A PATCH-level bump inside the satisfied caret range —
  the s176 recharts 3.10.0→3.10.1 precedent — NOT the toolchain-major
  the s198/s203 no-mid-rotation posture reserves against (which pinned
  the eslint/vitest/prisma-CLI families whose bumps would force the
  pixel baselines' re-derivation; the drift battery still re-ran on
  the cured tree as R-04's evidence).
- **R-02:** the advisory-ledger truth round — the PAD §10 row re-anchored
  (the vite family's 3-advisory composition + the RE-TRIAGED
  session-221 clause), the AGENTS gate-order note's census tail, and
  the docs-counts D-198a2 pin extended to the session-221 clause.
- **R-03:** the README troubleshooting row for the TS2307
  stale-checkout genus.
- **R-04:** the verification battery on the cured tree (the F-222b/c
  lesson — no gate claimed before its evidence exists): lint · tsc ·
  unit · build · smoke · e2e · `bun audit` post-cure census · the drift
  battery re-run (a runtime dependency changed).

## The verification battery

lint 0/0 · tsc 0 · 145 suites / 2859 unit (+6 pins,
`tests/session-221-audit.test.ts`) · build · smoke 14/14 · e2e 193/193
· `bun audit` post-cure **10 (4 high / 5 moderate / 1 low)** — the
next advisory retired · the drift battery on the cured tree · captures
82-84. Pushed via the SSH wrapper.
