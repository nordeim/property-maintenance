// Session-199 recon leg 2: the TEXT census of the oasis reference —
// headings, nav links, buttons, section text — the evidence layer that
// works without image input. Dumps every walked route's textual
// anatomy so the app's identity (CRM shell vs booking site) is
// settled from content, not pixels.
//
// Run: bun scripts/recon-199-text.ts
import { chromium } from "@playwright/test";

const REF_URL =
  process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: import("@playwright/test").Page) {
  await page.goto(`${REF_URL}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('input[type="email"]', { timeout: 20_000 });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30_000 });
  await page.waitForTimeout(2000);
}

async function textCensus(page: import("@playwright/test").Page, label: string) {
  const census = await page.evaluate(() => {
    const vis = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const txt = (sel: string, n = 20) =>
      Array.from(document.querySelectorAll(sel))
        .filter(vis)
        .map((el) => (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 90))
        .filter(Boolean)
        .slice(0, n);
    const links = Array.from(document.querySelectorAll("a"))
      .filter(vis)
      .map((a) => `${(a.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40)} → ${(a as HTMLAnchorElement).getAttribute("href")}`)
      .filter((s) => !s.startsWith(" →"))
      .slice(0, 25);
    return {
      title: document.title,
      h1: txt("h1", 4),
      h2: txt("h2", 10),
      h3: txt("h3", 12),
      buttons: txt("button", 16),
      links,
      paragraphs: txt("p", 8).map((s) => s.slice(0, 110)),
      bodyChars: document.body.textContent?.length ?? 0,
    };
  });
  console.log(`\n===== [${label}] ${page.url()} =====`);
  console.log(`title: ${census.title} (body ${census.bodyChars} chars)`);
  console.log(`h1: ${JSON.stringify(census.h1)}`);
  console.log(`h2: ${JSON.stringify(census.h2)}`);
  console.log(`h3: ${JSON.stringify(census.h3)}`);
  console.log(`buttons: ${JSON.stringify(census.buttons)}`);
  console.log(`links: ${JSON.stringify(census.links, null, 0).slice(0, 2000)}`);
  console.log(`paragraphs: ${JSON.stringify(census.paragraphs)}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // the PUBLIC faces first (no auth): /, /login
  await page.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  await textCensus(page, "public /");

  await page.goto(`${REF_URL}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  await textCensus(page, "public /login");

  // then the authed faces
  await login(page);
  console.log("[recon] logged in");
  for (const path of ["/", "/dashboard", "/Dashboard", "/contacts", "/leads", "/accounts", "/calendar", "/activities", "/reports", "/settings", "/about", "/contact"]) {
    await page.goto(`${REF_URL}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    await textCensus(page, `authed ${path}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error("[recon] FAILED:", err);
  process.exit(1);
});
