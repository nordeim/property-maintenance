// Session-199 recon leg 6 (final): yard-size vocabulary + price matrix
// + the hero/media structure + the image asset URLs.
import { chromium } from "@playwright/test";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  // yard-size options: any clickable element under "How big is your yard?"
  const sizes = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("h2,h3,h4,p,div,span")).find((el) =>
      /^How big is your yard\??$/.test((el.textContent ?? "").trim()) && el.children.length === 0);
    if (!h) return { label: null, options: [] };
    let container = h.parentElement;
    for (let i = 0; i < 4 && container; i++) {
      const opts = Array.from(container!.querySelectorAll("button, [role=button], label, div[class*=border], li"))
        .filter((el) => el !== h)
        .map((el) => (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60))
        .filter(Boolean);
      if (opts.length >= 2) return { label: h.textContent, options: opts };
      container = container!.parentElement;
    }
    return { label: h.textContent, options: [] };
  });
  console.log("yard sizes:", JSON.stringify(sizes));
  // price matrix: click each size option element for each service
  const price = () => page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("*")).find((e) =>
      /^\$\d+ – \$\d+$/.test((e.textContent ?? "").trim()) && e.children.length === 0);
    return el?.textContent?.trim() ?? null;
  });
  const sizeLocators = await page.locator("text=/How big is your yard/i").locator("xpath=..").locator("..").locator("[role=button], button, label").all().catch(() => []);
  if (sizeLocators.length) {
    for (const svc of ["Lawn Mowing & Edging", "Garden Maintenance", "Pressure Washing", "Gutter Cleaning", "Full Property Tidy-Up"]) {
      await page.locator("button").filter({ hasText: svc }).first().click().catch(() => {});
      await page.waitForTimeout(250);
      const row: string[] = [];
      for (const s of sizeLocators) {
        await s.click().catch(() => {});
        await page.waitForTimeout(200);
        row.push((await price()) ?? "—");
      }
      console.log(`  ${svc}: ${JSON.stringify(row)}`);
    }
  }
  // hero + home media structure + asset URLs
  await page.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  const media = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img")).map((i) => ({
      alt: (i.alt || "").slice(0, 44), src: (i as HTMLImageElement).currentSrc.slice(0, 150),
      w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height),
    }));
    const bgs = Array.from(document.querySelectorAll("*")).map((el) => getComputedStyle(el).backgroundImage)
      .filter((b) => b.includes("url(")).slice(0, 6);
    return { imgs, bgs };
  });
  console.log("home imgs:", JSON.stringify(media.imgs, null, 0).slice(0, 1800));
  console.log("home bg-images:", JSON.stringify(media.bgs, null, 0).slice(0, 600));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
