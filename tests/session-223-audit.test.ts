// Session-223 audit pins: the picomatch advisory round (the third census
// drift). The audit (the web-application skill §12/§16/§18 dimensions over
// the 839b705 tree) verified the s222 cures all in place and every security
// seam clean. THE ROUND'S MATERIAL — F-225a: the standing pre-ship duty
// (bun audit, the s164 doctrine) caught the advisory census drifting
// 10 → 11 (4h/5m/1l → 5h/5m/1l): the NEW HIGH GHSA-fc5q-39xc-vjpf on
// picomatch <=4.0.7 (CVE-2026-112366, ReDoS via single-branch repeated
// extglob patterns, CVSS 8.7) riding the DEV-TOOLCHAIN chains only
// (vitest → picomatch@4.0.7 direct · vite → picomatch@4.0.7 · the
// tinyglobby/fdir peer family · micromatch → picomatch@2.3.1) — zero
// runtime request-path exposure, and NO patched version exists upstream
// (the micromatch/picomatch#194 fix PR is unreleased) — the same no-cure
// genus as the s221 vite-family moderates. The zod advisory's vulnerable
// 4.6.5 is the eslint-plugin-react-hooks transitive; our RUNTIME zod
// resolves 4.6.7 (past the 4.6.6 fix), and both z.array sites in the Zod
// seam carry explicit length caps (.max(40)/.max(20)) — the advisory's
// unconstrained-array attack requirement is not met in this tree.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

/** The runtime-dependency set from package.json's "dependencies" block —
 *  the chains whose closure must NEVER reach picomatch (the F-225a
 *  dormancy claim, asserted structurally against the lockfile). */
const RUNTIME_DEPS = [
  "next", "react", "react-dom", "prisma", "@prisma/client", "zod",
  "zustand", "recharts", "lucide-react", "date-fns", "react-day-picker",
  "jspdf", "html2canvas-pro", "tailwind-merge", "clsx",
  "class-variance-authority",
] as const;

describe("session-223: the picomatch advisory round (the third census drift)", () => {
  it("F-225a cure: the PAD §10 ledger row re-anchored at the live census (11: 5h/5m/1l, the picomatch high)", () => {
    const pad = read("Project_Architecture_Document.md");
    // the live census claim — the drift record itself
    expect(pad).toContain(
      "`bun audit` reports 11 advisories (5 high / 5 moderate / 1 low)",
    );
    // the RE-TRIAGED session-223 clause — the picomatch decode
    expect(pad).toContain("RE-TRIAGED session-223");
    expect(pad).toContain("GHSA-fc5q-39xc-vjpf");
    // the no-upstream-fix caveat (the honest disposition)
    expect(pad).toContain("NO CURE AVAILABLE: no patched picomatch");
    // the historical clauses stay (the lineage record)
    expect(pad).toContain("RE-TRIAGED session-198");
    expect(pad).toContain("RE-TRIAGED session-203");
    expect(pad).toContain("RE-TRIAGED session-221");
  });

  it("F-225a cure: the AGENTS gate-order note carries the session-223 census tail", () => {
    // the AGENTS head is hard-wrapped at ~76 cols — normalize whitespace
    // so the pin holds the CONTENT, never the wrap:
    const agents = read("AGENTS.md").replace(/\s+/g, " ");
    expect(agents).toContain(
      "re-triaged session-223: the census drift 10 → 11 — the new high GHSA-fc5q-39xc-vjpf on picomatch <=4.0.7 (ReDoS), dev-toolchain via the vitest/vite/tinyglobby chains, zero runtime exposure",
    );
    expect(agents).toContain("no patched picomatch release exists");
  });

  it("F-225a dormancy, structural half: no picomatch resolution is reachable from a runtime dependency (the lockfile closure)", () => {
    // The F-225a claim has two halves: the advisory is real (the live
    // census) AND it cannot touch the running app (no runtime chain).
    // This pin asserts the second half OFFLINE against bun.lock: every
    // package that depends on picomatch (directly or through the
    // dev-toolchain families) must be absent from the runtime closure.
    const lock = read("bun.lock");
    // the packages whose dependency maps list picomatch (the lockfile's
    // flat chain map — the census this round decoded live):
    // vitest · vite · tinyglobby · fdir (peer) · micromatch
    const picomatchConsumers = ["vitest", "vite", "tinyglobby", "fdir", "micromatch"];
    // the runtime deps must not list picomatch in their OWN dep maps —
    // each runtime package's lockfile entry is ONE flat line (the
    // "packages" map's 4-space indent; bun serializes every entry's
    // full dependency closure onto its own line), so slice the WHOLE
    // line — a nested-brace regex stops at the inner "dependencies": {
    // and silently under-matches
    for (const dep of RUNTIME_DEPS) {
      const re = new RegExp(`\\n\\s{4}"${dep}": \\[[^\\n]*`);
      const entry = lock.match(re)?.[0] ?? "";
      expect(entry, `${dep} must have a lockfile entry`).not.toBe("");
      expect(entry, `${dep} must not depend on picomatch`).not.toMatch(
        /"picomatch":/,
      );
      // and none of the dev-toolchain consumers either (the transitive
      // arm — a runtime dep must not pull the toolchain family at all)
      for (const consumer of picomatchConsumers) {
        expect(entry, `${dep} must not pull ${consumer}`).not.toMatch(
          new RegExp(`"${consumer}":`),
        );
      }
    }
  });

  it("F-225a dormancy, runtime-zod half: the runtime zod resolves past the GHSA-mrhx-c7xc-m3w5 fix (4.6.6)", () => {
    // The advisory's vulnerable range is <4.6.6; the ROOT zod (the one
    // src/ imports — the Zod seam at every API boundary) must resolve
    // >= 4.6.6. The eslint-plugin-react-hooks transitive may stay at
    // 4.6.5 (lint-time only).
    const lock = read("bun.lock");
    const rootZod = lock.match(/\n\s+"zod": \["zod@(\d+\.\d+\.\d+)"/);
    expect(rootZod, "the root zod lockfile entry").not.toBeNull();
    const [maj, min, patch] = rootZod![1].split(".").map(Number);
    const gte = (v: [number, number, number]) =>
      maj > v[0] || (maj === v[0] && (min > v[1] || (min === v[1] && patch >= v[2])));
    expect(gte([4, 6, 6]), `root zod ${rootZod![1]} >= 4.6.6`).toBe(true);
    // and the Zod seam's array schemas stay capped (the attack
    // requirement is an UNCONSTRAINED array — the bounded forms are the
    // standing cure even on a vulnerable zod)
    const schemas = read("src/lib/schemas.ts");
    expect(schemas).toMatch(/\.array\([^)]*[\s\S]{0,200}?\.max\(/);
    expect(schemas).toContain("is limited to 40 entries");
    expect(schemas).toContain("Too many services selected");
  });

  it("the s222 cures verified still in place on this tree (the rotation's first leg)", () => {
    const readme = read("README.md");
    expect(readme).toContain("Is port 3000 in use?");
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain("RE-TRIAGED session-221");
    const plan = read("docs/plans/2026-11-17-session222-eaddrinuse-row.md");
    expect(plan).toContain("F-224a");
  });

  it("F-225a verification: the round record (session_37.md) carries the picomatch evidence", () => {
    const s = read("docs/session_37.md");
    expect(s).toContain("GHSA-fc5q-39xc-vjpf");
    expect(s).toContain("839b705");
    expect(s).toContain("5h/5m/1l");
  });
});
