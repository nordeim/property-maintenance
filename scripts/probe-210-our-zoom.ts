// Session-210 C: our hi-dpi crops at the same clip regions as the
// ref's — the direct pixel-level comparison of the boundary shapes.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const zoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await zoom.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await zoom.waitForTimeout(4000);
const crops: Array<[string, object]> = [
  ["hedge-boundary.png", { x: 1040, y: 250, width: 400, height: 300 }],
  ["gband-edge.png", { x: 300, y: 430, width: 500, height: 200 }],
  ["hedge-left.png", { x: 0, y: 300, width: 400, height: 300 }],
];
for (const [name, clip] of crops) {
  writeFileSync(`/tmp/our-210-zoom-${name}`, await zoom.screenshot({ clip: clip as never }));
  console.log(`our-zoom-${name} saved`);
}
await browser.close();
console.log("done");
