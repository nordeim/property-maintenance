#!/usr/bin/env python3
"""Session-223 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.223.0 -> v1.224.0 · the s223 layer LIVE at the head (2867/193 — the
+4-pin round: 147 suites) · the s222 head layer demoted to beneath-it at
its own ship counts (2863/193) · the Appendix B totals (146/2863 ->
147/2867) · the wall-clock phrase · the §11 gate block.

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
must_replace("version: 1.223.0", "version: 1.224.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.223.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.224.0)",
    "the H1 version",
)

# 2. last_updated rides the round
must_replace("last_updated: 2026-11-17", "last_updated: 2026-11-17", "the last_updated date")

# 3. the head surgery: prepend the s223 layer, demote the s222 head line
#    — LINE-BOUNDED, the marker stripped in-script (the F-218b doctrine).
S223_LAYER = (
    "project_state: 2867 unit checks + 193 e2e checks green; the session-223 layer "
    "(THE PICOMATCH ADVISORY ROUND — THE THIRD CENSUS DRIFT, its rotation trigger "
    "the owner's 839b705 [the session_36.md archive — the s222 execution record]); "
    "the round began on the fresh tree — the environment rebuilt [.env at the "
    "six-knob contract · db:push + db:seed · census MATCH] — and the baseline gate "
    "ran FULL GREEN: lint 0/0 · tsc 0 · 146/2863 unit · build · smoke 14/14 · "
    "e2e 193/193 [6.1m, CI=1 fresh boot] · probe:ref STABLE [bundle ee166dd5] · "
    "db census MATCH; THE LIVE PARITY BATTERY: the mobile-nav menu-OPEN state "
    "walked at 390x844 on BOTH apps — byte-identical geometry {70,0,320,844} · "
    "the white sheet · the 1px border-l · z-50 · the same 8 links with the same "
    "hrefs · Esc-close with zero lock residue [ours the named-trigger + "
    "focus-return supersets] — NO Tailwind v4 bug [the compiled stylesheet "
    "carries the brand tokens, the cursor:pointer base rule, 4 oklch "
    "occurrences only] + the SEO family live [the 16-URL sitemap at bare "
    "application/xml · robots · manifest · the OG head + per-route canonical]; "
    "the audit [the web-application skill §12/§16/§18 dimensions] verified the "
    "s222 cures all in place + every security seam at line level [the Zod "
    "boundary — both z.array sites capped — · force-dynamic · zero "
    "dangerouslySetInnerHTML · the single PrismaClient · the db-path seam]; "
    "THE ROUND'S MATERIAL — F-225a THE THIRD CENSUS DRIFT 10 -> 11 {5h/5m/1l}: "
    "the NEW high GHSA-fc5q-39xc-vjpf on picomatch <=4.0.7 [CVE-2026-112366, "
    "ReDoS via single-branch repeated extglob patterns, CVSS 8.7] riding the "
    "DEV-TOOLCHAIN chains only [vitest›picomatch@4.0.7 direct · "
    "vite›picomatch@4.0.7 · tinyglobby/fdir · micromatch›picomatch@2.3.1] — "
    "zero runtime exposure [structurally verified against bun.lock: no runtime "
    "dependency's chain lists picomatch or any of its five dev-toolchain "
    "consumers] and NO CURE EXISTS [no patched picomatch release upstream — "
    "the micromatch/picomatch#194 PR unreleased; the s221 vite-family "
    "no-cure genus, the no-mid-rotation-toolchain-bump posture holds]; the "
    "same round re-decoded the zod advisory GHSA-mrhx-c7xc-m3w5 [the "
    "vulnerable 4.6.5 is eslint-plugin-react-hooks' transitive — the ROOT "
    "zod resolves 4.6.7, past the 4.6.6 fix, and both z.array sites carry "
    "explicit .max caps: the unconstrained-array attack requirement is not "
    "met in this tree]; THE CURES TDD [tests/session-223-audit.test.ts the "
    "147th suite — 4 pins RED-first at birth + 2 green guards]: the PAD §10 "
    "ledger row re-anchored at the live census [11: 5h/5m/1l + the "
    "RE-TRIAGED session-223 clause + the no-fix caveat] · the AGENTS "
    "gate-order tail · the STRUCTURAL dormancy pin [the lockfile closure, "
    "offline-safe] · the runtime-zod pin [root 4.6.7 >= 4.6.6 + the capped "
    "forms]; THE COUNT LADDER 2863 -> 2867 (+4: the s223 pins) · SUITES "
    "146 -> 147 · badge 3056 -> 3060; the verification battery on the cured "
    "tree: lint 0/0 · tsc 0 · 147/2867 · build · smoke 14/14 · e2e 193/193 "
    "· the drift battery EXIT:0"
)
if "the session-223 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2863 unit checks + 193 e2e checks green; the session-222 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S223_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s222 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 4. Appendix B totals row + wall-clock phrase + §11 gate block
must_replace(
    "| **unit total** | 146 files | **2863** |",
    "| **unit total** | 147 files | **2867** |",
    "the Appendix B unit-total row",
)
must_replace(
    "~21 s (146 suites, one worker per file)",
    "~21 s (147 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)
must_replace(
    "bun run test         # 2863/2863",
    "bun run test         # 2867/2867",
    "the §11 gate block (the unit count)",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S223_LAYER)} chars of s223 layer")
