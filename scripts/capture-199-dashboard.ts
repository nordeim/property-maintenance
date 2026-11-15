// Session-199 WP-1: restore docs/neo-crm-dashboard.png — the
// dead-code-hygiene living-dependency guard's asset (the owner's
// clean-up removed it with the screenshot corpus). A genuine capture
// of THIS checkout's dashboard from the running dev server.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUR_URL = "http://localhost:3000";
const OUT = join(REPO, "docs", "neo-crm-dashboard.png");

async function waitOnUrl(url: string, ms: number) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try { if ((await fetch(url)).ok) return true; } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  if (!(await waitOnUrl(`${OUR_URL}/api/health`, 1500))) {
    const child = spawn("bun", ["run", "dev"], { cwd: REPO, stdio: "ignore", detached: true });
    child.unref();
    if (!(await waitOnUrl(`${OUR_URL}/api/health`, 120_000))) throw new Error("dev server never came up");
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  // the sweep.ts login idiom: networkidle + the hydration settle (a
  // click before React attaches falls to the native form GET) + the
  // click/waitForURL race.
  await page.goto(`${OUR_URL}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com");
  await page.fill('input[type="password"]', process.env.REF_PASSWORD ?? "$Abcd1234");
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
  await page.goto(`${OUR_URL}/dashboard`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: OUT });
  console.log(`captured: ${OUT} (${existsSync(OUT) ? "ok" : "MISSING"})`);
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
