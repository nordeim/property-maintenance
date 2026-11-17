// Session-199 recon leg 11: the FAQ answers — Radix accordion regions
// read after each locator-driven open.
import { chromium } from "@playwright/test";
import { writeFileSync, readFileSync } from "node:fs";
const REF_URL = "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF_URL}/faq`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const faqItems: Record<string, string>[] = [];
  const btns = page.locator("main h3 > button");
  const n = await btns.count();
  for (let i = 0; i < n; i++) {
    const btn = btns.nth(i);
    const question = ((await btn.locator("span").first().textContent()) ?? "").trim();
    const group = await btn.evaluate((b) => {
      const all = Array.from(document.querySelectorAll("main h2, main h3"));
      const mine = (b as HTMLElement).closest("h3");
      const idx = all.indexOf(mine!);
      for (let j = idx - 1; j >= 0; j--) if (all[j].tagName === "H2") return (all[j].textContent ?? "").trim();
      return "";
    });
    await btn.click();
    await page.waitForTimeout(450);
    const answer = await btn.evaluate((b) => {
      const regionId = b.getAttribute("aria-controls");
      const region = regionId ? document.getElementById(regionId) : null;
      return (region?.textContent ?? "").trim();
    });
    faqItems.push({ group, question, answer });
  }
  await browser.close();
  const prev = JSON.parse(readFileSync("/tmp/oasis-content2.json", "utf-8"));
  prev.faq = faqItems;
  writeFileSync("/tmp/oasis-content2.json", JSON.stringify(prev, null, 1));
  console.log("faq:", faqItems.length, "answers:", faqItems.filter((f) => f.answer).length);
}
main().catch((e) => { console.error(e); process.exit(1); });
