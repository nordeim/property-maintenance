#!/usr/bin/env python3
"""Session-216 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.217.0 -> v1.218.0 · the s216 layer LIVE at the head (2822/193 HELD —
the round is comment + pin upgrades only) · the s215 head layer demoted
to beneath-it at its own ship counts · the §7.4 schemas.ts line count
re-anchor (814 -> 827, the F-217a caveat comment grew it) · last_updated.

The head layer is a SINGLE LINE (the + + continuation form is the diff
record; the file itself is one line per layer).
"""
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SKILL = REPO / "neo-crm_SKILL.md"

src = SKILL.read_text(encoding="utf-8")
n_flips = 0


def must_replace(old: str, new: str, desc: str) -> None:
    global src, n_flips
    if old == new:
        return
    if new in src and old not in src:
        print(f"NOOP  {desc} (already re-anchored)")
        return
    if old not in src:
        print(f"MISS  {desc} — anchor not found: {old[:80]!r}")
        sys.exit(1)
    if src.count(old) != 1:
        print(f"AMBIG {desc} — {src.count(old)} matches")
        sys.exit(1)
    src = src.replace(old, new)
    n_flips += 1
    print(f"FLIP  {desc}")


# 1. the version pair (frontmatter + H1) + the date
must_replace("version: 1.217.0", "version: 1.218.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.217.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.218.0)",
    "the H1 version",
)
must_replace("last_updated: 2026-11-16", "last_updated: 2026-11-16", "the date (held)")

# 2. the head surgery: prepend the s216 layer, demote the s215 head line
HEAD_ANCHOR = "project_state: 2822 unit checks + 193 e2e checks green; the session-215 layer"
S216_LAYER = (
    "project_state: 2822 unit checks + 193 e2e checks green; the session-216 layer "
    "(THE PIN-CONTAINMENT DEBT + THE STALE-NARRATION HYGIENE — the standing audit "
    "rotation, its rotation trigger the owner's 67a0c09 [the session_22.md archive, "
    "the s215 execution record]; the baseline gate GREEN at the exact s215 ship state "
    "[lint 0/0 · tsc 0 · 140/2822 · db census MATCH] + probe:ref STABLE [bundle "
    "ee166dd5] + the mobile-nav walk at 390 re-verified live [geometry {70,0,320,844} "
    "byte-MATCH · 8-link vocabulary · animation enter/0.5s — no Tailwind v4 bug]); the "
    "audit found four findings on the 5e8f73d collateral (none Critical/High — the "
    "s215 cures themselves verified placement-correct across all nine limiter routes, "
    "leap-year-correct, side-effect-free): F-217a the past-date gate's cross-TZ skew "
    "DISPOSITIONED (the local-clock mirror stays as-shipped — the single-TZ "
    "self-hosted unit is the documented contract; the reference validates nothing, so "
    "any tolerance window exceeds parity; the honest caveat now lives at the "
    "schemas.ts site) · F-217b the pin-containment debt CURED (the F-216a ordering "
    "proxies upgraded to brace-window containment pins [extractGateBlock, "
    "brace-matching from the gate's line] + the F-216b existence pins upgraded to "
    "placement pins [the sweep between the limiter and the denied return — the login "
    "route's exact idiom]; TEETH PROVEN the F-174a way: the live plant of each "
    "defect genus [the console.info hoisted below the gate's closing brace · the "
    "sweep moved after the denied return] made exactly its pin RED, reverted, "
    "GREEN — the pins now fail on the refactors their comments narrate) · F-217c "
    "the signup route's stale block-comment unified (the two adjacent comments tell "
    "one story now) · F-217d the count-ladder-215.py docstring truth (the "
    "'SUITES 139 HELD' self-contradiction corrected; the out-of-band AGENTS "
    "file-tree site documented); THE CORPUS HELD [lint 0/0 · tsc 0 · 140/2822 unit "
    "— the round touched no executable semantics, comments + pins only · build · "
    "smoke 14/14 · e2e 193/193] + the drift-gate battery + captures 71; the "
    "collateral: src/lib/schemas.ts 814 -> 827 lines [the F-217a caveat] with the "
    "§7.4 heading re-anchored"
)
if "the session-216 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index(HEAD_ANCHOR)
    # Session-217 (F-218b): the demotion strips the prior head LINE's
    # `project_state: ` marker IN THE SCRIPT — the s215/s216 surgeries
    # relied on an unrecorded manual strip step after the splice, so a
    # from-scratch replay produced ` + + beneath it project_state:
    # 2822 …` (the stray-marker genus) instead of the shipped
    # marker-less line. The strip is LINE-BOUNDED (the head line's own
    # extent, up to its newline — never the rest of the file, which
    # carries its own later `project_state:` occurrences in the
    # retired history blocks). The committed script is now the record
    # of the committed artifact (tests/session-217-audit.test.ts
    # replays this arithmetic against git history and asserts the
    # byte-for-byte equality).
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S216_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s215 line demoted to beneath-it, marker stripped in-script)")

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S216_LAYER)} chars of s216 layer")
