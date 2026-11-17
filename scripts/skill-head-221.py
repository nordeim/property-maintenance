#!/usr/bin/env python3
"""Session-221 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.221.0 -> v1.222.0 · the s221 layer LIVE at the head (2859/193 — the
+6-pin round: 145 suites) · the s220 head layer demoted to beneath-it at
its own ship counts (2853/193) · the Appendix B totals (144/2853 ->
145/2859) · the wall-clock phrase · the §11 gate block.

The demotion is LINE-BOUNDED and marker-stripping IN THE SCRIPT (the
F-218b doctrine) — the script's replay == the shipped artifact. Assert-
first: every anchor must exist exactly once or the script refuses.
"""
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SKILL = REPO / "neo-crm_SKILL.md"

src = SKILL.read_text(encoding="utf-8")
n_flips = 0


def must_replace(old: str, new: str, desc: str) -> None:
    global src, n_flips
    if old == new:
        return
    if new in src and old not in src:
        print(f"NOOP  {desc} (already re-anchored)")
        return
    if old not in src:
        print(f"MISS  {desc} — anchor not found: {old[:70]!r}")
        sys.exit(1)
    if src.count(old) != 1:
        print(f"AMBIG {desc} — {src.count(old)} matches")
        sys.exit(1)
    src = src.replace(old, new)
    n_flips += 1
    print(f"FLIP  {desc}")


# 1. the version pair (frontmatter + H1)
must_replace("version: 1.221.0", "version: 1.222.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.221.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.222.0)",
    "the H1 version",
)

# 2. last_updated rides the round
must_replace("last_updated: 2026-11-17", "last_updated: 2026-11-17", "the last_updated date")

# 3. the head surgery: prepend the s221 layer, demote the s220 head line
#    — LINE-BOUNDED, the marker stripped in-script (the F-218b doctrine).
S221_LAYER = (
    "project_state: 2859 unit checks + 193 e2e checks green; the session-221 layer "
    "(THE AUDIT-CENSUS TRUTH ROUND — the owner's fresh-clone report + the advisory "
    "drift, its rotation trigger the owner's f758fb0 [the session_32.md archive + "
    "docs/start_server_error.txt — the fresh-clone build report]); the round began "
    "with the mandated fresh `git clone` — the exact environment the owner's report "
    "describes — and the baseline gate ran FULL GREEN on the pristine tree: lint 0/0 "
    "· tsc 0 · 144/2853 unit · build ✓ [the owner's TS2307 'Cannot find module "
    "./tests/e2e/e2e-port' NOT reproducible — both files tracked + present + "
    "un-ignored; two consecutive clean builds; a stale/partial-checkout genus on "
    "the operator side, cured as the README troubleshooting row] · smoke 14/14 · "
    "e2e 193/193 [6.0m] · probe:ref STABLE [bundle ee166dd5] · the drift battery "
    "[sweep desktop + phone, fullpage, interior census] EXIT:0 · the mobile-nav walk "
    "at 390 byte-MATCH [sheet x=71, the standing {70,0,320,844} record · 8 links · "
    "Esc-close + focus-return — no Tailwind v4 bug]; the audit (the web-application "
    "skill §12/§16/§18 dimensions) verified every security seam at line level [the "
    "boot gate · the Zod boundary [23 route files] · the bounded reader · the "
    "rate-limit family · the single PrismaClient · force-dynamic discipline · "
    "useShallow · zero dangerouslySetInnerHTML] + the sitemap/robots/manifest/OG "
    "family live; ONE actionable genus: the `bun audit` census drifted 10 -> 11 — "
    "F-223a the NEW moderate GHSA-mfr8-8qww-v76h on next@16.4.2 [the FIRST advisory "
    "on a direct RUNTIME dependency — the framework itself; DORMANT in our tree: "
    "zero unstable_cache/'use cache' call sites] with a same-minor patch cure "
    "available · F-223b the vite family grew 1 -> 3 [2 NEW moderates via "
    "vitest›@vitest/mocker›vite, dev-toolchain, zero runtime exposure] · F-223c the "
    "owner's TS2307 [not reproducible — documented]; THE CURES TDD "
    "[tests/session-221-audit.test.ts the 145th suite — 6 pins RED-first at birth]: "
    "the next patch bump 16.4.2 -> 16.4.6 [bun update next@16.4.6 — a PATCH-level "
    "bump inside the satisfied caret range, the s176 recharts precedent, NOT the "
    "toolchain-major the no-mid-rotation posture reserves against] retiring the "
    "only runtime-direct advisory · the PAD §10 ledger row + the AGENTS gate-order "
    "note + the docs-counts D-198a2 pin re-anchored at the post-cure census [10: "
    "4h/5m/1l — the next advisory RETIRED, the 2 new vite moderates absorbed] · "
    "the README troubleshooting row for the TS2307 stale-checkout genus · the "
    "README badge + the PAD stack table + the neo-crm §2 Framework row flipped to "
    "the live 16.4.6 [the facts-census lockstep]; THE COUNT LADDER 2853 -> 2859 "
    "(+6: the s221 pins) · SUITES 144 -> 145 · badge 3046 -> 3052; the verification "
    "battery on the cured tree: lint 0/0 · tsc 0 · 145/2859 · build · smoke 14/14 · "
    "e2e 193/193 [6.1m] · bun audit post-cure 10 [4h/5m/1l] · the drift battery "
    "re-run EXIT:0 [a runtime dependency changed]"
)
if "the session-221 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2853 unit checks + 193 e2e checks green; the session-220 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S221_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s220 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 4. Appendix B totals row + wall-clock phrase + §11 gate block
must_replace(
    "| **unit total** | 144 files | **2853** |",
    "| **unit total** | 145 files | **2859** |",
    "the Appendix B unit-total row",
)
must_replace(
    "~21 s (144 suites, one worker per file)",
    "~21 s (145 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)
must_replace(
    "bun run test         # 2853/2853",
    "bun run test         # 2859/2859",
    "the §11 gate block (the unit count)",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S221_LAYER)} chars of s221 layer")
