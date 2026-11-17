#!/usr/bin/env python3
"""Session-199 (Task 199 / the property-maintenance checkout round) — the
doc-truth re-anchor script (WP-1 of the plan
docs/plans/2026-11-15-session199-oasis-clone-build.md).

The checkout carries the corpus at the s198 ship state (2817 unit / 195 e2e,
live-verified) while the owner's doc sync landed the s210-era doc layers
(2858/226/3084).  Per the house doctrine (code wins; docs follow in the same
commit), every LIVE-TENSE count site re-anchors to the checkout's truth.
Historical session layers keep their own numbers BY DESIGN (the F-100a2
history-record doctrine).

Assert-first + idempotent: every edit names its unique "before" (the script
fails loudly if a site is missing or ambiguous); a re-run is a verified no-op.
"""
from __future__ import annotations

import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def reanchor(path: Path, pairs: list[tuple[str, str]]) -> None:
    """Apply exact single-occurrence replacements; assert each BEFORE count."""
    text = path.read_text(encoding="utf-8")
    for before, after in pairs:
        n = text.count(before)
        if n == 0:
            if after in text:
                print(f"  [idempotent] {path.name}: already anchored: {before[:60]!r}")
                continue
            raise SystemExit(f"MISSING in {path.name}: {before!r}")
        if n > 1:
            raise SystemExit(f"AMBIGUOUS ({n}x) in {path.name}: {before!r}")
        text = text.replace(before, after)
        print(f"  [anchored] {path.name}: {before[:58]!r} -> {after[:58]!r}")
    path.write_text(text, encoding="utf-8")


def main() -> None:
    print("== WP-1: the live-tense count re-anchors (2858->2817 · 226->195 · 3084->3012) ==")

    # ---- README.md -----------------------------------------------------
    reanchor(
        REPO / "README.md",
        [
            # :8 the badge (unit + e2e arithmetic: 2817 + 195 = 3012)
            ("tests-3084%20checks", "tests-3012%20checks"),
            # :65 the Tested row (the headline live-tense row)
            (
                "2858 Vitest unit checks + 226 Playwright E2E checks",
                "2817 Vitest unit checks + 195 Playwright E2E checks",
            ),
            # :142-143 the file tree
            ("# 138 Vitest suites (2858 checks)", "# 138 Vitest suites (2817 checks)"),
            ("# Playwright (226 checks)", "# Playwright (195 checks)"),
            # :204-206 the commands comment
            ("# 2858 Vitest unit checks (", "# 2817 Vitest unit checks ("),
            ("# 226 Playwright checks on :3100", "# 195 Playwright checks on :3100"),
        ],
    )

    # ---- AGENTS.md -----------------------------------------------------
    reanchor(
        REPO / "AGENTS.md",
        [
            ("|  Unit tests (2858 checks)", "|  Unit tests (2817 checks)"),
            ("|  Browser E2E (226 checks)", "|  Browser E2E (195 checks)"),
            ("`bun run test` (2858)", "`bun run test` (2817)"),
            # the gate-order e2e half (AGENTS :36-38 carries it)
            ("`bun run test:e2e` (226)", "`bun run test:e2e` (195)"),
        ],
    )

    # ---- CLAUDE.md -----------------------------------------------------
    reanchor(
        REPO / "CLAUDE.md",
        [
            ("`bun run test` (2858)", "`bun run test` (2817)"),
            ("`bun run test:e2e` (226)", "`bun run test:e2e` (195)"),
            ("Vitest unit suites (2858 checks)", "Vitest unit suites (2817 checks)"),
            (
                "Playwright E2E (226 checks, needs build first)",
                "Playwright E2E (195 checks, needs build first)",
            ),
            ("**Unit (Vitest, 2858 checks)**", "**Unit (Vitest, 2817 checks)**"),
            ("**E2E (Playwright, 226 checks)**", "**E2E (Playwright, 195 checks)**"),
            ("the seam (currently 2858)", "the seam (currently 2817)"),
        ],
    )

    # ---- Project_Architecture_Document.md ------------------------------
    reanchor(
        REPO / "Project_Architecture_Document.md",
        [
            ("# 138 Vitest suites — 2858 checks", "# 138 Vitest suites — 2817 checks"),
            (
                "| **Total** | **138** | **2858 unit + 226 e2e** | | |",
                "| **Total** | **138** | **2817 unit + 195 e2e** | | |",
            ),
            (
                "HEAD: 138 Vitest suites with 2858 checks + 226 e2e checks",
                "HEAD: 138 Vitest suites with 2817 checks + 195 e2e checks",
            ),
            ("`bun run test` — 2858/2858", "`bun run test` — 2817/2817"),
            ("| `bun run test` | root | 2858 unit checks |", "| `bun run test` | root | 2817 unit checks |"),
            ("+ setup project — 226 checks", "+ setup project — 195 checks"),
            # §11 the Lines-column rows (live file counts)
            ("| `tests/e2e/a11y.spec.ts` | 984 |", "| `tests/e2e/a11y.spec.ts` | 436 |"),
            ("| `tests/dialog-controls.test.ts` | 581 |", "| `tests/dialog-controls.test.ts` | 175 |"),
        ],
    )

    # ---- neo-crm_SKILL.md ----------------------------------------------
    reanchor(
        REPO / "neo-crm_SKILL.md",
        [
            # §11's pre-ship gate block
            ("bun run test         # 2858/2858", "bun run test         # 2817/2817"),
            # Appendix B the unit total
            ("| **unit total** | 138 files | **2858**", "| **unit total** | 138 files | **2817**"),
            # Appendix B the a11y row (the live test() census)
            ("| `tests/e2e/a11y.spec.ts` | 64 |", "| `tests/e2e/a11y.spec.ts` | 33 |"),
        ],
    )

    print("== WP-1 doc re-anchors complete ==")


if __name__ == "__main__":
    try:
        main()
    except SystemExit as e:
        print(f"FAILED: {e}", file=sys.stderr)
        sys.exit(1)
