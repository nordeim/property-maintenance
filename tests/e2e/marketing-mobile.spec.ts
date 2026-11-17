import { expect, test } from "@playwright/test";

// Session-199 (the Oasis re-anchor): the marketing PHONE contract — the
// (site) public pages at 390. The walk40 internal-scroller model retired
// with the neo-crm marketing layer (its h-screen app-shell quirk); the
// OASIS reference's public pages scroll the DOCUMENT (recon-verified at
// 390: scrollW exactly 390, no horizontal overflow, the natural
// below-the-fold). This spec freezes THAT model + the censused copy on
// the two richest surfaces (about + contact), plus the standing no-390-
// overflow contract on every public route.
//
// The pinned values are COUNT-DERIVED (the recon-leg-8/11 censused copy)
// or LAYOUT-DERIVED (the scrollWidth contract) — never text-rasterized
// pixel sums (the s106 idiom).

const PUBLIC_ROUTES = ["/", "/home", "/services", "/gallery", "/faq", "/about", "/contact", "/booking"] as const;

test("the public pages hold the 390px phone contract (no horizontal overflow, the document scrolls)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of PUBLIC_ROUTES) {
    await page.goto(route);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(600);
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    // (a) the frame contract: nothing overflows the 390px viewport
    expect(scrollW, `${route} scrollWidth`).toBe(390);
  }

  // (b) the scroll model: the DOCUMENT carries the below-the-fold (the
  // natural page scroll — the opposite of the retired neo-crm shell's
  // internal main scroller)
  const aboutScrollH = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(aboutScrollH).toBeGreaterThan(844);
});

test("the about + contact surfaces carry their censused copy at the phone axis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  // ---- /about -----------------------------------------------------------
  await page.goto("/about");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "About Green Cut" })).toBeVisible();

  const about = await page.evaluate(() => {
    const regions = Array.from(document.querySelectorAll("main h3"))
      .map((h) => (h.textContent ?? "").trim())
      .filter(Boolean);
    return { regions };
  });
  for (const region of ["Reliable & Punctual", "Professional & Insured", "Local & Trusted", "Customer Focused", "Gold Coast", "Logan", "South Brisbane"]) {
    expect(about.regions, `the ${region} h3`).toContain(region);
  }

  // ---- /contact ---------------------------------------------------------
  await page.goto("/contact");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "Get Your Free Quote" })).toBeVisible();

  const contact = await page.evaluate(() => {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const suburbs = Array.from(document.querySelectorAll("select option"))
      .map((o) => (o.textContent ?? "").trim())
      .filter((t) => t !== "Select your suburb");
    return { checkboxCount: checkboxes.length, suburbCount: suburbs.length };
  });
  // the census: 13 service checkboxes (Email Address + the 11
  // services + Other) + the 19-suburb select — source-truth counted
  expect(contact.checkboxCount).toBe(13);
  expect(contact.suburbCount).toBe(19);
});
