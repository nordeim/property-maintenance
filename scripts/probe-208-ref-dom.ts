// Session-208 B: the ref's booking card DOM decode — what element
// renders the gray panel at (624-904, y240-336)? Dump the card's
// element tree with bounding boxes, filtered to that region.
import { chromium, type Page } from "@playwright/test";

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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await refLogin(page);
await page.goto(`${REF}/booking`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(3500);

const tree = await page.evaluate(() => {
  const out: string[] = [];
  const walk = (el: Element, depth: number) => {
    const r = el.getBoundingClientRect();
    // widen: the card's full content zone (y345-1010)
    if (r.width > 0 && r.height > 0 && r.bottom > 340 && r.top < 1010 && r.right > 500 && r.left < 1000) {
      const cs = window.getComputedStyle(el);
      out.push(
        `${"  ".repeat(depth)}<${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}` +
          ` class="${(el.getAttribute("class") || "").slice(0, 60)}"` +
          ` box=[${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}]` +
          ` bg=${cs.backgroundColor}` +
          `>${(el.textContent || "").trim().slice(0, 40).replace(/\s+/g, " ")}`,
      );
      Array.from(el.children).forEach((c) => walk(c, depth + 1));
    } else {
      Array.from(el.children).forEach((c) => walk(c, depth));
    }
  };
  Array.from(document.body.children).forEach((c) => walk(c, 0));
  return out;
});
console.log(tree.slice(0, 110).join("\n"));
await browser.close();
