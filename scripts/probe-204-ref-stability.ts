// Session-204 B: is the reference's landing STABLE? Two shots, 6s
// apart, distinct files — if they differ, the ref's landing animates
// (a carousel); if identical, the content genuinely moved (an owner
// update) and the landing needs a re-decode.
import { chromium, type Page } from "@playwright/test";
import { writeFileSync, copyFileSync } from "node:fs";

const REF_URL = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${REF_URL}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(page);
  await page.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  writeFileSync("/tmp/ref-landing-a.png", await page.screenshot());
  await page.waitForTimeout(6000);
  writeFileSync("/tmp/ref-landing-b.png", await page.screenshot());
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  writeFileSync("/tmp/ref-landing-c.png", await page.screenshot());
  await browser.close();
  console.log("three ref landing shots saved (a: +3s, b: +9s, c: fresh reload)");
}
main().catch((e) => { console.error(e); process.exit(1); });
