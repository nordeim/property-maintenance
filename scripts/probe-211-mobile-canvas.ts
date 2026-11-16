// Session-211 D: the mobile canvas anatomy — the ref's 390 canvas
// dimensions + scaling, so we can tell whether their mobile scene is
// the same fixed scene (CSS-scaled) or re-derived. Plus 2 frames 800ms
// apart to catch their bird's y at 390.
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
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await refLogin(page).catch(() => {});
await page.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(3500);

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
    docHeight: document.documentElement.scrollHeight,
  };
});
console.log(`ref 390 canvas: ${JSON.stringify(info)}`);

// our page height for the footer question
const our = await browser.newPage({ viewport: { width: 390, height: 844 } });
await our.goto("http://localhost:3000/booking", { waitUntil: "domcontentloaded", timeout: 60_000 });
await our.waitForTimeout(3500);
const ourInfo = await our.evaluate(() => {
  const c = document.querySelector("canvas");
  return {
    canvasW: c?.width,
    canvasH: c?.height,
    docHeight: document.documentElement.scrollHeight,
    footerTop: (() => {
      const f = document.querySelector("footer");
      return f ? Math.round(f.getBoundingClientRect().top + window.scrollY) : null;
    })(),
  };
});
console.log(`our 390: ${JSON.stringify(ourInfo)}`);

// the ref's footer position too
const refFooter = await page.evaluate(() => {
  const f = document.querySelector("footer");
  return f
    ? {
        footerTop: Math.round(f.getBoundingClientRect().top + window.scrollY),
        docHeight: document.documentElement.scrollHeight,
      }
    : null;
});
console.log(`ref 390 footer: ${JSON.stringify(refFooter)}`);

// 2 frames 800ms apart at 390 (bird y at mobile)
for (let f = 0; f < 2; f++) {
  await page.waitForTimeout(800);
  writeFileSync(`/tmp/ref-211-390-frame-${f}.png`, await page.screenshot());
  console.log(`ref-390-frame-${f} saved`);
}
await browser.close();
console.log("done");
