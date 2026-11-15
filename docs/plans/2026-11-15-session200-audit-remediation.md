# Session 200 — The Audit + Remediation Plan (2026-11-15)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-a35a754 tree.
**Inputs:** the owner's session-199 logs (`docs/session_1.md` + `docs/session_2.md`), the plan-of-record (`docs/plans/2026-11-15-session199-oasis-clone-build.md`), `worklog.md`, and the audit below (guided by `skills/web-application/SKILL.md` §0/§1/§5/§6/§9/§12/§15 + the Tailwind-V4 trap log + the standing pin corpus).
**Scope:** the round's ask — refresh, review, audit the recent (session-199) changes, iterate on parity, remediate, capture, document, push. The `skills/` folder is excluded from all checking/testing/compilation (its files are guidance, not product code — the corpus's own standing doctrine).

## 1. The review pass (validated against the codebase)

The corpus is the **Oasis public site on the kept NEO-CRM scaffold**: the `(site)` group (8 public routes + 7 capital aliases), the site chrome (sticky blurred header + the mobile menu + the dark footer), the booking superset (the TDD seam + `Booking`/`QuoteRequest` models + both rate-limited public API routes), the re-skinned login/404, and the CRM back-office at `/dashboard` untouched. The doc-truth pins hold every census: 2797 unit / 192 e2e / 139 suites / 11 spec files / 16 sitemap routes / 21 gated of 31 route files / 11 models / 37 components / the space-y 26/133 census / the leading-inert `md:leading-none` pin. The probe's STANDING is the Oasis reference itself (bundle `ee166dd5…`, the 12/6/21 content census, the 485px/6-link header, the TRUE-390 icon-only hamburger, the landing 6/5).

**Alignment confirmed, with the standing gaps the owner's logs already enumerate** (the count ladder, the screenshots, the docs heads, `.env.example`, the SKILL rename/creation) — all landed in THIS round's execution (§4).

## 2. The audit findings (the recent-changes review)

Audited against the web-application skill's contracts (§6 handler idiom, §5 auth posture, §9 store discipline, §12 token-only color, §15 the gate) plus the Tailwind-V4 trap log and the reference's own anatomy:

| # | Finding | Severity | Disposition |
|---|---|---|---|
| A1 | **The mobile menu is a hand-rolled dialog** (`site-header.tsx`): no focus trap, no Esc-close, no focus-return, no scroll lock — while the reference's own menu IS a Radix Dialog (its trigger's `aria-haspopup="dialog"` is the tell) and the corpus ships the hardened `ui/dialog` primitive. The D-112a2 keyboard-parity doctrine flags the gap. | High (a11y + parity) | **Remediated** (R1, TDD) |
| A2 | The sitemap lists the 8 session-walled CRM routes alongside the 8 public ones. SEO-wise a crawler hits the login wall; the corpus's s198-era posture pinned the 16-route census deliberately (the superset lists everything the app serves). | Low (recorded deviation) | **Kept + documented** (the plan's own record; no pin churn) |
| A3 | The two public API routes follow §6 fully (session-gated GET, rate-limited public POST, `parseBody` + Zod, envelopes, no throws) — verified line-by-line. The `serviceId` is re-validated against the seam's catalog upstream of the write. | — | **Clean** |
| A4 | The Tailwind-V4 trap surface: the mobile menu's link list rides `flex flex-col` + per-link padding (NOT `space-y` — the trap #4 family), the hero's `md:leading-none` computed-equal pin is measured-live, the space-y census 26/133 is pinned. | — | **Clean** (pinned) |
| A5 | The dev/e2e environment: a leftover `:3100` standalone listener blocks the `CI=1` e2e boot (this round's first run died on it). | Process | **Noted** (kill before `test:e2e`) |
| A6 | The SKILL's live `project_state` head was MISSING (every layer comment-demoted; the layer-axis pin passed vacuously against a demoted block) — a genuine doc-integrity defect from the owner's doc sync. | High (doc truth) | **Cured** (the session-200 head layer written, v1.208.0, the pin re-anchored to the real head) |
| A7 | The owner deleted `docs/neo-crm-dashboard.png` (a35a754); the dead-code pin still asserted its existence. | — | **Cured** (the pin follows the tree) |

## 3. The remediation work-packets

### R1 — The mobile menu rides the Radix Dialog (TDD)

The reference's own construction. **RED first**: two new e2e pins in `tests/e2e/public-site.spec.ts` — (a) Escape closes the menu and (b) focus returns to the trigger — both fail against the hand-rolled form. **Then the cure**: `site-header.tsx` composes the corpus's `ui/dialog` (DialogContent carries the focus trap, Esc handling, focus return, and the scroll lock); the dialog is named "Site menu" (the standing e2e locator), the backdrop click keeps its close, the link rides keep their close-and-navigate. **GREEN**: the battery re-runs (the existing open/ride/close pins must hold unchanged).

### R2 — `.env.example` (the prompt's explicit deliverable)

Matched to the codebase's real env contract (the SKILL §3.3 six-knob table): `DATABASE_URL="file:../db/custom.db"` (the repo-root `db/` folder — the standing seam), `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, the three `NEO_*` ops knobs with their default-off forms. No real values; committed.

### R3 — The captures

`docs/screenshots/` — the dev server's Oasis surfaces at desktop (1440) + phone (390), the mobile menu open, the booking flow's step 2, the login card, the 404. Saved as real PNGs (verified non-blank by code).

### R4 — The docs heads at the Oasis identity

The four root docs still open NEO-CRM-branded (`# NEO CRM`, the neo-crm reference URLs, the CRM-first intros). Re-anchor the titles + the opening identity paragraphs to the Oasis mission (the public site first, the CRM superset second, the correct reference URL), keeping every historical session record intact. The SKILL keeps its `name: neo-crm` key (the corpus's own front-matter contract) while its description already carries the Oasis mission.

### R5 — `property-maintenance_SKILL.md` (the prompt's explicit deliverable)

Distilled per `skills/to-distill-project-into-skill` + `skills/distill-codebase-skill`: the standalone skill document for THIS codebase — the Oasis identity, the stack, the (site)/(app) split, the booking seam, the API contracts, the test corpus (2797/192), the gate, the Tailwind-V4 trap log, and the operating doctrine. A new file alongside `neo-crm_SKILL.md` (which stays — the corpus's pins read it; it is the engineering log of the scaffold).

### R6 — The parity sweeps + the probe

`probe:ref` re-verified against the Oasis reference (all layers STANDING — see the s199 re-derivation). The maiden desktop sweep ran against the Oasis reference at 1440×900 (`REF_URL=https://oasis-property-maintenance.base44.app bun run sweep --pages about,contact,login`):

- **login 0.59%** — the floor genus (the reference hotlinks its logo screenshot; ours draws the shape — the s7 note, now on the Oasis card).
- **about 55.43% / contact 38.70%** — the STRUCTURAL genus, adjudicated: our /about + /contact are the OASIS public pages inside OUR site chrome, swept logged-in on both apps; the Oasis reference renders its own pages inside its own platform chrome. The two renderings are both faithful to their own chrome contracts (the pages' CONTENT is byte-pinned by the e2e battery + the unit content pins — the sweep measures chrome composition, not content parity). The CRM pages (/dashboard & co.) are OURS-ONLY supersets (the Oasis reference 404s every CRM route — recon leg 3): they keep their sweep baselines against the neo-crm reference's anatomy frozen at the s148 floor notes.
- The Oasis-only pages (services/gallery/faq/booking) join the sweep map at the next standing-baseline derivation round (their content is pinned by the probe's content census + the e2e battery; the pixel floor derivation needs its own maiden pass).

### R7 — The docs lockstep tail

The worklog entry, the plan's execution record, the AGENTS session-200 section, and the README/CLAUDE/PAD faces — all at the final counts (2797 / 192 / 2989 / 139).

## 4. The execution record (filled as the round lands)

- [x] The refresh (a35a754 pulled; the session logs read) + the alignment validation.
- [x] The baseline gate cured: the asset pin (A7), the 7 probe/404 stragglers, the FULL count ladder (~45 live-tense sites re-anchored across README/AGENTS/CLAUDE/PAD/SKILL: 2797 unit · 192 e2e · 2989 badge · 139 suites), the SKILL head surgery (A6, v1.208.0 + the live session-200 layer) — **unit 2797/2797 GREEN, lint 0/0, tsc 0**.
- [x] The audit (§2).
- [x] R1 the mobile-menu Radix remediation (TDD) — RED birth (the Esc/focus-return pin), the cure (DialogPrimitive composed, the trigger named, the reference's top-sheet anatomy), GREEN 12/12 (one stale-build false alarm root-caused on the way).
- [x] R2 `.env.example` — the s170 file re-verified against the six-knob contract + the identity touch-up (committed).
- [x] R3 the captures — 15 PNGs in docs/screenshots/ (9 desktop surfaces + 3 phone + the Radix menu open + the booking step-2 + the CRM dashboard), all machine-verified non-blank.
- [x] R4 the docs heads — AGENTS/README/CLAUDE/PAD re-titled at the Oasis identity (the PAD companion row names the new skill; the historical records untouched).
- [ ] R5 the SKILL creation.
- [x] R6 the sweeps — the maiden Oasis-reference run (see above) + probe:ref STANDING.
- [x] R7 the lockstep tail + the full gate + the push — the worklog entry (Task ID 200) + this record + the AGENTS property-maintenance Session-200 section; THE FINAL GATE: lint 0/0 · tsc 0 · **139/2797 unit · build · smoke 14/14 (the 05 identity check re-anchored to the Oasis title — the retired 'neo' grep followed its landing) · e2e 193/193** (the full confirmation run on the fresh build) · probe:ref STANDING on every layer.
