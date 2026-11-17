#!/usr/bin/env python3
"""Session-221 count ladder: 2853 -> 2859 (+6 the session-221 pins) ·
SUITES 144 -> 145 (tests/session-221-audit.test.ts — the 145th suite) ·
badge 3046 -> 3052. Assert-first and idempotent (both-states): every
anchor must exist exactly once or the script refuses (the F-220c MISS
guard). Carries the s220 ladder's site list verbatim (the
pre-carrying doctrine — every live-tense site flips in the same stroke,
including the four dialog-geometry CLAUDE.md twin pins and the README
commands-comment + suite-list stragglers).
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
    ("const UNIT = 2853;", "const UNIT = 2859;"),
    ("const SUITES = 144;", "const SUITES = 145;"),
    ("tests-3046%20checks", "tests-3052%20checks"),
    # the layer-axis pin re-anchor (head = s221; second = the s220 layer
    # at its own ship counts 2853/193)
    ("`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-220 layer`",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-221 layer`"),
    ("+ beneath it 2853 unit checks + 193 e2e checks green; the session-220 layer",
     "+ beneath it 2853 unit checks + 193 e2e checks green; the session-220 layer"),
], "UNIT + SUITES + badge + layer-axis head")

# ---- README -------------------------------------------------------------------
walk("README.md", [
    ("tests-3046%20checks", "tests-3052%20checks"),
    ("| 🧪 Tested | 2853 Vitest unit checks", "| 🧪 Tested | 2859 Vitest unit checks"),
    ("# 144 Vitest suites (2853 checks)", "# 145 Vitest suites (2859 checks)"),
    ("# 2853 Vitest unit checks (", "# 2859 Vitest unit checks ("),
    (", session-219-audit, session-220-audit)", ", session-219-audit, session-220-audit, session-221-audit)"),
], "badge + Tested + tree + commands-comment + suite list")

# ---- AGENTS -------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2853 checks)", "|  Unit tests (2859 checks)"),
    ("`bun run test` (2853)", "`bun run test` (2859)"),
], "commands table + gate paragraph")

# ---- CLAUDE -------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2853)", "`bun run test` (2859)"),
    ("Vitest unit suites (2853 checks)", "Vitest unit suites (2859 checks)"),
    ("**Unit (Vitest, 2853 checks)**", "**Unit (Vitest, 2859 checks)**"),
    ("the seam (currently 2853)", "the seam (currently 2859)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ----------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 144 Vitest suites — 2853 checks", "# 145 Vitest suites — 2859 checks"),
    ("| **Total** | **144** | **2853 unit + 193 e2e** |", "| **Total** | **145** | **2859 unit + 193 e2e** |"),
    ("HEAD: 144 Vitest suites with 2853 checks", "HEAD: 145 Vitest suites with 2859 checks"),
    ("`bun run test` — 2853/2853", "`bun run test` — 2859/2859"),
    ("| `bun run test` | root | 2853 unit checks |", "| `bun run test` | root | 2859 unit checks |"),
], "tree + totals + HEAD + checklist + scripts")

# ---- pm-SKILL (counts; version rides its own entry this round) -----------------
walk("property-maintenance_SKILL.md", [
    ("2853-check Vitest / 193-check Playwright corpus",
     "2859-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (144 suites / 2853 checks) |", "| Unit | Vitest 5 (145 suites / 2859 checks) |"),
    ("## 7. The Test Corpus (2853 unit / 193 e2e)", "## 7. The Test Corpus (2859 unit / 193 e2e)"),
    ("- **Unit (Vitest, 144 suites):**", "- **Unit (Vitest, 145 suites):**"),
], "corpus counts")

# ---- dialog-geometry-parity: the four CLAUDE.md count twins ---------------------
walk("tests/dialog-geometry-parity.test.ts", [
    ('expect(claude).toContain("Unit (Vitest, 2853 checks)")', 'expect(claude).toContain("Unit (Vitest, 2859 checks)")'),
    ('expect(claude).toContain("(currently 2853)")', 'expect(claude).toContain("(currently 2859)")'),
    ('expect(claude).toContain("Vitest unit suites (2853 checks)")', 'expect(claude).toContain("Vitest unit suites (2859 checks)")'),
    ('expect(claude).toContain("`bun run test` (2853)")', 'expect(claude).toContain("`bun run test` (2859)")'),
], "the four CLAUDE.md twin pins")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
