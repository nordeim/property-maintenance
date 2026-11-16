import { chromium } from "@playwright/test";
const browser = await chromium.launch();
for (const rm of ["reduce", "no-preference"] as const) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const out = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas!.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas!.width, h = canvas!.height;
    // sample the bush zone AND the right edge band broadly
    const zone = ctx!.getImageData(Math.round(1320 * dpr), Math.round(435 * dpr), Math.round(95 * dpr), Math.round(73 * dpr)).data;
    let brown = 0, green = 0;
    for (let i = 0; i < zone.length; i += 4) {
      const [r, g, b] = [zone[i], zone[i + 1], zone[i + 2]];
      if (Math.abs(r - 98) < 25 && Math.abs(g - 62) < 25 && Math.abs(b - 14) < 25) brown++;
      if (Math.abs(r - 187) < 25 && Math.abs(g - 220) < 25 && Math.abs(b - 170) < 25) green++;
    }
    // what colors ARE in the zone? sample the first row + mid pixel
    const mid = Math.round((zone.length / 4 / 2) * 4);
    return { canvasSize: `${w}x${h}`, dpr, brown, green, midPx: [zone[mid], zone[mid + 1], zone[mid + 2]] };
  });
  console.log(`[${rm}]`, JSON.stringify(out));
  await page.close();
}
await browser.close();
