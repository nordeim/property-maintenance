---
name: property-maintenance
description: >
  Complete engineering skill for the property-maintenance codebase — the
  OASIS clone: a service-booking marketing site (Green Cut Lawn Care —
  home, services, gallery, about, FAQ, contact, booking + the
  instant-estimate widget) built on the kept NEO-CRM scaffold, with the
  CRM back-office (dashboard, accounts, contacts, leads, calendar,
  activities, reports, settings) at /dashboard as the functional
  superset. Next.js 16 App Router + React 19 + TypeScript (strict) +
  Tailwind CSS v4 (CSS-first) + shadcn/Radix + one Zustand store +
  Prisma/SQLite + Zod-validated API + scrypt/HMAC cookie auth + a
  2826-check Vitest / 193-check Playwright corpus and a single-command
  quality gate. Use it to extend, debug, onboard, or replicate this
  architecture.
version: 1.13.0
last_updated: 2026-11-16
---

# property-maintenance — Engineering Skill (SKILL.md v1.13.0)

> **How to use this document:** the single-source engineering reference
> for the Oasis clone. §1 identity · §2 stack · §3 environment · §4 the
# design system · §5 the two-surface architecture · §6 the API contracts ·
> §7 the test corpus · §8 the gate · §9 the Tailwind-v4 trap log ·
> §10 anti-patterns. **When code and this document disagree, the code
> wins — then fix this document in the same commit.**

## 1. Project Identity & Design Philosophy

**The product:** a faithful, self-hostable clone of
`https://oasis-property-maintenance.base44.app/` — the Green Cut Lawn
Care service-booking site (Gold Coast / Logan / South Brisbane) — with
the CRM back-office kept as the functional superset (the reference has
no CRM at all; every CRM route is a 404 there).

- **Two surfaces, one app.** The `(site)` route group serves the public
  Oasis site (8 routes + 7 capital-cased aliases); the `(app)` group
  serves the CRM back-office behind the session wall. The root `/` is
  the Oasis home.
- **Superset, never regression.** The reference's own constructions are
  mirrored (its Radix dialog menu, its accordion FAQ, its shadcn
  classes, its Unsplash imagery); its gaps become OUR features (the
  persisted Booking/QuoteRequest boundaries — its booking submit target
  is unobserved; ours writes a real row and confirms).
- **Pure seams, tested.** The booking matrix, the estimate math, the
  calendar/slot machine, the content library — all in `src/lib/*.ts`
  with Vitest specs; components stay thin.
- **One deployable unit.** `next build` → a standalone server + a
  SQLite file. No external services.

## 2. Canonical Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16.4 (App Router, standalone) | `outputFileTracingRoot` pinned |
| Runtime | React 19.3 | client components explicit |
| Language | TypeScript 5.9 strict | `tsc --noEmit` is a gate |
| Styling | Tailwind CSS 4.3 CSS-first | tokens in `globals.css` `@theme inline`; NO `tailwind.config.js` |
| Primitives | shadcn/Radix | dialog, accordion, slider, label, select, dropdown, tabs |
| Calendar | react-day-picker 9 (shadcn Calendar) | the booking step-2 machine |
| State | Zustand 5 (ONE store) | `useShallow` for derived selectors |
| ORM/DB | Prisma 6.19 / SQLite | `db/` at the repo root — see §3 |
| Validation | Zod 4.6 at every API boundary | `parseBody` (bounded reader) |
| Auth | scrypt + HMAC cookie sessions | no auth library |
| Unit | Vitest 5 (141 suites / 2826 checks) | |
| E2E | Playwright 1.64 (11 specs + setup / 193) | against the production build on :3100 |
| A11y | axe-core in the e2e suite | the two-gate register |

## 3. Environment & the Database Location Contract

Six env knobs (`.env.example` is the committed mirror):

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | `file:../db/custom.db` — relative `file:` resolves against `prisma/schema.prisma` |
| `AUTH_SECRET` | Prod | HMAC secret (≥16 chars; boot-refused in production) |
| `NEXT_PUBLIC_SITE_URL` | No | canonical origin for metadata/sitemap/robots/manifest |
| `NEO_PROXY_HOPS` | Prod-behind-proxy | rate-limit IP keying trust depth |
| `NEO_DISABLE_IN_APP_OTP` | Prod | kills the in-app verification-code delivery |
| `NEO_DISABLE_IN_APP_RESET` | Prod | kills the in-app reset-link delivery |

**The db contract (read twice):** `db/` lives at the REPO ROOT. Every
consumer (Prisma CLI, dev, build, standalone, seed, e2e) must land on
`<repo>/db/<name>`; three resolution rules fight over a relative
`file:` URL and `src/lib/db-path.ts` normalizes them all — the ONLY
sanctioned source. Never construct a `PrismaClient` outside
`src/lib/db.ts` (and the seed, through the same seam). The e2e suite
reseeds `db/e2e.db` IN PLACE (never delete the file while the server
holds it).

## 4. The Design System (the Oasis palette, measured live)

The reference's own tokens (recon-decoded from its DOM, 2026-11-15):

- **Headings** `#1F2933` (slate), **body** `#4B5563`, **brand green**
  `#2E7D5F` (hover `#236B4F`), **tint** `#E8F3ED` (hover `/50`),
  **hero band** `#F5F1EB`, **dark footer** `#1F2933`.
- **Header:** sticky `top-0 z-50 bg-white/70 backdrop-blur-xl
  border-b border-white/40 shadow-sm`, the `max-w-7xl h-20` bar, the
  h-16 logo → `/home`, six nav links, phone + the `Book Now` CTA.
- **Arbitrary-value classes** (`text-[#1F2933]`, `bg-[#E8F3ED]/50`)
  are the idiom — Tailwind v4 compiles them per-use; do NOT hoist them
  into `@theme` (the corpus's deliberate choice, matching the
  reference's own markup byte-for-byte).
- **The background canvas** (`background-canvas.tsx`, session-201 →
  209): the reference's full-viewport painter — the sky→lawn gradient
  with a SHARP horizon (1px at 0.257 of the height, the 6px blend to
  0.262), the warm glow + the rock stratum, and the SOLID structures
  (session-206's decode: the reference's foliage is crisp solid
  shapes, not radial fades): the terracotta WEDGE on the left-center
  horizon (the three-tone polygon: the (214,81,55) core hull + the
  (153,60,35) bottom-left shade + the (190,73,50) slope lining, under
  the booking glass at x~0.25w), the right mass's flat (95,143,51)
  dome + its SUNLIT RIM (108,162,59) + the deep band below y~0.31, the
  left tree's oval crown + brown trunk, the corner masses, and
  session-207's fine layer: the HEDGE's convex gradient (the flat hold
  (49,160,72) to y~0.80, the knee (41,141,60), the bottom (15,95,26) —
  the multi-stop `polygonGradient()` painter), the right side's
  gray-green G band (x0.75-0.87w, y0.35-0.41h, (173,174,129)) with
  teal patches + the BLUE slab (30,54,89) + its light cap, and the
  descent's lower anatomy (the wide band, the lobe, the brown tip).
  The two s201-era PHANTOM blobs retired (the ref paints pure lawn at
  their zones). Session-208's layer: BOTH horizon diagonals (the
  far-left sky patch (0,278)→(80,231) + the far-right descent
  (1370,235)→(1430,273) — the flat gradient's corners corrected), the
  mid-distance structures behind the glass (the dark-green tree mass
  x460-620 + the blue-gray structure x660-800, y265-315), the
  right-side flowering bush, and the right corner's
  two-layer gradient (the horizontal base + the vertical darkening
  veil — the `polygonHGradient` painter). The booking form's
  live-DOM cures: the step-dots connector (two sibling w-8 h-0.5) +
  the yard-slider charcoal fill (#171717 — the ref's shadcn primary;
  ours is blue). Session-209's layer: the ANIMATION PORT — a
  requestAnimationFrame loop over the static paint (each frame
  repaints the scene, then the sprites): the FLYING BIRDS
  (`drawBird`: the leading band + the wing-spread body, tone
  (199,66,62), ~46px/s, a 22s cycle — single bird then the two-bird
  flock) + the GROWING BUSH STRIP (`drawBushStrip`: the fixed right
  bush + the left lobe growing x1317→x1080 over 5s with its blossom
  cluster riding the tip; hold 3s; vanish 8s; a 16s cycle — the s208
  static bush retired INTO it). The cleanup cancels the RAF handle.
  Session-210's tuning: the light band's bottom edge re-cut as the V
  (y308@x1080 -> apex y270@x1178 -> y307@x1260) with the deep band's
  top following the SAME shared-V boundary; the right-edge descent
  re-cut as a vertical gradient (EDGE_DARK_SOLID -> EDGE_DARK_DEEP
  (14,90,20)) — the "AA edges" floor re-diagnosed as band geometry
  (both canvases render sharp at the device level; verified at
  deviceScaleFactor 2). Session-211's tuning: the descent-top re-cut
  as the CONCAVE DESCENT_ARC (the s210 cap wedge was a misread; the
  mean edge matches ±2px), the crown gained its downward CROWN_GRAD
  gradient + the widened trunk, and the scene is WIDTH-AWARE — the
  desktop-only families (the descent, the corner mass, the horizon
  diagonals) gate at w>=1024 while the mobile composition paints its
  own mini-descent + the left tree sliver (the ref's 390 scene is a
  different composition, not a scaled desktop).
  `aria-hidden` + `pointer-events-none`; mounted ONLY
  in the (site) layout (the login and 404 render white — the
  reference's own posture).
- The CRM interior keeps the scaffold's own token set (`--color-ink`
  `#0a0a0a` etc.) — two palettes, two surfaces, both intentional.

## 5. The Two-Surface Architecture

```
src/app/
├── (site)/            # PUBLIC — the Oasis site, no session reads
│   ├── layout.tsx     # SiteHeader + main + SiteFooter
│   ├── page.tsx       # `/`  — the Oasis home
│   ├── home|services|gallery|faq|about|contact|booking/
│   └── Home|Services|Gallery|FAQ|About|Contact|Booking/  # .jsx aliases
├── (app)/             # SESSION-WALLED — the CRM superset
│   └── dashboard|accounts|contacts|leads|calendar|activities|reports|settings|profile/
├── login/ signup/ reset-password/
├── not-found.tsx      # the designed 404 IN the site chrome
├── sitemap.xml/ robots.txt/ manifest.json/
└── api/               # 31 route files / 45 handlers — 21 gated, 10 public
```

- **The site chrome** (`src/components/site/`): `site-header.tsx` (the
  mobile menu is a REAL Radix Dialog — `DialogPrimitive.Root/Trigger/
  Portal/Overlay/Content/Close`, the trigger's accessible name "Open
  menu", the content named "Site menu"; the focus trap, Esc-close,
  focus-return, and scroll-lock come from the primitive — session-200's
  R1; **session-205's F-205g re-derivation: the Content is the
  reference's own RIGHT SIDE SHEET anatomy** — `fixed inset-y-0
  right-0 h-full border-l w-80 bg-white shadow-lg
  data-[state=open]:slide-in-from-right
  data-[state=closed]:slide-out-to-right` over a `bg-black/80`
  overlay, the absolute `right-4 top-4` X, the h-14 logo row, the
  `gap-2` nav, the `border-t pt-6 space-y-3` footer with the
  `bg-[#E8F3ED]` phone pill + the anchor-wrapped Book Now — the
  reference redesigned its menu from the s200 top-sheet; live-verified
  byte-identical geometry at 390), `site-footer.tsx` (the dark band,
  the region links, the emergency line), and `call-fab.tsx` (session-212's
  F-212a: the reference's mobile-only floating call button on ALL SEVEN
  public pages — `lg:hidden fixed bottom-6 right-6 z-40`, the 64px green
  circle `bg-[#2E7D5F] hover:bg-[#236B4F] border-4 border-white
  rounded-full w-16 h-16 shadow-2xl` with the lucide-phone glyph, the
  `tel:` anchor. Two documented supersets over the reference's own FAB:
  the anchor renders AS the button — its button-inside-anchor nesting is
  invalid interactive HTML — and the icon-only control carries
  `aria-label="Call us"`, which the reference omits).
- **The pages** compose `src/lib/site-content.ts` (the reference's own
  copy, extracted programmatically) — never inline the copy.
- **The estimate card** (`estimate-card.tsx`) is shared between the
  home's `#estimate` band and the booking flow's step 1: the 5-service
  matrix (`$60–$80` lawn … `$145–$195` full tidy-up), the 100–2000 m²
  Radix slider (named via its LABEL ancestry — see §9), the yard-size
  → price effect.
- **The booking flow** (`booking-flow.tsx`): step 1 service + estimate
  → step 2 the react-day-picker calendar (past days disabled, Sunday
  starts) + the five time slots → step 3 details + the summary → the
  SUPERSET confirmation (a persisted Booking row). Session-212's F-212b:
  the three step cards use the reference's responsive padding
  `p-6 md:p-8` (24px at the phone axis, 32px at md+ — NOT a pinned p-8:
  that was the F-211e +16px footer-cascade root cause, footerTop 1161
  vs the reference's 1145, cured to 1145 exact).
- **The CRM** is the scaffold's, untouched: see `neo-crm_SKILL.md`
  (the engineering log) for its full contracts.

- **The background canvas** (`background-canvas.tsx`): the static scene
  renders ONCE per resize into an offscreen canvas; the RAF frame blits
  it + draws the two sprites (the birds + the growing bush — session-209's
  port). Session-212's posture cures: `prefers-reduced-motion` freezes the
  scene to its static state (live start/stop on preference change), the
  bush strip is explicitly `w >= 1024`-gated, and the mobile scene carries
  its own `MOBILE_BROWN_TIP` (x384-390, y314-335 @390, rgb(62,48,23) —
  live pixel-probed) under the mini-descent gradient.

## 6. The API Contracts

Both public forms follow the same posture:

```
POST /api/bookings      rate-limit 8/15min/IP → parseBody(Zod) →
                        serviceId re-validated against the seam's
                        catalog → db.booking.create → ok(row, 201)
GET  /api/bookings      requireSession (the back-office read)
POST /api/quote-requests  same posture (8/15min, parseBody, create)
GET  /api/quote-requests  requireSession
```

- `ok()` / `ERR.*` envelopes from `src/lib/api.ts`; never throw across
  the boundary; the bounded reader + the Content-Type CSRF gate ride
  `parseBody`.
- The Prisma models: `Booking` (name/phone/email/suburb/serviceId/
  serviceLabel/date/slot/yardSize/message + createdAt), `QuoteRequest`
  (name/phone/email/suburb/services[]/serviceType/message) — 11 models
  total.

## 7. The Test Corpus (2826 unit / 193 e2e)

- **Unit (Vitest, 141 suites):** the pure seams (`booking.ts` 12
  checks — the matrix, the slots, the calendar), the doc-truth pins
  (every live-tense count site in README/AGENTS/CLAUDE/PAD/SKILL is
  pinned to the live census — "code wins, docs follow"), the
  leading-inert genus scanner, the doctrine/inventory/facts censuses,
  the whole scaffold battery, and session-212's remediation pins (the FAB
  construction + the (site)-layout mount, the booking cards' `p-6 md:p-8`
  foot cure, the `MOBILE_BROWN_TIP`, the canvas posture — the
  reduced-motion gate + the offscreen buffer — all in
  `landing-page.test.ts`; plus the S72-P2 e2e's `data-epoch` marker in
  settings-page.tsx, the deterministic gate for the settings-debounce
  focus contract the value-wait could never provide).
- **E2E (Playwright, 11 specs + the setup project):**
  `public-site.spec.ts` (the Oasis battery: the 8 routes' h1s, the
  estimate flip, the services 12-cards + Add-to-Quote carry, the quote
  round-trip, the FAQ single-open, the booking round-trip, the 390
  hamburger open/ride/close + the Radix keyboard contract, the 404 +
  Go Home, the login identity), `marketing-mobile` (the 390 no-overflow
  walk), the CRM battery (crm/auth/reset-password/a11y/
  mobile-navigation/the four mobile specs).
- **The drift tooling:** `probe:ref` (the reference fingerprint: bundle
  md5 + the content census 12/6/21 + the header/hamburger/landing
  censuses), `sweep` (the pixel drift gates), `census:interior`, the
  smoke ladder (14 checks incl. the artifact hygiene).
- **The e2e server needs the CURRENT build** — a stale `.next` is the
  classic false alarm (the s199 lesson, live again at s200).

- **Session-213's layers:** the reduced-motion SEED-STATE paint (F-214 —
  the gate paints `drawBushStrip(ctx, 0)` once under the preference; the
  s212 gate had dropped the bush entirely); the reference-contract flip
  (all five live drift tools default to the Oasis reference — the
  F-213a/b/d/e/f genus; the D-204a1 parity-tools block born in
  `.env.example`); the census re-scope (the interior legs RETIRED — the
  reference's app area is a different product iteration; the landing
  public leg is the standing gate with the scroll-reveal settle pass +
  the infinite-animation skip + the |docH| ≤ 4 phone floor); the
  fullpage re-derivation (6.5/9.0 floors — the reference's scroll-reveal
  initial state is the head genus); and the stable-4 cures (the estimate
  CTA "Book with this estimate" + the calendar glyph + `px-8`, the
  yard-size header the reference's bare flex row).

- **Session-214's layers:** the poll-gate repairs (F-215/216 — the
  census's settle gate now predicates on OPACITY alone (the transform
  conjunct could never hold against the landing's static translates)
  and the quiescence fingerprint excludes the infinite-animation genus
  (the bouncing chevron kept both polls at their ceilings forever));
  the docH floor scoped to the phone axis (F-217); the ladder doctrine
  debt paid (F-218 — the 2805 negatives + the README badge pinned both
  ways); the zero-data phase guarded under the empty interior list
  (F-220); the s213 carry-over e2e debt resolved — **193/193 GREEN**.

## 8. The Gate (the definition of done)

```bash
bun run gate        # lint → typecheck → test → build → smoke → CI=1 e2e
bun run gate:full   # + the six drift gates
```

Gate order is the contract; no push without green. Kill any leftover
`:3100` listener first (`CI=1` refuses to boot over one).

## 9. The Tailwind v4 Trap Log (this codebase's live catches)

1. **`space-y` in a mobile drawer** loses to hidden/visible siblings —
   use the `[&>*+*]:mt-N` v3-semantics form (the trap-#4 family; the
   corpus's standing doctrine).
2. **A base `leading-*` loses to a responsive `text-*`** at ≥sm (the
   text utility carries its own paired line-height): the Oasis hero h1
   carries the computed-equal `md:leading-none` pin (measured live:
   45px@390 leading-tight → 60px@1440 the text-6xl pairing).
3. **Arbitrary-value classes with opacity modifiers** (`bg-[#E8F3ED]/50`)
   compile per-use in v4 — keep them literal at the call site; do not
   hoist into `@theme` (the byte-parity doctrine).
4. **A stale `.next`** (dev over build or vice versa) produces a
   Fast-Refresh reload loop and stale e2e verdicts — `rm -rf .next`
   between dev/build swaps.
5. **An icon-only Radix trigger** still needs its accessible name
   (`aria-label="Open menu"`) — Radix wires the `aria-haspopup`, never
   the name.

- **Session-212's re-verification (no new traps):** the whole v4 trap
  surface re-verified live against the reference — the `@custom-variant
  hover` unwrap, the shadow/blur re-pins, the space-y flip, the
  cursor:pointer base, and the vendored `tw-animate.css` chain: the
  mobile menu's `data-[state=open]:animate-in
  data-[state=open]:slide-in-from-right` classes compute
  `animationName: enter, 0.5s` on the running site — the sheet animation
  fires, byte-identical to the reference's computed styles.

## 10. Anti-Patterns

- Never inline the site copy (the content library is the source; the
  doc-truth pins hold its census).
- Never read `searchParams` in a client component (the s24 doctrine —
  read at the page, pass down as props).
- Never commit the real `AUTH_SECRET` or any key material; `.env` is
  untracked, `.env.example` carries no real values.
- Never construct a `PrismaClient` outside `src/lib/db.ts`.
- Never relax a doc-truth pin to make a run green — re-anchor the DOC
  at the live census ("code wins; docs follow"), and never delete a
  retired layer's history (comment-demote instead).
- The `skills/` folder is guidance, not product code — excluded from
  all checking, testing, and compilation.
- **Session-215's layers:** the OTP log valve (F-216a — the verification
  code's console.info rides INSIDE the NEO_DISABLE_IN_APP_OTP gate in
  signup + resend; the kill-switch that nulls the response payload now
  silences the log line too) · the bucket sweep debt (F-216b — the two
  PUBLIC POST routes /api/bookings + /api/quote-requests call
  sweepRateLimits() like the auth family's 7 routes; the most
  stranger-exposed endpoints no longer grow the buckets Map unbounded)
  · the past-date gate (F-216c — bookingCreateSchema.date gains the
  real-calendar refinement [regex alone accepts 2026-02-30] + the
  not-in-the-past check at day granularity, the server-side mirror of
  the UI's disabled={{ before: new Date() }}; today bookable, yesterday
  rejected). The pins: tests/session-215-audit.test.ts (the 140th
  suite, +6 RED-first). SUITES 139 → 140 · unit 2816 → 2822 · badge
  3009 → 3015.

- **Session-217's layers:** the doc-truth stragglers + the
  head-script reproducibility debt (F-218a — the pm-SKILL's own §7
  test-corpus bullet shipped "139 suites" through the whole s216
  round, a live-tense site disagreeing with its own heading's 2822;
  the pin gap closed: the lockstep family now pins the §7 Unit
  bullet itself · F-218b — the skill-head-216.py splice demoted the
  prior head WITH its project_state marker (the shipped line was
  marker-less only via an unrecorded manual strip; the committed
  script was not the record of the committed artifact); THE
  LINE-BOUNDED SPLICE REPAIR landed in both head-surgery scripts +
  THE REPLAY TEETH-PROOF (tests/session-217-audit.test.ts runs the
  script's arithmetic against git history and asserts the produced
  demoted line == the shipped line byte-for-byte; mutation-proven:
  the old unbounded splice re-planted makes the pin RED) · F-218c —
  the sweep call-site census trued at all four sites (9 limiter'd
  routes: 6 auth + 2 public POSTs + upload; the "13+"/"7 routes"
  narration retired)). The count ladder: 2822 -> 2826 (+4 pins,
  tests/session-217-audit.test.ts the 141st suite) · badge 3015 ->
  3019.
- **Session-216's layers:** the pin-containment debt (F-217b — the
  F-216a ordering proxies upgraded to brace-window containment pins
  [extractGateBlock walks the if (inAppOtpEnabled) block by brace
  matching; the console.info must sit inside it] + the F-216b
  existence pins upgraded to placement pins [the sweepRateLimits()
  call between the rateLimit call and the denied return — the login
  route's exact idiom]; teeth proven the F-174a way: the live plant of
  each genus made exactly its pin RED, reverted, GREEN) · the
  past-date gate's cross-TZ skew dispositioned (F-217a — the
  local-clock mirror stays as-shipped; the honest caveat at the
  schemas.ts site) · the signup route's stale block-comment unified
  (F-217c) · the count-ladder docstring truth (F-217d). Counts HELD:
  140 suites / 2822 unit / 193 e2e (the round is comment + pin
  upgrades only).

