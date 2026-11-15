#!/usr/bin/env python3
"""Session-208: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-208 layer (the mid-distance + the horizon
diagonals + the corner gradient). The s207 layer is comment-demoted at
its ship counts 2801/193. The corpus counts HELD. Idempotent."""
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

# ── 1. the version + the H1: 1.212.0 -> 1.213.0 ─────────────────────
once("version: 1.212.0", "version: 1.213.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.212.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.213.0)")

# ── 2. the project_state head: the s208 layer live, the s207 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-207 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S208 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-208 layer "
    "(THE MID-DISTANCE + THE HORIZON DIAGONALS + THE CORNER GRADIENT — the post-207 audit round "
    "[the rotation trigger THE OWNER'S 9b7cd60: the session_10.md archive — the s207 transcript; THE "
    "SANDBOX RECYCLED: the fresh clone + the env rebuild + the census MATCH]; the baseline gate GREEN "
    "at the s207 ship state [lint 0/0 · tsc 0 · 139/2801]; THE REFERENCE STABLE [the pairs "
    "0.53/0.99/0.78 — no redesign; our drifts reproducing the s207 floors 7.32/5.21/3.80]; F-208a "
    "THE CONNECTOR ROW [the live-DOM decode: the ref's step-dots row is a flat gap-2 flex with TWO "
    "sibling w-8 h-0.5 connectors; ours nested a 48x1 connector inside each group — re-derived with "
    "the reduce-interleave]; F-208b THE SLIDER FILL [the ref's yard-slider fill + thumb border are "
    "the shadcn CHARCOAL rgb(23,23,23); ours painted brand green — cured to the literal #171717 "
    "(the ref's --primary is charcoal; OURS is #2563eb blue — the two stacks' primaries differ)]; "
    "F-208c BOTH HORIZON DIAGONALS [the round's head genus: the far-left corner holds sky to "
    "y278@x0 -> flat 231@x80+ AND the far-right descends (1370,235)->(1430,273) — page-shared; both "
    "landed as the HORIZON_DIAGONAL sky-polygon patches over the flat gradient]; F-208e THE "
    "RIGHT-SIDE FLOWERING BUSH [five polygons: the light-green body + the red-blossom patch + the "
    "dark core + the red-flowered foot + the brown patch]; F-208f THE MID-DISTANCE STRUCTURES "
    "[decoded by unmixing the booking card's white/85: the dark-green tree mass + the blue-gray "
    "structure behind the glass — they tint the ref's glass zones on booking + landing]; THE "
    "CORNER TWO-LAYER GRADIENT [decoded mid-round: the horizontal base (24,107)->(43,143) + the "
    "vertical darkening veil to (16,96); the flat EDGE_DARK_SOLID retired there; the "
    "polygonHGradient painter born]; THE TDD LOOP [RED first -> GREEN; 6 measurement iterations; "
    "the duplicate-corner overwrite caught — the paint-order discipline]; THE MEASURE: booking "
    "7.32 -> 5.60 · landing 5.21 -> 4.82 · faq 3.80 -> 3.26 [1440 — every page at its best-ever "
    "floor, all comfortably inside the standing drift gates 16/12.5/9]; THE CORPUS HELD [lint 0/0 · "
    "tsc 0 · 139/2801 unit · build · smoke 14/14 · e2e 193/193]; the captures 50-52 + the docs "
    "lockstep [this head + the pm-SKILL v1.5.0 canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-207 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-207 layer",
    1,
)

new_head = S208 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.213.0, the s208 layer live at 2801/193")
