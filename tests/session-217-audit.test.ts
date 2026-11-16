import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Session-217 (F-218b): the head-surgery scripts' splice demoted the
// prior head WITH its `project_state: ` marker still attached — the
// shipped demoted line was marker-less only because an unrecorded
// manual strip step ran after the script. The committed script must
// be the record of the committed artifact: a from-scratch replay
// against the pre-surgery file must produce the shipped head
// byte-for-byte.

const read = (rel: string) =>
  existsSync(rel) ? readFileSync(rel, "utf-8") : "";

describe("session-217: the doc-truth stragglers + the head-script reproducibility debt", () => {
  it("F-218b: skill-head-216.py demotes the prior head line marker-less, LINE-BOUNDED (the replay == the shipped artifact)", () => {
    const script = read("scripts/skill-head-216.py");

    // the repaired splice form: the strip rides IN THE SCRIPT (never
    // an unrecorded manual step), LINE-BOUNDED to the head line's own
    // extent (the rest of the file carries its own later
    // `project_state:` occurrences in the retired history blocks).
    expect(script).toContain('end = src.index("\\n", idx)');
    expect(script).toContain(
      'demoted_line = src[idx:end].replace("project_state: ", "", 1)',
    );
    expect(script).toContain(
      'src = src[:idx] + S216_LAYER + "\\n + + beneath it " + demoted_line + src[end:]',
    );

    // THE REPLAY: the script's demotion arithmetic run against the
    // pre-surgery file (git: 32c3ea7^) must produce the SHIPPED
    // demoted line byte-for-byte. (maxBuffer: the SKILL file is ~7MB —
    // the default 1MB pipe would ENOBUFS.)
    const pre = execSync("git show 32c3ea7:neo-crm_SKILL.md", {
      cwd: join(import.meta.dirname, ".."),
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    const headLine = pre
      .split("\n")
      .find((l) =>
        l.startsWith("project_state: 2822 unit checks + 193 e2e checks green; the session-216 layer"),
      );
    expect(headLine, "the pre-surgery head line must exist in git history").toBeTruthy();

    const idx = pre.indexOf(headLine!);
    const end = pre.indexOf("\n", idx);
    const demotedLine = pre.slice(idx, end).replace("project_state: ", "");
    const produced = " + + beneath it " + demotedLine;

    const skill = read("neo-crm_SKILL.md");
    const shippedDemoted = skill
      .split("\n")
      .find((l) =>
        l.startsWith(" + + beneath it 2822 unit checks + 193 e2e checks green; the session-216 layer"),
      );
    expect(shippedDemoted, "the shipped demoted line must exist").toBeTruthy();
    expect(produced).toBe(shippedDemoted);
  });

  it("F-218b: skill-head-215.py carries the same line-bounded repair (the latent twin)", () => {
    const script = read("scripts/skill-head-215.py");
    expect(script).toContain(
      'demoted_line = src[idx:end].replace("project_state: ", "", 1)',
    );
  });

  it("F-218a: the pm-SKILL §7 Unit bullet carries the live suite count (the pin-gap closure)", () => {
    const skill = read("property-maintenance_SKILL.md");
    // the live form (the s217 ladder walked 140 -> 141 in the same round
    // this pin was born; the docs-counts SUITES constant is the anchor):
    const suites = skill.match(/- \*\*Unit \(Vitest, (\d+) suites\)\:\*\*/)?.[1];
    expect(suites, "the §7 Unit bullet must carry a suite count").toBeTruthy();
    expect(Number(suites)).toBeGreaterThanOrEqual(141);
    // the retired 139 form never returns (the F-218a genus):
    expect(skill).not.toContain("- **Unit (Vitest, 139 suites):**");
  });

  it("F-218c: the sweep call-site narration tells the true census (9 sites: 6 auth + 2 public + upload)", () => {
    const rl = read("src/lib/rate-limit.ts");
    expect(rl).not.toContain("13+ call sites");
    expect(rl).toContain("9 call sites");

    // the three "auth family's 7 routes" sites tell the true census
    const s215 = read("tests/session-215-audit.test.ts");
    expect(s215).not.toContain("7 routes sweep");
    const bookings = read("src/app/api/bookings/route.ts");
    expect(bookings).not.toContain("7 routes sweep");
    const quotes = read("src/app/api/quote-requests/route.ts");
    expect(quotes).not.toContain("7 routes sweep");
  });
});
