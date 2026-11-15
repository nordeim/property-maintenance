// Session-204 B: the canvas re-derivation sampler — the ref's faq page
// exposes the shared painter's edge decor (the landing never did: its
// full-bleed content covers those zones, which is why the s201 decode
// missed them and the landing floor stayed blind to them). This probe
// grid-samples BOTH apps' faq margins (x 5..300 + 1140..1435,
// y 430..880) and prints the differing cells' colors — the exact 2D
// geometry of the rocks/bushes/band/tint, ours vs the ref's.
import { chromium, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const base of [OUR_URL, REF_URL]) {
    const label = base === OUR_URL ? "ours" : "ref";
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, base);
    await page.goto(`${base}/booking`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    const png = await page.screenshot();
    writeFileSync(`/tmp/grid-booking-${label}.png`, png);
    await page.close();
    console.log(`shot: /tmp/grid-booking-${label}.png`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
