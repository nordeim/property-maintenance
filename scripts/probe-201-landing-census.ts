// Session-201 C (the landing adjudication): the full-map drift gate
// measured OUR "/" vs the REFERENCE's "/" at 77.28% — unexpected for
// two supposedly-identical marketing landings. This probe censuses
// both DOMs (logged in, 1440x900): the header/footer presence, the
// section landmarks, the heading text, the body text length, and the
// computed chrome (sticky header height + footer bg) — to classify
// the genus before any baseline is recorded.
import { chromium } from "@playwright/test";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function census(page, label: string) {
  const data = await page.evaluate(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const nav = document.querySelector("header nav, nav");
    const h1 = document.querySelector("h1");
    const h2s = Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim()).slice(0, 8);
    const sections = Array.from(document.querySelectorAll("section")).length;
    const imgs = Array.from(document.querySelectorAll("img")).length;
    const imgSrcs = Array.from(document.querySelectorAll("img")).map((i) => (i.src || "").split("?")[0].slice(-60));
    const bodyText = document.body.innerText.replace(/\s+/g, " ").slice(0, 300);
    const headerLinks = header ? Array.from(header.querySelectorAll("a")).map((a) => a.textContent?.trim()).filter(Boolean).slice(0, 10) : [];
    const headerH = header ? Math.round(header.getBoundingClientRect().height) : 0;
    const footerText = footer ? footer.innerText.replace(/\s+/g, " ").slice(0, 120) : "(no footer)";
    return { headerH, headerLinks, h1: h1?.textContent?.trim() ?? null, h2s, sections, imgs, imgSrcs, bodyText, footerText, navLinks: nav ? Array.from(nav.querySelectorAll("a")).length : 0 };
  });
  console.log(`[${label}] headerH=${data.headerH} navLinks=${data.navLinks} sections=${data.sections} imgs=${data.imgs}`);
  for (const s of data.imgSrcs) console.log(`[${label}]   img: …${s}`);
  console.log(`[${label}] headerLinks=[${data.headerLinks.join(", ")}]`);
  console.log(`[${label}] h1="${data.h1}" h2s=[${data.h2s.join(" | ")}]`);
  console.log(`[${label}] footer="${data.footerText}"`);
  console.log(`[${label}] body="${data.bodyText}"`);
}

async function login(page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ours, OUR_URL);
  await ours.goto(`${OUR_URL}/`, { waitUntil: "networkidle" });
  await ours.waitForTimeout(2500);
  console.log(`[ours] post-goto url: ${ours.url()}`);
  await census(ours, "ours");
  const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ref, REF_URL);
  await ref.goto(`${REF_URL}/`, { waitUntil: "networkidle" });
  await ref.waitForTimeout(2500);
  console.log(`[ref] post-goto url: ${ref.url()}`);
  await census(ref, "ref");
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
