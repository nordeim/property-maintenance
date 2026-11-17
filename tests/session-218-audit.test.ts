import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

// Session-218 (the standing rotation): the twin-pin debt + the replay
// completion. The audit of the 6236cb6 collateral found the s217 round
// left FOUR twin/replay gaps: the phone-baseline re-anchor moved the
// sweep source but not its test twins (F-219a — the SHIPPED tree was
// RED), the F-218c narration cure missed two sites (F-220a/b), the
// s217 ladder anchored a pm-SKILL form that never existed (F-220c),
// and two of the six neo-crm_SKILL re-anchors rode an unrecorded
// manual step (F-220d — the exact F-218b genus, reborn inside the
// F-218b cure session).

const read = (rel: string) =>
  existsSync(rel) ? readFileSync(rel, "utf-8") : "";

describe("session-218: the twin-pin debt + the replay completion", () => {
  it("F-219a: the sweep-tool twins carry the s217 adjudicated phone baselines (login 3.8 · not-found 2.9)", () => {
    const twins = read("tests/sweep-tool.test.ts");
    // the twins must ride the SAME values the s217 round adjudicated into
    // scripts/sweep.ts (measured 3.71/2.86, stable twice, probe:ref
    // STABLE — the s148 reference-side-shift precedent)
    expect(twins).toContain("expect(phone.login).toBe(3.8);");
    expect(twins).toContain('expect(standingBaseline(390)["not-found"]).toBe(2.9);');
    // the retired forms never return (the F-219a genus: a re-anchor that
    // moves the source without its test twin)
    expect(twins).not.toContain("expect(phone.login).toBe(3);");
    expect(twins).not.toContain('expect(standingBaseline(390)["not-found"]).toBe(2);');
  });

  it("F-220a: rate-limit.ts tells the 9-route census at EVERY site (the s217 cure missed line 12)", () => {
    const rl = read("src/lib/rate-limit.ts");
    expect(rl).not.toContain("the 7 rate-limited routes");
    expect(rl).toContain("the 9 rate-limited routes");
  });

  it("F-220b: the retired '13+ call sites' form is gone from the unpinned twin file too (tests/rate-limit.test.ts)", () => {
    const t = read("tests/rate-limit.test.ts");
    expect(t).not.toContain("13+ call sites");
    expect(t).toContain("9 call sites");
  });

  it("F-220c: count-ladder-217.py anchors the REAL pm-SKILL transition (139 -> 141, never the phantom 140)", () => {
    const script = read("scripts/count-ladder-217.py");
    // the pre-s217 pm-SKILL carried the stale 139 (F-218a's own defect)
    // — the ladder must walk the transition that actually happened
    expect(script).toContain(
      '("- **Unit (Vitest, 139 suites):**", "- **Unit (Vitest, 141 suites):**")',
    );
    expect(script).not.toContain('"- **Unit (Vitest, 140 suites):**"');
  });

  it("F-220d: skill-head-217.py replays ALL SIX neo-crm_SKILL re-anchors (the two manual steps recorded in-script)", () => {
    const script = read("scripts/skill-head-217.py");
    // the §11 gate block and the Appendix B unit-total row flipped
    // 2822 -> 2826 in the shipped artifact but rode unrecorded manual
    // edits — the script must carry both pairs (the replay == artifact
    // property extended to every site the round touched)
    expect(script).toContain('must_replace(\n    "bun run test         # 2822/2822",');
    expect(script).toContain(
      'must_replace(\n    "| **unit total** | 140 files | **2822** |",',
    );
  });

  it("F-220e: .env.example documents HEADLESS in the parity-tools block (four tools consume it)", () => {
    const envExampleNorm = read(".env.example")
      .replace(/\n#\s?/g, " ")
      .replace(/\s+/g, " ");
    // Session-219 (F-221b): the bare HEADLESS token upgraded to the house
    // idiom — block header + the full knob row (moving the token to any
    // other block, or gutting the row while keeping the word, goes RED).
    expect(envExampleNorm).toContain("Parity-gate tooling (optional)");
    expect(envExampleNorm).toContain(
      "HEADLESS=0 watches the browser-driven captures (unset = headless)",
    );
  });

  it("F-220f: the replay base revision is named WITHOUT the caret at every site (32c3ea7, never 32c3ea7^)", () => {
    // the s217 replay runs against `git show 32c3ea7:…` (the s216 ship
    // state, where the demoted head exists). The caret form names
    // 67a0c09 — the pre-s216 tree — and would fail the replay.
    expect(read("tests/session-217-audit.test.ts")).not.toContain("32c3ea7^");
    expect(read("scripts/skill-head-217.py")).not.toContain("32c3ea7^");
    // the LIVE head layer (the first 40 lines carry the s217 layer +
    // the demoted s216 line; history blocks below keep their own forms)
    const head = read("neo-crm_SKILL.md").split("\n").slice(0, 40).join("\n");
    expect(head).not.toContain("32c3ea7^");
  });

  it("F-220g: the sitemap head comment describes the LIVE priority scheme (the root rides 1.0) and records the /dashboard omission", () => {
    const src = read("src/app/sitemap.xml/route.ts");
    // the retired neo-crm claim ("1.0" for the dashboard) never returns
    expect(src).not.toContain('priority "1.0" for the dashboard');
    expect(src).not.toContain('"1.0" for the\n// dashboard');
    // the live scheme: the root rides 1.0 (the s142 landing repurpose)
    expect(src).toContain('priority "1.0" for the root');
    expect(src).toContain("no dashboard entry");
  });
});
