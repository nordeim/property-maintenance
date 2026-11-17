// Session-209 R6: the round's captures — the animation states at
// 1440: the seed (t=2s, strip growing + the single bird) · the
// strip-full (t=6s) · the vanished (t=12s). Dev server.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots: Array<[string, number]> = [
  ["53-s209-animation-seed-bird.png", 2000],
  ["54-s209-animation-strip-full.png", 6000],
  ["55-s209-animation-vanished.png", 12000],
];
for (const [name, waitMs] of shots) {
  await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForTimeout(waitMs);
  const png = await page.screenshot();
  writeFileSync(`${OUT}/${name}`, png);
  console.log(`captured: ${name} (${png.length} bytes)`);
}
await browser.close();
console.log("done");
