// Session-199 recon leg 4: the Oasis DESIGN TOKENS (palette, fonts,
// radii, shadows, header/footer anatomy), the mobile-390 nav census,
// and the booking-flow walk (the estimate matrix + the steps).
import { chromium } from "@playwright/test";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);

  // 1. design tokens: body + h1 + buttons + header + footer
  const tokens = await page.evaluate(() => {
    const cs = (el: Element | null) => (el ? getComputedStyle(el) : null);
    const pick = (s: string) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const c = getComputedStyle(el);
      return {
        sel: s, color: c.color, bg: c.backgroundColor, font: c.fontFamily.slice(0, 80),
        size: c.fontSize, weight: c.fontWeight, radius: c.borderRadius,
        pad: c.padding, shadow: c.boxShadow.slice(0, 90), height: Math.round((el as HTMLElement).getBoundingClientRect().height),
      };
    };
    const body = cs(document.body);
    const header = document.querySelector("header") ?? document.querySelector("nav")?.parentElement;
    const hc = header ? getComputedStyle(header) : null;
    return {
      body: { font: body?.fontFamily, color: body?.color, bg: body?.backgroundColor, size: body?.fontSize },
      header: hc ? { pos: hc.position, bg: hc.backgroundColor, h: Math.round(header!.getBoundingClientRect().height), shadow: hc.boxShadow.slice(0, 80), blur: hc.backdropFilter } : null,
      h1: pick("h1"), h2: pick("h2"), h3: pick("h3"), p: pick("p"),
      primaryBtn: pick('a[href="/booking"]'), // Book Now
      footer: pick("footer"),
      html: { scrollW: document.documentElement.scrollWidth },
      cssVars: (() => { const root = getComputedStyle(document.documentElement);
        const keys = ["--brand", "--primary", "--accent", "--green", "--color-brand"];
        const o: Record<string, string> = {}; for (const k of keys) o[k] = root.getPropertyValue(k); return o; })(),
    };
  });
  console.log("===== DESIGN TOKENS (home, 1440x900) =====");
  console.log(JSON.stringify(tokens, null, 1).slice(0, 2600));

  // 2. the CTA button's exact classes + the hero section census
  const heroCensus = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const firstSection = h1?.closest("section");
    const btn = Array.from(document.querySelectorAll('a[href="/booking"], a[href="/Booking"]'))[0] as HTMLAnchorElement;
    const sectionInfo = firstSection ? {
      bg: getComputedStyle(firstSection).backgroundImage.slice(0, 160) || getComputedStyle(firstSection).backgroundColor,
      pad: getComputedStyle(firstSection).padding,
    } : null;
    return {
      h1Classes: h1?.className.slice(0, 200),
      btnClasses: btn?.className.slice(0, 200),
      btnBg: btn ? getComputedStyle(btn).backgroundColor : null,
      btnRadius: btn ? getComputedStyle(btn).borderRadius : null,
      sectionInfo,
      navItems: Array.from(document.querySelectorAll("header a, nav a")).map((a) => (a.textContent ?? "").trim()).filter(Boolean).slice(0, 10),
    };
  });
  console.log("===== HERO / CTA =====");
  console.log(JSON.stringify(heroCensus, null, 1));

  // 3. mobile 390 census of the home page
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await phone.goto(`${REF_URL}/`, { waitUntil: "domcontentloaded" });
  await phone.waitForTimeout(3500);
  const mobile = await phone.evaluate(() => {
    const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const menuBtns = Array.from(document.querySelectorAll("button")).filter((b) => {
      const t = (b.textContent ?? "").trim();
      const label = b.getAttribute("aria-label") ?? "";
      return vis(b) && (/menu/i.test(label) || (t === "" && b.querySelectorAll("svg").length > 0 && b.getBoundingClientRect().top < 120));
    });
    const header = document.querySelector("header");
    const links = Array.from(document.querySelectorAll("header a, nav a")).filter(vis).map((a) => (a.textContent ?? "").trim()).filter(Boolean);
    return {
      headerH: header ? Math.round(header.getBoundingClientRect().height) : 0,
      visibleHeaderLinks: links,
      menuButtons: menuBtns.length,
      menuBtnLabels: menuBtns.map((b) => b.getAttribute("aria-label") ?? "(icon-only)"),
      scrollW: document.documentElement.scrollWidth,
    };
  });
  console.log("===== MOBILE 390 (home) =====");
  console.log(JSON.stringify(mobile, null, 1));
  // try opening the mobile menu if a button exists
  if (mobile.menuButtons > 0) {
    await phone.locator("button", { hasText: /^$/ }).first().click().catch(() => {});
    await phone.waitForTimeout(1200);
    const openCensus = await phone.evaluate(() => {
      const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      return Array.from(document.querySelectorAll("a")).filter(vis).filter((a) => a.getBoundingClientRect().top < 500)
        .map((a) => (a.textContent ?? "").trim()).filter(Boolean).slice(0, 12);
    });
    console.log(`mobile menu open links: ${JSON.stringify(openCensus)}`);
  }

  // 4. the booking flow walk: service × yard-size → price; then Continue
  await page.goto(`${REF_URL}/booking`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const walkEstimates = async () => page.evaluate(() => {
    const priceEl = Array.from(document.querySelectorAll("*")).find((el) => {
      const t = (el.textContent ?? "").trim(); return /^\$\d+ – \$\d+$/.test(t) && el.children.length === 0;
    });
    const yardBtns = Array.from(document.querySelectorAll("button")).filter((b) => {
      const t = (b.textContent ?? "").trim(); return /small|medium|large|acre|block/i.test(t);
    }).map((b) => t2(b));
    function t2(b: Element) { return (b.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40); }
    return { price: priceEl?.textContent?.trim() ?? null, yardButtons: yardBtns };
  });
  console.log("===== BOOKING FLOW =====");
  console.log("initial:", JSON.stringify(await walkEstimates()));
  // click each yard size for lawn, capture price
  const yardOpts = await page.evaluate(() => Array.from(document.querySelectorAll("button"))
    .filter((b) => /small|medium|large|acre|block/i.test(b.textContent ?? ""))
    .map((b, i) => ({ i, t: (b.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 50) })));
  console.log("yard options:", JSON.stringify(yardOpts));
  for (const o of yardOpts) {
    await page.locator("button").filter({ hasText: new RegExp(o.t.slice(0, 12), "i") }).first().click().catch(() => {});
    await page.waitForTimeout(500);
    console.log(`  after "${o.t}": ${JSON.stringify(await walkEstimates())}`);
  }
  // continue → next step
  await page.locator("button").filter({ hasText: /Continue/i }).first().click().catch(() => {});
  await page.waitForTimeout(2000);
  const step2 = await page.evaluate(() => {
    const vis = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const inputs = Array.from(document.querySelectorAll("input, select, textarea")).filter(vis)
      .map((i) => `${i.tagName.toLowerCase()}:${(i as HTMLInputElement).type}:${(i.getAttribute("placeholder") ?? "").slice(0, 30)}`);
    const h = Array.from(document.querySelectorAll("h1,h2,h3,h4")).filter(vis).map((x) => `${x.tagName}:${(x.textContent ?? "").trim().slice(0, 50)}`);
    const btns = Array.from(document.querySelectorAll("button")).filter(vis).map((b) => (b.textContent ?? "").trim().slice(0, 30)).filter(Boolean);
    return { url: location.pathname, headings: h, inputs, buttons: btns.slice(0, 12) };
  });
  console.log("step 2:", JSON.stringify(step2, null, 1));

  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
