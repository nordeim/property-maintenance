#!/usr/bin/env python3
"""Session-207: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-207 layer (the fine shapes + the right underlayer
+ the phantom retirement). The s206 layer is comment-demoted at its
ship counts 2801/193. The corpus counts HELD. Idempotent."""
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

# ── 1. the version + the H1: 1.211.0 -> 1.212.0 ─────────────────────
once("version: 1.211.0", "version: 1.212.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.211.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.212.0)")

# ── 2. the project_state head: the s207 layer live, the s206 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-206 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S207 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-207 layer "
    "(THE FINE SHAPES + THE RIGHT UNDERLAYER + THE PHANTOM RETIREMENT — the post-206 audit round "
    "[the rotation trigger THE OWNER'S ae49559: the session_9.md archive — the s206 transcript]; "
    "the environment PERSISTED · the baseline gate GREEN at the s206 ship state [lint 0/0 · tsc 0 · "
    "139/2801]; THE REFERENCE STABLE [the booking pair 0.54% — no redesign; our drifts holding at "
    "the s206 floors 8.72/6.62/4.20]; F-207a THE DEAD-CODE RETIREMENT [the five s201-era constants "
    "orphaned by the s206 solid re-derivation — MASS · MASS_DEEP · BUSH_LEFT · SOIL_GREEN · "
    "EDGE_GREEN — retired + their three tone pins re-anchored to the live carriers]; F-207b THE "
    "HEDGE'S CONVEX GRADIENT [the ref holds (49,160,72) FLAT to y~722 then declines convexly "
    "through (41,141,60)@y754 to (15,95,26)@y788 — the multi-stop polygonGradient() painter born; "
    "the flat fill + the hard under-band retired; the right slope widened; the rounded-top soil "
    "patch (96,71,40)]; F-207c THE RIGHT SIDE'S UNDERLAYER [a whole genus ours lacked: the "
    "gray-green G band (x1080-1255, y314-370, (173,174,129)) + the teal patches (130,166,153) + "
    "the stable BLUE slab (30,54,89) at (1143-1173, y334-370) with its light bottom cap "
    "(237,234,224) — all PAGE-SHARED; the mass's SUNLIT RIM (108,162,59) landed; the DEEP band "
    "re-confined below y~279; the descent's lower anatomy decoded (the wide band to y355 + the "
    "lobe + the brown tip)]; THE PHANTOM-BLOB GENUS [the round's best catch: the two BUSH_RIGHT "
    "blobs ((1420,297) + (1404,400)) were s201-era MISREADS — the ref paints pure lawn at their "
    "zones (verified by the light-green family scan); the (1404,400) fade was LIGHTENING the "
    "descent's lower section (a 63.8% diff zone) — both + the constant + the tone pin retired; "
    "the zone collapsed 63.8 -> 23.9]; THE TDD LOOP [RED pin first -> the cures -> GREEN; 7 "
    "measurement iterations; the stale-compile hazard caught + the warm-request discipline]; THE "
    "MEASURE: booking 8.72 -> 7.18 · landing 6.62 -> 5.08 · faq 4.20 -> 3.74 [1440 — every page "
    "at its best-ever floor, all comfortably inside the standing drift gates 16/12.5/9]; THE "
    "CORPUS HELD [lint 0/0 · tsc 0 · 139/2801 unit · build · smoke 14/14 · e2e 193/193]; the "
    "captures 47-49 + the docs lockstep [this head + the pm-SKILL v1.4.0 canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-206 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-206 layer",
    1,
)

new_head = S207 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.212.0, the s207 layer live at 2801/193")
