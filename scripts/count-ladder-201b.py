#!/usr/bin/env python3
"""Session-201 ladder walk #2: the round's +2 its (F-201e canvas pin +
F-201f card-tokens pin) take UNIT 2798 -> 2800 · badge 2991 -> 2993,
plus the three census stragglers (globals.css 449 lines · 129 --color
tokens · 38 components). Assert-first."""
from pathlib import Path

REPO = Path("/home/z/my-project/property-maintenance")

def flip(path, old, new, count=1):
    p = REPO / path
    t = p.read_text()
    n = t.count(old)
    assert n == count, f"{path}: expected {count}x {old[:52]!r}, found {n}"
    p.write_text(t.replace(old, new, count))
    print(f"  {path}: {old[:44]!r}")

# ── the pin constants ───────────────────────────────────────────────
flip("tests/docs-counts.test.ts",
     "const UNIT = 2798; // session-201: +the F-201b property-maintenance-SKILL lockstep pin (2797 -> 2798)",
     "const UNIT = 2800; // session-201: +the F-201b SKILL lockstep pin + the F-201e canvas pin + the F-201f card-tokens pin (2797 -> 2800)")

# ── the census stragglers ───────────────────────────────────────────
flip("neo-crm_SKILL.md", "(442 lines)", "(449 lines)")
flip("neo-crm_SKILL.md", "127 --color", "129 --color")
flip("neo-crm_SKILL.md", "37 components", "38 components")
flip("Project_Architecture_Document.md", "| `src/app/globals.css` | 442 |",
     "| `src/app/globals.css` | 449 |")

# ── the ladder sites (2798 -> 2800, badge 2991 -> 2993) ─────────────
flip("README.md", "tests-2991%20checks", "tests-2993%20checks")
flip("README.md", "139 Vitest suites (2798 checks)", "139 Vitest suites (2800 checks)")
flip("README.md", "# 2798 Vitest unit checks", "# 2800 Vitest unit checks")
flip("README.md", "| 🧪 Tested | 2798 Vitest unit checks", "| 🧪 Tested | 2800 Vitest unit checks")
flip("CLAUDE.md", "`bun run test` (2798) → `bun run build`", "`bun run test` (2800) → `bun run build`")
flip("CLAUDE.md", "Vitest unit suites (2798 checks)", "Vitest unit suites (2800 checks)")
flip("CLAUDE.md", "Unit (Vitest, 2798 checks)", "Unit (Vitest, 2800 checks)")
flip("CLAUDE.md", "(currently 2798)", "(currently 2800)")
flip("AGENTS.md", "Unit tests (2798 checks)", "Unit tests (2800 checks)")
flip("AGENTS.md", "`bun run test` (2798) → `bun run build`", "`bun run test` (2800) → `bun run build`")
flip("Project_Architecture_Document.md", "139 Vitest suites — 2798 checks", "139 Vitest suites — 2800 checks")
flip("Project_Architecture_Document.md", "**2798 unit + 193 e2e**", "**2800 unit + 193 e2e**")
flip("Project_Architecture_Document.md", "139 Vitest suites with 2798 checks + 193 e2e checks in 11 spec",
     "139 Vitest suites with 2800 checks + 193 e2e checks in 11 spec")
flip("Project_Architecture_Document.md", "- [ ] `bun run test` — 2798/2798", "- [ ] `bun run test` — 2800/2800")
flip("Project_Architecture_Document.md", "| `bun run test` | root | 2798 unit checks |",
     "| `bun run test` | root | 2800 unit checks |")
flip("neo-crm_SKILL.md", "bun run test         # 2798/2798", "bun run test         # 2800/2800")
flip("neo-crm_SKILL.md", "| **unit total** | 139 files | **2798** |", "| **unit total** | 139 files | **2800** |")
flip("neo-crm_SKILL.md", "2798 unit checks + 193 e2e checks green; the session-201 layer",
     "2800 unit checks + 193 e2e checks green; the session-201 layer")
flip("neo-crm_SKILL.md", "2798-check Vitest / 193-check Playwright corpus",
     "2800-check Vitest / 193-check Playwright corpus")
flip("property-maintenance_SKILL.md", "2798-check Vitest / 193-check Playwright corpus",
     "2800-check Vitest / 193-check Playwright corpus")
flip("property-maintenance_SKILL.md", "| Unit | Vitest 5 (139 suites / 2798 checks) |",
     "| Unit | Vitest 5 (139 suites / 2800 checks) |")
flip("property-maintenance_SKILL.md", "## 7. The Test Corpus (2798 unit / 193 e2e)",
     "## 7. The Test Corpus (2800 unit / 193 e2e)")

print("ladder #2 walked (UNIT 2800 · E2E 193 HELD · badge 2993 · SUITES 139 HELD)")
