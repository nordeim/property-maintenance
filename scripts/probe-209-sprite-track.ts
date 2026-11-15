// Session-209 B: the sprite tracker — rapid-fire frames on the ref's
// booking page (the largest moving cluster x1344-1430). Six frames
// 700ms apart, then the delta analysis locates each sprite's MOTION
// VECTOR (position vs frame) — the decode for the animation port.
import { chromium, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await refLogin(page).catch((e) => console.log(`login FAILED: ${String(e).slice(0, 100)}`));
await page.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(3500);
for (let i = 0; i < 22; i++) {
  writeFileSync(`/tmp/ref-209-track-${i}.png`, await page.screenshot());
  console.log(`frame ${i} saved`);
  await page.waitForTimeout(1000);
}
await browser.close();
console.log("done");
