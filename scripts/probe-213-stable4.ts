// Session-213 (R-04b rider): the STABLE-4 decode — the census's 4
// residual landing events are reproducible (phone/tablet/desktop):
// ours-extra LABEL w461 h38 @2459 · ref-extra svg lucide-calendar-check
// @2528 · shift A ours@4064/ref@4067 · docH Δ4. This probe names each.
import { chromium } from "@playwright/test";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";

const dump = async (browser: import("@playwright/test").Browser, base: string, label: string) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= docH; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(2000);
  const out = await page.evaluate(() => {
    const main = document.querySelector("main");
    const mainTop = main!.getBoundingClientRect().top + scrollY;
    const describe = (el: Element, note: string) => {
      const r = el.getBoundingClientRect();
      // the first 3 ancestors
      const chain: string[] = [];
      let n: Element | null = el.parentElement;
      for (let i = 0; i < 3 && n; i++) {
        chain.push(`${n.tagName}.${(n.getAttribute("class") || "").split(" ").slice(0, 3).join(".")}`);
        n = n.parentElement;
      }
      return `${note}: y${Math.round(r.top + scrollY - mainTop)} w${Math.round(r.width)} h${Math.round(r.height)} <${el.tagName.toLowerCase()} class="${(el.getAttribute("class") || "").slice(0, 50)}"> text="${(el.textContent || "").trim().slice(0, 30)}" | ${chain.join(" < ")}`;
    };
    const out: string[] = [];
    // every LABEL on the page
    for (const el of main!.querySelectorAll("label")) out.push(describe(el, "LABEL"));
    // every calendar-check svg
    for (const el of main!.querySelectorAll("svg.lucide-calendar-check")) out.push(describe(el, "CALCHECK"));
    // the anchor at y~4064 (ours) / 4067 (ref): all <a> with y in 4050-4080
    for (const el of main!.querySelectorAll("a")) {
      const r = el.getBoundingClientRect();
      const y = Math.round(r.top + scrollY - mainTop);
      if (y >= 4050 && y <= 4085) out.push(describe(el, `A@${y}`));
    }
    return { docH: document.documentElement.scrollHeight, out };
  });
  console.log(`[${label}] docH=${out.docH}`);
  for (const line of out.out) console.log(`  [${label}] ${line}`);
  await page.close();
};

const browser = await chromium.launch();
await dump(browser, OURS, "ours");
await dump(browser, REF, "ref");
await browser.close();
