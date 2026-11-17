// Session-211 C: the mobile menu re-capture — position-based click at
// the ref's hamburger (x351-360, y~40), then the open-state capture.
// Also captures OURS the same way (our header's Menu button) for the
// side-by-side. 390x844.
import { chromium, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function refLogin(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(8000);
  await page.locator("#email").click({ timeout: 20_000 });
  await page.keyboard.type(EMAIL, { delay: 15 });
  await page.locator("#password").click({ timeout: 20_000 });
  await page.keyboard.type(PASSWORD, { delay: 15 });
  await page.getByRole("button", { name: "Sign in" }).click({ timeout: 20_000 });
  await page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 });
  await page.waitForTimeout(3000);
}

const browser = await chromium.launch({ headless: true });

// REF mobile
const ref = await browser.newPage({ viewport: { width: 390, height: 844 } });
await refLogin(ref).catch(() => {});
await ref.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await ref.waitForTimeout(3500);
writeFileSync("/tmp/ref-211-booking-390-closed.png", await ref.screenshot());
console.log("ref closed saved");
await ref.mouse.click(356, 40);
await ref.waitForTimeout(1200);
writeFileSync("/tmp/ref-211-booking-390-open.png", await ref.screenshot());
console.log("ref open saved");
// the menu links visible? capture the DOM state
const refOpenState = await ref.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a")).filter((a) => {
    const r = a.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top < 844;
  });
  return links.slice(0, 14).map((a) => ({
    text: (a.textContent || "").trim().slice(0, 24),
    href: a.getAttribute("href"),
  }));
});
console.log(`ref open links: ${JSON.stringify(refOpenState)}`);
await ref.mouse.click(356, 40); // toggle back closed
await ref.waitForTimeout(800);
writeFileSync("/tmp/ref-211-booking-390-reclosed.png", await ref.screenshot());
console.log("ref reclosed saved");

// OURS mobile
const our = await browser.newPage({ viewport: { width: 390, height: 844 } });
await our.goto("http://localhost:3000/booking", { waitUntil: "domcontentloaded", timeout: 60_000 });
await our.waitForTimeout(3500);
writeFileSync("/tmp/our-211-booking-390-closed.png", await our.screenshot());
console.log("our closed saved");
await our.mouse.click(356, 40);
await our.waitForTimeout(1200);
writeFileSync("/tmp/our-211-booking-390-open.png", await our.screenshot());
console.log("our open saved");
const ourOpenState = await our.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a")).filter((a) => {
    const r = a.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top < 844;
  });
  return links.slice(0, 14).map((a) => ({
    text: (a.textContent || "").trim().slice(0, 24),
    href: a.getAttribute("href"),
  }));
});
console.log(`our open links: ${JSON.stringify(ourOpenState)}`);

await browser.close();
console.log("done");
