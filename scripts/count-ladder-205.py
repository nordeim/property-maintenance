#!/usr/bin/env python3
"""Session-205 D: the COUNT LADDER walk — the unit corpus 2800 -> 2801
(the F-205g side-sheet anatomy pin). Every LIVE-TENSE count site walks
in the same stroke; the historical session records (the s192/s193
ladder narrations inside AGENTS.md, the retired ship counts) stay
untouched by design. Assert-first, idempotent."""
from pathlib import Path

R = Path("/home/z/my-project/property-maintenance")

def patch(path, pairs):
    p = R / path
    s = p.read_text()
    orig = s
    for old, new in pairs:
        n = s.count(old)
        assert n >= 1, f"{path}: 0x {old[:70]!r}"
        s = s.replace(old, new)
        print(f"  {path}: {n}x {old[:56]!r} -> walked")
    assert s != orig, f"{path}: no change"
    p.write_text(s)

# ── 1. README.md — the badge (unit+e2e arithmetic), the file tree, the
#      commands comment, the Tested row ──
patch("README.md", [
    ("tests-2993%20checks", "tests-2994%20checks"),
    ("139 Vitest suites (2800 checks)", "139 Vitest suites (2801 checks)"),
    ("# 2800 Vitest unit checks (", "# 2801 Vitest unit checks ("),
    ("| 🧪 Tested | 2800 Vitest unit checks", "| 🧪 Tested | 2801 Vitest unit checks"),
])

# ── 2. AGENTS.md — the commands table + the gate-order line (the
#      historical ladder narrations at :11906/:12067 stay) ──
patch("AGENTS.md", [
    ("|  Unit tests (2800 checks)      | `bun run test`", "|  Unit tests (2801 checks)      | `bun run test`"),
    ("`bun run test` (2800) → `bun run build`", "`bun run test` (2801) → `bun run build`"),
])

# ── 3. CLAUDE.md — the gate-order line, the commands table, the tier
#      line, the seam line ──
patch("CLAUDE.md", [
    ("`bun run test` (2800) → `bun run build`", "`bun run test` (2801) → `bun run build`"),
    ("Vitest unit suites (2800 checks)", "Vitest unit suites (2801 checks)"),
    ("**Unit (Vitest, 2800 checks)**", "**Unit (Vitest, 2801 checks)**"),
    ("the seam (currently 2800)", "the seam (currently 2801)"),
])

# ── 4. Project_Architecture_Document.md — the file tree, the Total
#      row, the HEAD line, the checklist, the commands table ──
patch("Project_Architecture_Document.md", [
    ("139 Vitest suites — 2800 checks", "139 Vitest suites — 2801 checks"),
    ("**2800 unit + 193 e2e**", "**2801 unit + 193 e2e**"),
    ("139 Vitest suites with 2800 checks", "139 Vitest suites with 2801 checks"),
    ("`bun run test` — 2800/2800", "`bun run test` — 2801/2801"),
    ("`bun run test` | root | 2800 unit checks", "`bun run test` | root | 2801 unit checks"),
])

# ── 5. property-maintenance_SKILL.md — the frontmatter description, the
#      stack table, the §7 heading ──
patch("property-maintenance_SKILL.md", [
    ("2800-check Vitest / 193-check Playwright corpus", "2801-check Vitest / 193-check Playwright corpus"),
    ("Vitest 5 (139 suites / 2800 checks)", "Vitest 5 (139 suites / 2801 checks)"),
    ("## 7. The Test Corpus (2800 unit / 193 e2e)", "## 7. The Test Corpus (2801 unit / 193 e2e)"),
])

print("\nLADDER WALKED: unit 2800 -> 2801 · badge 2993 -> 2994 at every live-tense site")
