// Session-199 recon leg 7: the yard slider's price effect + steps 2-3
// (read-only — NO booking submit on the reference: no visible delete
// path, so the write probe stays out of bounds).
import { chromium } from "@playwright/test";
const REF_URL = "https://oasis-property-maintenance.base44.app";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
const price = () => page.evaluate(() => {
  const el = Array.from(document.querySelectorAll("*")).find((e) =>
    /^\$\d+ – \$\d+$/.test((e.textContent ?? "").trim()) && e.children.length === 0);
  return el?.textContent?.trim() ?? null;
});
const slider = page.locator('input[type="range"]');
console.log("slider count:", await slider.count());
// set slider values via native setter + input event
for (const v of [100, 400, 800, 1200, 2000]) {
  await page.evaluate((val) => {
    const s = document.querySelector('input[type="range"]') as HTMLInputElement;
    if (!s) return;
    s.value = String(val);
    s.dispatchEvent(new Event("input", { bubbles: true }));
    s.dispatchEvent(new Event("change", { bubbles: true }));
  }, v);
  await page.waitForTimeout(400);
  console.log(`  lawn @ ${v} m²: ${await price()}`);
}
// garden @ 2000
await page.locator("button").filter({ hasText: "Garden Maintenance" }).first().click();
await page.waitForTimeout(300);
await page.evaluate(() => {
  const s = document.querySelector('input[type="range"]') as HTMLInputElement;
  if (s) { s.value = "2000"; s.dispatchEvent(new Event("input", { bubbles: true })); s.dispatchEvent(new Event("change", { bubbles: true })); }
});
await page.waitForTimeout(400);
console.log(`  garden @ 2000 m²: ${await price()}`);
// continue → step 2
await page.locator("button").filter({ hasText: /Continue/i }).first().click();
await page.waitForTimeout(1500);
const step2 = await page.evaluate(() => {
  const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const days = Array.from(document.querySelectorAll("button")).filter(vis)
    .map((b) => ({ t: (b.textContent ?? "").trim(), cls: (b.className || "").toString().includes("disabled") ? "disabled" : "ok" }))
    .filter((d) => /^\d{1,2}$/.test(d.t));
  const monthLabel = Array.from(document.querySelectorAll("h3,h4,div,span")).filter(vis)
    .map((x) => (x.textContent ?? "").trim()).find((t) => /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/.test(t));
  return { monthLabel, dayCount: days.length, firstDays: days.slice(0, 6) };
});
console.log("step2 calendar:", JSON.stringify(step2));
// click the first enabled day
const enabled = page.locator("button:not([disabled])").filter({ hasText: /^\d{1,2}$/ });
await enabled.nth(3).click().catch(() => {});
await page.waitForTimeout(900);
const afterDay = await page.evaluate(() => {
  const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const slots = Array.from(document.querySelectorAll("button")).filter(vis)
    .map((b) => (b.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30)).filter((t) => /am|pm|:00/i.test(t)).slice(0, 10);
  return { timeSlots: slots };
});
console.log("after day click, time slots:", JSON.stringify(afterDay));
// pick a slot then continue
const slot = page.locator("button:not([disabled])").filter({ hasText: /(am|pm)/i }).first();
if (await slot.count()) { await slot.click(); await page.waitForTimeout(500); }
await page.locator("button").filter({ hasText: /Continue/i }).first().click().catch(() => {});
await page.waitForTimeout(1500);
const step3 = await page.evaluate(() => {
  const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const inputs = Array.from(document.querySelectorAll("input,select,textarea")).filter(vis)
    .map((i) => `${i.tagName.toLowerCase()}:${(i as HTMLInputElement).type}:${(i.getAttribute("placeholder") ?? i.getAttribute("aria-label") ?? (i as HTMLInputElement).name).slice(0, 40)}`);
  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4")).filter(vis)
    .map((x) => `${x.tagName}:${(x.textContent ?? "").trim().slice(0, 50)}`);
  const btns = Array.from(document.querySelectorAll("button")).filter(vis)
    .map((b) => (b.textContent ?? "").trim().slice(0, 36)).filter(Boolean).slice(0, 10);
  return { url: location.pathname, headings, inputs, btns };
});
console.log("step3:", JSON.stringify(step3, null, 1));
await browser.close();
