// Session-207 A2: our side of the paired captures (dev :3000) —
// booking x2 + landing + faq at 1440x900, matching the ref shots.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["booking-b.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
];
for (const [name, route] of shots) {
  const file = `/tmp/our-207-${name}`;
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    // the landing's h1 sits below the hero fold — a soft wait: settle
    // for either the h1 or a fixed 6s (memory-pressure resilience)
    await page
      .locator("h1")
      .first()
      .waitFor({ state: "visible", timeout: 6_000 })
      .catch(() => console.log(`${name}: h1 soft-wait elapsed, proceeding`));
    await page.waitForTimeout(2000);
    writeFileSync(file, await page.screenshot());
    console.log(`${name} saved (${route})`);
  } catch (e) {
    console.log(`${name}: NAV FAILED ${String(e).slice(0, 100)}`);
  }
}
await browser.close();
console.log("done");
