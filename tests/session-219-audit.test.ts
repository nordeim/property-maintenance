// Session-219 audit pins: the history-entry debt + the guard-recreation
// round. The audit (the web-application skill dimensions over the 85ed531
// collateral) found eight findings, none Critical/High: F-221a the pm-SKILL
// v1.14.0 bump shipped without its Session-218 history entry (the entries
// live in §7 (213/214) and §10 (215/217/216) — the 218 round is the FIRST
// version bump with no
// entry) · F-221b the F-220e pin under-pinned (a bare HEADLESS token, no
// block scoping) · F-221c the s192/F-218 negatives-ladder doctrine not
// carried to the s218-retired 2826/141/3019 forms · F-221f the session_27
// ".envexample" typo · F-221g the .env.example parity block naming the
// wrong HEADLESS consumers (misses recon-199.ts, names two non-readers) ·
// F-221h the D-205a2 env-face totality contract unenforced (the census
// face currently TRUE — a guard recreation, not a live defect) · F-221i
// the sitemap head comment's "the one aliased casing" claim stale since
// s24 (nine aliases now) · F-221j the neo-crm SKILL version not bumped
// at s218 (1.219.0 held through a head-layer round; every prior session
// bumped). Dispositioned no-cure: F-221d (the s211 count exception, the
// documented skill-head-215.py "keeps exactly what it said" doctrine) ·
// F-221e (the dual-lineage layer-name collisions — count-scoped anchors
// unaffected; a bare-name anchor would AMBIG-fail loudly, the designed
// guard).
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

describe("session-219: the history-entry debt + the guard-recreation round", () => {
  it("F-221a: the pm-SKILL version history carries the Session-218 entry (the v1.14.0 bump rode with no record)", () => {
    const skill = read("property-maintenance_SKILL.md");
    expect(skill).toContain("**Session-218's layers:**");
    // the entry records the round's own vocabulary — the twin-pin debt +
    // the replay completion, at its ship counts
    const entry = skill.split("**Session-218's layers:**")[1]?.split("\n- **Session-")[0] ?? "";
    expect(entry).toContain("F-219a");
    expect(entry).toContain("F-220a");
    expect(entry).toContain("twin-pin");
    expect(entry).toContain("142nd suite");
    expect(entry).toContain("2834");
  });

  it("F-221b: the HEADLESS pin carries the house idiom (block header + the full knob row, not a bare token)", () => {
    const pins = read("tests/session-218-audit.test.ts");
    expect(pins).toContain("Parity-gate tooling (optional)");
    expect(pins).toContain(
      "HEADLESS=0 watches the browser-driven captures (unset = headless)",
    );
  });

  it("F-221c: the negatives ladder carries the s218-retired 2826/141/3019 forms (the s192/F-218 doctrine)", () => {
    const dc = read("tests/docs-counts.test.ts");
    expect(dc).toContain("the retired 2826/141/3019 site-forms");
    expect(dc).toContain("expect(readme).not.toMatch(/# 2826 Vitest unit checks/)");
    expect(dc).toContain(
      "expect(readme).not.toMatch(/# 141 Vitest suites \\(2826 checks\\)/)",
    );
    expect(dc).toContain("expect(readme).not.toMatch(/tests-3019%20checks/)");
  });

  it("F-221f: the session_27 archive carries the dotted .env.example form (no .envexample)", () => {
    const log = read("docs/session_27.md");
    expect(log).not.toContain(".envexample");
    expect(log).toContain(".env.example");
  });

  it("F-221g: the .env.example parity block names the four REAL HEADLESS consumers (recon-199.ts in; the two non-readers retired from the knob row's list)", () => {
    const env = read(".env.example");
    // Session-220 (F-222f): the block SLICE — the four-reader list must
    // sit inside the parity-tools block itself (co-located with the
    // HEADLESS knob row), not merely anywhere in the file.
    const blockStart = env.indexOf("# ---- Parity-gate tooling");
    expect(blockStart, "the parity-tools block header must exist").toBeGreaterThanOrEqual(0);
    const lineEnd = env.indexOf("\n", blockStart);
    const blockEnd = env.indexOf("# ----", lineEnd);
    const block = env
      .slice(blockStart, blockEnd < 0 ? undefined : blockEnd)
      .replace(/\n#\s?/g, " ")
      .replace(/\s+/g, " ");
    expect(block).toContain("recon-199.ts");
    // the knob row's consumer list is the four real readers (normalized —
    // the house F-220e idiom: comment continuation lines join)
    expect(block).toContain(
      "drift-probe.ts · sweep.ts · interior-census.ts · recon-199.ts",
    );
    // the retired wrong-listing form never returns (raw: the wrapped
    // five-tool list with the two non-readers)
    expect(env).not.toContain("sweep-state.ts · interior-census.ts · fullpage-sweep.ts");
  });

  it("F-221h: the env-face totality guard — every process.env consumer in src/ + scripts/ is documented in .env.example (the D-205a2 census, recreated)", () => {
    // enumerate the consumers the way the census does: a grep walk
    const consumers = execSync(
      `grep -rhoE "process\\.env\\.[A-Z_][A-Z0-9_]*" ${JSON.stringify(ROOT)}/src ${JSON.stringify(ROOT)}/scripts --include="*.ts" --include="*.tsx" 2>/dev/null | sort -u`,
      { encoding: "utf-8", shell: "/bin/bash" },
    )
      .trim()
      .split("\n")
      .map((l) => l.replace("process.env.", ""))
      .filter(Boolean);
    expect(consumers.length).toBeGreaterThan(8);
    // framework-owned vars are legitimately undocumented
    const framework = new Set(["NODE_ENV", "NEXT_RUNTIME", "NEXT_PHASE"]);
    const appVars = consumers.filter((v) => !framework.has(v));
    const envExample = read(".env.example");
    for (const v of appVars) {
      // whole-token match: the knob must appear as its own line-level key
      // (a bare substring match would pass on any shared letter run)
      expect(
        envExample,
        `the knob ${v} must be documented in .env.example`,
      ).toMatch(new RegExp(`^#?\\s*${v}\\s*=`, "m"));
    }
    // the reverse arm: every documented app knob is consumed (both the
    // live assignment lines and the commented example lines count).
    // Session-220 (F-222e): the regex is DIGIT-AWARE — the s219 form
    // ([A-Z_]+) was blind to E2E_PORT, the one knob that falsifies the
    // "every documented knob is consumed" claim. E2E_PORT is the
    // documented tests-only knob (consumed in tests/e2e/e2e-port.ts +
    // playwright.config.ts, never in src/ or scripts/) — the honest
    // carve-out, matching its "Test-only (not read by the running app)"
    // block in .env.example.
    const documented = [
      ...envExample.matchAll(/^#?\s*([A-Z_][A-Z0-9_]*)\s*=/gm),
    ].map((m) => m[1]);
    expect(documented.length).toBeGreaterThanOrEqual(12);
    expect(documented).toContain("E2E_PORT"); // the digit-bearing knob the s219 form could not see
    const testsOnly = new Set(["E2E_PORT"]); // documented + consumed outside the walk's scope, by design
    for (const v of documented) {
      if (testsOnly.has(v)) continue;
      expect(
        consumers,
        `the documented knob ${v} must be consumed somewhere in src/ or scripts/`,
      ).toContain(v);
    }
  });

  it("F-221i: the sitemap head comment counts the aliases honestly (nine since the s24 rewrite, not 'the one aliased casing')", () => {
    const src = read("src/app/sitemap.xml/route.ts");
    expect(src).toContain("nine capital-cased aliases");
    expect(src).not.toContain("the one aliased casing");
    // the F-220g-pinned phrases stay (the cure must not disturb them)
    expect(src).toContain('priority "1.0" for the root');
    expect(src).toContain("no dashboard entry");
  });

  it("F-221j: the neo-crm SKILL version bump is recorded in the s219 head-surgery script (1.219.0 -> 1.220.0 — the frozen record; re-anchored at s220 when the live frontmatter moved to 1.221.0)", () => {
    const script = read("scripts/skill-head-219.py");
    expect(script).toContain('"version: 1.219.0", "version: 1.220.0"');
    // the demoted s219 layer keeps its ship counts in the chain
    const skill = read("neo-crm_SKILL.md");
    expect(skill).toContain(
      "+ beneath it 2843 unit checks + 193 e2e checks green; the session-219 layer",
    );
  });

  it("the s219 layer sits in the chain (demoted at s220 to beneath the s220 head) with its round's vocabulary intact", () => {
    const skill = read("neo-crm_SKILL.md");
    // the layer-axis doctrine: the demoted layer keeps its ship counts and
    // its own text — the live head is the CURRENT session's (re-anchored
    // at s220; the s219 face now reads beneath-it)
    expect(skill).toContain(
      "the session-219 layer (THE HISTORY-ENTRY DEBT + THE GUARD-RECREATION ROUND",
    );
    const idx = skill.indexOf("the session-219 layer (THE HISTORY-ENTRY DEBT");
    const layer = skill.slice(idx, idx + 3000);
    expect(layer).toContain("F-221a");
    expect(layer).toContain("THE HISTORY-ENTRY DEBT");
  });
});
