// Session-207 B: the CURE VERIFICATION — re-capture our pages (dev
// :3000, the fine-shapes cures live) + measure the drifts against the
// fresh ref captures. The soft-wait pattern (memory resilience).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
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
    writeFileSync(`/tmp/our-207-${name.replace("-a", "-cured")}`, await page.screenshot());
    console.log(`${name} cured-captured (${route})`);
  } catch (e) {
    console.log(`${name}: NAV FAILED ${String(e).slice(0, 100)}`);
  }
}
await browser.close();
console.log("done");
