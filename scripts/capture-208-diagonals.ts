// Session-208 R8: the round's captures — the horizon diagonals + the
// mid-distance canvas on the three pages at 1440. Dev server.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, string]> = [
  ["50-s208-booking-diagonals-1440.png", "/booking"],
  ["51-s208-landing-diagonals-1440.png", "/"],
  ["52-s208-faq-diagonals-1440.png", "/faq"],
];
for (const [name, route] of shots) {
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page
      .locator("h1")
      .first()
      .waitFor({ state: "visible", timeout: 6_000 })
      .catch(() => console.log(`${name}: h1 soft-wait elapsed`));
    await page.waitForTimeout(2000);
    const png = await page.screenshot();
    writeFileSync(`${OUT}/${name}`, png);
    console.log(`captured: ${name} (${png.length} bytes)`);
  } catch (e) {
    console.log(`${name}: FAILED ${String(e).slice(0, 100)}`);
  }
}
await browser.close();
console.log("done");
