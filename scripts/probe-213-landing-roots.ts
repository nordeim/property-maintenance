// Session-213 (R-04): the LANDING-ROOT probe — the census public-leg
// anchor re-derivation. The s155-c anchor (div.min-h-screen.bg-white)
// was the NEO-CRM landing's root; the Oasis landing carries a different
// anatomy. This probe walks BOTH apps' `/` as guests and reports the
// root-level DOM structure (tags + classes) so the anchor names an
// element BOTH apps carry.
import { chromium } from "@playwright/test";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";

const probe = async (browser: import("@playwright/test").Browser, base: string, label: string) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const report = await page.evaluate(() => {
    const describe = (el: Element) =>
      `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${
        typeof el.className === "string" && el.className ? `.${el.className.split(/\s+/).slice(0, 6).join(".")}` : ""
      }`;
    const body = Array.from(document.body.children).map(describe);
    const main = document.querySelector("main");
    const mainInfo = main
      ? { selector: describe(main), children: Array.from(main.children).map(describe).slice(0, 6) }
      : null;
    // the deepest-first useful anchor candidates on the landing
    const candidates = ["main", "div.min-h-screen", "section", "h1"].map((sel) => {
      const el = document.querySelector(sel);
      return el ? `${sel} -> ${describe(el)}` : `${sel} -> (absent)`;
    });
    return { body, mainInfo, candidates, scrollH: document.documentElement.scrollHeight };
  });
  console.log(`[${label}] body.children:`, JSON.stringify(report.body));
  console.log(`[${label}] main:`, report.mainInfo ? JSON.stringify(report.mainInfo) : "ABSENT");
  console.log(`[${label}] candidates:`, JSON.stringify(report.candidates));
  console.log(`[${label}] scrollHeight: ${report.scrollH}`);
  await page.close();
};

const browser = await chromium.launch();
await probe(browser, OURS, "ours");
await probe(browser, REF, "ref");
await browser.close();
