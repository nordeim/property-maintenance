import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://oasis-property-maintenance.base44.app/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const out = await page.evaluate(() => {
  const cards = [...document.querySelectorAll("div")].filter((d) =>
    (d.getAttribute("class") || "").includes("group bg-white rounded-2xl overflow-hidden"));
  if (!cards.length) return { error: "no cards" };
  const cs = getComputedStyle(cards[0]);
  return {
    transform: cs.transform,
    transition: `${cs.transitionProperty} ${cs.transitionDuration}`,
    opacity: cs.opacity,
    count: cards.length,
  };
});
console.log(JSON.stringify(out));
await browser.close();
