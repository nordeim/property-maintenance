# Implementation Plan — Session 199 (Task ID 199 / AGENTS Session-211): The Oasis Clone Build + the Doc-Truth Reconciliation

**Round:** the property-maintenance checkout's first own session (worklog Task ID 199; the AGENTS/PAD session layer numbering continues at 211 — see §7).
**Date:** 2026-11-15
**Trigger:** the owner's newest commits (da4da80/77c33ba/fb4a466 "update prompts", b2e660a "update docs", 74ab02c "update skills") on top of the template bring (e5c7f6a "update template" — the neo-crm corpus at the s198 ship state).

---

## 0. The discovery (what this round actually is)

Two independent findings define the round:

**F-199a — THE REFERENCE IS A DIFFERENT APP.** The round's designated reference
`https://oasis-property-maintenance.base44.app/` is **NOT** the CRM workspace the
corpus was calibrated against (`https://neo-crm-8ab2c17c.base44.app/`). The recon
(scripts/recon-199*.ts, legs 1–7 — all Verified live 2026-11-15) shows it is
**"Oasis Property Maintenance" / Green Cut Lawn Care**, a service-booking
marketing site on Base44:

| Surface | Observed anatomy (Verified) |
|---|---|
| `/` + `/home` | hero `h1 "Your property, perfectly maintained."` (text-4xl md:text-6xl bold #1F2933), 4 service cards (Unsplash imgs 256×176), "Booked in three simple steps", instant-estimate band, CTA, footer |
| `/services` | `Our Services` — 5 groups (Lawn & Garden Care · Exterior Cleaning · Property & General Maintenance · NDIS & Support Homes · Need something else?), 12 image cards, each `Add to Quote`, `Request a Site Visit` |
| `/gallery` | `Before & After Gallery` — 6 before/after photo pairs + `Get Your Free Quote` CTA |
| `/about` | `About Green Cut` — story + 4 differentiators + service regions |
| `/faq` | `Frequently Asked Questions` — 6 groups, ~20 accordion items + Quick Tips |
| `/contact` | `Get Your Free Quote` — form (name/tel/email/suburb select/11 service checkboxes/2 radios/textarea) + details + service-area map image |
| `/booking` | 3-step flow: `1 Service & Estimate` (5 services + yard slider 100–2000 m², default 400) → `2 Date & Time` (month calendar, past disabled, 35 cells; 5 slots 8am-10am…4pm-6pm) → `3 Your Details` (name/phone/email/address ×2/notes `Gate codes, pets, problem areas...`) + `Back` + `Confirm Booking` |
| `/login` | `Welcome to Oasis Property Maintenance` — Google/Facebook/Apple social buttons + email/password + `Sign in` |
| any unknown route | custom 404: `404` h1 + `Page Not Found` h2 + `Go Home` |
| CRM routes (`/dashboard` etc.) | **404 — the reference has NO CRM** |

Design tokens (computed, Verified): body 16px system-ui #0A0A0A on white; h1/h2/h3
#1F2933 700 (60/36/16px); p #4B5563 18px; brand green **#2E7D5F** (estimate price,
m² readout); accent amber **#F5A623** (--accent); cream panel **#F5F1EB**
(estimate card); footer #1F2933/white ~401px; header sticky white/70 +
backdrop-blur(24px) 81px; logo 64×64 (`media.base44.com/.../aa271b98d_image.png`);
service/gallery photography is **Unsplash-hosted** (`images.unsplash.com` —
clean to reference); mobile 390: icon-only hamburger (1), header 81px, scrollW
390 (no overflow), menu opens to the 6 nav links.

Estimate matrix (Verified, service-driven — the yard slider does not move the
price in any observed position): Lawn $60–$80 · Garden $70–$90 · Pressure
Washing $120–$160 · Gutter Cleaning $90–$120 · Full Property Tidy-Up $145–$195.
The reference's `Confirm Booking` submit behavior is **Unknown** (no delete path
visible → the gated write-probe boundary stays uncrossed; our clone's submit is
observed on OUR side instead).

**F-199b — THE CHECKOUT IS SPLIT-BRANDED (the doc-truth break).** The corpus
(src + tests + scripts) is the neo-crm lineage at **the s198 ship state**
(2817 unit / 195 e2e, live-verified this round: lint 0/0 · tsc 0 · 23 RED / 2794
green · build · smoke 14/14 · census MATCH 15/24/10/23/12 + 4 users at
`<repo>/db/custom.db`), while the owner's doc sync brought the **s210-era doc
layers** (AGENTS/README/PAD/CLAUME/skill reference sessions 199–210 with the
other lineage's counts 2858/226/3084). The 23 RED pins are the doc-truth
carriers correctly flagging the split: every LIVE-TENSE doc site now carries a
count that this checkout's corpus does not have.

**The round's mission (per the operator's create prompt):** use the corpus as
the scaffold, build the Oasis clone on it — *"a production ready 'superset' of
the original reference site in terms of functionality while maintaining visual
parity with the original reference website"* — and re-land the docs on the
checkout's truth.

---

## 1. Work package 1 — the doc-truth cure (the 23 RED pins → green)

Per the house doctrine (code wins; docs follow; D-188a1/s203 precedents):

1. **Count re-anchors 2858→2817 · 226→195 · 3084→3012** at every LIVE-TENSE
   site (the failing pins name them exactly): README badge :8, Tested row :65,
   file tree :142-143, commands comment :204-206; AGENTS commands table :20/:22,
   gate-order :36; CLAUDE gate-order :40, commands :132/:135, pyramid :145, e2e
   :612, seam :743; PAD file tree :731, Total row :1276, HEAD line :1286,
   checklist :1724, commands :1797; SKILL pre-ship block :1150, Appendix B unit
   total :6951. Historical session layers (AGENTS §Session-199…210 narratives,
   PAD s199–s210 inventory rows, SKILL retired layer heads) keep their own
   numbers BY DESIGN (the F-100a2 history-record doctrine).
2. **PAD §11 line-count rows** → live counts: `tests/e2e/a11y.spec.ts` 984→436,
   `tests/dialog-controls.test.ts` 581→175.
3. **SKILL Appendix B a11y row** → live census 33.
4. **The audit-ledger pin (D-198a2) re-anchors at the live census** (the s203
   precedent): `bun audit` run live this round reports **10 (4 high / 5
   moderate / 1 low)** — the PAD §10 row ALREADY carries this form (correct);
   the PIN (expecting the s198 census 9) is the stale side and moves to 10 +
   the minimatch re-triage clause.
5. **docs/neo-crm-dashboard.png restored** (the dead-code-hygiene living-
   dependency guard) — with a genuine capture from the remediated tree.
6. **The skill head surgery** (the F-106a1/F-108a1 layer axis): the s210 live
   layer comment-demotes (the house single-key form, its own ship counts kept);
   the new live layer carries the checkout's truth (2817/195) + this round's
   story; version → v1.208.0; the layer-axis pin re-anchors (FIRST = the new
   layer, SECOND = the s210 ship form 2858/226 — the D-188a1 retired-block
   doctrine holds beneath).

Gate: `bun run test` 138/2817 GREEN (the pre-build baseline restored).

## 2. Work package 2 — the Oasis public layer (visual parity)

New marketing layer replacing the corpus's neo-crm landing/about/contact
(those cloned a DIFFERENT reference's marketing arms; they retire):

- `src/components/marketing/` — `site-header` (sticky white/70 blur-24, logo,
  Home/Services/Gallery/About/FAQ/Contact, phone `0400 000 000`, `Book Now`,
  the 390 hamburger menu), `site-footer` (#1F2933, brand + Quick Links +
  Services + Contact Us + tagline/ABN/regions/emergency/©2026), the shared
  section idioms (container, h2 band, card grid).
- Pages: `/` (== `/home`), `/services`, `/gallery`, `/faq`, `/about`,
  `/contact` — content and structure per the §0 census; photography via the
  reference's own Unsplash URLs (publicly hosted stock; license-clean) + the
  logo asset downloaded to `public/` (the owner's own asset, clone-authorized).
- `/login` re-skin: the Oasis card (social buttons row — UI parity, our
  email/password auth is the working path; the social buttons are visual
  parity only, documented as such) + post-login redirect to `/` (the
  reference's own behavior, Verified).
- The 404 re-skin (h1 `404` + `Page Not Found` + `Go Home`).
- Tailwind v4 tokens ADDED alongside the corpus's pinned @theme set: the Oasis
  brand green/amber/cream/slate — literal hexes (the no-var() rule), no JS
  config, `@utility` for any custom class (the trap-log rules).
- **The kept superset:** the CRM shell (`/dashboard` + family) stays
  session-gated and unchanged — reachable by URL, not advertised on the public
  layer (visual parity with the reference, which has no CRM at all).

## 3. Work package 3 — the booking flow + estimate (functional parity)

- `src/lib/booking.ts` — the pure seam: SERVICE_CATALOG (5 services, ids,
  labels, price ranges), `estimateFor(serviceId)` → "$60 – $80" forms,
  YARD_SLIDER contract (100–2000, default 400, the m² readout format),
  TIME_SLOTS (5), `calendarDays(year, month)` (past disabled), step labels.
  TDD: the seam's unit battery first (RED → green).
- `src/components/marketing/booking-flow.tsx` — the 3-step flow (progress
  dots, service buttons, yard slider, estimate card on #F5F1EB, calendar,
  slots, details form, Back/Confirm).
- **The superset submit (F-199c):** `Confirm Booking` → `POST /api/bookings`
  (Zod-validated, the API envelope, rate-limited like the corpus's public
  routes) → a new Prisma `Booking` model (service, yardSize, date, slot,
  name/phone/email/address/notes, status) → success state. The reference's
  submit is Unknown; ours is a real persisted, admin-visible record — the
  functional superset, surfaced as a `Bookings` list on the CRM dashboard.
- The `/contact` quote form → `POST /api/quote-requests` (same idiom;
  persisted; the reference's form target is Unknown — ours is real).
- The instant-estimate widget on `/` shares the seam.

## 4. Work package 4 — tests (the house three tiers)

- Unit (Vitest): the booking seam battery + the quote schema battery (new
  suites; the count ladder grows).
- E2E (Playwright): the Oasis public layer battery — per-page render + key
  geometry pins (header 81px sticky blur, h1 sizes, the estimate card, the
  booking round-trip to the success state, the 390 hamburger open/close, the
  404, the login card) — REPLACING the retired neo-crm marketing specs (they
  pinned surfaces this round replaced; their forms join the negatives ladder,
  the house retirement pattern). The CRM specs (195-family) stay untouched.
- The standing smoke ladder: the sitemap grows to the new public routes (the
  11-route pin re-anchors), robots/manifest stay.
- Mutation-proof the changed pins (the stale-9 replant → 1 RED; the retired
  marketing form → negatives catch).

## 5. Work package 5 — the drift tooling re-anchor (probe:ref → Oasis)

- `scripts/drift-probe.ts` STANDING re-derived for the Oasis reference: bundle
  md5 ee166dd5… / 1,314,236 bytes; the header census (81px, the nav item
  count); the mobile census (390: 1 icon-only menu button, scrollW 390); the
  landing census (6 nav links, 5 sections); census pages → the public routes;
  the CRM-shell census legs retire to the ours-only family (the reference has
  no CRM — documented, the genus register entry).
- Maiden sweeps: ours vs the Oasis reference at 1440×900 + 390×844 on the
  public pages (the sweep PAGES list re-anchored: the marketing entries point
  at the Oasis faces; the CRM entries stay ours-only compared against the
  neo-crm standing baselines where applicable — no, the CRM pages have no
  Oasis counterpart; they drop from the two-app sweep and stay covered by the
  e2e family).

## 6. Work package 6 — captures + docs lockstep + ship

- Captures → `docs/screenshots/` (the 621-series continues): ours-vs-ref pairs
  at desktop for the seven public faces + booking open + the 390 hamburger
  open face + the dev-server set (the operator's standing mobile-nav ask) +
  the restored `docs/neo-crm-dashboard.png`.
- Docs lockstep: AGENTS Session-211 section + the identity head re-anchored to
  the Oasis mission (the neo-crm corpus = the scaffold lineage); PAD §7.1
  inventory row + §10 as needed; README (badge/Tested row/file tree/commands
  + the mission paragraph + the Tested row's Oasis clause); CLAUDE (identity +
  counts); the SKILL head layer; this plan's execution record; the worklog
  entry (Task ID 199 — the bridge numbering explained).
- Full gate: `bun run lint && bun run typecheck && bun run test && bun run
  build && ./scripts/smoke-test.sh && CI=1 bun run test:e2e` + probe:ref
  STABLE + census MATCH.
- Conventional Commit on `main` → push via `docs/ssh_git_wrapper_v3.py` (the
  paramiko shim — this sandbox has no OpenSSH binary; the how-to skill's
  Appendix A), remote ref verified. No new branches.

## 7. Numbering bridge (documented once, referenced everywhere)

The checkout carries TWO honest series after this round: the **worklog Task
IDs** (198 = the template-bring; **199 = this round**) and the **AGENTS/PAD
session layers** (…198 shipped in the corpus; 199–210 arrived as the owner's
doc sync of the neo-crm lineage; **211 = this round's layer**). The bridge is
stated in the worklog entry, the AGENTS section, and the PAD row.

## 8. Risks + declined alternatives

- **Declined: rebuilding from a bare scaffold.** The corpus's auth/db/testing/
  doc-pin machinery is 198 sessions of hardened work; the prompt explicitly
  says "scaffolding purposes — customize and extend".
- **Declined: copying the reference's markup wholesale.** Computed-style
  parity on our own stack (the house methodology) — the reference is itself a
  Tailwind app, which makes token-level parity unusually direct.
- **Declined: write-probing the reference's booking submit.** No delete path
  visible → the skill's boundary; documented Unknown.
- **Risk: the corpus's marketing e2e/pin retirement must be surgical** — only
  the marketing-family specs retire; the CRM family is untouched (the stash-
  proof + count-ladder discipline verifies).
- **Risk: Unsplash URLs are runtime-dependent** — acceptable (the reference
  itself hotlinks them; identical behavior), documented as the shared-source
  genus.

## 9. Execution record (filled as the round lands)

- [x] WP-1 the doc-truth cure — 138/2817 GREEN, mutation-proven (the audit pin), the dashboard asset restored.
- [x] WP-2 the Oasis public layer — chrome + 8 pages + aliases + login/404 re-skins + the SITE_TITLE identity seam + the sitemap 16 routes (tsc clean).
- [x] WP-3 the booking superset — the seam (TDD 12/12), the Booking/QuoteRequest models, the zod schemas, both API routes (tsc clean).
- [~] WP-4 tests — the marketing battery + booking battery + dead-code/route-case re-anchors GREEN; ~37 pins remain red across 10 suites (metadata 2 · pwa 3 · schemas-census 2 · doctrine 1 · dialog-geometry 1 · facts-census 5 · docs-counts 6 · inventory-census 4 · page-layout 4 · leading-inert 2) — every one an expected re-anchor/retirement in the families the build touched; then the e2e battery + the count ladder.
- [ ] WP-5 the probe/sweep re-anchor — not started.
- [ ] WP-6 the captures + the docs lockstep + the full gate + the push — not started (the push waits on the green gate).
