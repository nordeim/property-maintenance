// Session-205 F-205g final: the footer block's exact outerHTML — settle
// which A is the phone and which is Book Now (the nesting question).
import { chromium, type Page } from "@playwright/test";

const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function refLogin(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(8000);
  await page.locator("#email").click({ timeout: 20_000 });
  await page.keyboard.type(EMAIL, { delay: 15 });
  await page.locator("#password").click({ timeout: 20_000 });
  await page.keyboard.type(PASSWORD, { delay: 15 });
  await page.getByRole("button", { name: "Sign in" }).click({ timeout: 20_000 });
  await page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 });
  await page.waitForTimeout(3000);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await refLogin(page).catch(() => {});
await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(4000);
await page.locator('button[aria-haspopup="dialog"]').first().click();
await page.waitForTimeout(2000);

const html = await page.evaluate(() => {
  const sheet = document.querySelector('[role="dialog"]') as HTMLElement | null;
  if (!sheet) return "NO SHEET";
  const footer = sheet.querySelector(".border-t");
  const nav = sheet.querySelector("nav");
  const logoRow = sheet.querySelector(".border-b");
  return JSON.stringify({
    logoRow: logoRow?.outerHTML.slice(0, 400),
    navLinks: nav ? Array.from(nav.querySelectorAll("a")).map((a) => a.outerHTML.slice(0, 260)) : [],
    footer: footer?.outerHTML,
  }, null, 1);
});
console.log(html.slice(0, 3500));
await browser.close();
