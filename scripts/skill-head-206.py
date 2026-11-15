#!/usr/bin/env python3
"""Session-206: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-206 layer (the terracotta mass + the sharp horizon
+ the solid foliage). The s205 layer is comment-demoted at its ship
counts 2801/193. The corpus counts HELD (the F-201e pin extended, no
new checks). Idempotent."""
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
    print(f"  walked: {old[:64]!r}")

# ── 1. the version + the H1: 1.210.0 -> 1.211.0 ─────────────────────
once("version: 1.210.0", "version: 1.211.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.210.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.211.0)")

# ── 2. the project_state head: the s206 layer live, the s205 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-205 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S206 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-206 layer "
    "(THE TERRACOTTA MASS + THE SHARP HORIZON + THE SOLID FOLIAGE — the post-205 audit round "
    "[the rotation trigger THE OWNER'S 610f565: the session_8.md archive — the s205 transcript]; "
    "the environment PERSISTED · the baseline gate GREEN at the s205 ship state [lint 0/0 · tsc 0 · "
    "139/2801]; THE REFERENCE RE-CAPTURE [STABLE since s204: the booking stability pair 0.73% — "
    "no new redesign; our pages at the standing floors]; F-204d RETIRED — THE TERRACOTTA WEDGE "
    "decoded fresh at fine granularity [the cap (286,230)->(311,222)->(340,231), the right edge "
    "under the booking's glass at x~359, the left slope to the toe (172,310); THREE tones — the "
    "(214,81,55) core hull, the (153,60,35) bottom-left shade, the (190,73,50) slope lining] + "
    "the SOLID gray-green underlayer band + the dark bush at its foot [PAGE-SHARED but "
    "content-covered on faq/landing — verified terracotta=0 there, the shared painter cannot "
    "hurt their floors]; the s204 quick-attempt failure ROOT-CAUSED [a radial blob's soft edges "
    "blur through the glass — the wedge is a filled POLYGON path]; F-206c THE HORIZON SHARPNESS "
    "[the ref's sky->lawn edge is 1px at y231 vs our 27px blend — the stops tightened "
    "0.257/0.262]; F-206e THE SOLID-FOLIAGE GENUS [the round's biggest find: the ref's foliage "
    "structures are CRISP SOLID SHAPES, not radial fades — the right mass a flat (95,143,51) "
    "dome, the left tree an oval crown + brown trunk, the left hedge a DOME, the corner masses "
    "with inner bulges; our blobs washed every edge — ref (95,143,51) vs our faded (133,190,129); "
    "THE polygon() PAINTER BORN + five structures re-derived as solids; the hedge-clump texture "
    "experiment REVERTED (it made both pages worse — the honest record)]; THE TDD LOOP [RED pin "
    "first -> the cure -> GREEN; 7 measurement iterations against the boundary traces]; THE "
    "MEASURE: booking 12.33 -> 8.86 · faq 5.36 -> 4.21 · landing 9.14 -> 6.66 [1440 — all at or "
    "below HALF the standing floors 16/9/12.5, the drift gates comfortably green]; THE CORPUS "
    "HELD [lint 0/0 · tsc 0 · 139/2801 unit — the F-201e pin extended, no new checks · build · "
    "smoke 14/14 · e2e 193/193]; the captures 44-46 + the docs lockstep [this head + the pm-SKILL "
    "v1.3.0 canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-205 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-205 layer",
    1,
)

new_head = S206 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.211.0, the s206 layer live at 2801/193")
