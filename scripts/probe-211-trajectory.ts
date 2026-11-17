// Session-211 B: the mini-sprite trajectory decode — 8 frames over
// ~5s at hi-dpi, watching the whole descent-top zone (x1360-1440,
// y260-320). Also captures OUR canvas the same way for comparison.
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

// REF: 8 frames, 700ms apart
const refZoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await refLogin(refZoom).catch(() => {});
await refZoom.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await refZoom.waitForTimeout(3500);
for (let f = 0; f < 8; f++) {
  await refZoom.waitForTimeout(700);
  writeFileSync(
    `/tmp/ref-211-traj-${f}.png`,
    await refZoom.screenshot({ clip: { x: 1360, y: 260, width: 80, height: 70 } }),
  );
  console.log(`ref-traj-${f} saved`);
}

// OURS: the same 8 frames
const ourZoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await ourZoom.goto("http://localhost:3000/booking", { waitUntil: "domcontentloaded", timeout: 60_000 });
await ourZoom.waitForTimeout(3500);
for (let f = 0; f < 8; f++) {
  await ourZoom.waitForTimeout(700);
  writeFileSync(
    `/tmp/our-211-traj-${f}.png`,
    await ourZoom.screenshot({ clip: { x: 1360, y: 260, width: 80, height: 70 } }),
  );
  console.log(`our-traj-${f} saved`);
}
await browser.close();
console.log("done");
