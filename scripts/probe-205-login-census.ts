// Session-205: what does the ref's /login actually render? Screenshot +
// input census after a long hydration wait.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const REF = "https://oasis-property-maintenance.base44.app";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(8000);
writeFileSync("/tmp/ref-login-render.png", await page.screenshot());
const census = await page.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll("input")).map((i) => ({
    type: i.type,
    name: i.name,
    placeholder: i.placeholder,
    id: i.id,
    visible: (i as HTMLElement).offsetParent !== null,
  }));
  const buttons = Array.from(document.querySelectorAll("button")).map((b) => ({
    text: b.textContent?.trim().slice(0, 40),
    type: b.type,
    visible: (b as HTMLElement).offsetParent !== null,
  }));
  return { inputs, buttons, title: document.title, rootChildren: document.getElementById("root")?.children.length };
});
console.log(JSON.stringify(census, null, 2));
await browser.close();
