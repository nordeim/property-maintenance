// Session-210 A: the fresh reference canvas captures — the standing
// moving-target check (has the ref redesigned its canvas since the
// s209 decode?) at the two phases that matter for the AA-edge decode:
// the strip seed + full. Logged in, 1440x900, booking page.
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

// the AA-edge decode needs ZOOMED crops, not just full pages: capture
// full + element crops at the hedge boundary + the G band edge. First
// the full-page pairs (stability), then device-scale-factor 2 crops.
const shots: Array<[string, string]> = [
  ["booking-a.png", "/booking"],
  ["landing-a.png", "/"],
  ["faq-a.png", "/faq"],
];
for (const [name, route] of shots) {
  await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(3500);
  writeFileSync(`/tmp/ref-210-${name}`, await page.screenshot());
  log(`${name} saved (${route})`);
}

// the hi-dpi pass: the hedge boundary (the s207 hedge genus, right
// side ~x1050-1440) + the G band edges (the horizontal bands ~y470+)
// — clip regions at deviceScaleFactor 2 for the AA-edge decode
const zoom = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await zoom.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await zoom.waitForTimeout(3500);
const crops: Array<[string, object]> = [
  ["hedge-boundary.png", { x: 1040, y: 250, width: 400, height: 300 }],
  ["gband-edge.png", { x: 300, y: 430, width: 500, height: 200 }],
  ["hedge-left.png", { x: 0, y: 300, width: 400, height: 300 }],
];
for (const [name, clip] of crops) {
  writeFileSync(`/tmp/ref-210-zoom-${name}`, await zoom.screenshot({ clip: clip as never }));
  log(`zoom-${name} saved`);
}
await browser.close();
log("done");
