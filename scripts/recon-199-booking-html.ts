// Session-199 recon leg 12: the booking flow's step-2/3 rendered HTML
// (driven: Continue → day → slot → Continue).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const REF_URL = "https://oasis-property-maintenance.base44.app";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
await page.locator("button").filter({ hasText: /Continue/i }).first().click();
await page.waitForTimeout(1200);
const step2 = await page.evaluate(() => document.querySelector("main")!.outerHTML);
await page.locator("button:not([disabled])").filter({ hasText: /^\d{1,2}$/ }).nth(3).click();
await page.waitForTimeout(800);
const step2b = await page.evaluate(() => document.querySelector("main")!.outerHTML);
await page.locator("button:not([disabled])").filter({ hasText: /(am|pm)/i }).first().click();
await page.waitForTimeout(500);
await page.locator("button").filter({ hasText: /Continue/i }).first().click();
await page.waitForTimeout(1200);
const step3 = await page.evaluate(() => document.querySelector("main")!.outerHTML);
writeFileSync("/tmp/oasis-html/booking-step2.html", step2);
writeFileSync("/tmp/oasis-html/booking-step2-dated.html", step2b);
writeFileSync("/tmp/oasis-html/booking-step3.html", step3);
console.log("captured steps:", step2.length, step2b.length, step3.length);
await browser.close();
