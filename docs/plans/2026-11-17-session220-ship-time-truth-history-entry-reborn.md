# Session-220 Remediation Plan — The Ship-Time Truth Debt + The History-Entry Debt (Reborn)

**Date:** 2026-11-17 · **Rotation trigger:** the owner's `fa3c4e2` (`docs/session_30.md`, the s219 execution record)
**Baseline at 09924dd:** lint 0/0 · tsc 0 · **143 suites / 2843 unit GREEN** · sweep (4 bands) · fullpage · interior census — **all GREEN, byte-parity zero margin** · probe:ref STABLE (bundle `ee166dd5`) · the mobile-nav walk at 390 byte-MATCH (geometry `{70,0,320,844}` · 8 links · `enter/0.5s` — no Tailwind v4 bug).

**Carry-over debts closed this round:** the s219 round's two deferrals are now verified: the e2e battery finished **193/193 passed (6.3m)** — the log survived the sandbox recycle (it completed ~6 min after the s219 push) — and the full drift-gate battery ran clean. The shipped `09924dd` tree is fully verified.

## The audit (the web-application skill dimensions over the 09924dd collateral)

The s219 cures verified still in place (9/9 pins green; both scripts replay NOOP-idempotent; counts consistent at every live-tense site). The audit found eleven findings:

| ID | Severity | Site | Finding |
|---|---|---|---|
| F-222a | Medium | `property-maintenance_SKILL.md` | The v1.15.0 bump shipped without its own "Session-219's layers" entry — the F-221a genus reborn inside the F-221a cure session. §10's history family reads 213/214/218/215/217/216. |
| F-222b | **High** | `worklog.md:21-23` | The Task-219 Stage Summary claims "e2e 193/193" as a completed gate — but the e2e finished ~6 min AFTER the commit/push (commit 01:25:43 UTC, e2e log 01:31:17 UTC). The shipped record asserts a result that did not exist at ship time. |
| F-222c | **High** | `docs/session_29.md:57-60` | The "verification battery" paragraph lists `e2e 193/193` (untrue at ship time, same evidence) AND `the drift-gate battery (4 bands + fullpage + census)` — which never ran in the s219 window (the only drift log predates the rotation trigger; the round's own transcript says "were not run this round"). |
| F-222d | Medium | session_29.md:43 · commit 09924dd · neo-crm_SKILL.md:16 | "the negatives ladder extended across all six doc faces" — a misdescription repeated in three shipped records: the s218-retired block walks FOUR faces (README ×3, PAD ×3, CLAUDE ×4, AGENTS ×1 — the same shape as the s217 block). The pm-SKILL face is guarded positively (F-201b lockstep) and the neo-crm face cannot carry a blanket 2826 negative (the demoted layer legitimately keeps its ship counts). |
| F-222e | Medium | `tests/session-219-audit.test.ts:107` | The F-221h reverse-arm regex `[A-Z_]+` is digit-blind — it silently exempts `E2E_PORT` (documented, consumed only in tests/), the one knob that falsifies the pin's "every documented knob is consumed in src/+scripts/" claim. Digit-aware regex extracts 12 documented knobs, not 11. |
| F-222f | Low | `tests/session-218-audit.test.ts:70-76` + `tests/session-219-audit.test.ts:67-79` | The F-221b/F-221g pins' comments claim a co-location tooth ("moving the token to any other block goes RED") that the whole-file normalization silently defeats — both strings survive a block move. |
| F-222g | Low | `worklog.md:9` | The severity tally "2 Medium, 3 Low, 3 Info" contradicts the round's own table: the eight actionable findings are 3 Medium (F-221a/c/j), 3 Low (F-221b/h/i), 2 Info (F-221f/g). |
| F-222h | Low | 5 records (s219 pin comment, plan, session_29, commit msg, neo-crm layer) | The F-221a description says "§10 carries 213/214/215/217/216" — but the s213/s214 entries sit at pm-SKILL lines 281/295, inside §7 The Test Corpus, not §10. Only 215/217/216 were in §10. Cosmetic: the finding was true, the cure landed correctly. |
| F-222i | Low | `property-maintenance_SKILL.md:19` | `last_updated: 2026-11-16` not ridden through the v1.15.0 bump (which materially edited the doc the same day, 2026-11-17). The same round trued neo-crm_SKILL's date but not the pm-SKILL's. |
| F-222j | Info | neo-crm chain | The s212/213/214 layers absent (counts bumped in place, no prepend) — pre-existing, documented in skill-head-215.py. Dispositioned: no cure (the F-221d adjacent doctrine). |
| — | (dismissed) | sitemap/robots · pm-SKILL §2/§7 · head chain | Verified clean (live curl + pins). |

## The cures (TDD — every pin RED-first at birth)

- **R-01 (F-222a):** the "Session-219's layers" history entry, inserted at the head of the §10 history family (after the "skills/ folder" bullet, before the Session-218 entry) — recording the history-entry debt round itself.
- **R-02 (F-222b/c):** the ship-time truth repairs — worklog Task 219's Stage Summary and session_29.md's battery paragraph re-worded to the honest form: the e2e finished 193/193 minutes after the push (post-ship verification) and the drift-gate battery ran at the s220 catch-up — no gate claimed before its evidence existed.
- **R-03 (F-222d):** the six-faces misdescription trued to "the four doc faces the s217 block walks" at the three live sites (session_29.md; the neo-crm s219 head layer — via a new skill-head-220.py re-anchor recorded in-script; the commit message is history, untouchable, but the round's own records tell the true form).
- **R-04 (F-222e):** the F-221h reverse-arm regex digit-aware (`[A-Z_][A-Z0-9_]*` in both arms) + the honest carve-out documented: E2E_PORT is the tests-only knob, explicitly exempted as the documented exception (the test-only block already says "not read by the running app").
- **R-05 (F-222f):** the co-location teeth added — the F-221b/F-221g pins upgraded to slice the parity-tools BLOCK (substring between the `---- Parity-gate tooling` header and the next `----`), then assert within the slice: the header, the knob row, and the four-reader list co-located inside the block that names them.
- **R-06 (F-222g):** the worklog severity tally trued to "3 Medium, 3 Low, 2 Info".
- **R-07 (F-222h):** the §10-mislocation trued at the live sites — the s219 pin comment, the plan doc, session_29.md (the shipped layer text in neo-crm_SKILL.md:16 keeps its historical form per the frozen-record doctrine; the s220 layer records the true location).
- **R-08 (F-222i):** the pm-SKILL `last_updated` trued to 2026-11-17 (and the ladder records the ride).
- **R-09 (F-222a collateral):** the s220 head layer for neo-crm_SKILL (v1.220.0 → v1.221.0, the s220 counts, the R-03 re-anchor) — `scripts/skill-head-220.py`, LINE-BOUNDED, marker stripped in-script, replay NOOP-idempotent.
- **R-10:** the count ladder `scripts/count-ladder-220.py` (2843 → the new total · 143 → 144 suites · badge 3036 → the new badge) walking every live-tense site incl. the README commands-comment + the four dialog-geometry CLAUDE.md twins (the stragglers the s219 ladder missed are pre-carried this time).

## The verification battery

lint 0/0 · tsc 0 · unit (the 144th suite: `tests/session-220-audit.test.ts`) · build · smoke 14/14 · e2e 193/193 (RUN TO COMPLETION this round — the F-222b/c lesson: no gate claimed before its evidence exists) · probe:ref · the mobile-nav walk · the drift-gate battery (4 bands + fullpage + census — already run this round at baseline; re-run after the cures if any source file changed).

## Execution ledger

- [x] R-01 the Session-219's layers history entry (F-222a)
- [x] R-02 the ship-time truth repairs (F-222b/c)
- [x] R-03 the six-faces true at the live sites (F-222d)
- [x] R-04 the F-221h digit-aware regex + carve-out (F-222e)
- [x] R-05 the co-location teeth (F-222f)
- [x] R-06 the severity tally true (F-222g)
- [x] R-07 the §10-mislocation true (F-222h)
- [x] R-08 the pm-SKILL last_updated ride (F-222i)
- [x] R-09 the s220 head layer + version 1.221.0 (F-222a collateral)
- [x] R-10 the 144th suite + the verification battery + the docs lockstep; pushed via the SSH wrapper
