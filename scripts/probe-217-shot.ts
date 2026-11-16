// Session-217 captures: the standing round's evidence shot — capture 72
// (the Contact page at 1440 — a fresh round face; the s217 round is
// comments + pins + doc-truth only, so the capture proves the corpus's
// visual state is the unchanged s216 ship). Runs against the DEV
// server on :3000.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  // the contact card + the social links settle
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/72-s217-contact-1440.png` });
  console.log(`[capture] 72-s217-contact-1440.png`);

  await browser.close();
}

main().catch((e) => {
  console.error("[capture] FAILED:", e);
  process.exit(1);
});
