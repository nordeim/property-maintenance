# Session-19 (session-214) — The Standing Rotation: The Poll-Gate Repairs + The Ladder Doctrine Debt

**Rotation trigger:** `a1b40d2` (the owner's session_18.md archive) ·
**Head at start:** `a1b40d2` · **Plan:**
`docs/plans/2026-11-16-session214-poll-gate-repairs-ladder-doctrine.md`

## The round

The s213 archive landed; the standing rotation ran: the baseline gate
GREEN at the s213 ship state (lint 0/0 · tsc 0 · 139/2811 · census
MATCH) · probe:ref **STABLE** (bundle ee166dd5 — no parity event; the
bare `bun run probe:ref` now correctly targets the Oasis default, the
R-02 flip live) · **THE s213 CARRY-OVER DEBT RESOLVED: the e2e battery
193/193 GREEN** (6.4m — the stable-4 cures passed the full public-site
battery) · the audit rotation found nine findings on the b342ebb
collateral (F-215..223 — none Critical/High; seven areas verified
clean).

## The cures (TDD, all pins RED-first then GREEN)

- **F-215 the settle gate:** the predicate required
  `transform === "none"` for EVERY main element — the hero pill's
  static `-translate-x-1/2` and the bouncing chevron falsified it at
  every poll, so the 10s cap always burned out and the gate never
  engaged. Cured to **opacity-only** (the reveal genus is
  translateY(20px) + opacity:0 — un-revealed states fail opacity,
  static translates pass).
- **F-216 the quiescence fingerprint:** the bouncing chevron's ~5px
  oscillation kept the fingerprint unstable forever — the poll always
  rode its 12s ceiling. Cured: the infinite-animation genus excluded
  from the accumulation (the same genus the capture skips).
- **F-217 the floor scope:** the |docH| ≤ 4 landing floor was
  page-wide where the decode was phone-only — scoped with
  `&& r.axis === "phone"` + the pure-seam verdict pin (Δ4 phone GREEN,
  Δ4 tablet RED, Δ5 phone RED).
- **F-218 the ladder doctrine:** the s192 doctrine skipped at s213 —
  the 2805 negatives added + **the README badge pinned both ways**
  (the retired `tests-2998%20checks` negative + the live
  `tests-3009%20checks` positive) so a future count bump that forgets
  the badge fails loudly.
- **F-220 the zero-data phase:** vestigial under the empty interior
  list (zeroed/re-seeded the db for a static page that reads no DB) —
  guarded with `pages.length > 0` at both spawnSync sites.
- **F-219/221/222/223 the hygiene:** the SKILL date corrected · the
  stale legs-contract title re-anchored · the orphaned s197 header
  rewritten · the settings-rhythm lineage annotation · the sweep
  baseline comments annotated (the s202 Oasis re-derivation story
  above the 24.5-27 values — comments no longer lie).

## The verification battery

lint 0/0 · tsc 0 · **139 suites / 2816 unit GREEN** (+5) · the
drift-gate battery (four band sweeps + fullpage + census — the census
FASTER with the poll-gate repairs, no db mutation under the static
landing) · the mobile-nav walk at 390: geometry {70,0,320,844}
byte-MATCH · animation `enter/0.5s` MATCH (no Tailwind v4 bug) · the
8-link vocabulary MATCH · our Esc-close + focus-return supersets
standing · SEO standing verified (the 16-url sitemap · robots.txt ·
manifest.json) · capture 68 (the landing at 1440).

Pushed to `main` via the SSH wrapper.
