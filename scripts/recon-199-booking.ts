// Session-199 recon leg 5: the booking flow detail — the yard-size
// vocabulary, the estimate matrix (service × size), and steps 2-3.
import { chromium } from "@playwright/test";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const dump = () => page.evaluate(() => {
    const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const btns = Array.from(document.querySelectorAll("button")).filter(vis)
      .map((b) => ({ t: (b.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 44),
        cls: (b.className || "").toString().slice(0, 90) }));
    const price = Array.from(document.querySelectorAll("*")).find((el) =>
      /^\$\d+ – \$\d+$/.test((el.textContent ?? "").trim()) && el.children.length === 0)?.textContent?.trim() ?? null;
    const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,[class*=label]")).filter(vis)
      .map((x) => `${x.tagName}:${(x.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 44)}`).slice(0, 16);
    const inputs = Array.from(document.querySelectorAll("input,select,textarea")).filter(vis)
      .map((i) => `${i.tagName.toLowerCase()}:${(i as HTMLInputElement).type}:${(i.getAttribute("placeholder") ?? i.getAttribute("aria-label") ?? "").slice(0, 34)}`).slice(0, 14);
    return { price, headings, inputs, btns: btns.slice(0, 26) };
  });
  const s1 = await dump();
  console.log("STEP1 headings:", JSON.stringify(s1.headings));
  console.log("STEP1 buttons:", JSON.stringify(s1.btns.map(b => b.t)));
  // click every service; record price
  for (const svc of ["Garden Maintenance", "Pressure Washing", "Gutter Cleaning", "Full Property Tidy-Up"]) {
    await page.locator("button").filter({ hasText: svc }).first().click().catch(() => {});
    await page.waitForTimeout(400);
    const d = await dump();
    console.log(`  [${svc}] price=${d.price}`);
  }
  // yard sizes: find buttons that are NOT services/continue
  const yardish = (await dump()).btns.map(b => b.t).filter(t => t && !/lawn|garden|pressure|gutter|tidy|continue|book now/i.test(t));
  console.log("STEP1 yard-size candidates:", JSON.stringify(yardish));
  // click a yard size and observe price change for lawn
  await page.locator("button").filter({ hasText: "Lawn Mowing" }).first().click().catch(() => {});
  for (const y of yardish.slice(0, 6)) {
    await page.locator("button").filter({ hasText: y }).first().click().catch(() => {});
    await page.waitForTimeout(350);
    console.log(`  [lawn × ${y}] price=${(await dump()).price}`);
  }
  // step 2: continue → date+time; then continue again
  await page.locator("button").filter({ hasText: /Continue/i }).first().click().catch(() => {});
  await page.waitForTimeout(1200);
  const s2 = await dump();
  console.log("STEP2 headings:", JSON.stringify(s2.headings));
  console.log("STEP2 buttons:", JSON.stringify(s2.btns.map(b => b.t).slice(0, 24)));
  // pick a day (a number button) then look for time slots
  await page.locator("button").filter({ hasText: /^1[0-9]$/ }).first().click().catch(() => {});
  await page.waitForTimeout(800);
  const s2b = await dump();
  console.log("after day click: headings:", JSON.stringify(s2b.headings));
  console.log("after day click: buttons:", JSON.stringify(s2b.btns.map(b => b.t).slice(0, 24)));
  await page.locator("button").filter({ hasText: /Continue/i }).first().click().catch(() => {});
  await page.waitForTimeout(1500);
  const s3 = await dump();
  console.log("STEP3 headings:", JSON.stringify(s3.headings));
  console.log("STEP3 inputs:", JSON.stringify(s3.inputs));
  console.log("STEP3 buttons:", JSON.stringify(s3.btns.map(b => b.t).slice(0, 24)));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
