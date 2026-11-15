// Session-201 R3: the round's dev-server capture set. The set proves
// the round's two named focuses: (1) the /Dashboard SUPERSET PROOF-PAIR
// — OUR app renders the CRM dashboard at the capital alias where the
// Oasis reference serves its soft-404 (the C-201a probe finding); and
// (2) the mobile menu at 390 — the closed home + the Radix menu OPEN
// (the standing named focus, re-proving the s200 cure on this round's
// tree). Plus the public home at desktop + phone for the round's
// standing face set.
import { chromium, type Page } from "@playwright/test";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const OUT = join(REPO, "docs", "screenshots");

async function waitOnUrl(url: string, ms: number) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try { if ((await fetch(url)).ok) return true; } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function shot(page: Page, name: string) {
  const path = join(OUT, name);
  await page.screenshot({ path });
  console.log(`captured: ${name} (${existsSync(path) ? "ok" : "MISSING"})`);
}

async function main() {
  if (!(await waitOnUrl(`${OUR_URL}/api/health`, 60_000))) throw new Error("dev server never came up");
  const browser = await chromium.launch({ headless: true });

  // ── leg 1: OUR /Dashboard (the capital alias — the superset proof) ──
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ours.goto(`${OUR_URL}/login`, { waitUntil: "networkidle" });
  await ours.waitForTimeout(1200);
  await ours.fill('input[type="email"]', EMAIL);
  await ours.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    ours.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    ours.click('button[type="submit"]'),
  ]);
  await ours.waitForTimeout(1500);
  await ours.goto(`${OUR_URL}/Dashboard`, { waitUntil: "domcontentloaded" });
  await ours.waitForTimeout(4500);
  await shot(ours, "16-our-Dashboard-superset-1440.png");
  // the mobile menu pair at 390 (the standing named focus; the public
  // site chrome needs no auth)
  const mob = await browser.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(`${OUR_URL}/home`, { waitUntil: "networkidle" });
  await mob.waitForTimeout(1500);
  await shot(mob, "17-home-mobile-closed-390.png");
  await mob.click('button[aria-label="Open menu"]');
  await mob.waitForTimeout(800);
  await shot(mob, "18-mobile-menu-open-390-s201.png");
  // the public home desktop + phone
  const home = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await home.goto(`${OUR_URL}/home`, { waitUntil: "networkidle" });
  await home.waitForTimeout(1500);
  await shot(home, "19-home-desktop-s201.png");
  await home.setViewportSize({ width: 390, height: 844 });
  await home.waitForTimeout(1200);
  await shot(home, "20-home-390-s201.png");

  // ── leg 2: the REFERENCE's /Dashboard (the soft-404 — the pair's
  //    other half; logged in, the C-201a probe conditions) ──
  const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ref.goto(`${REF_URL}/login`, { waitUntil: "networkidle" });
  await ref.waitForTimeout(1500);
  await ref.fill('input[type="email"]', EMAIL);
  await ref.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    ref.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    ref.click('button[type="submit"]'),
  ]);
  await ref.waitForTimeout(2000);
  await ref.goto(`${REF_URL}/Dashboard`, { waitUntil: "domcontentloaded" });
  await ref.waitForTimeout(2500);
  await shot(ref, "21-ref-Dashboard-soft404-1440.png");

  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
