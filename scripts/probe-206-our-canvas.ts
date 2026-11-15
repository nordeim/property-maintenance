// Session-206 A2: our side of the paired captures (dev :3000) —
// booking x2 + landing + faq at 1440x900, matching the ref shots.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "/tmp/our-206";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["booking-b.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
];
for (const [name, route] of shots) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(2000);
  writeFileSync(`${OUT}-${name}`, await page.screenshot());
  console.log(`${name} saved (${route})`);
}
await browser.close();
console.log("done");
