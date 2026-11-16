# Session 210 — The V-Bottom Edge + The Descent Gradient (2026-11-16, the eleventh continuation)

**Repo:** `property-maintenance` (the Oasis clone on the neo-crm scaffold) — branch `main`, the post-8f71b6c tree (the s209 ship + the owner's `session_12.md` archive).
**Inputs:** the owner's `docs/session_12.md` (the s209 transcript), the s209 plan's residual ledger (§4: the AA edges), `worklog.md`.
**Scope:** the residual ledger's top floor — the "AA edges" — re-audited with **hi-dpi (deviceScaleFactor 2) zoom captures** and RE-DIAGNOSED: not anti-aliasing at all (both canvases render sharp transitions at the device level; both are 1440×900 @ dpr 1). The real gaps underneath: two band-geometry findings, decoded + cured. The `skills/` folder is excluded from all checking/testing/compilation (the standing doctrine).

## 1. The review pass (validated against the codebase)

- The workspace persisted — the pull brought `8f71b6c` (the owner's session_12.md archive, the s209 transcript = this round's rotation trigger). The env rebuilt (.env, db:push/seed, census MATCH, chromium v1248 reinstall) + the baseline gate GREEN at the s209 ship state: **lint 0/0 · tsc 0 · 139/2801**.
- The docs verified in lockstep (worklog s209 head · SKILL v1.214.0 · pm-SKILL v1.6.0 · AGENTS Session-209 at L12941).
- The standing drift re-measured: **booking 5.70 · landing 4.73 · faq 3.37** — at the s209 floors (5.68/4.72/3.26 + capture noise).

## 2. The audit findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F-210a | **The "AA edges" floor was a MISDIAGNOSIS**: hi-dpi zooms show both canvases render sharp 1-device-px transitions (the ref's hedge-top: lawn (139,198,135) → hedge (108,162,59) between dy70→72 at 2x). The 1x "softness" is the ref's *band geometry*, not anti-aliasing. The floor is re-scoped to band geometry. | Diagnosis | ✅ Re-scoped |
| F-210b | **The light band's bottom edge is a V** (the ref: descending y308@x1080 → apex y270@x~1178 → rising y307@x1260; the top edge follows the dome, apex y218@x1128). Ours: a flat bottom at y309-310 (the core polygon's `[0.75, 0.345]` foot) — the entire y270-308 wedge under the dome's right slope renders dark-band instead of light-core. | High (a ~28px-tall × 180px-wide band mismatch) | **Cure** (R1, TDD) |
| F-210c | **The descent's dark band is a vertical gradient** (the ref: (24,106,42) at y302 fading to (14,90,20) by y346; ours: flat (24,106,42) = EDGE_DARK_SOLID). Also its cap: the ref's wedge top at x1390 starts y286 with a light (35,117,52)→(24,106,42) cap at y286-301. | Medium (a tone-gradation band x1370-1440, y302-346) | **Cure** (R2, TDD) |
| F-210d | The G band (y314-369), the dark band (y279-312 flat), the white chip (x1142-1170 y368-375 — ours renders it at 48 vs the ref's 52 px, a 3px delta) all MATCH. | Verification | ✅ Confirmed |

## 3. The remediation record

- [x] R1 (F-210b, TDD): the core polygon's bottom edge re-cut as the V — the foot runs (1080,308) → (1178,270) → (1262,307) instead of the flat y310; the under-band (MASS_DEEP_SOLID) re-cut too: its TOP edge follows the same V (the two bands share the boundary — the ref's dark band is 7px thin where the light band is thick); its flat y312 bottom stays. The SUNLIT_RIM's diagonal stays (it rides the slope).
- [x] R2 (F-210c, TDD): the descent band re-cut as a vertical gradient — EDGE_DARK_SOLID at the top fading to the new EDGE_DARK_DEEP (14,90,20) at y346; the cap wedge ((35,117,52) family) added at the top x1370-1410, y286-301.
- [x] R3: the drift matrix re-measured: **booking 5.49 · landing 4.52** (both below the s209 floors and the targets); the V-zone dropped **40% → 10.5%**; faq 3.37 unchanged.
- [x] R4: the verification battery — lint 0/0 · tsc 0 · 139/2801 unit · build GREEN · smoke 14/14 · e2e 193/193 (the CI=1 fresh boot).
- [x] R5: the captures 56-58 + the docs lockstep (the worklog + the AGENTS section + this plan + the SKILL v1.215.0 + the pm-SKILL v1.7.0) + the push.

## 4. The residual ledger after this round

- The pre-existing floors stand: the settings picklist genus · the login logo genus · the CRM superset genera · the faq collapse artifact · the descent-top shimmer (F-209c) · the strip zone's interior dither at full growth (the s209 note).
