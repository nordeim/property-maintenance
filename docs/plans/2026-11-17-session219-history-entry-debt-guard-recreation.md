# Session-219 Remediation Plan — The History-Entry Debt + The Guard-Recreation Round

**Date:** 2026-11-17 · **Rotation trigger:** the owner's `eee1dd1` (`docs/session_28.md`, the s218 execution record)
**Baseline at 85ed531:** lint 0/0 · tsc 0 · **142 suites / 2834 unit GREEN** · build GREEN — the shipped s218 tree is genuinely green (no F-219a twin-pin debt at birth) · probe:ref STABLE (bundle `ee166dd5`, all census layers STANDING) · the mobile-nav walk at 390 byte-MATCH (geometry `{70,0,320,844}` · 8 links · `enter/0.5s` — no Tailwind v4 bug) · sitemap + robots live-verified.

## The audit (the web-application skill dimensions over the 85ed531 collateral)

The s218 cures verified still in place (the 8 pins of `tests/session-218-audit.test.ts` all green; the s218 ladder replays 0-flip/29-noop idempotent). The audit found eight findings on the s218 collateral, none Critical/High:

| ID | Severity | Site | Finding |
|---|---|---|---|
| F-221a | Medium | `property-maintenance_SKILL.md` §10 | The v1.14.0 bump shipped without its history entry — §10 carries "Session-XXX's layers" for 213/214/215/217/216 but **no Session-218 entry**. Every prior version bump rode with its entry (verified at 5e8f73d/32c3ea7/6236cb6). |
| F-221b | Low | `tests/session-218-audit.test.ts:65-70` | The F-220e pin is under-pinned relative to its name: a bare `HEADLESS` token check with no block scoping — the house idiom (`tests/facts-census.test.ts:566-573`) pins block header + knob + default value. |
| F-221c | Medium | `tests/docs-counts.test.ts:1362` | The s192/F-218 negatives-ladder doctrine was not carried to s218's own retired forms — the retired `2826/141/3019` site-forms appear nowhere in the negatives ladder (the s217 round added its own retired forms one session earlier; the s218 round added none). |
| F-221d | Info | `neo-crm_SKILL.md:20` | The demoted s211 layer's count (2816) disagrees with its ship state (2801) — the documented skill-head-215.py exception ("the demoted line keeps exactly what it said"). Dispositioned: no cure (documented exception). |
| F-221e | Info | `neo-crm_SKILL.md` | Dual-lineage layer-name collisions (s205–s209 live + retired blocks) — pre-existing, count-scoped anchors unaffected. Dispositioned: no cure (recording-only; a future anchor keyed on the bare layer name would AMBIG-fail loudly, which is the designed guard). |
| F-221f | Info | `docs/session_27.md:10` | Typo: "`.env from .envexample`" — the missing dot in `.env.example`. |
| F-221g | Info | `.env.example:67-72` | The parity-tools block names five tools but `HEADLESS` is read by four: it **names sweep-state.ts + fullpage-sweep.ts (non-readers) and misses recon-199.ts** (a real reader). |
| F-221h | Low | AGENTS.md D-205a2 record | The env-face totality contract (every `process.env` consumer walks vs `.env.example`) is unenforced — the s205-era pins were lost in a lineage reset; a new knob today trips no pin. The census face itself is currently TRUE (all 11 vars documented). |
| F-221i | Low | `src/app/sitemap.xml/route.ts:13-14` | The s18-era comment claims "/Profile as the one aliased casing" — stale since s24: nine capital-cased render aliases exist under (app)/. The operative claim (lowercase canonicals listed) stays true; the comment-truth drift is the same genus F-220g itself was curing. |
| F-221j | Medium | `neo-crm_SKILL.md:14` | The version did not bump at s218 — `1.219.0` held through a round that prepended a new head layer (every prior session bumped: 1.217.0→1.218.0→1.219.0). |

## The cures (TDD — every pin RED-first at birth)

- **R-01 (F-221a):** the Session-218's layers history entry, inserted at the head of the §10 history family (after the "skills/ folder" bullet, before the Session-215 entry — the head-insertion pattern the section has used since s215), recording the s218 round: the twin-pin debt (F-219a) + the replay completion (F-220a–g). Plus the pin: the §10 history family must contain a "Session-218's layers" entry whose text carries the F-219a + F-220a-g finding vocabulary.
- **R-02 (F-221b):** the F-220e pin upgraded to the house idiom — block header (`Parity-gate tooling (optional)`) + the knob row form (`HEADLESS=0 watches the browser-driven captures (unset = headless)`) both pinned.
- **R-03 (F-221c):** the negatives ladder extended to the s218-retired forms — `2826/141/3019` site-forms join the s192/F-218 negatives (the same six doc faces the s217 negatives walk: README ×3, PAD ×3, CLAUDE ×4, AGENTS ×1 — re-keyed to the s218-retired numbers).
- **R-04 (F-221f):** the `.envexample` typo trued to `.env.example`.
- **R-05 (F-221g):** the parity-tools block's tool list trued to the four real HEADLESS consumers (`drift-probe.ts · sweep.ts · interior-census.ts · recon-199.ts`) — sweep-state.ts and fullpage-sweep.ts keep their OUR_URL/REF_URL mention only if the block keeps naming them; the cleanest true is listing the four real readers on the HEADLESS row itself.
- **R-06 (F-221h):** the env-face totality guard recreated — a new pin walking `src/` + `scripts/` for every `process.env.X` consumer and asserting each non-framework var appears in `.env.example` (framework-owned NODE_ENV/NEXT_RUNTIME/NEXT_PHASE excluded), plus the reverse arm (every documented var is consumed). RED-first by planting an undocumented var in a scratch consumer check, GREEN on the live tree.
- **R-07 (F-221i):** the sitemap head comment trued — "nine capital-cased render aliases (the s24 rewrite), so this sitemap lists the real lowercase routes the router actually serves" — preserving the F-220g-pinned phrases (`priority "1.0" for the root`, `no dashboard entry`).
- **R-08 (F-221j):** the neo-crm SKILL version bump 1.219.0 → **1.220.0** (frontmatter + H1), riding the s219 head layer; plus the pin asserting the s218 layer stays at 2834/193 in the head chain and the version carries 1.220.0 (a future no-bump round fails the pin the same way a forgotten count does).

## The verification battery

lint 0/0 · tsc 0 · unit (the 143rd suite: `tests/session-219-audit.test.ts`, +~12 checks) · build · smoke 14/14 · e2e 193/193 · probe:ref · the mobile-nav walk at 390 · the drift-gate battery (4 bands + fullpage + census) · captures 76–78.

## The docs lockstep

- pm-SKILL **v1.15.0** (version + H1 + the R-01 history entry) — counts walk to 2846+ (whatever the new corpus total is) via the s219 ladder.
- neo-crm SKILL: the s219 head layer prepended (LINE-BOUNDED, marker stripped in-script) + version 1.220.0 + Appendix B totals re-anchored.
- `docs/session_29.md` (this round's execution record) · `worklog.md` Task 219 · the layer-axis pin re-anchored (head = session-219 layer at the new counts; second = the s218 layer at 2834/193).
- The count ladder `scripts/count-ladder-219.py` (assert-first, both-states idempotent, MISS guard) walking every live-tense site: README/AGENTS/CLAUDE/PAD/pm-SKILL/neo-crm_SKILL + docs-counts constants + badge.

## Execution ledger

- [x] R-01 the history entry (F-221a)
- [x] R-02 the F-220e pin upgrade (F-221b)
- [x] R-03 the negatives ladder extension (F-221c)
- [x] R-04 the session_27 typo (F-221f)
- [x] R-05 the env block tool-list true (F-221g)
- [x] R-06 the env-face totality guard (F-221h)
- [x] R-07 the sitemap comment true (F-221i)
- [x] R-08 the neo-crm version bump + pin (F-221j)
- [x] R-09 the 143rd suite + the verification battery + the docs lockstep; pushed via the SSH wrapper
