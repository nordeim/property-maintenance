// Session-199 recon leg 13: the reference hero h1's computed line-height
// at 1440 + 390 — grounding the leading-inert pin (the walk40 protocol).
import { chromium } from "@playwright/test";
const REF_URL = "https://oasis-property-maintenance.base44.app";
const browser = await chromium.launch({ headless: true });
for (const [w, h] of [[1440, 900], [390, 844]] as const) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return null;
    const c = getComputedStyle(h1);
    return { fontSize: c.fontSize, lineHeight: c.lineHeight, raw: h1.className.slice(0, 120) };
  });
  console.log(`${w}x${h}:`, JSON.stringify(r));
  await page.close();
}
await browser.close();
