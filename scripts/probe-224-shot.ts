// Session-224 captures: the quiet round's evidence — captures 91/92/93.
// 91: the landing at 1440 (the s224-verified tree) · 92: the mobile
// menu OPEN at 390 (the operator's standing parity focus — the
// byte-identical geometry re-verified live this round) · 93: the
// booking page at 390 (the 3-step flow's phone face — the public
// surface the reference's own users ride). Runs against the dev
// server on :3000 (the probe-223-shot pattern).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();

  // 91 — desktop landing (the s224 tree)
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/91-s224-landing-1440.png` });
  console.log(`[capture] 91-s224-landing-1440.png`);
  await page.close();

  // 92 — the mobile menu OPEN at 390 (the standing parity focus)
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForSelector('[role="dialog"][aria-label="Site menu"]', { state: "visible" });
  await page.waitForTimeout(900); // the 0.5s enter must settle
  await page.screenshot({ path: `${OUT}/92-s224-mobile-menu-open-390.png` });
  console.log(`[capture] 92-s224-mobile-menu-open-390.png`);

  // 93 — the booking page at 390 (the 3-step flow's phone face)
  await page.goto(`${BASE}/booking`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/93-s224-booking-390.png` });
  console.log(`[capture] 93-s224-booking-390.png`);
  await page.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
