// Session-205 F-205g: the ref's mobile menu SHEET geometry — which side
// does it slide from? The sheet DIV's own rect + the slide-in animation
// classes + a screenshot for the record.
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
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await refLogin(page).catch((e) => log(`login FAILED: ${String(e).slice(0, 100)}`));
await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(4000);

await page.locator('button[aria-haspopup="dialog"]').first().click();
await page.waitForTimeout(2000);
const census = await page.evaluate(() => {
  const sheet = document.querySelector('[role="dialog"]') as HTMLElement | null;
  if (!sheet) return { sheet: null };
  const r = sheet.getBoundingClientRect();
  const cls = String(sheet.className);
  return {
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    cls: cls,
    // the tell-tale shadcn Sheet side utilities:
    hasInsetY: cls.includes("inset-y-0"),
    hasRight0: cls.includes("right-0"),
    hasLeft0: cls.includes("left-0"),
    hasBorderL: cls.includes("border-l"),
    hasBorderR: cls.includes("border-r"),
    // content inventory
    links: Array.from(sheet.querySelectorAll("a")).filter((a) => (a as HTMLElement).offsetParent !== null).map((a) => a.textContent?.trim()),
    buttons: Array.from(sheet.querySelectorAll("button")).filter((b) => (b as HTMLElement).offsetParent !== null).map((b) => b.getAttribute("aria-label") ?? b.textContent?.trim()),
    texts: Array.from(sheet.querySelectorAll("h1,h2,h3,p,span,div")).filter((e) => e.children.length === 0 && (e as HTMLElement).offsetParent !== null).map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 14),
  };
});
log(`sheet census: ${JSON.stringify(census, null, 2)}`);
writeFileSync("/tmp/ref-menu-open-390.png", await page.screenshot());

// Esc close + focus return on the ref
await page.keyboard.press("Escape");
await page.waitForTimeout(1200);
const postEsc = await page.evaluate(() => ({
  openDialogs: Array.from(document.querySelectorAll('[role="dialog"]')).filter((d) => (d as HTMLElement).offsetParent !== null).length,
  focusOn: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.slice(0, 20) ?? document.activeElement?.tagName,
}));
log(`after Esc: ${JSON.stringify(postEsc)}`);
await browser.close();
log("done");
