// Session-219 captures: the standing round's evidence — captures 76/77/78.
// 76: the landing at 1440 (the s219 round's fresh face) · 77: the mobile
// menu OPEN at 390 (the operator's standing parity focus) · 78: the FAQ
// page at 1440 (the newest parity surface). Runs against the PRODUCTION
// standalone on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 76 — desktop landing
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/76-s219-landing-1440.png` });
  console.log(`[capture] 76-s219-landing-1440.png`);
  await page.close();

  // 77 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/77-s219-mobile-menu-open-390.png` });
  console.log(`[capture] 77-s219-mobile-menu-open-390.png`);

  // 78 — the booking page at 390 (the mobile form surface)
  await page.goto(`${BASE}/booking`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/78-s219-booking-390.png` });
  console.log(`[capture] 78-s219-booking-390.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
