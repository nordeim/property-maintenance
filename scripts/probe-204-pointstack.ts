// Session-204 B: canvas or content? The ref's landing shows warm tones
// at y420-480 + new greens/reds in the hero — either its page-aware
// canvas paints elsewhere on the landing, or the landing's own sections
// changed. This probe asks the DOM at the sample points: the element,
// its tag/class, and whether it's the canvas or content.
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

const POINTS = [
  [900, 240], [1100, 240], [1100, 295], [1300, 240], [1400, 270],
  [1200, 420], [1250, 480], [1400, 480], [1430, 660], [720, 270],
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const [label, base] of URLS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, base);
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    const lines = await page.evaluate((pts: number[][]) => {
      const out: string[] = [];
      for (const [x, y] of pts) {
        const stack = document.elementsFromPoint(x, y);
        const el = stack.find((e) => {
          const cs = getComputedStyle(e as HTMLElement);
          return cs.backgroundColor !== "rgba(0, 0, 0, 0)" || (e as HTMLElement).tagName === "CANVAS";
        }) as HTMLElement | undefined;
        const canvasIn = stack.some((e) => e.tagName === "CANVAS");
        out.push(
          `(${x},${y}) top=${stack[0]?.tagName ?? "?"}.${(stack[0] as HTMLElement)?.className?.toString().slice(0, 24) ?? ""} ` +
          `paintedBy=${el ? `${el.tagName}.${el.className.toString().slice(0, 30)}` : "canvas/transparent"} canvasBelow=${canvasIn}`,
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
