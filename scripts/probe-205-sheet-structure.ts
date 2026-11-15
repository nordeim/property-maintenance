// Session-205 F-205g tail: the ref sheet's INNER structure (the child
// order + the header row construction) — the final decode before the cure.
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
await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(4000);
await page.locator('button[aria-haspopup="dialog"]').first().click();
await page.waitForTimeout(2000);

const structure = await page.evaluate(() => {
  const sheet = document.querySelector('[role="dialog"]') as HTMLElement | null;
  if (!sheet) return null;
  // walk the direct children + their key facts
  const describe = (el: Element, depth: number): unknown => {
    const e = el as HTMLElement;
    const r = e.getBoundingClientRect();
    return {
      tag: el.tagName,
      cls: String(e.className).slice(0, 90),
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      text: e.children.length === 0 ? e.textContent?.trim().slice(0, 40) : undefined,
      children: depth > 0 ? Array.from(el.children).map((c) => describe(c, depth - 1)) : undefined,
    };
  };
  return describe(sheet, 3);
});
console.log(JSON.stringify(structure, null, 1).slice(0, 4000));
writeFileSync("/tmp/ref-sheet-final.png", await page.screenshot());
await browser.close();
