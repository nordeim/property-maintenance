// Session-202 B (F-201g cure #1 prep): the booking inner-card decode,
// leg 2 — last round's probe found the reference's opaque inner card
// (bg-white rounded-2xl border border-gray-100, 638x542 at 401,374
// inside its /85 outer). This probe reads its PADDING, its children
// (what rides inside vs outside), and the step-1 button's position,
// so the mirror lands on the reference's own construction.
import { chromium } from "@playwright/test";

const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF_URL}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
  await page.goto(`${REF_URL}/booking`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const lines = await page.evaluate(() => {
    const out: string[] = [];
    const outer = document.querySelector("main .bg-white\\/85");
    const inner = document.querySelector("main .bg-white.rounded-2xl");
    if (outer) {
      const r = outer.getBoundingClientRect();
      const cs = getComputedStyle(outer);
      out.push(`outer box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} pad=${cs.padding} radius=${cs.borderRadius}`);
      for (const ch of Array.from(outer.children)) {
        const cr = ch.getBoundingClientRect();
        const cls = typeof ch.className === "string" ? ch.className.split(" ").slice(0, 3).join(".") : "";
        out.push(`outer-child ${ch.tagName}.${cls} top=${Math.round(cr.top + scrollY)} h=${Math.round(cr.height)} text="${(ch.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 36)}"`);
      }
    }
    if (inner) {
      const r = inner.getBoundingClientRect();
      const cs = getComputedStyle(inner);
      out.push(`inner box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} pad=${cs.padding} radius=${cs.borderRadius} border=${cs.borderWidth} bcol=${cs.borderColor}`);
      for (const ch of Array.from(inner.children).slice(0, 6)) {
        const cr = ch.getBoundingClientRect();
        const cls = typeof ch.className === "string" ? ch.className.split(" ").slice(0, 2).join(".") : "";
        out.push(`inner-child ${ch.tagName}.${cls} top=${Math.round(cr.top + scrollY)} h=${Math.round(cr.height)} text="${(ch.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 36)}"`);
      }
    }
    // the Continue button: inside or outside the inner card?
    const btn = Array.from(document.querySelectorAll("main button")).find((b) => /continue/i.test(b.textContent ?? ""));
    if (btn) {
      const r = btn.getBoundingClientRect();
      const ir = inner?.getBoundingClientRect();
      const inside = ir ? r.top >= ir.top && r.bottom <= ir.bottom && r.left >= ir.left && r.right <= ir.right : false;
      out.push(`continue-btn box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} inside-inner=${inside}`);
    }
    return out;
  });
  for (const l of lines) console.log(`[ref] ${l}`);
  // steps 2 + 3: click through, census the inner card each time
  const btn = page.locator("main button", { hasText: "Continue" }).first();
  for (const s of [2, 3]) {
    await btn.click();
    await page.waitForTimeout(1200);
    const l2 = await page.evaluate(() => {
      const out: string[] = [];
      const inner = document.querySelector("main .bg-white.rounded-2xl");
      if (inner) {
        const r = inner.getBoundingClientRect();
        const cs = getComputedStyle(inner);
        out.push(`step inner box=${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} pad=${cs.padding} text="${(inner.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60)}"`);
      } else {
        out.push("step inner: NONE — the step content rides the outer card directly");
      }
      return out;
    });
    for (const l of l2) console.log(`[ref] step${s} ${l}`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
