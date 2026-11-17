// Session-220 captures: the standing round's evidence — captures 79/80/81.
// 79: the landing at 1440 (the s220 round's fresh face) · 80: the mobile
// menu OPEN at 390 (the operator's standing parity focus) · 81: the
// services page at 1440. Runs against the PRODUCTION standalone on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 79 — desktop landing
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/79-s220-landing-1440.png` });
  console.log(`[capture] 79-s220-landing-1440.png`);
  await page.close();

  // 80 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/80-s220-mobile-menu-open-390.png` });
  console.log(`[capture] 80-s220-mobile-menu-open-390.png`);

  // 81 — the services page at 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/services`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/81-s220-services-1440.png` });
  console.log(`[capture] 81-s220-services-1440.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
