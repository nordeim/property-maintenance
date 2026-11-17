// Session-209 C: the animation verification — capture our booking
// page at known animation times and check the sprites render: the
// strip at t=2s (partial growth) + t=6s (full) + t=12s (VANISHED) and
// the bird at t=2s (pass 0: single, x~32) + t=13.5s (pass 1: flock).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const checks: Array<[string, number]> = [
  // [name, waitMs-after-load] — the mount keys the animation clock
  ["t2-strip-growing-bird-single.png", 2000],
  ["t6-strip-full.png", 6000],
  ["t12-strip-gone.png", 12000],
];
for (const [name, waitMs] of checks) {
  await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForTimeout(waitMs);
  writeFileSync(`/tmp/our-209-${name}`, await page.screenshot());
  console.log(`${name} saved (waited ${waitMs}ms)`);
}
await browser.close();
console.log("done");
