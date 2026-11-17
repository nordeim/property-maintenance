#!/usr/bin/env python3
"""Session-218 count ladder: 2826 -> 2834 (+8 the session-218 pins) ·
SUITES 141 -> 142 (tests/session-218-audit.test.ts — the 142nd suite) ·
badge 3019 -> 3027 · the PAD §11 rate-limit row 135 -> 136 (the F-220a
cure) · the pm-SKILL v1.13.0 -> v1.14.0 · the neo-crm SKILL s218 head
layer (LINE-BOUNDED, marker stripped in-script — the F-218b doctrine).
Assert-first and idempotent (both-states)."""
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
    ("const UNIT = 2826;", "const UNIT = 2834;"),
    ("const SUITES = 141;", "const SUITES = 142;"),
    ("tests-3019%20checks", "tests-3027%20checks"),
], "UNIT + SUITES + badge")

# ---- README ------------------------------------------------------------------
walk("README.md", [
    ("tests-3019%20checks", "tests-3027%20checks"),
    ("| 🧪 Tested | 2826 Vitest unit checks", "| 🧪 Tested | 2834 Vitest unit checks"),
    ("# 141 Vitest suites (2826 checks)", "# 142 Vitest suites (2834 checks)"),
    (", session-215-audit, session-217-audit)", ", session-215-audit, session-217-audit, session-218-audit)"),
], "badge + Tested + tree + suite list")

# ---- AGENTS ------------------------------------------------------------------
walk("AGENTS.md", [
    ("|  Unit tests (2826 checks)", "|  Unit tests (2834 checks)"),
    ("`bun run test` (2826)", "`bun run test` (2834)"),
], "commands table + gate paragraph")

# ---- CLAUDE ------------------------------------------------------------------
walk("CLAUDE.md", [
    ("`bun run test` (2826)", "`bun run test` (2834)"),
    ("Vitest unit suites (2826 checks)", "Vitest unit suites (2834 checks)"),
    ("**Unit (Vitest, 2826 checks)**", "**Unit (Vitest, 2834 checks)**"),
    ("the seam (currently 2826)", "the seam (currently 2834)"),
], "gate + commands + Unit row + seam line")

# ---- PAD ---------------------------------------------------------------------
walk("Project_Architecture_Document.md", [
    ("# 141 Vitest suites — 2826 checks", "# 142 Vitest suites — 2834 checks"),
    ("| **Total** | **141** | **2826 unit + 193 e2e** |", "| **Total** | **142** | **2834 unit + 193 e2e** |"),
    ("HEAD: 141 Vitest suites with 2826 checks", "HEAD: 142 Vitest suites with 2834 checks"),
    ("`bun run test` — 2826/2826", "`bun run test` — 2834/2834"),
    ("| `bun run test` | root | 2826 unit checks |", "| `bun run test` | root | 2834 unit checks |"),
    ("| `src/lib/rate-limit.ts` | 135 |", "| `src/lib/rate-limit.ts` | 136 |"),
], "tree + totals + HEAD + checklist + scripts + rate-limit row")

# ---- pm-SKILL (v1.13.0 -> v1.14.0 + counts) ----------------------------------
walk("property-maintenance_SKILL.md", [
    ("version: 1.13.0", "version: 1.14.0"),
    ("# property-maintenance — Engineering Skill (SKILL.md v1.13.0)",
     "# property-maintenance — Engineering Skill (SKILL.md v1.14.0)"),
    ("2826-check Vitest / 193-check Playwright corpus",
     "2834-check Vitest / 193-check Playwright corpus"),
    ("| Unit | Vitest 5 (141 suites / 2826 checks) |", "| Unit | Vitest 5 (142 suites / 2834 checks) |"),
    ("## 7. The Test Corpus (2826 unit / 193 e2e)", "## 7. The Test Corpus (2834 unit / 193 e2e)"),
    ("- **Unit (Vitest, 141 suites):**", "- **Unit (Vitest, 142 suites):**"),
    ("(2826 unit / 193 e2e)", "(2834 unit / 193 e2e)"),
], "version + counts")

# ---- neo-crm SKILL: Appendix B totals + wall-clock + §11 gate block ----------
walk("neo-crm_SKILL.md", [
    ("| **unit total** | 141 files | **2826** |", "| **unit total** | 142 files | **2834** |"),
    ("~21 s (141 suites, one worker per file)", "~21 s (142 suites, one worker per file)"),
    ("bun run test         # 2826/2826", "bun run test         # 2834/2834"),
], "Appendix B + wall-clock + gate block")

# ---- the s218 head layer (LINE-BOUNDED, marker stripped in-script) -----------
SKILL = REPO / "neo-crm_SKILL.md"
src = SKILL.read_text(encoding="utf-8")
if "the session-218 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    S218_LAYER = (
        "project_state: 2834 unit checks + 193 e2e checks green; the session-218 layer "
        "(THE TWIN-PIN DEBT + THE REPLAY COMPLETION — the standing audit rotation, its "
        "rotation trigger the owner's 7438dcd [the session_26.md archive, the s217 "
        "execution record]; the baseline gate opened RED — the shipped s217 tree failed "
        "2/2826: the phone-baseline re-anchor moved the sweep source without its test "
        "twins, the F-218a pin-gap genus reborn [F-219a] — cured first, then the audit "
        "found seven more findings on the 6236cb6 collateral, none Critical: F-220a/b "
        "the F-218c narration cure missed two sites [the '7 rate-limited' survivor + "
        "the unpinned '13+ call sites' twin] · F-220c the s217 ladder anchored a "
        "phantom pm-SKILL 140-suites form [the REAL transition was the stale 139 -> "
        "141 — replay repaired] · F-220d two of the six neo-crm_SKILL re-anchors rode "
        "unrecorded manual steps [the F-218b genus reborn inside the F-218b cure "
        "session — both pairs recorded in-script now] · F-220e .env.example gained "
        "HEADLESS · F-220f the replay base-revision caret misname trued at three "
        "sites · F-220g the sitemap head comment reworded to the live root-1.0 scheme "
        "[the /dashboard omission recorded as the parity-mirroring decision]; THE "
        "CURES TDD [tests/session-218-audit.test.ts the 142nd suite — 7 of 8 pins "
        "RED-first at birth, F-219a teeth-proven during baseline triage]; the count "
        "ladder 2826 -> 2834 · SUITES 141 -> 142 · badge 3019 -> 3027 · the pm-SKILL "
        "v1.14.0; probe:ref STABLE [bundle ee166dd5] · the mobile-nav walk at 390 "
        "byte-MATCH [geometry {70,0,320,844} · 8 links · enter/0.5s — no Tailwind v4 "
        "bug]"
    )
    idx = src.index("project_state: 2826 unit checks + 193 e2e checks green; the session-217 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S218_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    SKILL.write_text(src, encoding="utf-8")
    n_flips += 1
    print("FLIP  the s218 head layer prepended (line-bounded, marker stripped)")

print(f"\n{n_flips} flip(s), {n_noop} noop(s)")
