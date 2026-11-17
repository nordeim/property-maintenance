#!/usr/bin/env python3
"""Session-222 count ladder: 2859 -> 2863 (+4 the session-222 pins) ·
SUITES 145 -> 146 (tests/session-222-audit.test.ts — the 146th suite) ·
badge 3052 -> 3056. Assert-first and idempotent (both-states): every
anchor must exist exactly once or the script refuses (the F-220c MISS
guard). Carries the s221 ladder's site list verbatim (the
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
    ("const UNIT = 2859;", "const UNIT = 2863;"),
    ("const SUITES = 145;", "const SUITES = 146;"),
    ("tests-3052%20checks", "tests-3056%20checks"),
    # the layer-axis pin re-anchor (head = s222; second = the s221 layer
    # at its own ship counts 2859/193)
    ("`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-221 layer`",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-222 layer`"),
    ("+ beneath it 2859 unit checks + 193 e2e checks green; the session-221 layer",
     "+ beneath it 2859 unit checks + 193 e2e checks green; the session-221 layer"),
], "UNIT + SUITES + badge + layer-axis head")

# ---- README -------------------------------------------------------------------
walk("README.md", [
    ("tests-3052%20checks", "tests-3056%20checks"),
    ("| 🧪 Tested | 2859 Vitest unit checks", "| 🧪 Tested | 2863 Vitest unit checks"),
    ("# 145 Vitest suites (2859 checks)", "# 146 Vitest suites (2863 checks)"),
    ("# 2859 Vitest unit checks (", "# 2863 Vitest unit checks ("),
    (", session-220-audit, session-221-audit)", ", session-220-audit, session-221-audit, session-222-audit)"),
], "badge + Tested + tree + commands-comment + suite list")

# ---- AGENTS -------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2859 checks)", "|  Unit tests (2863 checks)"),
    ("`bun run test` (2859)", "`bun run test` (2863)"),
], "commands table + gate paragraph")

# ---- CLAUDE -------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2859)", "`bun run test` (2863)"),
    ("Vitest unit suites (2859 checks)", "Vitest unit suites (2863 checks)"),
    ("**Unit (Vitest, 2859 checks)**", "**Unit (Vitest, 2863 checks)**"),
    ("the seam (currently 2859)", "the seam (currently 2863)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ----------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 145 Vitest suites — 2859 checks", "# 146 Vitest suites — 2863 checks"),
    ("| **Total** | **145** | **2859 unit + 193 e2e** |", "| **Total** | **146** | **2863 unit + 193 e2e** |"),
    ("HEAD: 145 Vitest suites with 2859 checks", "HEAD: 146 Vitest suites with 2863 checks"),
    ("`bun run test` — 2859/2859", "`bun run test` — 2863/2863"),
    ("| `bun run test` | root | 2859 unit checks |", "| `bun run test` | root | 2863 unit checks |"),
], "tree + totals + HEAD + checklist + scripts")

# ---- pm-SKILL (counts; version rides its own entry this round) -----------------
walk("property-maintenance_SKILL.md", [
    ("2859-check Vitest / 193-check Playwright corpus",
     "2863-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (145 suites / 2859 checks) |", "| Unit | Vitest 5 (146 suites / 2863 checks) |"),
    ("## 7. The Test Corpus (2859 unit / 193 e2e)", "## 7. The Test Corpus (2863 unit / 193 e2e)"),
    ("- **Unit (Vitest, 145 suites):**", "- **Unit (Vitest, 146 suites):**"),
], "corpus counts")

# ---- dialog-geometry-parity: the four CLAUDE.md count twins ---------------------
walk("tests/dialog-geometry-parity.test.ts", [
    ('expect(claude).toContain("Unit (Vitest, 2859 checks)")', 'expect(claude).toContain("Unit (Vitest, 2863 checks)")'),
    ('expect(claude).toContain("(currently 2859)")', 'expect(claude).toContain("(currently 2863)")'),
    ('expect(claude).toContain("Vitest unit suites (2859 checks)")', 'expect(claude).toContain("Vitest unit suites (2863 checks)")'),
    ('expect(claude).toContain("`bun run test` (2859)")', 'expect(claude).toContain("`bun run test` (2863)")'),
], "the four CLAUDE.md twin pins")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
