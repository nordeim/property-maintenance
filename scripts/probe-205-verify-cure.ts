// Session-205: live-verify the F-205g cure — our mobile menu now opens
// as the RIGHT SIDE SHEET (the reference's own anatomy). The contract:
// the sheet's geometry (w-80 flush right, full height), the 8 links,
// Esc-close, focus-return, and the geometry vs the ref's decoded rect.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${BASE}/home`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
await page.waitForTimeout(1000);

await page.getByRole("button", { name: "Open menu" }).click();
await page.locator('[role="dialog"][aria-label="Site menu"]').waitFor({ state: "visible", timeout: 15_000 });
await page.waitForTimeout(800);

const census = await page.evaluate(() => {
  const sheet = document.querySelector('[role="dialog"]') as HTMLElement | null;
  if (!sheet) return { sheet: null };
  const r = sheet.getBoundingClientRect();
  const cls = String(sheet.className);
  return {
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    flushRight: Math.abs(r.x + r.width - 390) < 1,
    fullHeight: r.height === 844,
    hasBorderL: cls.includes("border-l"),
    hasSlideIn: cls.includes("slide-in-from-right"),
    links: Array.from(sheet.querySelectorAll("a")).filter((a) => (a as HTMLElement).offsetParent !== null).map((a) => a.textContent?.trim()),
    closeLabel: sheet.querySelector('button[aria-label="Close menu"]') ? "Close menu" : null,
    overlayBlack80: !!document.querySelector(".bg-black\\/80"),
  };
});
console.log("OUR sheet census:", JSON.stringify(census, null, 1));
writeFileSync("/tmp/our-menu-open-390.png", await page.screenshot());

// Esc + focus return
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
const post = await page.evaluate(() => ({
  openDialogs: Array.from(document.querySelectorAll('[role="dialog"]')).filter((d) => (d as HTMLElement).offsetParent !== null).length,
  focusOn: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName,
}));
console.log("after Esc:", JSON.stringify(post));
await browser.close();
