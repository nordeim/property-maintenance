// Session-204 B2: the booking hero card's glass — ours paints
// greenish-white at x500-750 where the ref paints gray. This probe
// reads the computed background of the card's element at the differing
// points (backgroundColor, backgroundImage, backdropFilter) on BOTH
// apps.
import { chromium, type Page } from "@playwright/test";

const URLS: Array<[string, string]> = [
  ["ours", "http://localhost:3000"],
  ["ref", "https://oasis-property-maintenance.base44.app"],
];
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

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

const POINTS = [[500, 270], [720, 270], [720, 300], [900, 270], [1050, 280]];

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const [label, base] of URLS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, base);
    await page.goto(`${base}/booking`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const lines = await page.evaluate((pts: number[][]) => {
      const out: string[] = [];
      for (const [x, y] of pts) {
        const stack = document.elementsFromPoint(x, y);
        const glass = stack.find((e) => {
          const cs = getComputedStyle(e as HTMLElement);
          return cs.backdropFilter !== "none" || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && (e as HTMLElement).tagName === "DIV" && cs.backgroundColor.includes("rgba"));
        }) as HTMLElement | undefined;
        if (!glass) { out.push(`(${x},${y}): no glass element`); continue; }
        const cs = getComputedStyle(glass);
        const r = glass.getBoundingClientRect();
        out.push(
          `(${x},${y}) glass=${glass.className.toString().slice(0, 30)} box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} bg=${cs.backgroundColor} bbi=${cs.backgroundImage === "none" ? "-" : cs.backgroundImage.slice(0, 50)} bb=${cs.backdropFilter}`,
        );
      }
      return out;
    }, POINTS);
    console.log(`── [${label}] ──`);
    for (const l of lines) console.log(`  ${l}`);
    await page.close();
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
