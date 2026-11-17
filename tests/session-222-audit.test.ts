// Session-222 audit pins: the EADDRINUSE row round (the owner's second
// fresh-clone report). The audit (the web-application skill §12/§16/§18
// dimensions over the 0cfe160 tree) verified the s221 cures all in place
// (next@16.4.6 locked · the audit census 10 [4h/5m/1l] · every doc clause)
// and every security seam clean. ONE actionable finding: F-224a the
// owner's live EADDRINUSE (their updated docs/start_server_error.txt —
// "Error: Failed to start server. Is port 3000 in use?" on the first
// `bun run start`, resolved by the retry) names an operator-facing genus
// the README Troubleshooting table does not cover: a lingering process
// holding :3000 after the earlier session. F-224b: the db/ scratch
// family accumulates (gitignored — no tree impact; Info, no cure owed).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

describe("session-222: the EADDRINUSE row round (the owner's second fresh-clone report)", () => {
  it("F-224a cure: the README troubleshooting section carries the EADDRINUSE row (symptom + cause + fix)", () => {
    const readme = read("README.md");
    // the symptom as the operator sees it (their log's exact phrasing)
    expect(readme).toContain("Is port 3000 in use?");
    // the cause named
    expect(readme).toContain("lingering process");
    // the fix — the port-holder kill family
    expect(readme).toContain("lsof -ti :3000");
  });

  it("F-224b: the db scratch family documented as gitignored accumulators (the Info note)", () => {
    const plan = read("docs/plans/2026-11-17-session222-eaddrinuse-row.md");
    expect(plan).toContain("F-224b");
    expect(plan).toContain("e2e.db");
    // the gitignore discipline actually holds the family
    const gi = read(".gitignore");
    expect(gi).toContain("db/*.db");
  });

  it("the s221 cures verified still in place on this tree (the rotation's first leg)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain("RE-TRIAGED session-221");
    expect(pad).toContain("next@16.4.6");
    const agents = read("AGENTS.md").replace(/\s+/g, " ");
    expect(agents).toContain("re-triaged session-221");
    const readme = read("README.md");
    expect(readme).toContain("Cannot find module './tests/e2e/e2e-port'");
  });

  it("F-224a verification: the round record (session_35.md) carries the owner's EADDRINUSE evidence", () => {
    const s = read("docs/session_35.md");
    expect(s).toContain("EADDRINUSE");
    expect(s).toContain("0cfe160");
  });
});
