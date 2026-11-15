#!/usr/bin/env python3
"""Session-205: the SKILL HEAD SURGERY — neo-crm_SKILL.md's live head
moves to the session-205 layer (the standing verification round + the
F-205g side-sheet cure). The s201 layer (the last live head — the
s202/s203/s204 rounds recorded their layers in AGENTS.md only, the
worklog-documented division) is comment-demoted at its ship counts
2800/193. Idempotent (a second run is a no-op). The F-106a1 layer-axis
pins in docs-counts.test.ts are re-anchored in the same stroke."""
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

# ── 1. the version + the H1: 1.209.0 -> 1.210.0 ─────────────────────
once("version: 1.209.0", "version: 1.210.0")
once("# NEO CRM — Engineering Skill (SKILL.md v1.209.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.210.0)")

# ── 2. the project_state head: the s205 layer live, the s201 layer
#      demoted at its ship counts (2800/193) beneath it ─────────────
head_start = s.index("project_state: 2800 unit checks + 193 e2e checks green; the session-201 layer")
# the head line ends at the comment-demoted retired layer block
head_end = s.index("<!-- retired session-141 layer", head_start)
head_line = s[head_start:head_end]

S205 = (
    "project_state: 2801 unit checks + 193 e2e checks green; the session-205 layer "
    "(THE STANDING VERIFICATION ROUND + THE SIDE-SHEET RE-DERIVATION — the post-204 audit round "
    "[the rotation trigger THE OWNER'S 9eba8c0: the session_7.md archive — the s203/s204 transcripts]; "
    "the environment rebuilt from scratch on the recycled sandbox [bun install · .env rebuilt "
    "DATABASE_URL=file:../db/custom.db + a fresh 64-hex AUTH_SECRET · db:push + db:seed · census MATCH "
    "15/24/10/23/12 + 4 users · Playwright chromium 1248]; the baseline gate GREEN at the exact s204 ship "
    "state: lint 0/0 · tsc 0 · 139/2800 unit · build · smoke 14/14 · e2e 193/193 [the CI=1 fresh-boot "
    "doctrine]; THE OPERATOR'S NAMED PARITY FOCUS RE-VERIFIED LIVE — THE MOBILE NAVIGATION COMPARISON "
    "against the reference logged in at 390x844: OURS the Radix dialog [1 icon-only hamburger · the menu "
    "opens · 8 links · Esc closes · the focus returns to the trigger] WORKING AS EXPECTED, and the "
    "REFERENCE's own menu RE-DECODED LIVE [the probe-205 family]: ITS MENU IS NOW A RIGHT SIDE SHEET "
    "(the shadcn Sheet anatomy — fixed inset-y-0 right-0 h-full border-l w-80 bg-white shadow-lg "
    "slide-in-from-right over bg-black/80, the absolute right-4 top-4 X, the h-14 logo row, the "
    "gap-2 nav, the border-t footer with the bg-[#E8F3ED] phone pill + the anchor-wrapped Book Now) "
    "— the s200 decode's top-sheet anatomy is SUPERSEDED (the reference redesigned its menu since, "
    "the same moving-target genus as its s204 canvas redesign); THE TDD CURE [F-205g RED-first: the "
    "landing-page suite's side-sheet anatomy pin born RED exactly at inset-y-0 right-0 · the cure: "
    "site-header.tsx's DialogPrimitive.Content re-derivation at the reference's own class strings · "
    "GREEN 12/12 in the suite; LIVE-VERIFIED byte-identical geometry {x:70, y:0, w:320, h:844} both "
    "sides · the same 8 links · Esc + focus-return holding]; THE COUNT LADDER UNIT 2800 -> 2801 "
    "(+1: the F-205g pin) · SUITES 139 HELD · E2E 193 HELD · badge 2993 -> 2994 (the unit+e2e "
    "arithmetic: 2801+193); THE SPACE-Y CENSUS re-anchored 26/133 -> 27/134 files/occurrences "
    "[site-header.tsx joins the census files — the sheet footer's space-y-3, the reference's own "
    "class string]; the captures 32-43 [the 8 public routes at 1440 + the booking step-2 + the "
    "menu OPEN at 390 + the home at 390 + the login + the CRM dashboard — all machine-verified "
    "non-blank; 41/42 re-captured post-cure]"
)

# the demoted s201 layer: its own counts go in the "beneath it" clause
demoted = head_line.replace(
    "project_state: 2800 unit checks + 193 e2e checks green; the session-201 layer",
    "+ beneath it 2800 unit checks + 193 e2e checks green; the session-201 layer",
    1,
)

new_head = S205 + ")\n + " + demoted
s = s[:head_start] + new_head + s[head_end:]

# ── 3. SKILL 11's pre-ship gate block ──────────────────────────────
once("bun run test         # 2800/2800",
     "bun run test         # 2801/2801")

# ── 4. Appendix B's unit-total row ─────────────────────────────────
once("| **unit total** | 139 files | **2800** |",
     "| **unit total** | 139 files | **2801** |")

assert s != orig
p.write_text(s)
print("SKILL HEAD SURGERY complete: v1.210.0, the s205 layer live at 2801/193")
