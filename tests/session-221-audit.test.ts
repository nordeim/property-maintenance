// Session-221 audit pins: the audit-census truth round (the owner's
// fresh-clone report + the advisory drift). The audit (the
// web-application skill §12/§16/§18 dimensions over the f758fb0 tree,
// run on a PRISTINE clone — the exact environment the owner's
// docs/start_server_error.txt describes) found the baseline fully
// green (lint 0/0 · tsc 0 · 144/2853 unit · build ✓ · smoke 14/14 ·
// e2e 193/193 · the drift battery EXIT:0 · probe:ref STABLE) and
// exactly one actionable genus: F-223a/b the `bun audit` advisory
// census drifted 10 → 11 — the NEW moderate GHSA-mfr8-8qww-v76h on
// next@16.4.2, the FIRST advisory riding a direct RUNTIME dependency
// (the framework itself), DORMANT in our tree (zero
// unstable_cache/'use cache' call sites) with a same-minor patch cure
// available (16.4.5/16.4.6) — plus the vite family's growth
// (1 low → 3 advisories: 2 moderate + 1 low, dev-toolchain via
// vitest, zero runtime exposure). F-223c: the owner's TS2307
// ('Cannot find module ./tests/e2e/e2e-port' at next build) is NOT
// reproducible on the pristine clone (two clean builds; both files
// tracked, not gitignored) — a stale/partial-checkout genus on the
// operator side, documented as the README troubleshooting row.
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

// the bun.lock resolution of the next package — the R-01 cure's
// observable (16.4.2 -> 16.4.6, the patch that retires the only
// advisory on a runtime direct dependency).
function lockedNextVersion(): string {
  const lock = read("bun.lock");
  const m = lock.match(/"next": \["next@([^"]+)"/);
  if (!m) throw new Error("bun.lock carries no next resolution");
  return m[1];
}

describe("session-221: the audit-census truth round (the advisory drift + the fresh-clone report)", () => {
  it("F-223a cure: the next patch bump — the lockfile pins 16.4.6 (outside the GHSA-mfr8-8qww-v76h range <=16.4.4)", () => {
    const v = lockedNextVersion();
    expect(v).toBe("16.4.6");
    // the package.json spec was re-pinned by `bun update next@16.4.6`
    // itself (the package manager owns the manifest edit — the
    // never-hand-edit discipline): the caret floor moved with the bump
    const pkg = JSON.parse(read("package.json"));
    expect(pkg.dependencies.next).toBe("^16.4.6");
  });

  it("F-223a/b cure: the PAD §10 ledger row re-anchored at the post-cure live census (10: 4h/5m/1l, the next advisory retired)", () => {
    const pad = read("Project_Architecture_Document.md");
    // the post-cure census claim — the next advisory's retirement is
    // the round's own material change; the row keeps 10 because the
    // next@16.4.6 bump retires the one advisory while the vite family
    // grew by two moderates since the s203 pin (net: 10 -> 11 live
    // pre-cure -> 10 post-cure). NOTE: session-223 re-anchored the
    // live row at the THIRD drift's census (11: 5h/5m/1l — the
    // picomatch high, no upstream fix); the s221 round's own
    // post-cure form survives in its demoted history clause.
    expect(pad).toContain(
      "`bun audit` reports 11 advisories (5 high / 5 moderate / 1 low)",
    );
    // the RE-TRIAGED session-221 clause — the drift record + the cure
    expect(pad).toContain("RE-TRIAGED session-221");
    expect(pad).toContain("GHSA-mfr8-8qww-v76h");
    expect(pad).toContain("next@16.4.6");
    // the historical s164/s198/s203 clauses stay (the lineage record)
    expect(pad).toContain("RE-TRIAGED session-198");
    expect(pad).toContain("RE-TRIAGED session-203");
  });

  it("F-223a cure: the AGENTS gate-order note carries the session-221 census tail", () => {
    // the AGENTS head is hard-wrapped at ~76 cols — normalize whitespace
    // so the pin holds the CONTENT, never the wrap:
    const agents = read("AGENTS.md").replace(/\s+/g, " ");
    expect(agents).toContain(
      "re-triaged session-221: the census drift 10 → 11 — the new moderate GHSA-mfr8-8qww-v76h on next@16.4.2, the first advisory on a direct runtime dependency, dormant in our tree",
    );
    expect(agents).toContain("cured by the 16.4.6 patch bump");
  });

  it("F-223c cure: the README troubleshooting section carries the TS2307 stale-checkout row", () => {
    const readme = read("README.md");
    expect(readme).toContain("Cannot find module './tests/e2e/e2e-port'");
    expect(readme).toContain("git checkout -- tests/e2e/ playwright.config.ts");
  });

  it("F-223c verification: the pristine-clone genus is documented in the session record (session_33.md)", () => {
    const s = read("docs/session_33.md");
    expect(s).toContain("TS2307");
    expect(s).toContain("not reproducible");
  });

  it("the post-cure audit census is machine-verified: `bun audit` reports no advisory on the next runtime chain", () => {
    // The live census — the same machine-readable source the ledger
    // row cites. Offline-safe: a failing/offline audit run is skipped
    // (the probe doctrine: the network dependency never gates), the
    // lockfile pin above carries the cure's observables.
    let stdout = "";
    try {
      stdout = execSync("bun audit 2>&1", { cwd: ROOT, encoding: "utf-8", timeout: 120_000 });
    } catch (e) {
      // bun audit exits non-zero while advisories exist (expected in
      // this repo — ten dev-toolchain advisories stand by design); the
      // output rides the error object.
      const out = e as { stdout?: string | Buffer };
      const text = typeof out.stdout === "string" ? out.stdout : "";
      if (!text) return; // offline/registry-unreachable: skip (the probe doctrine)
      stdout = text;
    }
    // the next advisory is retired: no line pairs a next-range advisory
    // (the 16.3.0..16.4.4 range is behind us at 16.4.6)
    expect(stdout).not.toMatch(/next\s+>=16\.3\.0 <=16\.4\.4/);
  });
});
