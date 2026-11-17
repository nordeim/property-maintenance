// Session-211 E: our post-cure mobile capture (390) — closed state.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch({ headless: true });
const our = await browser.newPage({ viewport: { width: 390, height: 844 } });
await our.goto("http://localhost:3000/booking", { waitUntil: "domcontentloaded", timeout: 60_000 });
await our.waitForTimeout(4000);
writeFileSync("/tmp/our-211-booking-390-cured.png", await our.screenshot());
console.log("our 390 cured saved");
await browser.close();
console.log("done");
