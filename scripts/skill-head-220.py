#!/usr/bin/env python3
"""Session-220 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.220.0 -> v1.221.0 · the s220 layer LIVE at the head (2853/193 — the
+10-pin round: 144 suites) · the s219 head layer demoted to beneath-it at
its own ship counts (2843/193) · the Appendix B totals (143/2843 ->
144/2853) · the wall-clock phrase · the §11 gate block.

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
must_replace("version: 1.220.0", "version: 1.221.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.220.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.221.0)",
    "the H1 version",
)

# 2. last_updated rides the round
must_replace("last_updated: 2026-11-17", "last_updated: 2026-11-17", "the last_updated date")

# 3. the head surgery: prepend the s220 layer, demote the s219 head line
#    — LINE-BOUNDED, the marker stripped in-script (the F-218b doctrine).
S220_LAYER = (
    "project_state: 2853 unit checks + 193 e2e checks green; the session-220 layer "
    "(THE SHIP-TIME TRUTH DEBT + THE HISTORY-ENTRY DEBT REBORN — the standing audit "
    "rotation, its rotation trigger the owner's fa3c4e2 [the session_30.md archive, "
    "the s219 execution record]); the s219 deferrals CLOSED at the s220 baseline: the "
    "e2e finished 193/193 (6.3m — the log survived the recycle; it completed minutes "
    "after the s219 push) + the full drift-gate battery ran clean (4 bands + fullpage "
    "+ interior census, byte-parity zero margin) — the shipped 09924dd tree fully "
    "verified; the baseline gate GREEN (lint 0/0 · tsc 0 · 143/2843) · probe:ref "
    "STABLE [bundle ee166dd5] · the mobile-nav walk at 390 byte-MATCH [geometry "
    "{70,0,320,844} · 8 links · enter/0.5s — no Tailwind v4 bug]; the audit (the "
    "web-application skill dimensions over the 09924dd collateral) found eleven "
    "findings, none Critical: F-222a the pm-SKILL v1.15.0 bump shipped without its "
    "own Session-219 history entry [the F-221a genus reborn inside the F-221a cure "
    "session — the entry landed at the head of the §10 family] · F-222b/c THE "
    "SHIP-TIME TRUTH DEBT: the worklog Task-219 Stage Summary + session_29.md's "
    "battery paragraph claimed 'e2e 193/193' and 'the drift-gate battery' as "
    "ship-time gates that had NOT finished at push time [the e2e completed ~6 min "
    "after; the drift battery never ran in the s219 window — the doc-truth genus "
    "this project polices, asserted in its own records; both records now tell the "
    "honest post-ship form] · F-222d the 'all six doc faces' negatives-ladder "
    "misdescription shipped in three records [the block walks the four doc faces "
    "the s217 block walks: README ×3, PAD ×3, CLAUDE ×4, AGENTS ×1; the pm-SKILL "
    "face rides the F-201b positive lockstep and the neo-crm face keeps its "
    "demoted layer's ship counts by design] · F-222e the F-221h reverse-arm regex "
    "digit-blind [it silently exempted E2E_PORT, the one knob falsifying the "
    "'every documented knob is consumed' claim — now digit-aware with the honest "
    "tests-only carve-out] · F-222f the F-221b/F-221g pins co-location blind "
    "[whole-file normalization defeated the block-scoping their comments claimed "
    "— both upgraded to true BLOCK SLICES] · F-222g the worklog severity tally "
    "contradicted the round's own table [3 Medium, 3 Low, 2 Info — trued] · "
    "F-222h the F-221a description mislocated the s213/s214 entries [they live "
    "in §7, only 215/217/216 in §10 — trued at the live sites] · F-222i the "
    "pm-SKILL last_updated not ridden through the v1.15.0 bump [trued to "
    "2026-11-17]; dispositioned no-cure: F-222j [the s212-214 layer gap — "
    "pre-existing, documented in skill-head-215.py]; THE CURES TDD "
    "[tests/session-220-audit.test.ts the 144th suite — 10 pins RED-first at "
    "birth]; THE COUNT LADDER 2843 -> 2853 (+10: the s220 pins) · SUITES 143 -> "
    "144 · badge 3036 -> 3046; probe:ref STABLE [bundle ee166dd5] · the "
    "mobile-nav walk at 390 byte-MATCH"
)
if "the session-220 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2843 unit checks + 193 e2e checks green; the session-219 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S220_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s219 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 4. Appendix B totals row + wall-clock phrase + §11 gate block
must_replace(
    "| **unit total** | 143 files | **2843** |",
    "| **unit total** | 144 files | **2853** |",
    "the Appendix B unit-total row",
)
must_replace(
    "~21 s (143 suites, one worker per file)",
    "~21 s (144 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)
must_replace(
    "bun run test         # 2843/2843",
    "bun run test         # 2853/2853",
    "the §11 gate block (the unit count)",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S220_LAYER)} chars of s220 layer")
