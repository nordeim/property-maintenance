// Session-204 B: the canvas iteration loop — shots ONLY our faq (the
// reference's grid capture is already on disk; one login per run to
// spare the dev server's login rate-limiter) and prints the same
// classify-map so the painter's output compares cell-by-cell against
// the reference's scene.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', "sepnetflix2023@outlook.com");
  await page.fill('input[type="password"]', "$Abcd1234");
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  writeFileSync("/tmp/landing-ours-now.png", await page.screenshot());
  await browser.close();
  execSync("python3 /home/z/my-project/property-maintenance/scripts/landing_bands.py", { stdio: "inherit" });
}
main().catch((e) => { console.error(e); process.exit(1); });
