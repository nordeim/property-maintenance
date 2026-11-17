// Session-215 audit leg: the mobile-nav walk at 390 (the operator's
// standing parity focus) — the geometry byte-MATCH contract {70,0,320,844},
// the 8-link vocabulary, the Radix keyboard contract (Esc-close +
// focus-return), and the Tailwind v4 animation layer (animationName
// "enter", 0.5s — the tw-animate-css chain). Mirrors the s214
// verification battery's walk.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });

  // 1. the closed state: the hamburger is the one icon-only menu button
  const hamburger = page.getByRole("button", { name: "Open menu" });
  const hCount = await page.getByRole("button", { name: "Open menu" }).count();
  console.log(`[walk] hamburger count: ${hCount}`);

  // nav must be hidden at 390 (the desktop nav is lg:flex = hidden here)
  const navVisible = await page.locator('nav[aria-label="Site"]').isVisible();
  console.log(`[walk] desktop nav visible at 390: ${navVisible}`);

  // 2. open the menu
  await hamburger.click();
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  // settle-wait: the 0.5s enter animation must finish before measuring
  // geometry (an early measure reads the sheet mid-slide at x~374)
  await page.waitForTimeout(900);
  const dialog = page.locator('[role="dialog"]');
  const box = await dialog.boundingBox();
  console.log(
    `[walk] dialog geometry: {x:${box?.x}, y:${box?.y}, w:${box?.width}, h:${box?.height}}`,
  );
  // the standing s214 record: {70,0,320,844}

  // 3. the link vocabulary (8 links: 6 nav + phone pill + Book Now)
  const sheetLinks = await dialog.locator("a:visible").allInnerTexts();
  console.log(`[walk] sheet links (${sheetLinks.length}): ${JSON.stringify(sheetLinks)}`);

  // 4. the Tailwind v4 animation layer — the slide-in from the right
  const anim = await dialog.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      animationName: cs.animationName,
      animationDuration: cs.animationDuration,
      position: cs.position,
      background: cs.backgroundColor,
    };
  });
  console.log(`[walk] dialog computed: ${JSON.stringify(anim)}`);

  // 5. the Radix keyboard contract: Esc closes, focus returns to trigger
  await page.keyboard.press("Escape");
  await page.waitForSelector('[role="dialog"]', { state: "hidden" });
  console.log(`[walk] Esc closed the dialog`);
  const focusName = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? (el.getAttribute("aria-label") ?? el.tagName) : "none";
  });
  console.log(`[walk] focus returned to: ${focusName}`);

  // 6. reopen + click a nav link closes the sheet and navigates
  await hamburger.click();
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  await dialog.getByRole("link", { name: "Services" }).click();
  await page.waitForURL("**/services");
  const h1 = await page.locator("h1").first().innerText();
  console.log(`[walk] nav-link navigation OK — /services h1: "${h1}"`);

  await browser.close();
}

main().catch((e) => {
  console.error("[walk] FAILED:", e);
  process.exit(1);
});
