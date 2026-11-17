// Session-199 recon leg 14: the axe diagnosis — /, /this-page-does-not-exist,
// /calendar (authed) — the violation IDs + nodes + ratios for the a11y
// register work.
import { chromium } from "@playwright/test";
const BASE = "http://localhost:3100";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const AXE_PATH = "node_modules/axe-core/axe.min.js";

async function scan(path: string, label: string) {
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load", { timeout: 60_000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.addScriptTag({ path: AXE_PATH });
  const violations = await page.evaluate(async () => {
    const axe = (window as unknown as {
      axe: { run: (o: object) => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: string[]; html?: string; failureSummary?: string }> }> }> };
    }).axe;
    const r = await axe.run({
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({ target: n.target.join(" "), html: n.html?.slice(0, 110), summary: n.failureSummary?.split("\n")[0] })),
    }));
  });
  console.log(`\n=== ${label} (${path}) ===`);
  for (const v of violations) {
    console.log(`${v.id} nodes=${v.nodes.length}`);
    for (const n of v.nodes) {
      console.log(`  target: ${n.target}`);
      console.log(`  ${n.summary ?? ""} | ${n.html ?? ""}`);
    }
  }
  if (!violations.length) console.log("CLEAN");
}

// the session via the API (the UI login's hydration race is beside the
// point here — the probe needs an authed page, not a login test)
const res = await fetch(`${BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "sepnetflix2023@outlook.com", password: "$Abcd1234" }),
});
const setCookie = res.headers.get("set-cookie") ?? "";
const cookie = setCookie.split(";")[0];
console.log("login API:", res.status, cookie.slice(0, 24) + "…");
await page.context().addCookies([
  { name: cookie.split("=")[0], value: cookie.split("=").slice(1).join("="), url: BASE },
]);

await scan("/", "home (Oasis)");
await scan("/this-page-does-not-exist", "the 404");

await browser.close();
