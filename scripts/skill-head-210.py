#!/usr/bin/env python3
"""Session-210: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-210 layer (the V-bottom edge + the descent
gradient). The s209 layer is comment-demoted at its ship counts
2801/193. The corpus counts HELD. Idempotent."""
from pathlib import Path

R = Path("/home/z/my-project/property-maintenance")
p = R / "neo-crm_SKILL.md"
s = p.read_text()
orig = s

def once(old, new):
    global s
    n = s.count(old)
    assert n == 1, f"{n}x {old[:70]!r}"
    s = s.replace(old, new, 1)
    print(f"  walked: {old[:56]!r}")

# ── 1. the version + the H1: 1.214.0 -> 1.215.0 ─────────────────────
once("version: 1.214.0", "version: 1.215.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.214.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.215.0)")

# ── 2. the project_state head: the s210 layer live, the s209 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-209 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S210 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-210 layer "
    "(THE V-BOTTOM EDGE + THE DESCENT GRADIENT — the 'AA edges' residual floor RE-DIAGNOSED as "
    "band geometry and retired; the rotation trigger THE OWNER'S 8f71b6c: the session_12.md archive "
    "— the s209 transcript; THE ENV REBUILT [census MATCH + the chromium v1248 reinstall]; the "
    "baseline gate GREEN at the s209 ship state [lint 0/0 · tsc 0 · 139/2801]; THE HI-DPI RE-AUDIT "
    "[deviceScaleFactor 2 zooms at the hedge boundary + the G band edge + the left hedge — BOTH "
    "canvases render sharp 1-device-px transitions; both 1440x900 @ dpr 1, no internal 2x render; "
    "the 1x 'softness' was the ref's BAND GEOMETRY, not anti-aliasing]; F-210b THE V-BOTTOM EDGE "
    "[the light band's bottom edge is a V: descending y308@x1080 -> apex y270@x~1178 -> rising "
    "y307@x1260, the top edge following the dome apex y218@x1128; ours was a flat y310 foot — the "
    "cure: the core polygon's bottom re-cut as the V AND the deep band's top edge follows the SAME "
    "shared-V boundary; the V-zone drift 40% -> 10.5%]; F-210c THE DESCENT GRADIENT [the ref's "
    "right-edge descent is a vertical gradient (24,106,42)@y302 -> (14,90,20)@y346 + its LIGHT CAP "
    "(35,117,52) on the wedge's top y286-301; ours was flat — the cure: a createLinearGradient fill "
    "(EDGE_DARK_SOLID -> the new EDGE_DARK_DEEP) + the DESCENT_CAP polygon]; F-210d VERIFIED "
    "MATCHING [the G band y314-369 · the dark band's flat y312 bottom · the white chip x1142-1170 "
    "y368-375 at 48 vs the ref's 52 px]; THE MEASURE: the standing drift booking 5.49 · landing "
    "4.52 [BOTH below the s209 floors 5.68/4.72] · faq 3.37 unchanged; THE CORPUS HELD [lint 0/0 · "
    "tsc 0 · 139/2801 unit · build · smoke 14/14 · e2e 193/193 — the CI=1 fresh boot]; the captures "
    "56-58 + the docs lockstep [this head + the pm-SKILL v1.7.0 canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-209 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-209 layer",
    1,
)

new_head = S210 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.215.0, the s210 layer live at 2801/193")
