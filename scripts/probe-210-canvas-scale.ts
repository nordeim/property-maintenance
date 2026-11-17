// Session-210 B: the internal-scale decode — read the ref's canvas
// element dimensions (canvas.width vs clientWidth) to confirm the 2x
// internal render theory, and compare our own canvas the same way.
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

const probe = async (page: Page, label: string) => {
  const info = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return { found: false };
    return {
      found: true,
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
      dpr: window.devicePixelRatio,
    };
  });
  console.log(`[${label}] ${JSON.stringify(info)}`);
};

const browser = await chromium.launch({ headless: true });

const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await refLogin(refPage).catch(() => {});
await refPage.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await refPage.waitForTimeout(3500);
await probe(refPage, "ref@1x");

const ourPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await ourPage.goto("http://localhost:3000/booking", { waitUntil: "domcontentloaded", timeout: 45_000 });
await ourPage.waitForTimeout(3500);
await probe(ourPage, "ours@1x");

await browser.close();
console.log("done");
