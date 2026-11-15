// Session-199 recon leg 10 (rev 2): extraction round 2 — FAQ answers
// via locator-driven clicks (the evaluate-context navigation hazard),
// the services cards (img-anchored walk), the gallery labels.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const REF_URL = "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const out: Record<string, unknown> = {};

  // ---- /faq: open every item via locators, read the answer ---------
  await page.goto(`${REF_URL}/faq`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const faqItems: Record<string, string>[] = [];
  const btnCount = await page.locator("main button").count();
  const opened = new Set<string>();
  for (let i = 0; i < btnCount; i++) {
    const btn = page.locator("main button").nth(i);
    const label = (await btn.textContent())?.trim() ?? "";
    if (label.length < 12 || /call us|book now/i.test(label) || opened.has(label)) continue;
    // skip buttons inside anchors (the CTA links)
    if ((await btn.evaluate((b) => !!b.closest("a")))) continue;
    opened.add(label);
    await btn.click();
    await page.waitForTimeout(350);
    const answer = await btn.evaluate((b) => {
      let scope = b.parentElement;
      for (let k = 0; k < 4 && scope; k++) {
        for (const p of Array.from(scope!.querySelectorAll("p"))) {
          const t = (p.textContent ?? "").trim();
          if (t && t !== (b.textContent ?? "").trim() && t.length > 8 && p.getBoundingClientRect().height > 0) return t;
        }
        scope = scope!.parentElement;
      }
      return "";
    });
    const group = await btn.evaluate((b) => {
      const all = Array.from(document.querySelectorAll("main h2, main button"));
      const idx = all.indexOf(b);
      for (let j = idx - 1; j >= 0; j--) if (all[j].tagName === "H2") return (all[j].textContent ?? "").trim();
      return "";
    });
    faqItems.push({ group, question: label, answer });
  }
  out.faq = faqItems;

  // ---- /services: img-anchored card walk ---------------------------
  await page.goto(`${REF_URL}/services`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  out.services = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll("main h2")).map((h) => (h.textContent ?? "").trim());
    const cards = Array.from(document.querySelectorAll("main img"))
      .filter((i) => ((i as HTMLImageElement).alt ?? "").trim() && !((i as HTMLImageElement).alt ?? "").includes("Green Cut"))
      .map((img) => {
        let scope: HTMLElement | null = img.closest("div");
        for (let i = 0; i < 4 && scope; i++) {
          const h3 = scope!.querySelector("h3");
          const p = scope!.querySelector("p");
          if (h3 && p) return { title: h3.textContent?.trim() ?? "", blurb: p.textContent?.trim() ?? "", img: (img as HTMLImageElement).currentSrc };
          scope = scope!.parentElement;
        }
        return null;
      }).filter(Boolean);
    return { groups: h2s, cards };
  });

  // ---- /gallery: the pairs + labels + chips ------------------------
  await page.goto(`${REF_URL}/gallery`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  out.gallery = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("main img"));
    const pairs: Record<string, string>[] = [];
    for (let i = 0; i + 1 < imgs.length; i += 2) {
      const a = imgs[i], b = imgs[i + 1];
      if (((a as HTMLImageElement).alt || "").toLowerCase() === "before" && ((b as HTMLImageElement).alt || "").toLowerCase() === "after") {
        let scope: HTMLElement | null = a.closest("div");
        let label = "";
        for (let k = 0; k < 5 && scope; k++) {
          const h3 = scope!.querySelector("h3");
          if (h3) { label = h3.textContent?.trim() ?? ""; break; }
          scope = scope!.parentElement;
        }
        pairs.push({ label, before: (a as HTMLImageElement).currentSrc, after: (b as HTMLImageElement).currentSrc });
      }
    }
    const chips = Array.from(document.querySelectorAll("main p"))
      .map((p) => (p.textContent ?? "").trim())
      .filter((t) => t.length < 22 && t.length > 2).slice(0, 10);
    return { pairs, chips };
  });

  await browser.close();
  writeFileSync("/tmp/oasis-content2.json", JSON.stringify(out, null, 1));
  console.log("faq:", faqItems.length,
    "cards:", (out.services as { cards: unknown[] }).cards.length,
    "pairs:", (out.gallery as { pairs: unknown[] }).pairs.length,
    "answers:", faqItems.filter((f) => f.answer).length);
}
main().catch((e) => { console.error(e); process.exit(1); });
