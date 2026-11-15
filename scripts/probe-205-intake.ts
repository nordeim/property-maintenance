// Session-205 intake probe: OUR dev server's public battery + the
// reference's live state, side by side. Read-only reconnaissance —
// no code changes. Mirrors the probe-204 form (login once, spare the
// limiter), checks:
//   A. our 8 public routes render + the mobile hamburger contract
//   B. the reference login + its public routes (title/census)
//   C. our mobile menu open/ride/close (the Radix dialog contract)
import { chromium, type Page } from "@playwright/test";

const OURS = "http://localhost:3000";
const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const log = (s: string) => console.log(`[probe] ${s}`);

async function ours() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const routes = ["/", "/home", "/services", "/gallery", "/about", "/faq", "/booking", "/contact"];
  for (const r of routes) {
    const res = await page.goto(`${OURS}${r}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);
    const h1 = await page.locator("h1").first().textContent().catch(() => null);
    log(`ours ${r} → ${res?.status()} h1=${JSON.stringify(h1?.trim().slice(0, 40))}`);
  }
  // the mobile menu contract at 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${OURS}/home`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  const btn = page.getByRole("button", { name: "Open menu" });
  const btnVisible = await btn.isVisible().catch(() => false);
  const btnCount = await page.locator('button[aria-label="Open menu"]').count();
  log(`ours 390: hamburger visible=${btnVisible} count=${btnCount}`);
  if (btnVisible) {
    await btn.click();
    await page.waitForTimeout(400);
    const menu = page.locator('[role="dialog"][aria-label="Site menu"]');
    const menuVisible = await menu.isVisible().catch(() => false);
    const links = await menu.getByRole("link").count();
    log(`ours 390: menu open=${menuVisible} links=${links}`);
    // Esc closes + focus returns
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const menuGone = !(await menu.isVisible().catch(() => false));
    const focusName = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    log(`ours 390: Esc closed=${menuGone} focusOn=${focusName}`);
  }
  await browser.close();
}

async function refLogin(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(8000);
  // fill()'s actionability check races the ref's hydration re-renders;
  // click + keyboard.type is the reliable path (probe-205-fillpath).
  // Two attempt rounds with a full reload between (the ref's SPA can
  // wedge its first hydration under load — the reload is the cure).
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

async function ref() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refLogin(page).catch((e) => log(`ref login FAILED: ${String(e).slice(0, 120)}`));
  log(`ref post-login url=${page.url()}`);
  await page.goto(`${REF}/`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(4000);
  const title = await page.title();
  log(`ref / title=${JSON.stringify(title)}`);
  // the ref's mobile menu census at 390 (the standing comparison)
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
  await browser.close();
}

async function main() {
  log("=== A. ours (dev :3000) ===");
  await ours();
  log("=== B. the reference ===");
  await ref();
  log("done");
}
main().catch((e) => { console.error(e); process.exit(1); });
