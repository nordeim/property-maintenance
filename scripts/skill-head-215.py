#!/usr/bin/env python3
"""Session-215 SKILL head surgery (neo-crm_SKILL.md, the engineering log):
v1.216.0 -> v1.217.0 · the s215 layer LIVE at the head (2822/193) · the
s211 head layer comment-demoted to its ship counts (2816 — wait, the s211
layer shipped at 2801/193; the HEAD's s211 layer carried the LATER counts
2816/193 because s212-s214 bumped counts in place without prepending
layers — the honest form: the demoted line keeps exactly what it said,
only the marker changes) · Appendix B re-anchored (139->140 files ·
2816->2822 checks) · §11's gate block re-anchored · last_updated.

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
    if old in src and new == old:
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


# 1. the version pair (frontmatter + H1)
must_replace("version: 1.216.0", "version: 1.217.0", "the frontmatter version")
must_replace(
    "# NEO CRM — Engineering Skill (SKILL.md v1.216.0)",
    "# NEO CRM — Engineering Skill (SKILL.md v1.217.0)",
    "the H1 version",
)
must_replace("last_updated: 2026-11-15", "last_updated: 2026-11-16", "the date")

# 2. the head surgery: prepend the s215 layer, demote the s211 head line
#    (the line keeps its own text; only the layer becomes "beneath it")
HEAD_ANCHOR = "project_state: 2816 unit checks + 193 e2e checks green; the session-211 layer"
S215_LAYER = (
    "project_state: 2822 unit checks + 193 e2e checks green; the session-215 layer "
    "(THE OTP LOG VALVE + THE BUCKET SWEEP DEBT + THE PAST-DATE GATE — the standing "
    "audit rotation, its rotation trigger the owner's f16b339 [the session_20.md "
    "archive, the s214 execution record]; the baseline gate GREEN at the exact s214 "
    "ship state [lint 0/0 · tsc 0 · 139/2816 · db census MATCH] + probe:ref STABLE "
    "[bundle ee166dd5 — no parity event] + the mobile-nav walk at 390 re-verified "
    "live [geometry {70,0,320,844} byte-MATCH · 8-link vocabulary · animation "
    "enter/0.5s — no Tailwind v4 bug]); the audit found five findings (2 Med · 3 "
    "Low, none Critical/High): F-216a the OTP verification code's console.info "
    "logged UNCONDITIONALLY in signup+resend (the NEO_DISABLE_IN_APP_OTP kill-switch "
    "nulled the response payload but the log line still wrote every 6-digit code to "
    "stdout — the valve now rides INSIDE the gate, both routes) · F-216b the two "
    "PUBLIC POST routes (bookings + quote-requests) never called sweepRateLimits() "
    "(the auth family's 7 routes sweep on every request; the two most "
    "stranger-exposed endpoints on a public marketing site now join the idiom — the "
    "login route's own placement, after the limiter so denied requests sweep too) · "
    "F-216c bookingCreateSchema.date validated FORMAT only (the UI's react-day-picker "
    "disabled={before: new Date()} now mirrored server-side at DAY granularity — "
    "today bookable, yesterday rejected — + the real-calendar refinement the "
    "web-application skill §7 doctrine prescribes [regex alone accepts 2026-02-30]) "
    "· F-216d the parity tools' REF_EMAIL/REF_PASSWORD env fallbacks recorded (the "
    "documented demo pair — no change) · F-216e booking.ts's serviceIdByLabel/"
    "calendarGrid recorded as test-pinned seams (no change); THE TDD: six pins "
    "RED-first in tests/session-215-audit.test.ts (the 140th suite) — the two "
    "log-valve ordering pins [the log line AFTER the gate's declaration, never "
    "before] + the two sweep pins [the import + the call] + the two date pins "
    "[yesterday rejected with the exact message · today+tomorrow accepted · "
    "2026-02-30 rejected by the CALENDAR refinement, not the regex] — all six RED "
    "at birth, GREEN after the cures; the count ladder 2816 -> 2822 (+6) · SUITES "
    "139 -> 140 · E2E 193 HELD · badge 3009 -> 3015 — every live-tense site "
    "re-anchored (count-ladder-215.py, assert-first, idempotent); the collateral: "
    "src/lib/schemas.ts 784 -> 814 lines [the F-216c refinements] with the §7.4 "
    "heading re-anchored; THE VERIFICATION: lint 0/0 · tsc 0 · 140/2822 unit · "
    "build · smoke 14/14 · e2e 193/193 · the drift-gate battery · the mobile-nav "
    "walk byte-MATCH · captures 69)"
)
if "the session-215 layer" in src:
    print("NOOP  the head layer (already prepended)")
else:
    idx = src.index(HEAD_ANCHOR)
    # the s211 layer line becomes the "beneath it" continuation
    # Session-217 (F-218b): the marker strip rides IN THE SCRIPT now —
    # LINE-BOUNDED to the head line's own extent (never the rest of the
    # file) — the replay == the shipped artifact, the s216 repair's
    # latent twin.
    end = src.index("\n", idx)
    demoted_line = src[idx:end].replace("project_state: ", "", 1)
    src = src[:idx] + S215_LAYER + "\n + + beneath it " + demoted_line + src[end:]
    n_flips += 1
    print("FLIP  the head layer prepended (the s211 line demoted to beneath-it, marker stripped in-script)")

# 3. Appendix B totals
must_replace(
    "| **unit total** | 139 files | **2816** |",
    "| **unit total** | 140 files | **2822** |",
    "the Appendix B unit-total row",
)
must_replace(
    "bun run test         # 2816/2816",
    "bun run test         # 2822/2822",
    "the §11 gate block",
)

SKILL.write_text(src, encoding="utf-8")
print(f"\n{n_flips} flip(s); {len(S215_LAYER)} chars of s215 layer")
