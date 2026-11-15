// Session-208 B2: OUR booking card DOM decode — the same dump as the
// ref probe, for the positional + styling comparison (the drift map's
// 41% cell at the glass mid-region points at the header/dots row).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/booking`, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(2500);

const tree = await page.evaluate(() => {
  const out: string[] = [];
  const walk = (el: Element, depth: number) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && r.bottom > 180 && r.top < 1010 && r.right > 500 && r.left < 1000) {
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
