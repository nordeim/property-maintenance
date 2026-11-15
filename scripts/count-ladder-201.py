#!/usr/bin/env python3
"""Session-201 count-ladder walk: UNIT 2797 -> 2798 (+1: the F-201b
property-maintenance-SKILL lockstep pin) · E2E 193 HELD · badge
2990 -> 2991 (the unit+e2e arithmetic) · SUITES 139 HELD. Assert-first:
every replacement asserts its old form exists exactly once; a second
run is a verified no-op (every anchor already flipped)."""
from pathlib import Path

REPO = Path("/home/z/my-project/property-maintenance")


def flip(path: str, old: str, new: str, count: int = 1):
    p = REPO / path
    t = p.read_text()
    n = t.count(old)
    assert n == count, f"{path}: expected {count}x {old[:60]!r}, found {n}"
    p.write_text(t.replace(old, new, count))
    print(f"  {path}: {old[:48]!r} -> flipped")


# ── 1. the pin constants + the layer-axis pins ──────────────────────
flip("tests/docs-counts.test.ts",
     "const UNIT = 2797; // session-199: the landing suite's shrink + the public-site battery (2817 -> 2797)",
     "const UNIT = 2798; // session-201: +the F-201b property-maintenance-SKILL lockstep pin (2797 -> 2798)")
flip("tests/docs-counts.test.ts",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-200 layer`,",
     "`project_state: ${UNIT} unit checks + ${E2E} e2e checks green; the session-201 layer`,")
flip("tests/docs-counts.test.ts",
     '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s199 layer now beneath the s200 head)",',
     '"the head\'s SECOND layer must be the previous session\'s — the F-108a1 face (the s200 layer now beneath the s201 head)",')
flip("tests/docs-counts.test.ts",
     '"+ beneath it 2797 unit checks + 192 e2e checks green; the session-199 layer (THE OASIS RE-POINTING",',
     '"+ beneath it 2797 unit checks + 193 e2e checks green; the session-200 layer (THE OASIS PARITY SHIP",')

# ── 2. the four CLAUDE live positives (the F-92a3 ladder) ───────────
flip("tests/dialog-geometry-parity.test.ts",
     'expect(claude).toContain("Unit (Vitest, 2797 checks)"); // session-200: the count ladder',
     'expect(claude).toContain("Unit (Vitest, 2798 checks)"); // session-201: the count ladder')
flip("tests/dialog-geometry-parity.test.ts",
     'expect(claude).toContain("(currently 2797)");',
     'expect(claude).toContain("(currently 2798)");')
flip("tests/dialog-geometry-parity.test.ts",
     'expect(claude).toContain("Vitest unit suites (2797 checks)");',
     'expect(claude).toContain("Vitest unit suites (2798 checks)");')
flip("tests/dialog-geometry-parity.test.ts",
     'expect(claude).toContain("`bun run test` (2797)");',
     'expect(claude).toContain("`bun run test` (2798)");')

# ── 3. README: the badge (arithmetic-pinned) + the two sites ────────
flip("README.md", "tests-2990%20checks", "tests-2991%20checks")
flip("README.md", "139 Vitest suites (2797 checks)", "139 Vitest suites (2798 checks)")
flip("README.md", "# 2797 Vitest unit checks", "# 2798 Vitest unit checks")

# ── 4. CLAUDE: the four live sites ──────────────────────────────────
flip("CLAUDE.md", "`bun run test` (2797) → `bun run build`", "`bun run test` (2798) → `bun run build`")
flip("CLAUDE.md", "Vitest unit suites (2797 checks)", "Vitest unit suites (2798 checks)")
flip("CLAUDE.md", "Unit (Vitest, 2797 checks)", "Unit (Vitest, 2798 checks)")
flip("CLAUDE.md", "(currently 2797)", "(currently 2798)")

# ── 5. AGENTS: the two live sites (the historical session records
#        keep their ship-time counts by doctrine) ────────────────────
flip("AGENTS.md", "Unit tests (2797 checks)", "Unit tests (2798 checks)")
flip("AGENTS.md", "`bun run test` (2797) → `bun run build`", "`bun run test` (2798) → `bun run build`")

# ── 6. PAD: the five live sites ─────────────────────────────────────
flip("Project_Architecture_Document.md", "139 Vitest suites — 2797 checks", "139 Vitest suites — 2798 checks")
flip("Project_Architecture_Document.md", "**2797 unit + 193 e2e**", "**2798 unit + 193 e2e**")
flip("Project_Architecture_Document.md", "139 Vitest suites with 2797 checks + 193 e2e checks in 11 spec",
     "139 Vitest suites with 2798 checks + 193 e2e checks in 11 spec")
flip("Project_Architecture_Document.md", "- [ ] `bun run test` — 2797/2797", "- [ ] `bun run test` — 2798/2798")
flip("Project_Architecture_Document.md", "| `bun run test` | root | 2797 unit checks |",
     "| `bun run test` | root | 2798 unit checks |")

# ── 7. the neo-crm SKILL: the version + the head's s201 layer ───────
flip("neo-crm_SKILL.md", "version: 1.208.0", "version: 1.209.0")
flip("neo-crm_SKILL.md", "# NEO CRM — Engineering Skill (SKILL.md v1.208.0)",
     "# NEO CRM — Engineering Skill (SKILL.md v1.209.0)")
S201 = (
    "project_state: 2798 unit checks + 193 e2e checks green; the session-201 layer "
    "(THE STANDING VERIFICATION + THE SKILL LOCKSTEP — the post-200 audit round "
    "[the rotation trigger THE OWNER'S 157e592: the session_3.md archive]; the baseline "
    "GREEN at the s200 ship [lint 0/0 · tsc 0 · 139/2797 · build · smoke 14/14 · e2e "
    "193/193] — src/ UNCHANGED this round [the s200 site-header Radix cure re-audited "
    "clean]; THE /Dashboard PROBE [the reference's CRM family censused live at BOTH "
    "casings — every route its soft-404; the superset doctrine stands, OUR capital "
    "aliases render where the reference 404s — scripts/probe-201-crm-routes.ts]; "
    "THE FINDINGS [F-201a: the property-maintenance SKILL's three live e2e sites "
    "lagged the corpus (192 vs 193) — cured; F-201b: the document was entirely "
    "UNPINNED — the lockstep pin family born (the version↔H1 + every live-tense "
    "count site), stash-proven non-vacuous; +1 it]; THE CAPTURES [the s201 set "
    "16-21: the /Dashboard superset proof-pair + the mobile menu closed/open at 390 "
    "+ the home desktop/390]); "
    "+ beneath it 2797 unit checks + 193 e2e checks green; the session-200 layer (THE OASIS PARITY SHIP"
)
flip("neo-crm_SKILL.md",
     "project_state: 2797 unit checks + 193 e2e checks green; the session-200 layer (THE OASIS PARITY SHIP",
     S201)

# ── 8. the property-maintenance SKILL: the three count sites + the
#        version bump (guarded by the new F-201b pin) ────────────────
flip("property-maintenance_SKILL.md", "version: 1.0.0", "version: 1.1.0")
flip("property-maintenance_SKILL.md", "# property-maintenance — Engineering Skill (SKILL.md v1.0.0)",
     "# property-maintenance — Engineering Skill (SKILL.md v1.1.0)")
flip("property-maintenance_SKILL.md", "2797-check Vitest / 193-check Playwright corpus",
     "2798-check Vitest / 193-check Playwright corpus")
flip("property-maintenance_SKILL.md", "| Unit | Vitest 5 (139 suites / 2797 checks) |",
     "| Unit | Vitest 5 (139 suites / 2798 checks) |")
flip("property-maintenance_SKILL.md", "## 7. The Test Corpus (2797 unit / 193 e2e)",
     "## 7. The Test Corpus (2798 unit / 193 e2e)")

print("count-ladder-201: every site walked (UNIT 2798 · E2E 193 HELD · badge 2991 · SUITES 139 HELD)")
