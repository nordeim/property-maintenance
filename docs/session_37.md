# Session 223 — The Picomatch Advisory Round: The Third Census Drift

The owner's `docs/session_36.md` (the s222 execution record, `839b705`)
triggered the rotation. The workspace was merged fresh from origin (the
local sandbox's unrelated-history initial commit reconciled with
`.gitignore` taken from the repo), and the environment rebuilt: `bun
install` · the `.env` rebuilt at the six-knob contract
(`DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root) ·
`db:push` + `db:seed` · Playwright chromium v1248.

## The baseline (the pristine-tree verification)

The full gate on the fresh tree: lint 0/0 · tsc 0 · **146 suites /
2863 unit GREEN** · build ✓ · smoke 14/14 · **e2e 193/193 (6.1m, CI=1
fresh boot)** · probe:ref STABLE (bundle `ee166dd5`, every census layer
STANDING — services 12 · gallery 6 · faq 21 · the desktop 485px/6-link
nav · the TRUE-390 census) · db census MATCH (15/24/10/23/12 + 4 users
at `<repo>/db/custom.db`).

## The live parity battery (the operator's named focus)

The mobile navigation menu walked live at 390×844 on BOTH apps: the
menu-OPEN state is **byte-identical** — the sheet geometry
`{x:70, y:0, w:320, h:844}`, the white `rgb(255,255,255)` sheet, the
1px border-left, z-50, the same 8 links with the same hrefs (Home/
Services/Gallery/About/FAQ/Contact/tel:+61400000000/Book Now) — with
ours carrying the documented a11y supersets (the named trigger + the
aria-label + the focus-return to the trigger on Escape; the reference's
own unnamed BUTTON focus landing). Escape closes on both with ZERO
scroll-lock residue. **No Tailwind v4 bug** — the compiled stylesheet
carries the brand tokens (#2E7D5F literal), the `cursor: pointer` base
rule, the backdrop-blur family, and only the 4 expected oklch
occurrences. The SEO family re-verified live: the 16-URL sitemap at
bare `application/xml` · robots.txt · manifest.json · the full OG head
+ per-route canonical.

## The audit (the web-application skill §12/§16/§18 dimensions over 839b705)

The s222 cures verified still in place (4/4). Every security seam
verified at line level: the Zod boundary (both `z.array` sites capped
— `.max(40)` on the settings list fields, `.max(20)` on the quote
services — plus the bounded reader) · force-dynamic discipline · zero
dangerouslySetInnerHTML · the single PrismaClient · the db-path seam ·
the env-knob parity (.env byte-matched against .env.example's
six-knob contract).

**The round's material — F-225a, THE THIRD CENSUS DRIFT (10 → 11,
5h/5m/1l):** the standing pre-ship duty (`bun audit`, the s164
doctrine) caught the drift again. The NEW advisory: **HIGH
GHSA-fc5q-39xc-vjpf on picomatch <=4.0.7** (CVE-2026-112366, ReDoS via
single-branch repeated extglob patterns like `+(*)`, CVSS 8.7) —
riding the **dev-toolchain chains only**: `vitest` → picomatch@4.0.7
direct · `vite` → picomatch@4.0.7 · `tinyglobby` → picomatch@4.0.4 +
the `fdir` peer · `micromatch` → picomatch@2.3.1. **Zero runtime
request-path exposure** — verified structurally against the lockfile:
no runtime dependency's chain lists picomatch or any of its five
dev-toolchain consumers (the new structural dormancy pin). **No cure
exists**: no patched picomatch release is available upstream (the
micromatch/picomatch#194 fix PR is unreleased) — the same no-cure
genus as the s221 vite-family moderates, and the standing
no-mid-rotation-toolchain-bump posture holds.

The same round re-decoded the zod advisory (GHSA-mrhx-c7xc-m3w5, high,
"Zod can exhaust memory while validating oversized constrained
arrays"): the vulnerable 4.6.5 is **eslint-plugin-react-hooks'
transitive** (lint-time only); the ROOT zod — the one `src/lib/`
imports at every API boundary — resolves **4.6.7, already past the
4.6.6 fix**, and both `z.array` sites in the Zod seam carry explicit
length caps, so the advisory's unconstrained-array attack requirement
is not met in this tree.

Findings: F-225a (Medium, the stale ledger census — the s198 genus
reborn) · F-225b (Low, recorded — the s221 machine-verify pin's
by-design census-independence) · F-225c (Info, the skills/ mirror —
the standing operator-domain exclusion).

## The cures (TDD — `tests/session-223-audit.test.ts`, the 147th suite, 4 pins RED at birth)

- **R-01 (F-225a):** the PAD §10 ledger row re-anchored at the live
  census (11: 5h/5m/1l) with the RE-TRIAGED session-223 clause — the
  picomatch chain decode, the no-upstream-fix caveat, the zod-chain
  clarification, and the dormancy claim now structurally pinned. The
  AGENTS gate-order tail gains the session-223 clause.
- **R-02:** the 147th pin suite — the ledger re-anchor pin + the
  AGENTS tail pin + the STRUCTURAL dormancy pin (the lockfile closure:
  no runtime dep's chain lists picomatch or its five dev-toolchain
  consumers, offline-safe) + the runtime-zod pin (root 4.6.7 ≥ 4.6.6 +
  the capped-array forms) + the s222-cures-still-in-place leg + the
  session-record pin. RED-first at birth (4 RED, 2 green guards); the
  structural pin's first draft under-matched the lockfile's nested
  braces and was fixed to the line-sliced form before the cures.
- **R-03:** the docs lockstep — this record · the worklog Task 223 ·
  the plan ledger flip · the pm-SKILL v1.19.0 + its Session-223
  history entry · the neo-crm SKILL v1.224.0 + the s223 head layer ·
  the count ladder 2863 → 2869 (+6 pins) · suites 146 → 147 · badge
  3056 → 3062.
- **R-04:** the verification battery on the cured tree.
- **R-05:** the captures 88-90 (the landing at 1440 · the mobile menu
  OPEN at 390 — the standing parity focus · the CRM dashboard at
  1440), machine-verified non-blank.

## The verification battery

lint 0/0 · tsc 0 · **147 suites / 2869 unit** (+6 pins) · build ·
smoke 14/14 · e2e 193/193 · probe:ref STABLE · the drift battery
EXIT:0 · captures 88-90. Pushed via the SSH wrapper.
