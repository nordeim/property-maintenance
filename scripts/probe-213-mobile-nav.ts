// Session-213: the standing MOBILE-NAV parity walk (the operator's
// named focus every round). Both apps at 390x844: the menu opens, the
// panel geometry + the Tailwind v4 animation + the link vocabulary are
// captured, Escape closes, and focus returns to the trigger. Computed
// styles are ground truth (the house doctrine).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";

const walk = async (browser: import("@playwright/test").Browser, base: string, label: string, shot: string) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  // the trigger (ours: aria-label="Open menu"; the reference's own icon-only button)
  const trigger = page.locator('button[aria-label="Open menu"]').first();
  const triggerCount = await trigger.count();
  const altTrigger = triggerCount
    ? trigger
    : page.locator('header button:visible').first(); // the reference's own form
  const used = triggerCount ? 'aria-label="Open menu"' : "header button:visible";
  await altTrigger.click();
  await page.waitForTimeout(900); // the enter animation completes
  const panel = page.locator('[role="dialog"]').first();
  const box = await panel.boundingBox();
  const info = await panel.evaluate((el) => {
    const cs = getComputedStyle(el);
    const links = [...el.querySelectorAll("a")].map((a) => (a.textContent || "").trim()).filter(Boolean);
    return {
      animName: cs.animationName,
      animDur: cs.animationDuration,
      bg: cs.backgroundColor,
      h2: el.querySelector("h2")?.textContent?.trim() ?? null,
      linkCount: links.length,
      links: links.slice(0, 8),
    };
  });
  await page.screenshot({ path: `docs/screenshots/${shot}` });
  // Escape closes + focus returns to the trigger
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const closed = (await page.locator('[role="dialog"]').count()) === 0;
  const focusBack = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName);
  console.log(
    `[${label}] trigger=${used} panel=${JSON.stringify(box)} anim=${info.animName}/${info.animDur} links=${info.linkCount} h2=${info.h2} escClosed=${closed} focusBack=${focusBack}`,
  );
  console.log(`[${label}] links: ${info.links.join(" | ")}`);
  await page.close();
  return { box, info, closed };
};

const browser = await chromium.launch();
mkdirSync("docs/screenshots", { recursive: true });
const ours = await walk(browser, OURS, "ours", "67-s213-mobile-menu-390.png");
const ref = await walk(browser, REF, "ref", "67b-s213-ref-mobile-menu-390.png");
await browser.close();

const sameGeom =
  ours.box && ref.box &&
  Math.abs(ours.box.x - ref.box.x) < 2 &&
  Math.abs(ours.box.y - ref.box.y) < 2 &&
  Math.abs(ours.box.width - ref.box.width) < 2 &&
  Math.abs(ours.box.height - ref.box.height) < 2;
console.log(
  `[verdict] geometry ${sameGeom ? "MATCH" : "DIFFERS"} · anim ours=${ours.info.animName} ref=${ref.info.animName} · esc ${ours.closed && ref.closed ? "BOTH CLOSE" : "MISMATCH"}`,
);
