# Session 203 — The Residual-Ledger Polish Plan (2026-11-15, the fourth continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-8658954 tree.
**Inputs:** the owner's session-202 logs (`docs/session_5.md` + the standing prompt), the s202 plan's residual ledger (its §2 A-202a: the faq item-spacing micro-deltas + the booking form-interior offsets), `worklog.md`.
**Scope:** close the s202 residual ledger — decode both genera, land the honest cures (TDD), re-derive the moved floors, re-run the standing battery. The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

The corpus is the Oasis public site on the kept neo-crm scaffold at the s202 state (both F-201g cures + the four-band re-derivation landed). The baseline gate on the fresh tree: **lint 0/0 · tsc 0 · 139/2800 unit** — the full triple, per the F-202a lesson. The standing contracts re-verified: `.env` `DATABASE_URL="file:../db/custom.db"` · db census MATCH (15/24/10/23/12 + 4 users) · `bun audit` at the pinned census 10 (4h/5m/1l) · `.env.example` present · the 16-route sitemap + robots + manifest live-curled (all 200).

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-203a | **The faq inter-card rhythm** — decoded live: the reference's accordion list runs `space-y-12` (the observed 48px gaps) vs our `space-y-8` (32px) — the +16/gap genus, ~48px of the 64px container delta. The card heights are IDENTICAL both sides (277/330/277/330 — the content + typography already byte-parity). The ref's middle-gap +20 is a margin-collapse artifact of its CLASSLESS cards (the answer `<p>`'s margin rides outside the card) — not reproducible inside our bordered cards without a hack. | High (the faq residual's dominant genus) | **Cured** (TDD — the rhythm pin; faq 15.98 → 13.42 at 1440) |
| F-203b | **The booking estimate-header rhythm** — decoded row-by-row: the reference's "Instant Estimate" header row sits **mb-6** (the 24px gap to "What do you need?"); ours `mb-4` (16px) — the -8px genus carried through EVERY row below (the label, the services grid, the yard row, the estimate strip). The yard slider's label-ancestry construction stays ours — the s199 axe two-gate contract (`aria-input-field-name`) rides it; the ref's separate-row slider is a ~5px micro-delta. | High (the booking residual's dominant genus) | **Cured** (TDD — the rhythm pin; booking 26.68 → 23.67 at 1440) |
| F-203d | **The stale-server contamination** — the s202 capture standalone on :3100 (custom.db-wired) survived the round recycle; both s203 e2e runs reused it (the signup ladder + a reset-route call wrote the standing db; the suites asserted against the wrong db) — the 35/57-wide "failures" were the symptom, the census MISMATCH the proof. | **Critical (process + data)** | **Cured** (the forensics + the file-wipe heal + the CI=1 fresh boot; §5) |
| F-203c | **The moved floors** — the two cures moved the faq/booking baselines at every band (faq: 13.42/13.12/5.59/12.42 · booking: 23.67/19.94/11.37/18.82) — the four-band table entries + the standing gates needed the re-derivation. | — (the standing hygiene) | **Done** (8 entries re-anchored; all four `--fail-on-drift` gates GREEN) |

## 3. The remediation record

- [x] R1 (F-203a, TDD): the faq rhythm — `space-y-8` → `space-y-12` (the RED pin asserts the reference's own rhythm + forbids the old form). **faq 15.98 → 13.42** (1440).
- [x] R2 (F-203b, TDD): the booking header rhythm — `mb-4` → `mb-6` on the EstimateCard's header row (the RED pin on the estimate-card source). **booking 26.68 → 23.67** (1440).
- [x] R3 (F-203c): the eight table entries re-anchored (faq/booking × four bands, the measured floors + the standing headroom); the sweep-tool pin suite green (68/68); **all four `--fail-on-drift` gates GREEN**.
- [x] R4: the verification battery — the production build GREEN · the full unit gate re-verified post-cures (**2800/2800**, the count ladder HELD — both pins extended existing `it`s) · lint 0/0 · tsc 0.
- [x] R5: the full e2e re-run — **193/193** (192 in the clean run + the settings-debounce focus flake verified green in isolation, 8.5s; nothing this round touched that surface). THE PATH THERE WAS THE ROUND'S INCIDENT (§5 below): the first two runs failed 35/57-wide because a STALE :3100 server poisoned them; the CI=1 fresh-boot re-run went clean at the normal 6.2m.
- [x] R6: the captures 26-28 (the faq rhythm + the booking header rhythm, desktop + phone — shot against a standalone on **:3101**, away from the e2e's port, and the server KILLED right after; all machine-verified non-blank) · the docs lockstep (this plan · the worklog Task-203 · the AGENTS section) · the push.

## 5. The incident: the stale-server contamination (F-203d, cured)

**The symptom.** Both first e2e runs failed wide (35, then 57 failures — the data pages' elements not found, the 10-11s page-load timeouts, the a11y structural catches), while the SAME specs passed in isolation (the a11y suite alone: 30/30). The standing-db census after: **custom.db contaminated** — contacts/leads/accounts/activities/events all 0, users 12 (expected 4).

**The forensics** (a one-shot bun:sqlite read-only autopsy — the script retired after the diagnosis, its findings recorded here): custom.db's 12 users = the 4 seed users + **8 e2e signup-ladder users** (e2e-verify / e2e-lockout / s163-reset / s163-evict), timestamped in two clusters matching the two failed runs. The CRM rows were wiped by a call to **`/api/reset`** (the test-support route) served through the wrong db.

**The root cause.** The s202 round's capture standalone — booted on :3100 with `DATABASE_URL=file:../db/custom.db` for the s202 captures — was **never killed** and survived the inter-round sandbox recycle (only the :3000 dev server died). This round's e2e: `reuseExistingServer: !CI` found :3100 healthy and **reused the custom.db-wired server for BOTH runs** — the signup tests and the reset call wrote the standing db, and the suites' seeded-state assertions ran against a db whose state the global-setup (push+seed of e2e.db) never touched. My port-kill before the second run was defective: `lsof -t -i:3100` returned the CLOSE_WAIT chromium PIDs, not the listener's — I killed the wrong processes.

**The heal.** `rm db/custom.db && bun run db:push && bun run db:seed` (the in-place `db:seed` alone would NOT have healed it — the seed UPSERTS users by email and never deletes, so the 8 stray users would survive; a schema push with an unchanged schema is a no-op, not a wipe) → **census MATCH** (15/24/10/23/12 + 4 users).

**The doctrine going forward (three rules).** (1) **Kill every spawned server at the point its work ends** — never leave one on a port a later suite might reuse. (2) **Repeated local e2e runs go with `CI=1`** (the config's own N-69a escape — it forces the fresh boot and disables the reuse). (3) **A port-kill goes by the LISTEN-state PID** (`ss -ltnp` → `pid=`), never by `lsof -t -i:` (which returns the connection holders too).

## 4. The residual ledger after this round

The faq floor: the ref's margin-collapse artifact (the +20 middle gap) + the canvas animation drift. The booking floor: the yard-slider construction micro-delta (~5px, the a11y contract keeps our form) + the canvas drift. Both recorded as the documented floors — the baselines sit above them.
