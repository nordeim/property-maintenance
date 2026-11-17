import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:3100/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const el = document.querySelector('[role="slider"]');
  const root = document.querySelector('[data-orientation="horizontal"].relative') ?? el?.closest("form") ?? document.body;
  const html = (el?.closest(".p-6, .md\\:p-8, main") ?? document.body).innerHTML;
  const i = html.indexOf("Yard size");
  return { found: i >= 0 ? html.slice(Math.max(0, i - 260), i + 40) : "NOT FOUND" };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
