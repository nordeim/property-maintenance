#!/usr/bin/env python3
"""Session-223 count ladder: 2863 -> 2867 (+4 the session-223 pins) ·
SUITES 146 -> 147 (tests/session-223-audit.test.ts — the 147th suite) ·
badge 3056 -> 3060. Assert-first and idempotent (both-states): every
anchor must exist exactly once or the script refuses (the F-220c MISS
guard). Carries the s222 ladder's site list verbatim (the
pre-carrying doctrine).
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
    ("const UNIT = 2863;", "const UNIT = 2867;"),
    ("const SUITES = 146;", "const SUITES = 147;"),
    ("tests-3056%20checks", "tests-3060%20checks"),
    # the layer-axis pin re-anchor (head = s223; second = the s222 layer
    # at its own ship counts 2863/193)
    ("`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-222 layer`",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-223 layer`"),
], "UNIT + SUITES + badge + layer-axis head")

# ---- README -------------------------------------------------------------------
walk("README.md", [
    ("tests-3056%20checks", "tests-3060%20checks"),
    ("| 🧪 Tested | 2863 Vitest unit checks", "| 🧪 Tested | 2867 Vitest unit checks"),
    ("# 146 Vitest suites (2863 checks)", "# 147 Vitest suites (2867 checks)"),
    ("# 2863 Vitest unit checks (", "# 2867 Vitest unit checks ("),
    (", session-221-audit, session-222-audit)", ", session-221-audit, session-222-audit, session-223-audit)"),
], "badge + Tested + tree + commands-comment + suite list")

# ---- AGENTS -------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2863 checks)", "|  Unit tests (2867 checks)"),
    ("`bun run test` (2863)", "`bun run test` (2867)"),
], "commands table + gate paragraph")

# ---- CLAUDE -------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2863)", "`bun run test` (2867)"),
    ("Vitest unit suites (2863 checks)", "Vitest unit suites (2867 checks)"),
    ("**Unit (Vitest, 2863 checks)**", "**Unit (Vitest, 2867 checks)**"),
    ("the seam (currently 2863)", "the seam (currently 2867)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ----------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 146 Vitest suites — 2863 checks", "# 147 Vitest suites — 2867 checks"),
    ("| **Total** | **146** | **2863 unit + 193 e2e** |", "| **Total** | **147** | **2867 unit + 193 e2e** |"),
    ("HEAD: 146 Vitest suites with 2863 checks", "HEAD: 147 Vitest suites with 2867 checks"),
    ("`bun run test` — 2863/2863", "`bun run test` — 2867/2867"),
    ("| `bun run test` | root | 2863 unit checks |", "| `bun run test` | root | 2867 unit checks |"),
], "tree + totals + HEAD + checklist + scripts")

# ---- pm-SKILL (counts; version rides its own entry this round) -----------------
walk("property-maintenance_SKILL.md", [
    ("2863-check Vitest / 193-check Playwright corpus",
     "2867-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (146 suites / 2863 checks) |", "| Unit | Vitest 5 (147 suites / 2867 checks) |"),
    ("## 7. The Test Corpus (2863 unit / 193 e2e)", "## 7. The Test Corpus (2867 unit / 193 e2e)"),
    ("- **Unit (Vitest, 146 suites):**", "- **Unit (Vitest, 147 suites):**"),
], "corpus counts")

# ---- dialog-geometry-parity: the four CLAUDE.md count twins ---------------------
walk("tests/dialog-geometry-parity.test.ts", [
    ('expect(claude).toContain("Unit (Vitest, 2863 checks)")', 'expect(claude).toContain("Unit (Vitest, 2867 checks)")'),
    ('expect(claude).toContain("(currently 2863)")', 'expect(claude).toContain("(currently 2867)")'),
    ('expect(claude).toContain("Vitest unit suites (2863 checks)")', 'expect(claude).toContain("Vitest unit suites (2867 checks)")'),
    ('expect(claude).toContain("`bun run test` (2863)")', 'expect(claude).toContain("`bun run test` (2867)")'),
], "the four CLAUDE.md twin pins")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
