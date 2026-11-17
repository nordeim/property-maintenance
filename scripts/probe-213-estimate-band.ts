// Session-213 (R-04b rider): the LANDING +4px decode — the census's 4
// residual events: ours-extra LABEL@2459 (461x38, block) vs ref-extra
// svg@2528 (lucide-calendar-check) + the downstream A@+3px shift +
// docH Δ4 at phone. This probe dumps both apps' #estimate band at 390
// (labels, controls, svgs — anchor-relative) to name the delta.
import { chromium } from "@playwright/test";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";

const dump = async (browser: import("@playwright/test").Browser, base: string, label: string) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  // the reveal pass (the s213 doctrine — the ref's below-fold lazy render)
  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= docH; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const out = await page.evaluate(() => {
    const main = document.querySelector("main");
    const mainTop = main!.getBoundingClientRect().top + scrollY;
    const els: Array<Record<string, string | number>> = [];
    const walk = (node: Element) => {
      for (const child of Array.from(node.children)) {
        const r = child.getBoundingClientRect();
        const top = Math.round(r.top + scrollY - mainTop);
        if (top >= 2380 && top <= 2620) {
          els.push({
            y: top,
            h: Math.round(r.height),
            tag: child.tagName,
            cls: (child.getAttribute("class") || "").slice(0, 46),
            text: (child.textContent || "").trim().slice(0, 28),
          });
        }
        walk(child);
      }
    };
    walk(main!);
    return { docH: document.documentElement.scrollHeight, els };
  });
  console.log(`[${label}] docH=${out.docH}`);
  for (const e of out.els) console.log(`  [${label}] y${e.y} h${e.h} ${e.tag} [${e.cls}] "${e.text}"`);
  await page.close();
};

const browser = await chromium.launch();
await dump(browser, OURS, "ours");
await dump(browser, REF, "ref");
await browser.close();
