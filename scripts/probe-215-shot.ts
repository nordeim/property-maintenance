// Session-215 captures: the standing round's evidence shots — the
// landing at 1440 (the s214 lineage's capture-68 successor) + the
// mobile menu OPEN at 390 (the operator's named parity focus, the
// post-cure re-verify). Runs against the DEV server on :3000 (the
// house capture pattern: probe-214-shot.ts).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  // the scroll-reveal settle: the s213+ landing reveals on scroll
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/69-s215-landing-1440.png` });
  console.log(`[capture] 69-s215-landing-1440.png`);

  // the mobile menu OPEN at 390
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await phone.goto(`${BASE}/home`, { waitUntil: "networkidle" });
  await phone.getByRole("button", { name: "Open menu" }).click();
  await phone.waitForSelector('[role="dialog"]', { state: "visible" });
  await phone.waitForTimeout(900); // the 0.5s enter animation settles
  await phone.screenshot({ path: `${OUT}/70-s215-mobile-menu-open-390.png` });
  console.log(`[capture] 70-s215-mobile-menu-open-390.png`);

  await browser.close();
}

main().catch((e) => {
  console.error("[capture] FAILED:", e);
  process.exit(1);
});
