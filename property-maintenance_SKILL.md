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
  2801-check Vitest / 193-check Playwright corpus and a single-command
  quality gate. Use it to extend, debug, onboard, or replicate this
  architecture.
version: 1.3.0
last_updated: 2026-11-15
---

# property-maintenance — Engineering Skill (SKILL.md v1.3.0)

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
| Unit | Vitest 5 (139 suites / 2801 checks) | |
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
  206): the reference's full-viewport painter — the sky→lawn gradient
  with a SHARP horizon (1px at 0.257 of the height, the 6px blend to
  0.262), the warm glow + the rock stratum, and the SOLID structures
  (session-206's decode: the reference's foliage is crisp solid
  shapes, not radial fades): the terracotta WEDGE on the left-center
  horizon (the three-tone polygon: the (214,81,55) core hull + the
  (153,60,35) bottom-left shade + the (190,73,50) slope lining, under
  the booking glass at x~0.25w), the right mass's flat (95,143,51)
  dome, the left tree's oval crown + brown trunk, the hedge dome, the
  corner masses — all via the `polygon()` painter. Effectively static
  (paints once per resize, no animation loop); `aria-hidden` +
  `pointer-events-none`; mounted ONLY in the (site) layout (the login
  and 404 render white — the reference's own posture).
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
  the region links, the emergency line).
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
  SUPERSET confirmation (a persisted Booking row).
- **The CRM** is the scaffold's, untouched: see `neo-crm_SKILL.md`
  (the engineering log) for its full contracts.

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

## 7. The Test Corpus (2801 unit / 193 e2e)

- **Unit (Vitest, 139 suites):** the pure seams (`booking.ts` 12
  checks — the matrix, the slots, the calendar), the doc-truth pins
  (every live-tense count site in README/AGENTS/CLAUDE/PAD/SKILL is
  pinned to the live census — "code wins, docs follow"), the
  leading-inert genus scanner, the doctrine/inventory/facts censuses,
  the whole scaffold battery.
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
