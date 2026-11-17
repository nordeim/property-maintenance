// Session-223 captures: the picomatch advisory round's evidence —
// captures 88/89/90. 88: the landing at 1440 (the s223-cured tree's
// fresh face) · 89: the mobile menu OPEN at 390 (the operator's
// standing parity focus — byte-identical geometry re-verified live
// this round on both apps) · 90: the CRM dashboard at 1440 (the
// superset back-office face, logged in with the demo pair). Runs
// against the dev server on :3000 (the probe-222-shot pattern).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 88 — desktop landing (the s223 tree)
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/88-s223-landing-1440.png` });
  console.log(`[capture] 88-s223-landing-1440.png`);
  await page.close();

  // 89 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"][aria-label="Site menu"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/89-s223-mobile-menu-open-390.png` });
  console.log(`[capture] 89-s223-mobile-menu-open-390.png`);

  // 90 — the CRM dashboard at 1440 (logged in with the demo pair)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.locator('input[type="email"]').first().fill("sepnetflix2023@outlook.com");
  await page.locator('input[type="password"]').first().fill("$Abcd1234");
  await page.keyboard.press("Enter");
  await page.waitForURL(/dashboard|\/$/, { timeout: 15_000 });
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200); // the KPI row + charts hydrate
  await page.screenshot({ path: `${OUT}/90-s223-crm-dashboard-1440.png` });
  console.log(`[capture] 90-s223-crm-dashboard-1440.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
