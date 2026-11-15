// Session-204 B: WHERE does the remaining residual sit? The sweep gives
// one number per page (faq 13.42 / booking 23.67 at 1440); this probe
// localizes it — screenshots both apps at the sweep's viewport form and
// band-diffs the images (12 horizontal bands of 75px) so the delta mass
// is named by region: the canvas/animation zone vs structural rows.
import { chromium, type Page } from "@playwright/test";

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
  for (const route of ["faq", "booking"]) {
    const shots: Array<Buffer> = [];
    for (const base of [OUR_URL, REF_URL]) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, base);
      await page.goto(`${base}/${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(3000); // let the canvas settle past its intro
      shots.push((await page.screenshot()) as Buffer);
      await page.close();
    }
    // band-diff in-process
    const [{ image: a }, { image: b }] = [{ image: shots[0] }, { image: shots[1] }];
    const { execSync } = await import("node:child_process");
    const fs = await import("node:fs");
    fs.writeFileSync(`/tmp/band-${route}-ours.png`, a);
    fs.writeFileSync(`/tmp/band-${route}-ref.png`, b);
    execSync(`python3 /home/z/my-project/property-maintenance/scripts/band_diff.py /tmp/band-${route}-ours.png /tmp/band-${route}-ref.png ${route}`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
