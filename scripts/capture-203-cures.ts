// Session-203 E: the round's captures — the two cured surfaces (the
// faq page's space-y-12 rhythm + the booking page's mb-6 header rhythm)
// at desktop + phone. Shot against a standalone booted on :3101 (AWAY
// from the e2e's :3100 — the stale-server incident's lesson), and the
// caller kills it right after (the s202 lesson: never leave a server
// on a port a later suite might reuse).
import { chromium, type Page } from "@playwright/test";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUR_URL = process.env.OUR_URL ?? "http://localhost:3101";
const OUT = join(REPO, "docs", "screenshots");

async function waitOnUrl(url: string, ms: number) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try { if ((await fetch(url)).ok) return true; } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function shot(page: Page, name: string) {
  const path = join(OUT, name);
  await page.screenshot({ path });
  console.log(`captured: ${name} (${existsSync(path) ? "ok" : "MISSING"})`);
}

async function main() {
  if (!(await waitOnUrl(`${OUR_URL}/api/health`, 60_000))) throw new Error("server never came up");
  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${OUR_URL}/faq`, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(2500);
  await shot(desktop, "26-faq-rhythm-desktop-1440.png");
  await desktop.goto(`${OUR_URL}/booking`, { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(2500);
  await shot(desktop, "27-booking-header-rhythm-desktop-1440.png");
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await phone.goto(`${OUR_URL}/faq`, { waitUntil: "domcontentloaded" });
  await phone.waitForTimeout(1800);
  await shot(phone, "28-faq-rhythm-390.png");
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
