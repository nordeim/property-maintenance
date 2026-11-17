// Session-223: computed-geometry + census diff of the mobile menu OPEN state
// (the DOM census is the ground truth — the s200/s205 doctrine).
import { chromium } from "playwright";

const WAIT = 2500;

async function census(url: string, login = false) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(WAIT);
  if (login) {
    const email = page.locator('input[type="email"]');
    if (await email.count()) {
      await email.first().fill("sepnetflix2023@outlook.com");
      await page.locator('input[type="password"]').first().fill("$Abcd1234");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(WAIT);
    }
  }
  const btn = page.locator('button[aria-label="Open menu"], button[aria-haspopup="dialog"]').first();
  await btn.click();
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    // the open dialog/sheet content
    const content = document.querySelector('[role="dialog"]');
    if (!content) return { dialog: null };
    const rect = content.getBoundingClientRect();
    const cs = getComputedStyle(content);
    const links = [...content.querySelectorAll("a")].map((a) => ({
      text: (a.textContent || "").trim().slice(0, 30),
      href: a.getAttribute("href"),
    }));
    // escape + focus probe
    const active = document.activeElement?.tagName + ":" + (document.activeElement?.getAttribute?.("aria-label") ?? "");
    return {
      dialog: {
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        bg: cs.backgroundColor,
        borderLeft: cs.borderLeftWidth,
        position: cs.position,
        zIndex: cs.zIndex,
        linkCount: links.length,
        links: links.map((l) => l.text).filter(Boolean),
        hrefs: links.map((l) => l.href),
        activeElement: active,
        ariaLabel: content.getAttribute("aria-label"),
      },
    };
  });

  // Escape probe
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const afterEsc = await page.evaluate(() => ({
    dialogOpen: !!document.querySelector('[role="dialog"]'),
    bodyLocked: document.body.hasAttribute("data-scroll-locked") || getComputedStyle(document.body).overflow === "hidden",
    activeAfter: document.activeElement?.tagName + ":" + (document.activeElement?.getAttribute?.("aria-label") ?? ""),
  }));

  console.log(JSON.stringify({ url, ...data, afterEsc }, null, 1));
  await browser.close();
}

if (process.argv[2] === "ref") {
  await census("https://oasis-property-maintenance.base44.app/", true);
} else {
  await census("http://localhost:3000/");
}
