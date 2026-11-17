// Session-207 A: the fresh reference canvas captures — the standing
// moving-target check (has the ref redesigned its canvas AGAIN since
// the s206 decode?) + the fine-shapes zone shots for the residual
// ledger work (the hedge gradient + the AA edges). Logged in, 1440x900,
// the booking (the canvas's fullest exposure) + landing + faq.
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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await refLogin(page).catch((e) => log(`login FAILED: ${String(e).slice(0, 120)}`));
log(`post-login url=${page.url()}`);

const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["booking-b.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
];
for (const [name, route] of shots) {
  await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(3500);
  writeFileSync(`/tmp/ref-207-${name}`, await page.screenshot());
  log(`${name} saved (${route})`);
}
await browser.close();
log("done");
