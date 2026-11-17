// Session-200 (the R3 captures): the dev server's Oasis surfaces —
// desktop + 390, the Radix menu open, the booking steps, the login, the
// 404 — saved to docs/screenshots/ (the prompt's deliverable).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function shot(name: string, url: string, width: number, height: number, action?: (page: import("@playwright/test").Page) => Promise<void>) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE}${url}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
  if (action) await action(page);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log("captured:", name);
}

// the desktop faces (1440)
await shot("01-home-desktop", "/", 1440, 900);
await shot("02-services-desktop", "/services", 1440, 900);
await shot("03-gallery-desktop", "/gallery", 1440, 900);
await shot("04-faq-desktop", "/faq", 1440, 900);
await shot("05-about-desktop", "/about", 1440, 900);
await shot("06-contact-desktop", "/contact", 1440, 900);
await shot("07-booking-desktop", "/booking", 1440, 900);
await shot("08-login-desktop", "/login", 1440, 900);
await shot("09-404-desktop", "/this-page-does-not-exist", 1440, 900);

// the phone faces (390)
await shot("10-home-390", "/", 390, 844);
await shot("11-booking-390", "/booking", 390, 844);
await shot("12-contact-390", "/contact", 390, 844);

// the Radix mobile menu OPEN (the R1 cure's face)
await shot("13-mobile-menu-open-390", "/", 390, 844, async (page) => {
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Site menu" }).waitFor({ state: "visible" });
  await page.waitForTimeout(400);
});

// the booking flow's step 2 (the calendar + slots)
await shot("14-booking-step2-desktop", "/booking", 1440, 900, async (page) => {
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.waitForTimeout(900);
});

// the CRM superset face (the kept back office)
await shot("15-crm-dashboard-desktop", "/dashboard", 1440, 900);

await browser.close();
console.log("ALL CAPTURED");
