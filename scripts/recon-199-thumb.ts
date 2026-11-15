// Session-199 recon leg 16: the built slider thumb's attributes — why
// the aria-label didn't land.
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:3100/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const thumb = await page.evaluate(() => {
  const el = document.querySelector('[role="slider"]');
  if (!el) return null;
  return { label: el.getAttribute("aria-label"), outer: el.outerHTML.slice(0, 260) };
});
console.log(JSON.stringify(thumb, null, 1));
await browser.close();
