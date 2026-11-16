// Session-210 R5: the round's captures — the cured zones: the hi-dpi
// hedge zoom (the V-bottom edge) + the descent zone + the full booking
// page. Dev server.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });

// the full booking page at 1x (the standing capture)
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(4000);
writeFileSync(`${OUT}/58-s210-booking-cured.png`, await page.screenshot());
console.log("captured: 58-s210-booking-cured.png");

// the hi-dpi zooms of the two cured zones
const zoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await zoom.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await zoom.waitForTimeout(4000);
const crops: Array<[string, object]> = [
  ["56-s210-vbottom-hedge-zoom.png", { x: 1040, y: 250, width: 400, height: 300 }],
  ["57-s210-descent-gradient-zoom.png", { x: 1330, y: 260, width: 110, height: 120 }],
];
for (const [name, clip] of crops) {
  writeFileSync(`${OUT}/${name}`, await zoom.screenshot({ clip: clip as never }));
  console.log(`captured: ${name}`);
}
await browser.close();
console.log("done");
