// Session-211 R6: the round's captures — the concave descent-top
// zoom + the mobile 390 cured states + the desktop booking page.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });

// the desktop booking page (the standing capture)
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(4000);
writeFileSync(`${OUT}/61-s211-booking-cured.png`, await page.screenshot());
console.log("captured: 61-s211-booking-cured.png");

// the hi-dpi descent-top zoom (the concave arc zone)
const zoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await zoom.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await zoom.waitForTimeout(4000);
writeFileSync(
  `${OUT}/59-s211-descent-arc-zoom.png`,
  await zoom.screenshot({ clip: { x: 1350, y: 260, width: 90, height: 70 } }),
);
console.log("captured: 59-s211-descent-arc-zoom.png");

// the mobile 390 cured closed-state
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await mob.waitForTimeout(4000);
writeFileSync(`${OUT}/60-s211-mobile-390-cured.png`, await mob.screenshot());
console.log("captured: 60-s211-mobile-390-cured.png");
await browser.close();
console.log("done");
