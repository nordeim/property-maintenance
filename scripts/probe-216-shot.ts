// Session-216 captures: the standing round's evidence shots — capture 71
// (the FAQ at 1440 — a fresh round face; the s216 round is comments +
// pins only, so the capture proves the corpus's visual state is the
// unchanged s215 ship). Runs against the DEV server on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/faq`, { waitUntil: "networkidle" });
  // the FAQ accordion's default-open first item settles
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/71-s216-faq-1440.png` });
  console.log(`[capture] 71-s216-faq-1440.png`);

  await browser.close();
}

main().catch((e) => {
  console.error("[capture] FAILED:", e);
  process.exit(1);
});
