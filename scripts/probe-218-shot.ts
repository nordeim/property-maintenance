// Session-218 captures: the standing round's evidence — captures 73/74/75.
// 73: the landing at 1440 (the s218 round's fresh face) · 74: the mobile
// menu OPEN at 390 (the operator's standing parity focus) · 75: the
// booking page at 390. Runs against the PRODUCTION standalone on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 73 — desktop landing
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/73-s218-landing-1440.png` });
  console.log(`[capture] 73-s218-landing-1440.png`);
  await page.close();

  // 74 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/74-s218-mobile-menu-open-390.png` });
  console.log(`[capture] 74-s218-mobile-menu-open-390.png`);

  // 75 — the booking page at 390
  await page.goto(`${BASE}/booking`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/75-s218-booking-390.png` });
  console.log(`[capture] 75-s218-booking-390.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error("[capture] FAILED:", e);
  process.exit(1);
});
