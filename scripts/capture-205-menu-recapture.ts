// Session-205: re-capture 41 (the menu open) on the CURED sheet — the
// top-sheet capture is stale now. Also re-shoot 42 (home 390) for a
// consistent pair.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${BASE}/home`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: "Open menu" }).click();
await page.locator('[role="dialog"][aria-label="Site menu"]').waitFor({ state: "visible", timeout: 15_000 });
await page.waitForTimeout(900);
const menu = await page.screenshot();
writeFileSync(`${OUT}/41-s205-mobile-menu-open-390.png`, menu);
console.log(`re-captured: 41-s205-mobile-menu-open-390.png (${menu.length} bytes)`);
await page.keyboard.press("Escape");
await page.waitForTimeout(900);
const home = await page.screenshot();
writeFileSync(`${OUT}/42-s205-home-390.png`, home);
console.log(`re-captured: 42-s205-home-390.png (${home.length} bytes)`);
await browser.close();
