#!/usr/bin/env python3
"""Session-219 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.219.0 -> v1.220.0 (the F-221j cure — the version rode un-bumped through
the whole s218 round; every prior session bumped) · the s219 layer LIVE at
the head (2843/193 — the +9-pin round: 143 suites) · the s218 head layer
demoted to beneath-it at its own ship counts (2834/193) · the Appendix B
totals (142/2834 -> 143/2843) · the wall-clock phrase · the §11 gate block.

The demotion is LINE-BOUNDED and marker-stripping IN THE SCRIPT (the
F-218b doctrine) — the script's replay == the shipped artifact. Assert-
first: every anchor must exist exactly once or the script refuses.
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
        print(f"MISS  {desc} — anchor not found: {old[:70]!r}")
        sys.exit(1)
    if src.count(old) != 1:
        print(f"AMBIG {desc} — {src.count(old)} matches")
        sys.exit(1)
    src = src.replace(old, new)
    n_flips += 1
    print(f"FLIP  {desc}")


# 1. the version pair (frontmatter + H1) — the F-221j cure
must_replace("version: 1.219.0", "version: 1.220.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.219.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.220.0)",
    "the H1 version",
)

# 2. last_updated rides the round
must_replace("last_updated: 2026-11-16", "last_updated: 2026-11-17", "the last_updated date")

# 3. the head surgery: prepend the s219 layer, demote the s218 head line
#    — LINE-BOUNDED, the marker stripped in-script (the F-218b doctrine).
HEAD_MARKER = "project_state: "
S219_LAYER = (
    "project_state: 2843 unit checks + 193 e2e checks green; the session-219 layer "
    "(THE HISTORY-ENTRY DEBT + THE GUARD-RECREATION ROUND — the standing audit "
    "rotation, its rotation trigger the owner's eee1dd1 [the session_28.md archive, "
    "the s218 execution record]; the baseline gate GREEN at the exact s218 ship "
    "state [lint 0/0 · tsc 0 · 142/2834 · build · probe:ref STABLE at ee166dd5 · "
    "the mobile-nav walk at 390 byte-MATCH — geometry {70,0,320,844} · 8 links · "
    "enter/0.5s, no Tailwind v4 bug] — the first round since s216 to open GREEN: "
    "no F-219a twin-pin debt at birth); the audit (the web-application skill "
    "dimensions over the 85ed531 collateral) found eight findings, none "
    "Critical/High: F-221a the pm-SKILL v1.14.0 bump shipped without its "
    "Session-218 history entry [§10 carries 213/214/215/217/216 — the 218 round "
    "is the FIRST version bump with no record; the entry landed at the head of "
    "the history family] · F-221b the F-220e pin under-pinned [a bare HEADLESS "
    "token — upgraded to the house idiom: block header + full knob row] · F-221c "
    "the s192/F-218 negatives-ladder doctrine not carried to the s218-retired "
    "2826/141/3019 forms [the s217 round joined its own retired forms one session "
    "earlier; the s218 round joined none — the negatives walk all six doc faces "
    "now] · F-221f the session_27 .envexample typo [the dot restored] · F-221g "
    "the .env.example parity block naming the wrong HEADLESS consumers [missed "
    "recon-199.ts, named the two non-readers — the list trued to the four real "
    "readers] · F-221h the D-205a2 env-face totality contract unenforced since "
    "the lineage reset [THE GUARD RECREATED: the pin walks every process.env "
    "consumer in src/ + scripts/ against .env.example, whole-token line-anchored, "
    "both arms; teeth proven the F-174a way — a planted undocumented knob made "
    "exactly its pin RED, reverted, GREEN] · F-221i the sitemap head comment's "
    "'the one aliased casing' claim stale since s24 [nine aliases now — the "
    "comment trued, the F-220g-pinned phrases preserved] · F-221j the neo-crm "
    "SKILL version not bumped at s218 [1.219.0 held through a head-layer round; "
    "1.220.0 now]; dispositioned no-cure: F-221d [the s211 count exception — the "
    "documented 'keeps exactly what it said' doctrine] + F-221e [the dual-lineage "
    "layer-name collisions — count-scoped anchors unaffected; a bare-name anchor "
    "would AMBIG-fail loudly, the designed guard]; THE CURES TDD "
    "[tests/session-219-audit.test.ts the 143rd suite — 7 of 9 pins RED-first at "
    "birth, F-221h teeth-proven by live plant]; THE COUNT LADDER 2834 -> 2843 "
    "(+9: the s219 pins) · SUITES 142 -> 143 · badge 3027 -> 3036; probe:ref "
    "STABLE [bundle ee166dd5] · the mobile-nav walk at 390 byte-MATCH"
)
if "the session-219 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index("project_state: 2834 unit checks + 193 e2e checks green; the session-218 layer")
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S219_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s218 line demoted, marker stripped in-script, LINE-BOUNDED)")

# 4. Appendix B totals row + wall-clock phrase + §11 gate block
must_replace(
    "| **unit total** | 142 files | **2834** |",
    "| **unit total** | 143 files | **2843** |",
    "the Appendix B unit-total row",
)
must_replace(
    "~21 s (142 suites, one worker per file)",
    "~21 s (143 suites, one worker per file)",
    "the Appendix B wall-clock phrase",
)
must_replace(
    "bun run test         # 2834/2834",
    "bun run test         # 2843/2843",
    "the §11 gate block (the unit count)",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S219_LAYER)} chars of s219 layer")
