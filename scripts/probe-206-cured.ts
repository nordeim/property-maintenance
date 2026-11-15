// Session-206 B: the CURE VERIFICATION — re-capture our booking (dev
// :3000, the wedge + sharp horizon live) and measure the drift against
// the fresh ref capture at three granularities: the overall page, the
// terracotta zone, and the left-margin band.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
await page.waitForTimeout(2500);
writeFileSync("/tmp/our-206-booking-cured.png", await page.screenshot());
// also the faq + landing (the shared-painter safety check)
for (const name of ["faq", "landing"]) {
  await page.goto(`${BASE}/${name === "landing" ? "" : name}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(2000);
  writeFileSync(`/tmp/our-206-${name}-cured.png`, await page.screenshot());
}
await browser.close();
console.log("cured captures saved");
