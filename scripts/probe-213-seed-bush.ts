// Session-213 (R-01 verification): the REDUCED-MOTION SEED-BUSH probe.
// The F-214 cure paints the seed-state bush strip once over the static
// buffer when prefers-reduced-motion: reduce is active (the RAF loop
// never runs under the gate). This probe loads the landing under the
// emulated preference and counts the bush palette pixels in the strip
// zone (x1320-1410, y437-505): the brown patches (98,62,14) + the
// light-green mass (187,220,170) must be PRESENT — pre-cure, the zone
// carried only the plain scene (no bush at all).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await page.goto(`${OURS}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000); // the static render + the seed-state paint

const counts = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) throw new Error("no canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  const dpr = window.devicePixelRatio || 1;
  // the bush zone in CSS px (x1320-1415, y435-508) -> device px
  const x = Math.round(1320 * dpr), y = Math.round(435 * dpr);
  const w = Math.round(95 * dpr), h = Math.round(73 * dpr);
  const data = ctx.getImageData(x, y, w, h).data;
  let brown = 0, greenMass = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (Math.abs(r - 98) < 25 && Math.abs(g - 62) < 25 && Math.abs(b - 14) < 25) brown++;
    if (Math.abs(r - 187) < 25 && Math.abs(g - 220) < 25 && Math.abs(b - 170) < 25) greenMass++;
  }
  return { brown, greenMass, total: data.length / 4 };
});
console.log(`[probe] reduced-motion bush zone: brown=${counts.brown} greenMass=${counts.greenMass} (of ${counts.total} px)`);
const ok = counts.brown > 20 && counts.greenMass > 50;
console.log(ok ? "[probe] F-214 VERIFIED: the seed bush paints under reduced motion" : "[probe] F-214 FAILED: the bush zone lacks the palette");

mkdirSync("docs/screenshots", { recursive: true });
await page.screenshot({ path: "docs/screenshots/66-s213-reduced-motion-seed-bush-1440.png" });
console.log("[probe] capture saved: docs/screenshots/66-s213-reduced-motion-seed-bush-1440.png");
await page.close();
await browser.close();
process.exit(ok ? 0 : 1);
