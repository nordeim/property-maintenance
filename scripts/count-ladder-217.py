#!/usr/bin/env python3
"""Session-217 count ladder: 2822 -> 2826 (+4 the F-218a/b/c pins) ·
SUITES 140 -> 141 (the session-217 pins ride a NEW suite file,
tests/session-217-audit.test.ts — the 141st) · badge 3015 -> 3019.
Assert-first and idempotent (both-states: a re-run over an
already-flipped site is a verified 0-flip NOOP, a MISS exits 1).

Sites walked (live-tense only; history rows quote counts in
arrow/gate phrasing and stay untouched):
  README.md      badge (3015->3019) · Tested row (2822->2826) · the
                 gate line + its suite list (+session-217-audit)
  AGENTS.md      commands table (2822->2826, 140->141) · gate
                 paragraph · the file-tree row ("140 Vitest suites —
                 2822 checks")
  CLAUDE.md      gate paragraph · the commands table · the Unit row ·
                 the seam line
  PAD            the totals row · the HEAD note · the pre-ship
                 checklist · the scripts table · the §11 rate-limit
                 row (133->135, the F-218c census comment)
  pm-SKILL.md    §7 heading (2822->2826) · the §7 Unit bullet
                 (140->141 suites) · the §2 unit row
  neo-crm_SKILL.md head (the s217 layer carries its own counts —
                 done by the head surgery, not this script)
  docs-counts.test.ts   UNIT 2822->2826 · SUITES 140->141 · the
                 badge pair (3015->3019 positive, the retired 3015
                 joins the negatives)
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

UNIT_OLD, UNIT_NEW = "2822", "2826"
SUIT_OLD, SUIT_NEW = "140", "141"
BADGE_OLD, BADGE_NEW = "3015", "3019"
n_flips = 0
n_noop = 0


def walk(rel: str, pairs: list[tuple[str, str]], desc: str) -> None:
    """One file, several (old, new) literal pairs. Both-states:
    already-new -> NOOP; old -> flip; neither -> MISS (exit 1)."""
    global n_flips, n_noop
    p = REPO / rel
    src = p.read_text(encoding="utf-8")
    changed = False
    for old, new in pairs:
        if old == new:
            continue
        if new in src and old not in src:
            n_noop += 1
            print(f"NOOP  {rel}: {desc} (already {new})")
            continue
        if src.count(old) < 1:
            print(f"MISS  {rel}: {desc} — anchor not found: {old[:60]!r}")
            sys.exit(1)
        src = src.replace(old, new)
        changed = True
        n_flips += 1
        print(f"FLIP  {rel}: {desc} {old} -> {new}")
    if changed:
        p.write_text(src, encoding="utf-8")


# README: the badge, the Tested row, the gate line, the suite list
walk(
    "README.md",
    [
        ("tests-3015%20checks", "tests-3019%20checks"),
        ("| 🧪 Tested | 2822 Vitest unit checks", "| 🧪 Tested | 2826 Vitest unit checks"),
        ("# 140 Vitest suites (2822 checks)", "# 141 Vitest suites (2826 checks)"),
        (", session-215-audit)", ", session-215-audit, session-217-audit)"),
    ],
    "badge + Tested + gate + suite list",
)

# AGENTS: the commands table, the gate paragraph, the file-tree row
walk(
    "AGENTS.md",
    [
        ("|  Unit tests (2822 checks)", "|  Unit tests (2826 checks)"),
        ("(2822)", "(2826)"),
    ],
    "commands table + gate paragraph",
)

# CLAUDE: the gate paragraph, the commands table, the Unit row, seam line
walk(
    "CLAUDE.md",
    [
        ("(2822)", "(2826)"),
        ("Vitest unit suites (2822 checks)", "Vitest unit suites (2826 checks)"),
        ("**Unit (Vitest, 2822 checks)**", "**Unit (Vitest, 2826 checks)**"),
        ("the seam (currently 2822)", "the seam (currently 2826)"),
    ],
    "gate + commands + Unit row + seam line",
)

# PAD: the totals row, HEAD note, pre-ship checklist, scripts table
walk(
    "Project_Architecture_Document.md",
    [
        ("# 140 Vitest suites — 2822 checks", "# 141 Vitest suites — 2826 checks"),
        ("| **Total** | **140** | **2822 unit + 193 e2e** |", "| **Total** | **141** | **2826 unit + 193 e2e** |"),
        ("HEAD: 140 Vitest suites with 2822 checks", "HEAD: 141 Vitest suites with 2826 checks"),
        ("`bun run test` — 2822/2822", "`bun run test` — 2826/2826"),
        ("| `bun run test` | root | 2822 unit checks |", "| `bun run test` | root | 2826 unit checks |"),
    ],
    "file-tree + totals + HEAD + checklist + scripts table",
)

# pm-SKILL: §7 heading, §7 Unit bullet, §2 unit row
walk(
    "property-maintenance_SKILL.md",
    [
        ("## 7. The Test Corpus (2822 unit / 193 e2e)", "## 7. The Test Corpus (2826 unit / 193 e2e)"),
        # session-218 (F-220c): the REAL pre-s217 form was the stale 139
        # (F-218a's own defect) — the 139 -> 141 flip is the transition
        # that actually happened at this site (the phantom 140 anchor
        # made the replay exit 1 over the historical tree).
        ("- **Unit (Vitest, 139 suites):**", "- **Unit (Vitest, 141 suites):**"),
        ("| Unit | Vitest 5 (140 suites / 2822 checks) |", "| Unit | Vitest 5 (141 suites / 2826 checks) |"),
        ("2822-check Vitest", "2826-check Vitest"),
        ("(2822 unit / 193 e2e)", "(2826 unit / 193 e2e)"),
    ],
    "§7 heading + Unit bullet + §2 row + frontmatter",
)

# docs-counts.test.ts: the UNIT + SUITES constants + the badge pair
walk(
    "tests/docs-counts.test.ts",
    [
        ('const UNIT = 2822;', 'const UNIT = 2826;'),
        ('const SUITES = 140;', 'const SUITES = 141;'),
        ('tests-3015%20checks', 'tests-3019%20checks'),
    ],
    "UNIT + SUITES constants + badge",
)

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
