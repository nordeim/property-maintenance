#!/usr/bin/env python3
"""Session-220 count ladder: 2843 -> 2853 (+10 the session-220 pins) ·
SUITES 143 -> 144 (tests/session-220-audit.test.ts — the 144th suite) ·
badge 3036 -> 3046. Assert-first and idempotent (both-states): every
anchor must exist exactly once or the script refuses (the F-220c MISS
guard). Pre-carries the straggler sites the s219 ladder's first pass
missed (the README commands-comment + the four dialog-geometry CLAUDE.md
twin pins — the F-219a genus, recorded in-script from birth this time).
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


# ---- docs-counts constants + badge -------------------------------------------
walk("tests/docs-counts.test.ts", [
    ("const UNIT = 2843;", "const UNIT = 2853;"),
    ("const SUITES = 143;", "const SUITES = 144;"),
    ("tests-3036%20checks", "tests-3046%20checks"),
    # the layer-axis pin re-anchor (head = s220; second = the s219 layer
    # at its own ship counts 2843/193)
    ("`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-219 layer`",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-220 layer`"),
    ("+ beneath it 2843 unit checks + 193 e2e checks green; the session-219 layer",
     "+ beneath it 2843 unit checks + 193 e2e checks green; the session-219 layer"),
], "UNIT + SUITES + badge + layer-axis head")

# ---- README -------------------------------------------------------------------
walk("README.md", [
    ("tests-3036%20checks", "tests-3046%20checks"),
    ("| 🧪 Tested | 2843 Vitest unit checks", "| 🧪 Tested | 2853 Vitest unit checks"),
    ("# 143 Vitest suites (2843 checks)", "# 144 Vitest suites (2853 checks)"),
    ("# 2843 Vitest unit checks (", "# 2853 Vitest unit checks ("),
    (", session-218-audit, session-219-audit)", ", session-218-audit, session-219-audit, session-220-audit)"),
], "badge + Tested + tree + commands-comment + suite list")

# ---- AGENTS -------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2843 checks)", "|  Unit tests (2853 checks)"),
    ("`bun run test` (2843)", "`bun run test` (2853)"),
], "commands table + gate paragraph")

# ---- CLAUDE -------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2843)", "`bun run test` (2853)"),
    ("Vitest unit suites (2843 checks)", "Vitest unit suites (2853 checks)"),
    ("**Unit (Vitest, 2843 checks)**", "**Unit (Vitest, 2853 checks)**"),
    ("the seam (currently 2843)", "the seam (currently 2853)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ----------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 143 Vitest suites — 2843 checks", "# 144 Vitest suites — 2853 checks"),
    ("| **Total** | **143** | **2843 unit + 193 e2e** |", "| **Total** | **144** | **2853 unit + 193 e2e** |"),
    ("HEAD: 143 Vitest suites with 2843 checks", "HEAD: 144 Vitest suites with 2853 checks"),
    ("`bun run test` — 2843/2843", "`bun run test` — 2853/2853"),
    ("| `bun run test` | root | 2843 unit checks |", "| `bun run test` | root | 2853 unit checks |"),
], "tree + totals + HEAD + checklist + scripts")

# ---- pm-SKILL (counts; version rides its own entry this round) -----------------
walk("property-maintenance_SKILL.md", [
    ("2843-check Vitest / 193-check Playwright corpus",
     "2853-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (143 suites / 2843 checks) |", "| Unit | Vitest 5 (144 suites / 2853 checks) |"),
    ("## 7. The Test Corpus (2843 unit / 193 e2e)", "## 7. The Test Corpus (2853 unit / 193 e2e)"),
    ("- **Unit (Vitest, 143 suites):**", "- **Unit (Vitest, 144 suites):**"),
], "corpus counts")

# ---- dialog-geometry-parity: the four CLAUDE.md count twins ---------------------
walk("tests/dialog-geometry-parity.test.ts", [
    ('expect(claude).toContain("Unit (Vitest, 2843 checks)")', 'expect(claude).toContain("Unit (Vitest, 2853 checks)")'),
    ('expect(claude).toContain("(currently 2843)")', 'expect(claude).toContain("(currently 2853)")'),
    ('expect(claude).toContain("Vitest unit suites (2843 checks)")', 'expect(claude).toContain("Vitest unit suites (2853 checks)")'),
    ('expect(claude).toContain("`bun run test` (2843)")', 'expect(claude).toContain("`bun run test` (2853)")'),
], "the four CLAUDE.md twin pins")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
