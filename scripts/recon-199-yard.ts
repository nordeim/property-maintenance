import { chromium } from "@playwright/test";
const REF_URL = "https://oasis-property-maintenance.base44.app";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
const dump = await page.evaluate(() => {
  const walk = (root: Element, depth: number): string[] => {
    if (depth > 8) return [];
    const out: string[] = [];
    for (const el of Array.from(root.children)) {
      const t = (el.textContent ?? "").trim().replace(/\s+/g, " ");
      if (t && t.length < 90) out.push(`${el.tagName}.${(el.className || "").toString().split(" ").slice(0,3).join(".")}: ${t.slice(0, 80)}`);
      if (el.children.length && out.length < 60) out.push(...walk(el, depth + 1));
    }
    return out;
  };
  const main = document.querySelector("main") ?? document.body;
  return walk(main, 0).slice(0, 60);
});
console.log(dump.join("\n"));
await browser.close();
