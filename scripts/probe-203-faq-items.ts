// Session-203 B: the faq residual decode — post-eyebrow, the ref's
// accordion gaps run 325/398/325/378 vs ours ~309/362/308/362 (~16-36px
// per card). This probe censuses the first three cards' anatomy on BOTH
// apps — the card box + padding, the green header strip, the answer
// body's rows (line-heights, margins) — to name the genus precisely
// before any cure.
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
  await page.goto(`${label === "ours" ? OUR_URL : REF_URL}/faq`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const lines = await page.evaluate(() => {
    const out: string[] = [];
    const sections = Array.from(document.querySelectorAll("main section"));
    const wrap = sections[1]?.querySelector(":scope > div") ?? null;
    if (wrap) {
      Array.from(wrap.children).slice(0, 8).forEach((ch, i) => {
        const el = ch as HTMLElement;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        out.push(`w-child${i} ${el.tagName} top=${Math.round(r.top + scrollY)} h=${Math.round(r.height)} mb=${cs.marginBottom} mt=${cs.marginTop} cls="${el.className.toString().slice(0, 56)}"`);
      });
      // then the accordion container's own children (the items)
      const accord = wrap.firstElementChild as HTMLElement | null;
      if (accord && accord.children.length > 1) {
        Array.from(accord.children).slice(0, 5).forEach((ch, i) => {
          const el = ch as HTMLElement;
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          out.push(`a-child${i} ${el.tagName} top=${Math.round(r.top + scrollY)} h=${Math.round(r.height)} mb=${cs.marginBottom} cls="${el.className.toString().slice(0, 56)}"`);
        });
      }
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
