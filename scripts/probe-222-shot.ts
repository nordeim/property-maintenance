// Session-222 captures: the EADDRINUSE row round's evidence —
// captures 85/86/87. 85: the landing at 1440 (the s222-cured tree's
// fresh face) · 86: the mobile menu OPEN at 390 (the operator's
// standing parity focus, re-verified on this round's tree) · 87: the
// services page at 1440 (the interior face carrying the round's
// evidence). Runs against the dev server on :3000 (the same face the
// drift battery just swept).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 85 — desktop landing (the s222 tree)
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/85-s222-landing-1440.png` });
  console.log(`[capture] 85-s222-landing-1440.png`);
  await page.close();

  // 86 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"][aria-label="Site menu"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/86-s222-mobile-menu-open-390.png` });
  console.log(`[capture] 86-s222-mobile-menu-open-390.png`);

  // 87 — the services page at 390 (the phone-band interior face)
  await page.goto(`${BASE}/services`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/87-s222-services-390.png` });
  console.log(`[capture] 87-s222-services-390.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
