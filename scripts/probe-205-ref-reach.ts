// Session-205: is the ref reachable from chromium AT ALL right now?
// Minimal: one goto, no login, resource-log the failure mode.
import { chromium } from "@playwright/test";

const REF = "https://oasis-property-maintenance.base44.app";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.on("requestfailed", (r) => console.log("FAILED:", r.url().slice(0, 80), r.failure()?.errorText));
try {
  const res = await page.goto(`${REF}/login`, { waitUntil: "commit", timeout: 30_000 });
  console.log("goto commit ok, status:", res?.status());
  await page.waitForTimeout(3000);
  console.log("title now:", await page.title());
} catch (e) {
  console.log("goto error:", String(e).slice(0, 150));
}
await browser.close();
