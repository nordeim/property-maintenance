// Session-213 (the +4px hunt): the landing's docH ours 6485 vs ref
// 6481 at phone — the same +4px floor family the s212 booking cure
// measured (2074 vs 2070). This probe compares both apps' body-level
// + main-level + section-level heights at 390 to name the element.
import { chromium } from "@playwright/test";

const walk = async (browser: import("@playwright/test").Browser, base: string, label: string) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= docH; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(2000);
  const out = await page.evaluate(() => {
    const lines: Array<string> = [];
    const describe = (el: Element, name: string) => {
      const r = el.getBoundingClientRect();
      return `${name}: top${Math.round(r.top + scrollY)} h${Math.round(r.height)}${Math.abs(r.height % 1) > 0.05 ? ` (frac ${(r.height % 1).toFixed(2)})` : ""} <${el.tagName.toLowerCase()} class="${(el.getAttribute("class") || "").split(" ").slice(0, 4).join(" ")}">`;
    };
    for (const el of Array.from(document.body.children)) {
      if (["SCRIPT", "NEXT-ROUTE-ANNOUNCER"].includes(el.tagName)) continue;
      lines.push(describe(el, "body-child"));
    }
    const main = document.querySelector("main");
    if (main) {
      for (const el of Array.from(main.children)) lines.push(describe(el, "  main-child"));
      // one level deeper on main's wrapper
      for (const el of Array.from(main.children[0]?.children ?? [])) lines.push(describe(el, "    section"));
    }
    return { docH: document.documentElement.scrollHeight, lines };
  });
  console.log(`[${label}] docH=${out.docH}`);
  console.log(out.lines.join("\n"));
  await page.close();
};

const browser = await chromium.launch();
await walk(browser, "http://localhost:3000/", "ours");
await walk(browser, "https://oasis-property-maintenance.base44.app/", "ref");
await browser.close();
