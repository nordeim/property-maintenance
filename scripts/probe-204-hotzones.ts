// Session-204 B (the no-visual-channel pivot): the hot zones' DOM
// census — geometry matched in s203, so the remaining mass must be
// CONTENT RENDERING. This probe reads the computed typography + the
// cell/hero interiors on BOTH apps: (a) the booking hero zone y225-300,
// (b) a services-grid cell's interior, (c) the faq card0's strip + body
// typography. Font-family/size/weight/color + the boxes — the genera
// named by measurement, not eyeball.
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

async function census(page: Page, label: string, route: "booking" | "faq") {
  await page.goto(`${label === "ours" ? OUR_URL : REF_URL}/${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const lines = await page.evaluate((rt) => {
    const out: string[] = [];
    const CSS = (el: Element, prop: string) => getComputedStyle(el as HTMLElement)[prop as never];
    const brief = (el: Element | null, label: string) => {
      if (!el) { out.push(`${label}: NONE`); return; }
      const r = (el as HTMLElement).getBoundingClientRect();
      const txt = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 30);
      out.push(
        `${label} y=${Math.round(r.top + scrollY)} h=${Math.round(r.height)} w=${Math.round(r.width)} ` +
        `font=${CSS(el, "fontFamily").split(",")[0]} ${CSS(el, "fontSize")}/${CSS(el, "lineHeight")} ` +
        `w=${CSS(el, "fontWeight")} ls=${CSS(el, "letterSpacing")} col=${CSS(el, "color")} "${txt}"`
      );
    };
    const at = (y: number) => Array.from(document.querySelectorAll<HTMLElement>("main h1,main h2,main p,main span,main div,main svg"))
      .filter((el) => { const r = el.getBoundingClientRect(); return r.top + scrollY >= y - 6 && r.top + scrollY < y + 40 && r.height > 4 && r.height < 200 && el.children.length === 0; });
    const out2: string[] = [];
    const canvases = Array.from(document.querySelectorAll<HTMLElement>("main canvas, main [class*='animate'], main [class*='blob'], main [class*='z-0'], main [data-decor]"));
    out.push(`── canvases + animated/decor layers on /${rt} (${canvases.length} found) ──`);
    for (const c of canvases.slice(0, 8)) {
      const r = c.getBoundingClientRect();
      if (r.height === 0) continue;
      out.push(
        `${c.tagName.toLowerCase()} y=${Math.round(r.top + scrollY)}-${Math.round(r.bottom + scrollY)} x=${Math.round(r.left)}-${Math.round(r.right)} ` +
        `cls="${c.className.toString().slice(0, 50)}"`
      );
    }
    return out;
  }, route);
  for (const l of lines) console.log(`  [${label}] ${l}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const route of ["booking", "faq"] as const) {
    for (const base of [OUR_URL, REF_URL]) {
      const label = base === OUR_URL ? "ours" : "ref";
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, base);
      await census(page, label, route);
      await page.close();
    }
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
