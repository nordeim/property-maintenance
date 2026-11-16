# Session 15 (Session-212) — The Standing Audit Remediation (2026-11-16)

The operator's standing audit-and-remediate rotation: a full corpus re-audit
(the skills/web-application dimensions), a live-reference comparison pass
(mobile navigation, Tailwind v4 trap surface, the public surfaces at
390/1440), and a TDD remediation round. The plan rode
`docs/plans/2026-11-16-session212-audit-remediation-mobile-fab.md`; every
cure below is evidence-backed and RED-first.

## The findings and the cures

1. **F-212a — the floating call FAB (HIGH, cured).** The reference carries
   a mobile-only floating call button on ALL SEVEN public pages (absent on
   /login); our clone had none. Live-decoded and ported as
   `src/components/site/call-fab.tsx`, mounted once in the `(site)` layout:
   `lg:hidden fixed bottom-6 right-6 z-40`, the 64px green circle
   (`bg-[#2E7D5F] hover:bg-[#236B4F] border-4 border-white rounded-full
   w-16 h-16 shadow-2xl`), the lucide-phone glyph, the `tel:` anchor. Two
   documented supersets: the anchor renders AS the button (the reference's
   button-inside-anchor is invalid interactive nesting) and the icon-only
   `aria-label="Call us"` (the reference ships none). Live-verified:
   64×64 at (302,756), bg rgb(46,125,95), the 4px white border,
   `display:none` at 1440.
2. **F-212b — the F-211e booking card foot (MED, cured).** The reference's
   inner step cards compute 24px padding at 390 / 32px at md+ (its own
   `p-6 md:p-8`); ours pinned `p-8` — the +16px above the footer the s211
   ledger deferred as "needs the hero anatomy walk". The walk found it in
   five levels. Cured on all three step cards: footerTop 1161 → **1145
   (exact)**, docHeight 2090 → 2074 (the reference's 2070 + the footer's
   own 4px text-wrap, at the floor).
3. **F-212c — the mobile brown tip (MED, cured).** Live pixel-probe of the
   reference at 390: a solid rgb(62,48,23) wedge at x384-390, y314-335
   below the mini-descent gradient — the element the s211 comment
   documented ("the brown tip y310-318") but never painted. Painted as
   `MOBILE_BROWN_TIP` (fraction-mapped) in the `w < 1024` branch;
   verified 24 probe-hits, sample (59,46,22).
4. **F-212d/F-212e — the canvas posture (MED, cured).** The birds/bush RAF
   now respects `prefers-reduced-motion` (freeze to the static scene, live
   start/stop on preference change); the static scene renders ONCE per
   resize into an offscreen canvas and the RAF frame blits it + draws the
   two sprites (the s209 full-repaint-per-frame and the per-frame
   `canvas.width` reset retired); the bush strip explicitly `w >= 1024`
   gated.
5. **R-06 — the S72-P2 e2e flake (MED, cured).** The settings-debounce
   focus test's value-wait passes on the PENDING editor too (its fallback
   IS "AED"), so the hydrate-wave remount raced the fill in slower
   environments (reproduced 2/2 on the fresh-clone gate). The
   DefaultsEditor root now carries `data-epoch={resolved|pending}` and the
   test gates on the marker — green in isolation after the cure.
6. **R-07 — identity/config hygiene.** package.json
   `neo-crm` → `property-maintenance` (+ the lockfile refresh); the eslint
   ignores pruned of six dead scaffold dirs; `.env.example` gains the
   `E2E_PORT` test-only row. The `NEO_*` env prefixes + `neo_session`
   cookie stay (the documented stable contract).
7. **R-08 — the docs re-anchor.** The four live-tense
   `nordeim/neo-crm.git` instruction sites (README clone URL, AGENTS push,
   CLAUDE push, PAD §9.2) → `nordeim/property-maintenance.git` — an agent
   following any of them pushed to the WRONG repo. The s211 plan's F-211b
   disposition corrected (Cure → the documented animation floor). The
   count re-anchor 2801 → 2805 / 2994 → 2998.

## Verified-clean by live evidence (the audit's claims retired)

- The booking "today unbookable" finding is FALSE: react-day-picker v10
  compares the `before` matcher at day granularity — today ENABLED, past
  DISABLED, on both sites (probed).
- The ABN "[To be registered]" placeholder: the reference ships the
  identical string (byte-parity).
- The footer contact-column gap stacking: computed parity (16px, identical
  structure) — the audit's fragility concern is noted, not a divergence.
- **The mobile navigation (the operator's focus): byte-identical** —
  {x:70, y:0, w:320, h:844}, bg/border/padding/nav-link/pill/logo all
  matching, the Tailwind v4 `animate-in` slide-in firing (`enter`, 0.5s),
  Esc-close + focus-return + unmount verified. No Tailwind v4 bug found:
  the trap surface (hover variant, shadow/blur re-pins, space-y flip,
  cursor:pointer base, vendored tw-animate.css) is pinned clean.

## Deferred (documented in the plan §3)

The eslint rule-off posture and the no-selector store subscriptions (PAD
known-issues rows), the blob() alpha string-replace fragility, the demo
credentials posture (the public demo login is the app's own fixture), the
animation floor (the traveling wave), and the reference-side quirks per
the s211 §4 ledger.

## The verification (completed)

lint 0/0 · tsc 0 · **139 suites / 2805 unit GREEN** · build GREEN · the
**FULL e2e battery 193/193 GREEN** (8.3m, CI=1 fresh boot — the S72-P2
epoch fix held through the whole battery) · live re-probes all matching ·
captures 62-65 under `docs/screenshots/`.

## The completion pass (the docs re-anchor, finished)

- The README file tree re-anchored to the s199/s212 reality (the `(site)`
  group + `components/site/` + `call-fab.tsx`, `instrumentation.ts` at
  `src/`, 11 models, the `property-maintenance/` root name) — and the
  F-169h pin re-anchored with it (the s142-era `(marketing)` tree form
  retired to the negatives).
- The PAD §3.2 tree (the `(site)` group, `dashboard/` at its s142 home,
  the site chrome), §4.1 (+ Booking + QuoteRequest on the ER diagram),
  §8.1 (the ADR-019 build-is-the-type-gate posture).
- The count ladder 2801 → 2805 at EVERY live-tense site (the README
  badge/tree/Tested/commands, AGENTS ×2, CLAUDE ×4, PAD ×4, both SKILLs)
  with the docs-counts UNIT constant + the F-92a3/F-169h ladder pins —
  and the D-188a1 doctrine honored: the retired session blocks keep
  their OWN ship counts (the s192 block restored after the first pass
  over-replaced).
- `property-maintenance_SKILL.md` v1.8.0 → **v1.9.0** (the
  distill-codebase-skill method): the CallFab + the canvas posture in
  §5, the s212 pins in §7, the no-new-traps re-verification in §9.
- The four wrapper-`--remote` push sites (AGENTS/CLAUDE/PAD) + the README
  clone URL — the two-line form the first pass missed — all point at
  `nordeim/property-maintenance.git`.

Pushed to `main` via the SSH wrapper.
