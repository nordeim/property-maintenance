// Session-205: the ref-only leg of the intake probe (ours already
// verified). Login via the click+type path, census the landing + the
// 390 mobile state — the standing comparison against the s204 record.
import { chromium, type Page } from "@playwright/test";

const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const log = (s: string) => console.log(`[probe] ${s}`);

async function refLogin(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(8000);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await page.locator("#email").click({ timeout: 20_000 });
      await page.keyboard.type(EMAIL, { delay: 15 });
      await page.locator("#password").click({ timeout: 20_000 });
      await page.keyboard.type(PASSWORD, { delay: 15 });
      await page.getByRole("button", { name: "Sign in" }).click({ timeout: 20_000 });
      await page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 });
      await page.waitForTimeout(3000);
      return;
    } catch {
      if (attempt === 1) throw new Error("ref login failed after 2 rounds");
      await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
      await page.waitForTimeout(8000);
    }
  }
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await refLogin(page).catch((e) => log(`ref login FAILED: ${String(e).slice(0, 140)}`));
log(`ref post-login url=${page.url()}`);
if (!page.url().endsWith("/login")) {
  await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(4000);
  log(`ref / title=${JSON.stringify(await page.title())}`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(4000);
  const nav = await page.evaluate(() => {
    const navEl = document.querySelector("nav");
    const navW = navEl ? navEl.getBoundingClientRect().width : -1;
    const navLinks = navEl ? Array.from(navEl.querySelectorAll("a")).filter((a) => (a as HTMLElement).offsetParent !== null).length : -1;
    const menuBtns = Array.from(document.querySelectorAll('button[aria-haspopup="dialog"], button[aria-label*="menu" i]')).filter((b) => (b as HTMLElement).offsetParent !== null);
    return { navW, navLinks, menuBtns: menuBtns.length, firstBtn: menuBtns[0]?.getAttribute("aria-label") ?? menuBtns[0]?.textContent?.slice(0, 30) ?? null };
  });
  log(`ref 390 mobile census: ${JSON.stringify(nav)}`);
}
await browser.close();
log("done");
