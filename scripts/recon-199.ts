// Session-199 recon (the property-maintenance checkout round): the
// probe:ref parity event against the OASIS reference deployment
// (bundle ee166dd5… vs the standing 46bc2d9c…, desktopNav 485px/6
// links vs the standing 256px/8, mobileNav 0 menu buttons vs the
// standing 1, landing 6 links vs the standing 7) demands the
// maiden-observation step before any sweep/gate is trusted: WHAT is
// the oasis shell, and how does it differ from BOTH the standing
// neo-crm reference AND our app?
//
// What it does (bun scripts/recon-199.ts):
//   1. logs into the OASIS reference (its own storageState under
//      /tmp — never the sweep-state pair, which stays calibrated to
//      the neo-crm URL)
//   2. at 1440x900: /dashboard + / + /contacts — the nav anatomy
//      (sidebar width, link texts, topbar census) + screenshots
//   3. at 390x844: /dashboard — the TRUE-390 nav census + screenshot
//   4. the SAME faces on OUR app (boots or reuses the dev :3000)
//   5. prints the anatomy comparison table
//
// Run: bun scripts/recon-199.ts
// Env: REF_URL (default https://oasis-property-maintenance.base44.app)
//      HEADLESS=0 to watch the drive
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const root = resolve(here, "..");
    return root;
  } catch {
    return process.cwd();
  }
})();
const OUR_URL = "http://localhost:3000";
const REF_URL =
  process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const OUT = "/tmp/recon-199";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

mkdirSync(OUT, { recursive: true });

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function bootDev(): Promise<ReturnType<typeof spawn> | null> {
  if (await waitOnUrl(`${OUR_URL}/api/health`, 1500)) return null;
  console.log("[recon] booting the dev server on :3000…");
  const child = spawn("bun", ["run", "dev"], {
    cwd: REPO,
    stdio: "ignore",
    detached: true,
  });
  child.unref();
  if (!(await waitOnUrl(`${OUR_URL}/api/health`, 120_000))) {
    throw new Error("the dev server never came up on :3000");
  }
  return child;
}

interface NavCensus {
  width: number;
  links: string[];
  topbarButtons: string[];
  menuButtons: number;
}

/** The nav anatomy at the CURRENT viewport: the app-shell sidebar
 * (or the landing header) + the topbar census. */
async function navCensus(page: import("@playwright/test").Page): Promise<NavCensus> {
  return page.evaluate(() => {
    const texts = (els: Element[]) =>
      els
        .map((el) => (el.textContent ?? "").trim().replace(/\s+/g, " "))
        .filter(Boolean)
        .slice(0, 14);
    // the app shell: the fixed left sidebar (the reference + ours) —
    // any nav-ish container wider than tall on the left edge
    let width = 0;
    let links: string[] = [];
    for (const nav of Array.from(document.querySelectorAll("nav"))) {
      const r = nav.getBoundingClientRect();
      if (r.width > 100 && r.height > 300 && r.left < 80) {
        width = Math.round(r.width);
        links = texts(
          Array.from(nav.querySelectorAll("a")).filter((a) => {
            const rr = a.getBoundingClientRect();
            return rr.width > 0 && rr.height > 0;
          }),
        );
        break;
      }
    }
    if (!links) links = [];
    const menuButtons = Array.from(
      document.querySelectorAll('button[aria-label*="menu" i], button[aria-label*="Menu"]'),
    ).filter((b) => {
      const r = b.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).length;
    const topbarButtons = texts(
      Array.from(document.querySelectorAll("header button, nav ~ * button")).filter(
        (b) => {
          const r = b.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.top < 120;
        },
      ),
    );
    return { width, links, topbarButtons, menuButtons };
  });
}

async function login(page: import("@playwright/test").Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "domcontentloaded" });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  // the post-login redirect lands on "/" (the s142 marketing layer)
  // OR the dashboard — accept both, then settle.
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30_000 });
  await page.waitForTimeout(2500);
}

async function main() {
  await bootDev();
  const browser = await chromium.launch({ headless: process.env.HEADLESS !== "0" });

  // ---- the reference ------------------------------------------------
  const refCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const refPage = await refCtx.newPage();
  console.log(`[recon] reference: ${REF_URL}`);
  await login(refPage, REF_URL);
  console.log("[recon] reference logged in");

  const refAnatomy: Record<string, NavCensus> = {};
  for (const [key, path] of [
    ["dashboard", "/dashboard"],
    ["landing", "/"],
    ["contacts", "/contacts"],
  ] as const) {
    await refPage.goto(`${REF_URL}${path}`, { waitUntil: "domcontentloaded" });
    await refPage.waitForTimeout(3500);
    refAnatomy[key] = await navCensus(refPage);
    await refPage.screenshot({ path: `${OUT}/ref-desktop-${key}.png` });
    console.log(`[recon] ref desktop ${key}: ${JSON.stringify(refAnatomy[key])}`);
  }

  const refPhone = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const refPhonePage = await refPhone.newPage();
  await login(refPhonePage, REF_URL);
  await refPhonePage.goto(`${REF_URL}/dashboard`, { waitUntil: "domcontentloaded" });
  await refPhonePage.waitForTimeout(3500);
  const refPhoneAnatomy = await navCensus(refPhonePage);
  await refPhonePage.screenshot({ path: `${OUT}/ref-390-dashboard.png` });
  console.log(`[recon] ref 390 dashboard: ${JSON.stringify(refPhoneAnatomy)}`);

  // ---- ours ----------------------------------------------------------
  const ourCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const ourPage = await ourCtx.newPage();
  await login(ourPage, OUR_URL);
  console.log("[recon] ours logged in");

  const ourAnatomy: Record<string, NavCensus> = {};
  for (const [key, path] of [
    ["dashboard", "/dashboard"],
    ["landing", "/"],
    ["contacts", "/contacts"],
  ] as const) {
    await ourPage.goto(`${OUR_URL}${path}`, { waitUntil: "domcontentloaded" });
    await ourPage.waitForTimeout(3500);
    ourAnatomy[key] = await navCensus(ourPage);
    await ourPage.screenshot({ path: `${OUT}/our-desktop-${key}.png` });
    console.log(`[recon] our desktop ${key}: ${JSON.stringify(ourAnatomy[key])}`);
  }

  const ourPhone = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const ourPhonePage = await ourPhone.newPage();
  await login(ourPhonePage, OUR_URL);
  await ourPhonePage.goto(`${OUR_URL}/dashboard`, { waitUntil: "domcontentloaded" });
  await ourPhonePage.waitForTimeout(3500);
  const ourPhoneAnatomy = await navCensus(ourPhonePage);
  await ourPhonePage.screenshot({ path: `${OUT}/our-390-dashboard.png` });
  console.log(`[recon] our 390 dashboard: ${JSON.stringify(ourPhoneAnatomy)}`);

  console.log("\n===== anatomy comparison =====");
  for (const key of ["dashboard", "landing", "contacts"]) {
    const r = refAnatomy[key];
    const o = ourAnatomy[key];
    console.log(`\n[${key}]`);
    console.log(`  ref : w=${r.width} links=${r.links.length} ${JSON.stringify(r.links)}`);
    console.log(`  ours: w=${o.width} links=${o.links.length} ${JSON.stringify(o.links)}`);
    console.log(`  ref topbar : ${JSON.stringify(r.topbarButtons)}`);
    console.log(`  ours topbar: ${JSON.stringify(o.topbarButtons)}`);
  }
  console.log(`\n[390 dashboard]`);
  console.log(`  ref : menuButtons=${refPhoneAnatomy.menuButtons} w=${refPhoneAnatomy.width}`);
  console.log(`  ours: menuButtons=${ourPhoneAnatomy.menuButtons} w=${ourPhoneAnatomy.width}`);

  await browser.close();
}

main().catch((err) => {
  console.error("[recon] FAILED:", err);
  process.exit(1);
});
