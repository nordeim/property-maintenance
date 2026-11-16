// Session-213 (the stable-4 cure decode): the reference's #estimate
// card interior — what wraps the yard slider (ours renders a block
// <label> the ref lacks) + the CTA's exact construction ("Book with
// this estimate" + the calendar-check icon).
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("https://oasis-property-maintenance.base44.app/", { waitUntil: "domcontentloaded" });
const docH = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= docH; y += 400) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2000);
const out = await page.evaluate(() => {
  const main = document.querySelector("main");
  const mainTop = main!.getBoundingClientRect().top + scrollY;
  // the estimate card: the section containing the slider (role=slider)
  const slider = main!.querySelector('[role="slider"]');
  const card = slider?.closest("div");
  const cardY = card ? Math.round(card.getBoundingClientRect().top + scrollY - mainTop) : null;
  // the card's direct text children (labels? headings?) — walk 4 levels
  const lines: string[] = [];
  const walk = (node: Element, depth: number) => {
    for (const child of Array.from(node.children)) {
      const r = child.getBoundingClientRect();
      lines.push(
        `${"  ".repeat(depth)}y${Math.round(r.top + scrollY - mainTop)} h${Math.round(r.height)} <${child.tagName.toLowerCase()} class="${(child.getAttribute("class") || "").slice(0, 44)}"> "${(child.textContent || "").trim().slice(0, 34)}"`,
      );
      if (depth < 4) walk(child, depth + 1);
    }
  };
  if (card) walk(card, 0);
  // the CTA
  const cta = [...main!.querySelectorAll("a")].find((a) =>
    (a.textContent || "").includes("Book with this estimate"),
  );
  const ctaHtml = cta ? cta.outerHTML.slice(0, 400) : "NOT FOUND";
  return { cardY, lines, ctaHtml };
});
console.log(`[ref] estimate card y=${out.cardY}`);
console.log(out.lines.slice(0, 34).join("\n"));
console.log(`[ref] CTA html: ${out.ctaHtml}`);
await browser.close();
