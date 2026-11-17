// Session-220 audit pins: the ship-time truth debt + the history-entry
// debt (reborn). The audit (the web-application skill dimensions over the
// 09924dd collateral) found eleven findings: F-222a the pm-SKILL v1.15.0
// bump shipped without its own Session-219 history entry (the F-221a
// genus reborn inside the F-221a cure session) · F-222b/c the worklog
// Task-219 Stage Summary + session_29.md's battery paragraph claim gates
// that had NOT finished at ship time (the e2e completed ~6 min AFTER the
// push; the drift-gate battery never ran in the s219 window) — the
// doc-truth genus this project polices, asserted in its own records ·
// F-222d the "all six doc faces" negatives-ladder misdescription shipped
// in three records (the block walks FOUR faces — the pm-SKILL face rides
// the F-201b positive lockstep and the neo-crm face keeps its demoted
// layer's ship counts by design) · F-222e the F-221h reverse-arm regex
// digit-blind — it silently exempts E2E_PORT, the one knob that
// falsifies the "every documented knob is consumed" claim · F-222f the
// F-221b/F-221g pins' co-location blindness (whole-file normalization
// defeats the block-scoping their comments claim) · F-222g the worklog
// severity tally contradicts the round's own table (3/3/2 not 2/3/3) ·
// F-222h the F-221a description mislocates the s213/s214 entries (they
// live in §7, not §10) across five records · F-222i the pm-SKILL
// last_updated not ridden through the v1.15.0 bump · F-222j the
// s212-214 layer gap (pre-existing, documented — dispositioned no-cure).
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

describe("session-220: the ship-time truth debt + the history-entry debt (reborn)", () => {
  it("F-222a: the pm-SKILL version history carries the Session-219 entry (the v1.15.0 bump's own record)", () => {
    const skill = read("property-maintenance_SKILL.md");
    expect(skill).toContain("**Session-219's layers:**");
    const entry = skill.split("**Session-219's layers:**")[1]?.split("\n- **Session-")[0] ?? "";
    expect(entry).toContain("F-221a");
    expect(entry).toContain("F-221h");
    expect(entry).toContain("the 143rd suite");
    expect(entry).toContain("2843");
  });

  it("F-222b: the worklog Task-219 Stage Summary tells the ship-time truth (the e2e finished post-push; the drift gates ran at the s220 catch-up)", () => {
    const wl = read("worklog.md");
    const task219 = (wl.split("## Task 219")[1]?.split("## Task 218")[0] ?? "")
      .replace(/\n/g, " ") // hard wraps join (lines start at column 0)
      .replace(/\s+/g, " ");
    // the honest form: the e2e named as post-ship verification, not a
    // ship-time gate
    expect(task219).not.toMatch(/Stage Summary:.*?e2e 193\/197|Stage Summary:.*?e2e 193\/193/);
    expect(task219).toContain("the e2e finished 193/193 minutes after the push");
    expect(task219).toContain("the drift-gate battery ran at the s220 catch-up");
  });

  it("F-222c: session_29.md's battery paragraph claims no gate before its evidence existed", () => {
    const log = read("docs/session_29.md");
    // the battery claim + its ship-time-truth correction read together
    const para = (log.split("The verification battery:")[1]?.split("## ")[0] ?? "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ");
    expect(para).toContain("the e2e finished 193/193 minutes after the push");
    expect(para).not.toContain("· the drift-gate battery (4 bands + fullpage + census) ·");
    expect(para).toContain("the drift-gate battery ran at the s220 catch-up");
  });

  it("F-222d: the negatives-ladder narration says FOUR faces, not six (the live sites trued; the s220 layer records the true form)", () => {
    const log = read("docs/session_29.md");
    expect(log).not.toContain("across all six doc faces");
    expect(log).toContain("the four doc faces the s217 block walks");
    // the s220 head layer records the TRUE form (the demoted s219 layer
    // keeps its shipped text per the frozen-record doctrine — history is
    // never rewritten, only superseded). The s220 layer quotes the retired
    // claim as the finding it records — the true-form assertion keys on
    // the layer's OWN cure narration, not the quoted genus.
    const skill = read("neo-crm_SKILL.md");
    const s220 = skill.slice(0, skill.indexOf("the session-219 layer"));
    expect(s220).toContain("the four doc faces");
    expect(s220).toContain("four doc faces");
  });

  it("F-222e: the F-221h reverse arm is digit-aware (E2E_PORT visible) + the tests-only carve-out documented", () => {
    const pins = read("tests/session-219-audit.test.ts");
    expect(pins).toContain("envExample.matchAll(/^#?\\s*([A-Z_][A-Z0-9_]*)\\s*=/gm)");
    // the honest carve-out: E2E_PORT is the documented tests-only knob
    expect(pins).toContain("E2E_PORT");
    expect(pins).toMatch(/tests-only|test-only|tests\//);
  });

  it("F-222f: the F-221b/F-221g pins carry co-location teeth (the parity block sliced, not the whole file)", () => {
    const s218 = read("tests/session-218-audit.test.ts");
    expect(s218).toContain("Parity-gate tooling");
    expect(s218).toContain("----");
    const s219 = read("tests/session-219-audit.test.ts");
    expect(s219).toContain("---- Parity-gate tooling");
    expect(s219).toContain("----");
  });

  it("F-222g: the worklog Task-219 severity tally matches the round's own table (3 Medium, 3 Low, 2 Info)", () => {
    const wl = read("worklog.md");
    const task219 = wl.split("## Task 219")[1]?.split("## Task 218")[0] ?? "";
    expect(task219).toContain("(3 Medium, 3 Low, 2 Info)");
    expect(task219).not.toContain("(2 Medium, 3 Low, 3 Info)");
  });

  it("F-222h: the F-221a description names the entries' real home (the s213/s214 entries live in §7, only 215/217/216 in §10)", () => {
    const log = read("docs/session_29.md");
    expect(log).not.toContain("§10 carried 213/214/215/217/216");
    const pins = read("tests/session-219-audit.test.ts");
    expect(pins).toContain("§7 (213/214) and §10 (215/217/216)");
  });

  it("F-222i: the pm-SKILL last_updated rode the v1.15.0 bump (2026-11-17)", () => {
    const skill = read("property-maintenance_SKILL.md");
    expect(skill).toContain("last_updated: 2026-11-17");
  });

  it("F-222a/R-09: the s220 layer keeps its own ship counts in the demoted position (the s221 surgery demoted it — the frozen-record doctrine)", () => {
    const skill = read("neo-crm_SKILL.md");
    // the s220 layer is DEMOTED now (the s221 round's own head surgery);
    // its counts + vocabulary survive in the beneath-it position
    expect(skill).toContain(
      "+ beneath it 2853 unit checks + 193 e2e checks green; the session-220 layer",
    );
    const s220line = skill.split("+ beneath it 2853 unit checks")[1] ?? "";
    expect(s220line).toContain("the session-220 layer");
    // version 1.223.0 now rides the head (the s222 round's own bump;
    // the s221 round's 1.222.0 was the head when this pin was re-anchored)
    expect(skill).toContain("version: 1.223.0");
    expect(skill).toContain(
      "# NEO CRM — Engineering Skill (SKILL.md v1.223.0)",
    );
    // the s219 layer keeps its own ship counts in its own demoted position
    expect(skill).toContain(
      "+ beneath it 2843 unit checks + 193 e2e checks green; the session-219 layer",
    );
  });
});
