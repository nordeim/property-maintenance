// Session-203 C: the booking residual decode — post-inner-card, the
// page still runs ~26.7% (the form-interior offsets genus). This probe
// censuses the inner card's child rows on BOTH apps (the header, the
// label, the services grid + its option cells, the yard row, the
// slider) so the offset genus is named row-by-row.
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

async function census(page: Page, label: string) {
  await page.goto(`${label === "ours" ? OUR_URL : REF_URL}/booking`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const lines = await page.evaluate(() => {
    const out: string[] = [];
    const inner = document.querySelector("main .bg-white.rounded-2xl") as HTMLElement | null;
    if (!inner) return ["inner: NONE"];
    const r = inner.getBoundingClientRect();
    out.push(`inner box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    // census the inner card's descendants that are layout rows: walk the
    // first 14 leaf-ish blocks with text + the slider + the grid
    const rows = Array.from(inner.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,label,span,div,input[type=range]")).slice(0, 26);
    for (const el of rows) {
      // only direct layout participants: skip nested spans inside labels
      if (el.closest("label") !== null && el.tagName === "SPAN") continue;
      const er = el.getBoundingClientRect();
      if (er.height === 0) continue;
      const txt = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 26);
      out.push(`${el.tagName.toLowerCase()} top=${Math.round(er.top + scrollY)} h=${Math.round(er.height)} w=${Math.round(er.width)} "${txt}"`);
    }
    return out;
  });
  for (const l of lines) console.log(`  [${label}] ${l}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const base of [OUR_URL, REF_URL]) {
    const label = base === OUR_URL ? "ours" : "ref";
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, base);
    await census(page, label);
    await page.close();
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
