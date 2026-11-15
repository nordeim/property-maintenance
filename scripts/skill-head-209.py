#!/usr/bin/env python3
"""Session-209: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-209 layer (the animation port). The s208 layer is
comment-demoted at its ship counts 2801/193. The corpus counts HELD.
Idempotent."""
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

# ── 1. the version + the H1: 1.213.0 -> 1.214.0 ─────────────────────
once("version: 1.213.0", "version: 1.214.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.213.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.214.0)")

# ── 2. the project_state head: the s209 layer live, the s208 demoted ─
head_start = s.index("project_state: 2801 unit checks + 193 e2e checks green; the session-208 layer")
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S209 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-209 layer "
    "(THE ANIMATION PORT: THE FLYING BIRDS + THE GROWING BUSH — the standing animation floor RETIRED; "
    "the rotation trigger THE OWNER'S c35d5b9: the session_11.md archive — the s208 transcript; THE "
    "SANDBOX RECYCLED AGAIN: the fresh clone + the env rebuild + the census MATCH; the baseline gate "
    "GREEN at the s208 ship state [lint 0/0 · tsc 0 · 139/2801]; THE REFERENCE STABLE [the pairs "
    "0.56/0.80/0.74 — no redesign]; THE DECODE [the 22-frame rapid-fire tracker, 1s apart on the "
    "booking page]; F-209a THE FLYING BIRDS [a two-part red sprite — the leading band ~13x8 @y356-362 "
    "+ the wing-spread body ~48x16 @y382-394, core (199,66,62) + edge (185,100,82) — translating right "
    "at ~46px/s, a 22s cycle; the second pass the TWO-BIRD FLOCK at y408-424]; F-209b THE GROWING BUSH "
    "STRIP [the s208 'static bush' re-decoded as ANIMATED: the right bush fixed (its right lobe "
    "extending 1410->1435), the left lobe's growth front sweeping x1317->x1080 over 5s with its "
    "blossom cluster riding the tip; hold 3s; vanish 8s; a 16s cycle — the gap x1218-1264 shows the G "
    "band at full growth]; THE PORT [drawBird + drawBushStrip + the RAF frame loop: the full scene "
    "repaint each frame (no trails), the sprites on top, performance.now() keyed from the mount, the "
    "resize listener intact, the cleanup cancels the RAF handle]; THE STATIC-BUSH RETIREMENT [the "
    "s208 static block retired — its geometry lives on as the strip's right lobe]; THE TUNING LOOP "
    "[4 geometry iterations — the two-lobe decode, the expanding right lobe, the front cluster's true "
    "shape, the accents re-anchored to the a-shot phase]; THE MEASURE: the standing-capture drift "
    "booking 5.68 · landing 4.72 (best-ever) · faq 3.26 [all at or below the s208 floors "
    "5.60/4.82/3.26; phase-matched: seed 5.65 · full-growth 6.19 · vanished 6.32]; THE CORPUS HELD "
    "[lint 0/0 · tsc 0 · 139/2801 unit · build · smoke 14/14 · e2e 193/193 — the animated canvas "
    "holds the corpus]; the captures 53-55 + the docs lockstep [this head + the pm-SKILL v1.6.0 "
    "canvas section])"
)

demoted = head_line.replace(
    "project_state: 2801 unit checks + 193 e2e checks green; the session-208 layer",
    "+ beneath it 2801 unit checks + 193 e2e checks green; the session-208 layer",
    1,
)

new_head = S209 + "\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.214.0, the s209 layer live at 2801/193")
