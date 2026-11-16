#!/usr/bin/env python3
"""Session-211: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-211 layer (the concave descent-top + the mobile
scene divergence). The s210 layer is comment-demoted beneath it. The
corpus counts HELD (2801/193). Idempotent."""
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

# ── 1. the version + the H1: 1.215.0 -> 1.216.0 ─────────────────────
once("version: 1.215.0", "version: 1.216.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.215.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.216.0)")

# ── 2. the project_state head: the s211 layer live, the s210 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-210 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S211 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-211 layer "
    "(THE CONCAVE DESCENT-TOP + THE MOBILE SCENE DIVERGENCE — the s210 cap-wedge RE-DIAGNOSED as a "
    "misread and retired [the 8-frame-averaged hi-dpi decode: the ref's descent-top is a smooth "
    "CONCAVE ARC (1370,306)->(1386,288)->(1402,280)->(1430,280); the mean edge now matches ±2px] "
    "+ the F-209c shimmer finally decoded as a ±1.2px TRAVELING WAVE [the animation floor] + THE "
    "MAIDEN 390 CANVAS DECODE [the ref's mobile scene is a DIFFERENT COMPOSITION, not a scaled "
    "desktop: it omits the right-edge descent family + the corner-mass family + both horizon "
    "diagonals, and carries its own MOBILE MINI-DESCENT (x374-390, y256-310, gradient "
    "(41,136,61)->(15,95,26)) + the left tree as a slim dark SLIVER (x0-14, y230-330)] — the cure: "
    "the desktop families gated w>=1024 + the mobile elements painted fraction-mapped "
    "[tone-for-tone verified] + the crown's CROWN_GRAD downward gradient + the widened trunk "
    "[x54-78, y334-363] + the mobile nav re-verified [the 390 menu-OPEN parity 3.60%, byte-matching "
    "links]; the rotation trigger THE OWNER'S d07d9a1: the session_13.md archive; the env REBUILT "
    "[sandbox recycled — census MATCH + the chromium v1248 reinstall + paramiko]; THE MEASURE: the "
    "desktop drift booking 5.38 · landing 4.44 · faq 3.28 [all at/below the s210 floors] + the 390 "
    "booking closed 13.92 -> 12.90 [the footer +16px cascade F-211e deferred]; THE CORPUS HELD "
    "[lint 0/0 · tsc 0 · 139/2801 unit · build · smoke 14/14 · e2e 193/193 — the CI=1 fresh boot]; "
    "the captures 59-61 + the docs lockstep [this head + the pm-SKILL v1.8.0 canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-210 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-210 layer",
    1,
)

new_head = S211 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.216.0, the s211 layer live at 2801/193")
