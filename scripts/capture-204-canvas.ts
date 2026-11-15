// Session-204 E: the captures — the new canvas on three public pages
// (no login needed — the (site) routes are public). Quick, one browser.
import { chromium } from "@playwright/test";
import { writeFileSync, copyFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const shots: Array<[string, string]> = [
    ["29-canvas-faq-desktop-1440.png", "/faq"],
    ["30-canvas-booking-desktop-1440.png", "/booking"],
    ["31-canvas-landing-desktop-1440.png", "/"],
  ];
  for (const [name, route] of shots) {
    await page.goto(`http://localhost:3101${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const png = await page.screenshot();
    writeFileSync(`${OUT}/${name}`, png);
    console.log(`captured: ${name} (${png.length} bytes)`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
