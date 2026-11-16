#!/usr/bin/env python3
"""Session-215 count ladder: 2816 -> 2822 (+6 the F-216a/b/c pins) ·
badge 3009 -> 3015 · SUITES 139 HELD (the session-215 pins ride a NEW
suite file — the 140th) · E2E 193 HELD. Assert-first and idempotent:
every re-anchor is preceded by an existence check; a second run is a
verified 0-flip no-op. The retired 2816 site-forms join the negatives
ladder (the s192/F-218 doctrine); the badge is pinned BOTH ways by
tests/docs-counts.test.ts.

Wait — SUITES: the session-215 pins live in tests/session-215-audit.test.ts,
a NEW suite file, so the suite count is 139 -> 140.

Sites walked (live-tense only; history rows quote counts in arrow/gate
phrasing and stay untouched):
  README.md      badge (3009->3015) · Tested row (2816->2822) · file-tree
                 (139 suites 2816 -> 140 suites 2822) · the gate line
  AGENTS.md      commands table + gate paragraph
  CLAUDE.md      gate paragraph · the commands table · the Unit row · the
                 seam line (currently 2816) · the dialog-geometry carriers
  PAD            file-tree · the totals row · the HEAD note · the pre-ship
                 checklist · the scripts table
  pm-SKILL.md    frontmatter description · stack table · §7 heading
  docs-counts.test.ts   UNIT constant + the badge pair (3009 positive ->
                 3015; 2816 joins no negatives because the live corpus has
                 never been 2816 elsewhere... it HAS (s214) — the retired
                 forms join the negatives)
  dialog-geometry-parity.test.ts  the four CLAUDE carriers
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# --- the ladder -------------------------------------------------------------
OLD_UNIT, NEW_UNIT = 2816, 2822
OLD_BADGE, NEW_BADGE = 3009, 3015
OLD_SUITES, NEW_SUITES = 139, 140  # the session-215 file is the 140th

flips: list[str] = []


def sub(path: str, pattern: str, repl: str, desc: str, allow_done: bool = True) -> None:
    p = REPO / path
    src = p.read_text(encoding="utf-8")
    new, n = re.subn(pattern, repl, src)
    if n == 0:
        if allow_done and repl.split("%")[0].rstrip(" ").rstrip(")") in src or repl in src:
            print(f"NOOP  {path}: {desc} (already re-anchored)")
            return
        print(f"MISS  {path}: {desc} — pattern not found")
        sys.exit(1)
    if new == src:
        print(f"NOOP  {path}: {desc} (already re-anchored)")
        return
    p.write_text(new, encoding="utf-8")
    flips.append(f"{path}: {desc} ({n} site(s))")
    print(f"FLIP  {path}: {desc} ({n} site(s))")


# README ---------------------------------------------------------------------
sub("README.md", r"tests-3009%20checks", "tests-3015%20checks", "the badge")
sub("README.md", r"2816 Vitest unit checks", "2822 Vitest unit checks", "the Tested row")
sub("README.md", r"139 Vitest suites \(2816 checks\)", "140 Vitest suites (2822 checks)", "the file-tree row")
sub("README.md", r"bun run test          # 2816 Vitest unit checks", "bun run test          # 2822 Vitest unit checks", "the gate line")
sub("README.md", r"property, type-gate\)", "property, type-gate, session-215-audit)", "the gate line's suite list (+session-215-audit)")

# AGENTS ---------------------------------------------------------------------
sub("AGENTS.md", r"\|  Unit tests \(2816 checks\)", "|  Unit tests (2822 checks)", "the commands table")
sub("AGENTS.md", r"`bun run test` \(2816\)", "`bun run test` (2822)", "the gate paragraph")

# CLAUDE ---------------------------------------------------------------------
sub("CLAUDE.md", r"`bun run test` \(2816\)", "`bun run test` (2822)", "the gate paragraph")
sub("CLAUDE.md", r"Vitest unit suites \(2816 checks\)", "Vitest unit suites (2822 checks)", "the commands table")
sub("CLAUDE.md", r"Unit \(Vitest, 2816 checks\)", "Unit (Vitest, 2822 checks)", "the Unit row")
sub("CLAUDE.md", r"\(currently 2816\)", "(currently 2822)", "the seam line")

# PAD ------------------------------------------------------------------------
sub("Project_Architecture_Document.md", r"139 Vitest suites — 2816 checks", "140 Vitest suites — 2822 checks", "the file-tree row")
sub("Project_Architecture_Document.md", r"\| \*\*Total\*\* \| \*\*139\*\* \| \*\*2816 unit \+ 193 e2e\*\*", "| **Total** | **140** | **2822 unit + 193 e2e**", "the totals row")
sub("Project_Architecture_Document.md", r"139 Vitest suites with 2816 checks", "140 Vitest suites with 2822 checks", "the HEAD note")
sub("Project_Architecture_Document.md", r"`bun run test` — 2816/2816", "`bun run test` — 2822/2822", "the pre-ship checklist")
sub("Project_Architecture_Document.md", r"\| `bun run test` \| root \| 2816 unit checks \|", "| `bun run test` | root | 2822 unit checks |", "the scripts table")

# pm-SKILL -------------------------------------------------------------------
sub("property-maintenance_SKILL.md", r"2816-check Vitest / 193-check Playwright corpus", "2822-check Vitest / 193-check Playwright corpus", "the frontmatter description")
sub("property-maintenance_SKILL.md", r"Vitest 5 \(139 suites / 2816 checks\)", "Vitest 5 (140 suites / 2822 checks)", "the stack table")
sub("property-maintenance_SKILL.md", r"## 7\. The Test Corpus \(2816 unit / 193 e2e\)", "## 7. The Test Corpus (2822 unit / 193 e2e)", "the §7 heading")

# docs-counts.test.ts ---------------------------------------------------------
sub(
    "tests/docs-counts.test.ts",
    r"const UNIT = 2816; // session-214: \+the F-215/216/217/220 pins \(2811 -> 2816\)",
    "const UNIT = 2822; // session-215: +the F-216a/b/c pins (2816 -> 2822) // session-214: +the F-215/216/217/220 pins (2811 -> 2816)",
    "the UNIT constant",
)
sub("tests/docs-counts.test.ts", r'expect\(readme\)\.toContain\("tests-3009%20checks"\);', 'expect(readme).toContain("tests-3015%20checks");', "the badge positive")
# the retired badge joins the negatives (the pair doctrine)
sub(
    "tests/docs-counts.test.ts",
    r'    expect\(readme\)\.not\.toMatch\(/tests-2998%20checks/\);',
    '    expect(readme).not.toMatch(/tests-2998%20checks/);\n    // session-215 (D-215a): the retired 3009 badge joins the negatives\n    expect(readme).not.toMatch(/tests-3009%20checks/);',
    "the badge negative",
)
# the SUITES constant 139 -> 140
sub(
    "tests/docs-counts.test.ts",
    r"const SUITES = 139; // session-199: \+ the booking seam suite \(138 -> 139\)",
    "const SUITES = 140; // session-215: + the session-215 audit suite (139 -> 140) // session-199: + the booking seam suite (138 -> 139)",
    "the SUITES constant",
)

# dialog-geometry-parity.test.ts — the four CLAUDE carriers --------------------
sub("tests/dialog-geometry-parity.test.ts", r'expect\(claude\)\.toContain\("Unit \(Vitest, 2816 checks\)"\); // session-212: the count ladder \(\+the FAB/padding/brown-tip/canvas pins\)', 'expect(claude).toContain("Unit (Vitest, 2822 checks)"); // session-215: the count ladder (+the F-216a/b/c pins)', "the CLAUDE Unit carrier")
sub("tests/dialog-geometry-parity.test.ts", r'expect\(claude\)\.toContain\("\(currently 2816\)"\); // session-212: the count ladder', 'expect(claude).toContain("(currently 2822)"); // session-215: the count ladder', "the CLAUDE currently carrier")
sub("tests/dialog-geometry-parity.test.ts", r'expect\(claude\)\.toContain\("Vitest unit suites \(2816 checks\)"\); // session-212', 'expect(claude).toContain("Vitest unit suites (2822 checks)"); // session-215', "the CLAUDE suites carrier")
sub("tests/dialog-geometry-parity.test.ts", r'expect\(claude\)\.toContain\("`bun run test` \(2816\)"\); // session-212', 'expect(claude).toContain("`bun run test` (2822)"); // session-215', "the CLAUDE gate carrier")

print()
if not flips:
    print("idempotent re-run: 0 flips (all sites already re-anchored)")
else:
    print(f"{len(flips)} site-group(s) re-anchored:")
    for f in flips:
        print(f"  - {f}")
