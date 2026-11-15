// Session-201 C (the booking/faq residual adjudication): after the
// canvas + bg-card cures, booking (42.0%) and faq (42.7%) carry the
// last content genera. This probe decodes the reference's own
// constructions: the booking form card's computed background (ours is
// bg-white/85 — a greenish tint over the canvas) and the faq page's
// green blocks' geometry + open-accordion state.
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
  const booking = await page.evaluate(() => {
    const out: string[] = [];
    for (const el of Array.from(document.querySelectorAll("main *")) as HTMLElement[]) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width > 400 && r.height > 300 && r.top < 400 && cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
        const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : "";
        out.push(`booking-card ${el.tagName}.${cls} box=${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)} bgc=${cs.backgroundColor}`);
      }
    }
    return out.slice(0, 4);
  });
  for (const l of booking) console.log(`[ref] ${l}`);

  await page.goto(`${REF_URL}/faq`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const faq = await page.evaluate(() => {
    const out: string[] = [];
    for (const el of Array.from(document.querySelectorAll("main *")) as HTMLElement[]) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const greenish = cs.backgroundImage.includes("46, 125, 95") || cs.backgroundColor === "rgb(46, 125, 95)";
      if (greenish && r.width > 200 && r.height > 20) {
        const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : "";
        out.push(`faq-green ${el.tagName}.${cls} top=${Math.round(r.top + window.scrollY)} h=${Math.round(r.height)} w=${Math.round(r.width)} bgi=${cs.backgroundImage.slice(0, 60)}`);
      }
    }
    const open = document.querySelector("[data-state='open']");
    if (open) {
      const cls = typeof (open as HTMLElement).className === "string" ? (open as HTMLElement).className.split(" ").slice(0, 3).join(".") : "";
      out.push(`faq-open ${open.tagName}.${cls} top=${Math.round(open.getBoundingClientRect().top + window.scrollY)}`);
    }
    return out.slice(0, 10);
  });
  for (const l of faq) console.log(`[ref] ${l}`);
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
