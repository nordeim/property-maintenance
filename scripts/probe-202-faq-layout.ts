// Session-202 C (F-201g cure #2 prep): the faq layout decode — the
// reference's faq hero is 332px vs our 272 (the 60px shift moves every
// header below: theirs 494/819/1217/1542/1920 vs ours 434/743/1105/
// 1413/1775), and its accordion items run ~16-36px taller per card.
// This probe censuses BOTH apps' faq hero construction (the section
// padding, the heading metrics) + the first accordion card's anatomy
// (the card padding, the header strip, the body rows), so the mirror
// lands on the reference's own numbers.
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
  await page.goto(`${label === "ours" ? OUR_URL : REF_URL}/faq`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  const lines = await page.evaluate(() => {
    const out: string[] = [];
    const hero = document.querySelector("main section") as HTMLElement | null;
    if (hero) {
      const r = hero.getBoundingClientRect();
      const cs = getComputedStyle(hero);
      out.push(`hero h=${Math.round(r.height)} pad=${cs.padding} `);
      const h1 = hero.querySelector("h1");
      if (h1) {
        const hc = getComputedStyle(h1);
        out.push(`hero-h1 size=${hc.fontSize} lh=${hc.lineHeight} mb=${hc.marginBottom} lines=${Math.round(h1.getBoundingClientRect().height / parseFloat(hc.lineHeight))}`);
      }
      const p = hero.querySelector("p");
      if (p) {
        const pc = getComputedStyle(p);
        out.push(`hero-p size=${pc.fontSize} lh=${pc.lineHeight} h=${Math.round(p.getBoundingClientRect().height)}`);
      }
      const eyebrow = Array.from(hero.querySelectorAll(":scope > div > div > div")).find((d) => /Answers/.test(d.textContent ?? "")) as HTMLElement | null;
      if (eyebrow) {
        const ec = getComputedStyle(eyebrow);
        out.push(`eyebrow cls="${eyebrow.className}" bg=${ec.backgroundColor} display=${ec.display} gap=${ec.gap} pad=${ec.padding} inner="${eyebrow.innerHTML.replace(/\s+/g, " ").slice(0, 420)}"`);
      }
      for (const ch of Array.from(hero.querySelectorAll(":scope > div > div > *")).slice(0, 4) as HTMLElement[]) {
        const cc = getComputedStyle(ch);
        out.push(`hero-el ${ch.tagName} h=${Math.round(ch.getBoundingClientRect().height)} size=${cc.fontSize} weight=${cc.fontWeight} color=${cc.color} ls=${cc.letterSpacing} tt=${cc.textTransform} mb=${cc.marginBottom} text="${(ch.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 30)}"`);
      }
      for (const ch of Array.from(hero.querySelectorAll(":scope > div > *")) as HTMLElement[]) {
        const cr = ch.getBoundingClientRect();
        const cc = getComputedStyle(ch);
        out.push(`hero-child ${ch.tagName} h=${Math.round(cr.height)} mb=${cc.marginBottom} mt=${cc.marginTop} text="${(ch.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 44)}"`);
      }
    }
    // the first accordion card + its green header strip
    const strip = document.querySelector("main .bg-gradient-to-r") as HTMLElement | null;
    if (strip) {
      const sr = strip.getBoundingClientRect();
      const sc = getComputedStyle(strip);
      out.push(`strip box=${Math.round(sr.left)},${Math.round(sr.top + scrollY)} ${Math.round(sr.width)}x${Math.round(sr.height)} pad=${sc.padding}`);
      const card = strip.closest("[class*='rounded-2xl']") as HTMLElement | null;
      if (card) {
        const cr = card.getBoundingClientRect();
        const cc = getComputedStyle(card);
        out.push(`card box=${Math.round(cr.left)},${Math.round(cr.top + scrollY)} ${Math.round(cr.width)}x${Math.round(cr.height)} pad=${cc.padding} radius=${cc.borderRadius}`);
      }
      const q = strip.querySelector("span, div");
      if (q) {
        const qc = getComputedStyle(q);
        out.push(`q-text size=${qc.fontSize} lh=${qc.lineHeight} weight=${qc.fontWeight} h=${Math.round(q.getBoundingClientRect().height)}`);
      }
    }
    return out.slice(0, 10);
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
