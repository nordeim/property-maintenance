// Session-206 R5: the round's captures — the new canvas (the wedge +
// the sharp horizon + the solid foliage) on the three most-affected
// pages at 1440. Runs against the dev server.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, string]> = [
  ["44-s206-booking-canvas-1440.png", "/booking"],
  ["45-s206-landing-canvas-1440.png", "/"],
  ["46-s206-faq-canvas-1440.png", "/faq"],
];
for (const [name, route] of shots) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(2000);
  const png = await page.screenshot();
  writeFileSync(`${OUT}/${name}`, png);
  console.log(`captured: ${name} (${png.length} bytes)`);
}
await browser.close();
console.log("done");
