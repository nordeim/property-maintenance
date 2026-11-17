// Session-199 recon leg 15: the reload-loop diagnosis on the (site) root —
// navigation + console events captured for 8s.
import { chromium } from "@playwright/test";
const BASE = "http://localhost:3000";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("framenavigated", (f) => {
  if (f === page.mainFrame()) console.log("NAV:", f.url().slice(0, 80));
});
page.on("console", (m) => console.log("CONSOLE:", m.type(), m.text().slice(0, 160)));
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 200)));
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(8000);
console.log("done");
await browser.close();
