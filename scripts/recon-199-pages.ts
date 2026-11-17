// Session-199 recon leg 3: the remaining Oasis surfaces (services,
// gallery, faq, contact, booking, home) — text census.
import { chromium } from "@playwright/test";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const path of ["/home", "/services", "/gallery", "/faq", "/contact", "/booking", "/booking?service=lawn"]) {
    await page.goto(`${REF_URL}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    const census = await page.evaluate(() => {
      const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const txt = (sel: string, n = 24) => Array.from(document.querySelectorAll(sel)).filter(vis)
        .map((el) => (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100)).filter(Boolean).slice(0, n);
      const imgs = Array.from(document.querySelectorAll("img")).filter(vis)
        .map((i) => `${(i as HTMLImageElement).alt?.slice(0, 40) ?? ""}|${Math.round((i as HTMLImageElement).naturalWidth)}x${Math.round((i as HTMLImageElement).naturalHeight)}`).slice(0, 16);
      const inputs = Array.from(document.querySelectorAll("input, select, textarea")).filter(vis)
        .map((i) => `${i.tagName.toLowerCase()}:${(i as HTMLInputElement).type || ""}:${(i.getAttribute("placeholder") ?? i.getAttribute("aria-label") ?? "").slice(0, 40)}`).slice(0, 20);
      return { title: document.title, h1: txt("h1", 3), h2: txt("h2", 10), h3: txt("h3", 12),
        buttons: txt("button", 14), links: txt("a", 14), imgs, inputs, p: txt("p", 10) };
    });
    console.log(`\n===== ${path} (${census.title}) =====`);
    console.log(`h1: ${JSON.stringify(census.h1)}`);
    console.log(`h2: ${JSON.stringify(census.h2)}`);
    console.log(`h3: ${JSON.stringify(census.h3)}`);
    console.log(`buttons: ${JSON.stringify(census.buttons)}`);
    console.log(`imgs: ${JSON.stringify(census.imgs)}`);
    console.log(`inputs: ${JSON.stringify(census.inputs)}`);
    console.log(`p: ${JSON.stringify(census.p)}`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
