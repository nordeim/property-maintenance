// Session-205: the ref's mobile menu OPEN anatomy at 390 — the final
// comparison leg. Ours: the Radix dialog with 8 links (6 nav + phone +
// Book Now counted as links), Esc-close, focus-return. The ref's own
// menu: what does it open to?
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

// find + click the menu button
const btn = page.locator('button[aria-haspopup="dialog"]').first();
const btnVisible = await btn.isVisible().catch(() => false);
log(`menu button visible: ${btnVisible}`);
if (btnVisible) {
  await btn.click();
  await page.waitForTimeout(2000);
  const census = await page.evaluate(() => {
    // what changed on click? Census dialogs, sheets (data-state=open),
    // fixed/absolute overlays, and any newly-visible nav links
    const out: Record<string, unknown> = {};
    const dialogs = Array.from(document.querySelectorAll('[role="dialog"]'));
    out.allDialogs = dialogs.length;
    out.openState = Array.from(document.querySelectorAll('[data-state="open"]')).map((e) => ({
      tag: e.tagName,
      cls: String((e as HTMLElement).className).slice(0, 70),
      role: e.getAttribute("role"),
    })).slice(0, 5);
    const navs = Array.from(document.querySelectorAll("nav"));
    out.navs = navs.map((n) => {
      const r = (n as HTMLElement).getBoundingClientRect();
      const vis = Array.from(n.querySelectorAll("a")).filter((a) => (a as HTMLElement).offsetParent !== null);
      return { x: r.x, y: r.y, w: r.width, h: r.height, label: n.getAttribute("aria-label"), visibleLinks: vis.length, texts: vis.map((a) => a.textContent?.trim()).slice(0, 8) };
    });
    return out;
  });
  log(`menu open census: ${JSON.stringify(census)}`);
  writeFileSync("/tmp/ref-menu-open-390.png", await page.screenshot());
}
await browser.close();
log("done");
