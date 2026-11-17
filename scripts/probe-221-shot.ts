// Session-221 captures: the audit-census truth round's evidence —
// captures 82/83/84. 82: the landing at 1440 (the 16.4.6-cured tree's
// fresh face) · 83: the mobile menu OPEN at 390 (the operator's
// standing parity focus, re-verified on the cured runtime) · 84: the
// booking page at 390 (the phone-band face). Runs against the PRODUCTION
// standalone on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 82 — desktop landing (the cured tree)
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/82-s221-landing-1440.png` });
  console.log(`[capture] 82-s221-landing-1440.png`);
  await page.close();

  // 83 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"][aria-label="Site menu"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/83-s221-mobile-menu-open-390.png` });
  console.log(`[capture] 83-s221-mobile-menu-open-390.png`);

  // 84 — the booking page at 390 (the phone-band face)
  await page.goto(`${BASE}/booking`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/84-s221-booking-390.png` });
  console.log(`[capture] 84-s221-booking-390.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
