// Session-213 (R-04b): the LANDING 20px SHIFT probe — the census found
// the first gallery-preview card at ours@989 vs ref@1009 (anchor-
// relative, desktop 1440x900): mainH/bandTop/prevH all IDENTICAL, so
// the 20px accumulates inside the gallery band's header area. This
// probe walks BOTH apps, finds the census's exact card (the class
// sequence "group bg-white rounded-2xl overflow-hidden border
// border-gray-100 shadow-sm hover:shadow-xl transition-shadow"), and
// prints the full ancestry chain (tag · anchor-relative top · height ·
// computed padding/margin) — the first divergent link is the delta.
import { chromium } from "@playwright/test";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";

const CARD_SEQ = "group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow";

const walk = async (browser: import("@playwright/test").Browser, base: string, label: string) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const chain = await page.evaluate((cardSeq) => {
    const main = document.querySelector("main");
    if (!main) return { error: "no main" };
    const mainTop = main.getBoundingClientRect().top + scrollY;
    const cards = [...main.querySelectorAll("div")].filter((d) =>
      (d.getAttribute("class") || "").includes(cardSeq),
    );
    if (!cards.length) return { error: `no card (seq: ${cardSeq.slice(0, 30)})` };
    const card = cards[0];
    const out: Array<Record<string, string | number>> = [];
    let node: Element | null = card;
    while (node && node !== main) {
      const r = node.getBoundingClientRect();
      const cs = getComputedStyle(node);
      out.push({
        tag: node.tagName,
        top: Math.round(r.top + scrollY - mainTop),
        h: Math.round(r.height),
        pad: `${cs.paddingTop}/${cs.paddingBottom}`,
        mar: `${cs.marginTop}/${cs.marginBottom}`,
        cls: (node.getAttribute("class") || "").slice(0, 52),
      });
      node = node.parentElement;
    }
    return { cardY: Math.round(card.getBoundingClientRect().top + scrollY - mainTop), chain: out.reverse() };
  }, CARD_SEQ);
  console.log(`[${label}]`, JSON.stringify(chain));
  await page.close();
};

const browser = await chromium.launch();
await walk(browser, OURS, "ours");
await walk(browser, REF, "ref");
await browser.close();
