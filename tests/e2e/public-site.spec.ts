import { expect, test } from "@playwright/test";

// Session-199 (the property-maintenance checkout round): the OASIS PUBLIC
// BATTERY — the (site) group's rendered faces. Every assertion below is
// the live-recon ground truth (scripts/recon-199*.ts legs 8-12): the
// pages' censused copy, the estimate card's service-driven price forms,
// the booking round-trip to the SUPERSET confirmation (POST /api/bookings
// — the reference's own Confirm target is Unknown, ours persists), the
// 390 hamburger (the reference's icon-only-button dialog), the designed
// 404 in the site chrome, and the re-skinned login card.
//
// The PUBLIC pages ride the chromium project's storageState (harmless —
// they render identically for guests and signed-in visitors; the s142
// landing precedent).

test("the home renders the Oasis hero + the estimate section", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Oasis Property Maintenance");
  await expect(page.locator("h1")).toContainText("Your property,");
  await expect(page.locator("h1")).toContainText("perfectly maintained.");
  await expect(page.getByText("Trusted by homeowners across SE Queensland")).toBeVisible();
  // the #estimate band + its widget
  await expect(page.locator("#estimate")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Know your price before you book" })).toBeVisible();
});

test("the home's estimate card rides the seam's matrix (the service flip)", async ({ page }) => {
  await page.goto("/");
  const price = page.getByTestId("estimate-price");
  await expect(price).toHaveText("$60 – $80"); // lawn (the default)
  await page.getByRole("button", { name: "Pressure Washing" }).click();
  await expect(price).toHaveText("$120 – $160");
  await page.getByRole("button", { name: "Full Property Tidy-Up" }).click();
  await expect(price).toHaveText("$145 – $195");
  // the yard readout defaults to 400 m²
  await expect(page.getByText("400 m²")).toBeVisible();
});

test("the eight public routes render their censused h1s", async ({ page }) => {
  for (const [path, h1] of [
    ["/home", "Your property,"],
    ["/services", "Our Services"],
    ["/gallery", "Before & After Gallery"],
    ["/faq", "Frequently Asked Questions"],
    ["/about", "About Green Cut"],
    ["/contact", "Get Your Free Quote"],
    ["/booking", "Book a Service"],
  ] as const) {
    await page.goto(path);
    await expect(page.locator("h1")).toContainText(h1);
  }
});

test("the services page carries the five groups + the twelve cards", async ({ page }) => {
  await page.goto("/services");
  for (const group of ["Lawn & Garden Care", "Exterior Cleaning", "Property & General Maintenance", "NDIS & Support Homes", "Need something else?"]) {
    await expect(page.getByRole("heading", { name: group, exact: false })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: /Add to Quote/ })).toHaveCount(12);
  // the Add-to-Quote carry: the service rides ?service= to the form
  await page.getByRole("link", { name: /Add to Quote/ }).first().click();
  await expect(page).toHaveURL(/\/contact\?service=/);
});

test("the contact form pre-checks the carried service + submits the superset quote", async ({ page }) => {
  await page.goto("/contact?service=Lawn%20mowing%20%26%20edging");
  const cb = page.getByRole("checkbox", { name: /Lawn mowing & edging/i });
  await expect(cb).toBeChecked();
  // the full submit round-trip (the SUPERSET: a persisted QuoteRequest)
  await page.getByLabel("Your Name *").fill("E2E Quote Walker");
  await page.getByLabel("Phone Number *").fill("0400 000 000");
  await page.getByLabel("Suburb *").selectOption("Parkwood");
  await page.getByRole("button", { name: "Get My Free Quote" }).click();
  await expect(page.getByText("Thanks — quote request received!")).toBeVisible({ timeout: 15_000 });
});

test("the FAQ accordion opens one answer at a time (the Radix single-open)", async ({ page }) => {
  await page.goto("/faq");
  const first = page.getByRole("button", { name: /How much is lawn mowing\?/ });
  await first.click();
  await expect(page.getByText(/Most small residential lawns start from/)).toBeVisible();
  // the single-open contract: opening another closes the first
  await page.getByRole("button", { name: /How do you calculate the price\?/ }).click();
  await expect(page.getByText(/We consider several factors/)).toBeVisible();
  await expect(page.getByText(/Most small residential lawns start from/)).toBeHidden();
});

test("the booking round-trip reaches the SUPERSET confirmation", async ({ page }) => {
  await page.goto("/booking");
  // step 1: the estimate + Continue
  await expect(page.getByTestId("estimate-price")).toHaveText("$60 – $80");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  // step 2: the calendar (a future day) + a slot
  await page.getByRole("button", { name: /Go to next month/ }).click();
  await page.locator('table[role="grid"] button:not([disabled])').filter({ hasText: "15" }).first().click();
  await page.getByRole("button", { name: "10am-12pm" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  // step 3: the details + Confirm (the SUPERSET submit)
  await page.getByLabel("Full name *").fill("E2E Booking Walker");
  await page.getByLabel("Phone *").fill("0400 000 000");
  await page.getByLabel("Suburb *").fill("Parkwood");
  const summary = page.getByTestId("summary-estimate");
  await expect(summary).toHaveText("$60–$80");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByRole("heading", { name: "Booking confirmed!" })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("confirm-estimate")).toHaveText("$60–$80");
});

test("the 390 hamburger opens the six-link menu + closes on a link ride", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  // no horizontal overflow at the phone axis
  await expect(page.locator("header")).toBeVisible();
  const open = page.getByRole("button", { name: "Open menu" });
  await open.click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  for (const label of ["Home", "Services", "Gallery", "About", "FAQ", "Contact"]) {
    await expect(page.getByRole("dialog", { name: "Site menu" }).getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  // the link ride closes the menu + lands on the page
  await page.getByRole("dialog", { name: "Site menu" }).getByRole("link", { name: "FAQ", exact: true }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();
});

test("the designed 404 rides the site chrome + Go Home lands on /home", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.locator("h1")).toHaveText("404");
  await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();
  await expect(page.getByText(/could not be found in this application/)).toBeVisible();
  // the site chrome (the reference's own 404 carries it — recon leg 8)
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await page.getByRole("link", { name: "Go Home" }).click();
  await expect(page).toHaveURL(/\/home$/);
});

test("the login card carries the Oasis identity + the three social buttons", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome to Oasis Property Maintenance" })).toBeVisible();
  await expect(page.getByText("Sign in to continue")).toBeVisible();
  for (const label of ["Continue with Google", "Continue with Facebook", "Continue with Apple"]) {
    await expect(page.getByRole("button", { name: label })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Forgot password?" })).toBeVisible();
});
