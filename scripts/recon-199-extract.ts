// Session-199 recon leg 9: structured CONTENT extraction — the DOM
// walked semantically, emitted as JSON for src/lib/site-content.ts.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const REF_URL = "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const out: Record<string, unknown> = {};

  // ---- /services: the 5 groups -> 12 cards -------------------------
  await page.goto(`${REF_URL}/services`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  out.services = await page.evaluate(() => {
    const groups: unknown[] = [];
    const h2s = Array.from(document.querySelectorAll("main h2"));
    for (const h2 of h2s) {
      let scope = h2.parentElement;
      while (scope && scope.querySelectorAll("h3").length === 0 && scope !== document.body) scope = scope.parentElement;
      if (!scope) continue;
      const cards = Array.from(scope.querySelectorAll("h3")).map((h3) => {
        const card = h3.closest("div")!;
        const img = card.querySelector("img");
        const p = card.querySelector("p");
        return { title: h3.textContent?.trim() ?? "", blurb: p?.textContent?.trim() ?? "",
          img: img?.getAttribute("src") ?? "" };
      }).filter((c) => c.title && c.img);
      groups.push({ group: h2.textContent?.trim() ?? "", cards });
    }
    return groups;
  });

  // ---- /gallery: the before/after pairs ----------------------------
  await page.goto(`${REF_URL}/gallery`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  out.gallery = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("main img"));
    const pairs: unknown[] = [];
    for (let i = 0; i + 1 < imgs.length; i += 2) {
      const a = imgs[i], b = imgs[i + 1];
      if ((((a as HTMLImageElement).alt) || "").toLowerCase() === "before" && ((((b as HTMLImageElement).alt) || "").toLowerCase() === "after")) {
        const label = a.closest("div")?.parentElement?.querySelector("h3")?.textContent?.trim() ?? "";
        pairs.push({ label, before: a.getAttribute("src") ?? "", after: b.getAttribute("src") ?? "" });
      }
    }
    return pairs;
  });

  // ---- /faq: the accordion items -----------------------------------
  await page.goto(`${REF_URL}/faq`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  out.faq = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll("main button")).map((b) => {
      const label = (b.textContent ?? "").trim();
      if (!label || label.length < 12 || /call us/i.test(label)) return null;
      const container = b.closest("div");
      let answer = "";
      if (container) {
        for (const p of Array.from(container.querySelectorAll("p"))) {
          const t = (p.textContent ?? "").trim();
          if (t && t !== label && t.length > 10) { answer = t; break; }
        }
      }
      // find the group (the nearest preceding h2)
      let h2: Element | null = null;
      let node: Element | null = b;
      while (node && !h2) {
        node = node.previousElementSibling ?? node.parentElement;
        if (node?.tagName === "H2") h2 = node;
        else if (node?.querySelector) h2 = node.parentElement?.querySelector("h2") ?? null;
        if (node === document.body) break;
      }
      return { group: h2?.textContent?.trim() ?? "", question: label, answer };
    }).filter(Boolean);
    return items;
  });

  // ---- /contact: the form inventory --------------------------------
  await page.goto(`${REF_URL}/contact`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  out.contact = await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll("main label")).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
    const suburbs = Array.from(document.querySelectorAll("main select option")).map((o) => (o.textContent ?? "").trim()).filter(Boolean);
    const radios = Array.from(document.querySelectorAll('main input[type="radio"]+label, main label input[type="radio"]')).map((l) => (l.textContent ?? "").trim()).filter(Boolean);
    const placeholders = Array.from(document.querySelectorAll("main input, main textarea")).map((i) => (i.getAttribute("placeholder") ?? "")).filter(Boolean);
    return { labels, suburbs, radios, placeholders };
  });

  // ---- /home + /about: paragraphs + headings + imgs ----------------
  for (const [key, path] of [["home", "/"], ["about", "/about"]] as const) {
    await page.goto(`${REF_URL}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    out[key] = await page.evaluate(() => {
      const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const walk: Array<[string, string]> = [];
      for (const el of Array.from(document.querySelector("main")!.children)) {
        const rec = (node: Element, depth: number) => {
          if (depth > 10) return;
          if (/^H[1-4]$/.test(node.tagName) && vis(node)) walk.push([node.tagName.toLowerCase(), (node.textContent ?? "").trim()]);
          if (node.tagName === "P" && vis(node) && !walk.some(([, t]) => t === (node.textContent ?? "").trim())) walk.push(["p", (node.textContent ?? "").trim()]);
          if (node.tagName === "IMG" && vis(node)) walk.push(["img", (node as HTMLImageElement).currentSrc]);
          for (const c of Array.from(node.children)) rec(c, depth + 1);
        };
        rec(el, 0);
      }
      return walk;
    });
  }

  await browser.close();
  writeFileSync("/tmp/oasis-content.json", JSON.stringify(out, null, 1));
  console.log("extracted:", Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Array.isArray(v) ? v.length : typeof v])));
}
main().catch((e) => { console.error(e); process.exit(1); });
