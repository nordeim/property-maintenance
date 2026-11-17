// Session-211 A: the fresh reference captures — the standing
// moving-target check + the shimmer-zone decode material. Logged in,
// 1440x900. The shimmer zone (y275-310, x1390-1440) gets a hi-dpi
// zoom + a MULTI-FRAME capture (the shimmer was an oscillation — one
// frame can't confirm it; 3 frames 700ms apart).
import { chromium, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const log = (s: string) => console.log(`[probe] ${s}`);

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
await refLogin(page).catch((e) => log(`login FAILED: ${String(e).slice(0, 120)}`));
log(`post-login url=${page.url()}`);

// the three standing pages
for (const [name, route] of [
  ["booking-a.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
] as Array<[string, string]>) {
  await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(3500);
  writeFileSync(`/tmp/ref-211-${name}`, await page.screenshot());
  log(`${name} saved (${route})`);
}

// the mobile 390 pass (the nav re-verify round)
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await mob.waitForTimeout(3500);
writeFileSync(`/tmp/ref-211-booking-390.png`, await mob.screenshot());
log("booking-390.png saved");
// the mobile menu OPEN state
await mob.locator('button:has([class*="hamburger"]), button[aria-label*="menu" i]').first().click({ timeout: 10_000 }).catch(() => {});
await mob.waitForTimeout(1200);
writeFileSync(`/tmp/ref-211-booking-390-menu.png`, await mob.screenshot());
log("booking-390-menu.png saved");

// the shimmer zone: hi-dpi zoom + 3 frames
const zoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await zoom.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await zoom.waitForTimeout(3500);
for (let f = 0; f < 3; f++) {
  await zoom.waitForTimeout(700);
  writeFileSync(
    `/tmp/ref-211-zoom-shimmer-${f}.png`,
    await zoom.screenshot({ clip: { x: 1380, y: 260, width: 60, height: 60 } }),
  );
  log(`zoom-shimmer-${f}.png saved`);
}
await browser.close();
log("done");
