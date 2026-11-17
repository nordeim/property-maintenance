// Session-223 live-parity probe: capture the Oasis reference's mobile menu
// OPEN state at 390x844 (the operator's named attention surface) + our own,
// then diff the link vocabularies. Throwaway rotation tool (the sweep family's
// domcontentloaded + fixed-settle idiom — never networkidle on a dev boot).
import { chromium } from "playwright";

const WAIT = 2500;

async function shoot(url: string, out: string, login = false) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(WAIT);
  if (login) {
    // the reference serves the login card to visitors; log in with the demo pair
    const email = page.locator('input[type="email"]');
    if (await email.count()) {
      await email.first().fill("sepnetflix2023@outlook.com");
      await page.locator('input[type="password"]').first().fill("$Abcd1234");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(WAIT);
    }
  }
  // open the mobile menu (the md:hidden hamburger)
  const btn = page.locator('button[aria-label="Open menu"], button[aria-haspopup="dialog"]').first();
  const btnCount = await btn.count();
  if (btnCount) {
    await btn.first().click();
    await page.waitForTimeout(1200);
  }
  const links = await page.locator('a[href]').allInnerTexts();
  await page.screenshot({ path: out, fullPage: false });
  const visible = links.filter((t) => t.trim().length > 0).map((t) => t.trim());
  console.log(JSON.stringify({ url, shot: out, menuButton: btnCount, links: visible }, null, 1));
  await browser.close();
}

const target = process.argv[2] ?? "ref";
if (target === "ref") {
  await shoot("https://oasis-property-maintenance.base44.app/", "/tmp/probe-223-ref-menu-open.png", true);
} else {
  await shoot("http://localhost:3000/", "/tmp/probe-223-ours-menu-open.png", false);
}
