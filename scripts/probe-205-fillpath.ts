// Session-205: why does fill() time out on the ref login? Probe the
// hit-test at the input's center + the React-controlled fill path.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const REF = "https://oasis-property-maintenance.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded", timeout: 45_000 });
await page.waitForTimeout(8000);

const hit = await page.evaluate(() => {
  const el = document.querySelector("#email") as HTMLElement | null;
  if (!el) return { found: false };
  const r = el.getBoundingClientRect();
  const cx = r.x + r.width / 2;
  const cy = r.y + r.height / 2;
  const at = document.elementFromPoint(cx, cy);
  return {
    found: true,
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    hitTag: at?.tagName,
    hitId: at?.id,
    hitClass: String(at?.className).slice(0, 80),
    hitIsSelfOrChild: at === el || el.contains(at as Node),
  };
});
console.log("hit-test:", JSON.stringify(hit));

// the React-native fill path: focus + type through the keyboard
await page.locator("#email").click({ timeout: 10_000 }).catch((e) => console.log("click failed:", String(e).slice(0, 80)));
await page.keyboard.type(EMAIL, { delay: 20 });
await page.locator("#password").click({ timeout: 10_000 }).catch((e) => console.log("click2 failed:", String(e).slice(0, 80)));
await page.keyboard.type(PASSWORD, { delay: 20 });
const vals = await page.evaluate(() => ({
  email: (document.querySelector("#email") as HTMLInputElement)?.value,
  pw: ((document.querySelector("#password") as HTMLInputElement)?.value?.length) ?? -1,
}));
console.log("typed values:", JSON.stringify(vals));
if (vals.email === EMAIL) {
  await page.getByRole("button", { name: "Sign in" }).click({ timeout: 15_000 });
  await page.waitForTimeout(6000);
  console.log("post-login url:", page.url());
  writeFileSync("/tmp/ref-logged-in.png", await page.screenshot());
}
await browser.close();
