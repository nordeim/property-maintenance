#!/usr/bin/env python3
"""Session-222 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.222.0 -> v1.223.0 · the s222 layer LIVE at the head (2863/193 — the
+4-pin round: 146 suites) · the s221 head layer demoted to beneath-it at
its own ship counts (2859/193) · the Appendix B totals (145/2859 ->
146/2863) · the wall-clock phrase · the §11 gate block.

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
must_replace("version: 1.222.0", "version: 1.223.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.222.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.223.0)",
    "the H1 version",
)

# 2. last_updated rides the round
must_replace("last_updated: 2026-11-17", "last_updated: 2026-11-17", "the last_updated date")

# 3. the head surgery: prepend the s222 layer, demote the s221 head line
#    — LINE-BOUNDED, the marker stripped in-script (the F-218b doctrine).
S222_LAYER = (
    "project_state: 2863 unit checks + 193 e2e checks green; the session-222 layer "
    "(THE EADDRINUSE ROW ROUND — the owner's second fresh-clone report, its rotation "
    "trigger the owner's 0cfe160 [the session_34.md archive — the s221 execution "
    "record — + the updated docs/start_server_error.txt]); the owner's machine "
    "re-ran the full setup GREEN: bun install picked up next@16.4.6 [the s221 cure "
    "riding through their checkout], db:push + db:seed pristine, and next build "
    "compiled clean in 28.2s [the TS2307 genus resolved on their side — their "
    "checkout was refreshed]; the standalone server booted Ready after one "
    "EADDRINUSE retry ['Is port 3000 in use?' — a lingering :3000 process from "
    "the earlier session held the port]; the s222 baseline on the fresh clone: "
    "lint 0/0 · tsc 0 · 145/2859 unit · build · smoke 14/14 · e2e 193/193 "
    "[6.1m] · probe:ref STABLE [bundle ee166dd5] · the drift battery [sweep "
    "desktop + phone · fullpage · interior census] EXIT:0 · the mobile-nav "
    "drawer battery [panel 288px @ x0 · 8 links · no Tailwind v4 bug]; the "
    "audit [the web-application skill §12/§16/§18 dimensions] verified the "
    "s221 cures all in place [nine: the 16.4.6 lockfile pin · the audit census "
    "10 {4h/5m/1l} · the PAD §10 clause · the AGENTS tail · the docs-counts "
    "pin · the README TS2307 row · the pm-SKILL v1.17.0 entry · the neo-crm "
    "v1.222.0 head · the 16.4.6 version carriers] + every security seam clean; "
    "TWO findings, both at the operator-facing low end: F-224a the owner's "
    "live EADDRINUSE names a genus the README Troubleshooting table did not "
    "cover [a lingering process holding :3000] · F-224b the db/ scratch family "
    "accumulates [gitignored — Info, no cure owed]; THE CURES TDD "
    "[tests/session-222-audit.test.ts the 146th suite — 4 pins, 2 RED-first at "
    "birth]: the README EADDRINUSE troubleshooting row [the symptom in the "
    "operator's exact phrasing + the cause + the lsof/kill-port fix] · the "
    "session record; THE COUNT LADDER 2859 -> 2863 (+4: the s222 pins) · "
    "SUITES 145 -> 146 · badge 3052 -> 3056; the verification battery on the "
    "cured tree: lint 0/0 · tsc 0 · 146/2863 · build · smoke 14/14 · e2e "
    "193/193 · the drift battery EXIT:0"
)
if "the session-222 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2859 unit checks + 193 e2e checks green; the session-221 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S222_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s221 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 4. Appendix B totals row + wall-clock phrase + §11 gate block
must_replace(
    "| **unit total** | 145 files | **2859** |",
    "| **unit total** | 146 files | **2863** |",
    "the Appendix B unit-total row",
)
must_replace(
    "~21 s (145 suites, one worker per file)",
    "~21 s (146 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)
must_replace(
    "bun run test         # 2859/2859",
    "bun run test         # 2863/2863",
    "the §11 gate block (the unit count)",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S222_LAYER)} chars of s222 layer")
