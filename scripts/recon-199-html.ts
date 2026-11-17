// Session-199 recon leg 8: the reference's rendered HTML per public
// page — the build's ground truth (class strings, text, structure).
import { chromium } from "@playwright/test";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const OUT = "/tmp/oasis-html";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [name, path] of [["home", "/"], ["services", "/services"], ["gallery", "/gallery"],
    ["faq", "/faq"], ["about", "/about"], ["contact", "/contact"], ["booking", "/booking"],
    ["login", "/login"], ["404", "/dashboard"]] as const) {
    await page.goto(`${REF_URL}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    const html = await page.evaluate(() => {
      const header = document.querySelector("header")?.outerHTML ?? "";
      const main = document.querySelector("main")?.outerHTML ?? document.body.innerHTML;
      const footer = document.querySelector("footer")?.outerHTML ?? "";
      return `<!--HEADER-->\n${header}\n<!--MAIN-->\n${main}\n<!--FOOTER-->\n${footer}`;
    });
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`${OUT}/${name}.html`, html);
    console.log(`${name}: ${(html.length / 1024).toFixed(0)} KB`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
