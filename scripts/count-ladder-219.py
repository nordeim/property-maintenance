#!/usr/bin/env python3
"""Session-219 count ladder: 2834 -> 2843 (+9 the session-219 pins) ·
SUITES 142 -> 143 (tests/session-219-audit.test.ts — the 143rd suite) ·
badge 3027 -> 3036 · the pm-SKILL v1.14.0 -> v1.15.0 (the R-01 history
entry rides its own round). Assert-first and idempotent (both-states):
every anchor must exist exactly once or the script refuses (the F-220c
MISS guard carried forward).
"""
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
n_flips = 0
n_noop = 0


def walk(rel: str, pairs: list, desc: str) -> None:
    global n_flips, n_noop
    p = REPO / rel
    src = p.read_text(encoding="utf-8")
    changed = False
    for old, new in pairs:
        if old == new:
            continue
        if new in src and old not in src:
            n_noop += 1
            continue
        if src.count(old) < 1:
            print(f"MISS  {rel}: {desc} — anchor not found: {old[:60]!r}")
            sys.exit(1)
        src = src.replace(old, new)
        changed = True
        n_flips += 1
    if changed:
        p.write_text(src, encoding="utf-8")
        print(f"FLIP  {rel}: {desc}")


# ---- docs-counts constants + badge -----------------------------------------
walk("tests/docs-counts.test.ts", [
    ("const UNIT = 2834;", "const UNIT = 2843;"),
    ("const SUITES = 142;", "const SUITES = 143;"),
    ("tests-3027%20checks", "tests-3036%20checks"),
], "UNIT + SUITES + badge")

# ---- README ------------------------------------------------------------------
walk("README.md", [
    ("tests-3027%20checks", "tests-3036%20checks"),
    ("| 🧪 Tested | 2834 Vitest unit checks", "| 🧪 Tested | 2843 Vitest unit checks"),
    ("# 142 Vitest suites (2834 checks)", "# 143 Vitest suites (2843 checks)"),
    ("# 2834 Vitest unit checks (", "# 2843 Vitest unit checks ("),
    (", session-217-audit, session-218-audit)", ", session-217-audit, session-218-audit, session-219-audit)"),
], "badge + Tested + tree + commands-comment + suite list")

# ---- AGENTS ------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2834 checks)", "|  Unit tests (2843 checks)"),
    ("`bun run test` (2834)", "`bun run test` (2843)"),
], "commands table + gate paragraph")

# ---- CLAUDE ------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2834)", "`bun run test` (2843)"),
    ("Vitest unit suites (2834 checks)", "Vitest unit suites (2843 checks)"),
    ("**Unit (Vitest, 2834 checks)**", "**Unit (Vitest, 2843 checks)**"),
    ("the seam (currently 2834)", "the seam (currently 2843)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ---------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 142 Vitest suites — 2834 checks", "# 143 Vitest suites — 2843 checks"),
    ("| **Total** | **142** | **2834 unit + 193 e2e** |", "| **Total** | **143** | **2843 unit + 193 e2e** |"),
    ("HEAD: 142 Vitest suites with 2834 checks", "HEAD: 143 Vitest suites with 2843 checks"),
    ("`bun run test` — 2834/2834", "`bun run test` — 2843/2843"),
    ("| `bun run test` | root | 2834 unit checks |", "| `bun run test` | root | 2843 unit checks |"),
], "tree + totals + HEAD + checklist + scripts")

# ---- pm-SKILL (v1.14.0 -> v1.15.0 + counts) ----------------------------------
walk("property-maintenance_SKILL.md", [
    ("version: 1.14.0", "version: 1.15.0"),
    ("# property-maintenance — Engineering Skill (SKILL.md v1.14.0)",
     "# property-maintenance — Engineering Skill (SKILL.md v1.15.0)"),
    ("2834-check Vitest / 193-check Playwright corpus",
     "2843-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (142 suites / 2834 checks) |", "| Unit | Vitest 5 (143 suites / 2843 checks) |"),
    ("## 7. The Test Corpus (2834 unit / 193 e2e)", "## 7. The Test Corpus (2843 unit / 193 e2e)"),
    ("- **Unit (Vitest, 142 suites):**", "- **Unit (Vitest, 143 suites):**"),
    ("(2834 unit / 193 e2e)", "(2843 unit / 193 e2e)"),
], "version + counts")

# ---- dialog-geometry-parity: the four CLAUDE.md count twins (the s218
# round re-anchored these manually — recorded in-script now, the F-218b
# doctrine: the script's replay == the shipped artifact at every site)
walk("tests/dialog-geometry-parity.test.ts", [
    ('expect(claude).toContain("Unit (Vitest, 2834 checks)")', 'expect(claude).toContain("Unit (Vitest, 2843 checks)")'),
    ('expect(claude).toContain("(currently 2834)")', 'expect(claude).toContain("(currently 2843)")'),
    ('expect(claude).toContain("Vitest unit suites (2834 checks)")', 'expect(claude).toContain("Vitest unit suites (2843 checks)")'),
    ('expect(claude).toContain("`bun run test` (2834)")', 'expect(claude).toContain("`bun run test` (2843)")'),
], "the four CLAUDE.md twin pins")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
