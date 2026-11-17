// Session-201 C: the Oasis reference's CRM-surface probe. The s199
// recon recorded "the reference has NO CRM" — tested at the LOWERCASE
// /dashboard. The owner's s201 brief names /Dashboard (CAPITAL) as a
// parity target, and the base44 router family case-folds app routes
// (the neo-crm reference's own behavior — the PAD's route-casing
// doctrine). This probe logs into the LIVE Oasis reference and
// censuses the CRM route family at BOTH casings: which render (200),
// which 404, and what the rendered surfaces carry (headings, nav,
// links) — resolving the tension between the s199 record and the
// owner's named target.
import { chromium } from "@playwright/test";

const REF = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

// the CRM route family — both casings, plus the reference's own
// post-login landing (the sweep's login note: post-login lands on /)
const ROUTES = [
  "/Dashboard", "/dashboard",
  "/Clients", "/clients",
  "/Jobs", "/jobs",
  "/Invoices", "/invoices",
  "/Leads", "/leads",
  "/Contacts", "/contacts",
  "/Calendar", "/calendar",
  "/Reports", "/reports",
  "/Settings", "/settings",
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
  console.log(`[probe] logged in; landed at ${page.url()}`);

  for (const route of ROUTES) {
    const resp = await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 30_000 }).catch(() => null);
    await page.waitForTimeout(1800);
    const status = resp?.status() ?? "ERR";
    if (status === 200) {
      const h = await page.locator("h1, h2, h3").first().textContent().catch(() => null);
      const title = await page.title();
      const links = await page.locator("nav a, aside a, [role='navigation'] a").allTextContents().catch(() => []);
      console.log(`[probe] ${route} -> 200 | title="${title?.slice(0, 60)}" | h="${h?.trim().slice(0, 60)}" | nav=[${links.slice(0, 12).map((l) => l.trim()).join(", ")}]`);
    } else {
      console.log(`[probe] ${route} -> ${status}`);
    }
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
