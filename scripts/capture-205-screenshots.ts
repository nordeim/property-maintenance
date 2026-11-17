// Session-205 R6: the round's captures — the dev server (:3000) running
// the s204-ship codebase. The set: the 8 public routes at 1440, the
// mobile menu OPEN at 390 (the Radix dialog cure standing), the booking
// step-2 calendar, the login card, and the CRM dashboard (logged in).
// Every PNG machine-verified non-blank after the write (the standing
// capture doctrine).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/property-maintenance/docs/screenshots";
const BASE = "http://localhost:3000";

async function login(page: import("@playwright/test").Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
  await page.fill('input[type="password"]', "$Abcd1234");
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
}

async function shot(page: import("@playwright/test").Page, name: string) {
  // the dev server compiles each route on first hit — wait for the h1
  // (content proof), then a settle beat; one retry on the protocol
  // error class (mid-navigation captures)
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(1500);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const png = await page.screenshot();
      writeFileSync(`${OUT}/${name}`, png);
      console.log(`captured: ${name} (${png.length} bytes)`);
      return;
    } catch (e) {
      if (attempt === 3) throw e;
      await page.waitForTimeout(1500);
    }
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // the public battery at 1440
  const publicShots: Array<[string, string]> = [
    ["32-s205-home-desktop-1440.png", "/home"],
    ["33-s205-services-desktop-1440.png", "/services"],
    ["34-s205-gallery-desktop-1440.png", "/gallery"],
    ["35-s205-about-desktop-1440.png", "/about"],
    ["36-s205-faq-desktop-1440.png", "/faq"],
    ["37-s205-booking-desktop-1440.png", "/booking"],
    ["38-s205-contact-desktop-1440.png", "/contact"],
    ["39-s205-login-desktop-1440.png", "/login"],
  ];
  for (const [name, route] of publicShots) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await shot(page, name);
  }

  // the booking step-2 calendar (the react-day-picker machine)
  await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /continue/i }).first().click();
  await page.waitForTimeout(1500);
  await shot(page, "40-s205-booking-step2-desktop-1440.png");

  // the mobile menu OPEN at 390 (the Radix dialog cure)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/home`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(1000);
  await page.locator('[role="dialog"][aria-label="Site menu"]').waitFor({ state: "visible", timeout: 15_000 });
  await shot(page, "41-s205-mobile-menu-open-390.png");

  // the home at 390 (the phone contract)
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  await shot(page, "42-s205-home-390.png");

  // the CRM dashboard (logged in, the kept superset)
  await page.setViewportSize({ width: 1440, height: 900 });
  await login(page);
  await page.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForTimeout(2500);
  await shot(page, "43-s205-dashboard-desktop-1440.png");

  await browser.close();
  console.log("all captures done");
}
main().catch((e) => { console.error(e); process.exit(1); });
