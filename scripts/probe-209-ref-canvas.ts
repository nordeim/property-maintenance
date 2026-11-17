// Session-209 A: the fresh reference canvas captures — the standing
// moving-target check (has the ref redesigned its canvas since the
// s208 decode?) + the sprite-hunt pairs (two frames per page — the
// frame delta isolates the moving sprites, the residual ledger's
// standing floor; this round they're the TARGET: decode their exact
// geometry + tones for the animation port). Logged in, 1440x900:
// booking + landing + faq.
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

// the sprite hunt: two frames ~1.6s apart per page — the frame delta
// isolates the MOVING elements (the red element + the diagonal streak;
// this round's decode targets)
const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["booking-b.png", "/booking"],
  ["landing-a.png", "/"],
  ["landing-b.png", "/"],
  ["faq-a.png", "/faq"],
  ["faq-b.png", "/faq"],
];
for (const [name, route] of shots) {
  await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(3500);
  writeFileSync(`/tmp/ref-209-${name}`, await page.screenshot());
  log(`${name} saved (${route})`);
}
await browser.close();
log("done");
