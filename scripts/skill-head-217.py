#!/usr/bin/env python3
"""Session-217 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.218.0 -> v1.219.0 · the s217 layer LIVE at the head (2826/193 — the
+4-pin round: 141 suites) · the s216 head layer demoted to beneath-it
at its own ship counts · the Appendix B totals (140/2822 ->
141/2826) · the wall-clock phrase · the §11 gate block · the layer-axis
test re-anchor rides its own edit.

The demotion is LINE-BOUNDED and marker-stripping IN THE SCRIPT (the
F-218b repair) — the script's replay == the shipped artifact.
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
must_replace("version: 1.218.0", "version: 1.219.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.218.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.219.0)",
    "the H1 version",
)

# 2. the head surgery: prepend the s217 layer, demote the s216 head
# line — LINE-BOUNDED, the marker stripped in-script (the F-218b repair).
HEAD_MARKER = "project_state: "
S217_LAYER = (
    "project_state: 2826 unit checks + 193 e2e checks green; the session-217 layer "
    "(THE DOC-TRUTH STRAGGLERS + THE HEAD-SCRIPT REPRODUCIBILITY DEBT — the standing "
    "audit rotation, its rotation trigger the owner's a0ee91f [the session_24.md "
    "archive, the s216 execution record]; the baseline gate GREEN at the exact s216 "
    "ship state [lint 0/0 · tsc 0 · 140/2822 · db census MATCH] + probe:ref STABLE "
    "[bundle ee166dd5] + the mobile-nav walk at 390 re-verified live [geometry "
    "{70,0,320,844} byte-MATCH · 8-link vocabulary · animation enter/0.5s — no "
    "Tailwind v4 bug]); the audit found three findings on the 32c3ea7 collateral "
    "(none Critical/High — the s216 cures verified still in place: the containment "
    "pins robust on the live sources, the placement anchors real and ordered, the "
    "shipped head surgery artifact-free): F-218a a live-tense '139 suites' bullet "
    "inside the pm-SKILL's own §7 test-corpus section (born at s215, survived the "
    "s216 stale-narration round; the root cause a PIN GAP — the pm-SKILL lockstep "
    "family pinned the heading, never the bullet beneath it) · F-218b the "
    "skill-head-216.py splice demoted the prior head WITH its project_state marker "
    "still attached — the shipped demoted line was marker-less only because an "
    "unrecorded manual strip step ran after the script (the committed script was "
    "NOT the record of the committed artifact; a from-scratch replay would plant "
    "the stray-marker genus and fail the layer-axis pin; the latent twin "
    "skill-head-215.py carried the identical form) · F-218c the stale numeric "
    "narration ('13+ call sites' vs the real 9; 'the auth family's 7 routes' vs "
    "the real 6); THE CURES [F-218a the bullet trued to 141 suites + THE PIN "
    "(the pm-SKILL lockstep family gains the §7-Unit-bullet pin — the pin-gap "
    "closure, RED-first at birth) · F-218b THE LINE-BOUNDED SPLICE REPAIR (both "
    "head-surgery scripts demote the prior head LINE's own extent with the marker "
    "stripped IN THE SCRIPT; THE REPLAY TEETH-PROOF: tests/session-217-audit.test.ts "
    "runs the script's arithmetic against git history (32c3ea7 — the s216 ship state, "
    "where the demoted head line lives) and asserts the "
    "produced demoted line == the shipped line BYTE-FOR-BYTE — the script is now "
    "the record of the artifact; MUTATION-PROVEN: the old unbounded splice "
    "re-planted makes the pin RED exactly at the replay face) · F-218c the census "
    "trued at all four sites]; THE COUNT LADDER 2822 -> 2826 (+4: the F-218 pins "
    "in tests/session-217-audit.test.ts, the 141st suite) · SUITES 140 -> 141 · "
    "badge 3015 -> 3019 — every live-tense site re-anchored (count-ladder-217.py, "
    "assert-first, both-states idempotent; the README commands-comment + the SKILL "
    "Appendix B + the wall-clock phrase + the §11 gate block walked in the same "
    "round) + the retired 2822/140/3015 forms join the negatives ladder (the "
    "s192/F-218 doctrine); THE VERIFICATION: lint 0/0 · tsc 0 · 141/2826 unit · "
    "build · smoke 14/14 · e2e 193/193 · the drift-gate battery + captures 72; "
    "the PAD §11 rate-limit row re-anchored 133 -> 135 (the F-218c census comment)"
)
if "the session-217 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2822 unit checks + 193 e2e checks green; the session-216 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S217_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s216 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 3. Appendix B wall-clock prose (already walked by the ladder — this
# script's NOOP guard verifies)
must_replace(
    "~21 s (140 suites, one worker per file)",
    "~21 s (141 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)

# 4. session-218 (F-220d): the two re-anchors that rode unrecorded
# manual steps in the s217 round — recorded in-script now so the
# script's replay == the shipped artifact at EVERY site it touched
# (the F-218b genus closed inside the F-218b cure session).
must_replace(
    "bun run test         # 2822/2822",
    "bun run test         # 2826/2826",
    "the §11 gate block (the unit count)",
)
must_replace(
    "| **unit total** | 140 files | **2822** |",
    "| **unit total** | 141 files | **2826** |",
    "the Appendix B unit-total row",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S217_LAYER)} chars of s217 layer")
