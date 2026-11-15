// Session-201 C (the hero background painter, consolidated): the
// reference's hero pixels are greens + sky while ours is plain gray —
// with identical geometry. No img/video/background-image was found by
// the element censuses, so this probe asks the DOM directly: WHO
// paints at the green points (elementFromPoint), and it censuses the
// pseudo-elements + the large background-color children the broken
// incremental edits never reached.
import { chromium, type Page } from "@playwright/test";

const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://oasis-property-maintenance.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page, base: string) {
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

async function census(page: Page, label: string) {
  const lines = await page.evaluate(() => {
    const out: string[] = [];
    const hero = document.querySelector("section") as HTMLElement | null;
    // 1. who paints the green/sky points
    for (const pt of [[60, 500], [720, 870], [1100, 650], [720, 150]]) {
      const el = document.elementFromPoint(pt[0], pt[1]) as HTMLElement | null;
      if (el) {
        const cs = getComputedStyle(el);
        const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 3).join(".") : "";
        out.push(`at(${pt.join(",")}) -> ${el.tagName}.${cls} bgc=${cs.backgroundColor} bgi=${cs.backgroundImage.slice(0, 90)} shadow=${cs.boxShadow.slice(0, 40)}`);
      } else {
        out.push(`at(${pt.join(",")}) -> (null)`);
      }
    }
    // 2. pseudo-elements with content anywhere in the hero
    const heroChain: Element[] = hero ? [hero, ...Array.from(hero.querySelectorAll("*"))] : [];
    for (const el of heroChain) {
      for (const pseudo of ["::before", "::after"]) {
        const cs = getComputedStyle(el, pseudo);
        if (cs.content !== "none" && cs.content !== "normal" && cs.content !== "") {
          const cls = typeof (el as HTMLElement).className === "string" ? (el as HTMLElement).className.split(" ").slice(0, 2).join(".") : "";
          out.push(`pseudo ${el.tagName}.${cls} ${pseudo} content=${cs.content.slice(0, 16)} bgi=${cs.backgroundImage.slice(0, 100)}`);
        }
      }
    }
    // 3. large background-colored descendants in the hero
    for (const el of Array.from(hero?.querySelectorAll("*") ?? []) as HTMLElement[]) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && r.width > 150 && r.height > 40) {
        const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 2).join(".") : "";
        out.push(`paint ${el.tagName}.${cls} box=${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)} bgc=${cs.backgroundColor}`);
      }
    }
    // 4. every img's box (the lawn photo's position reveals the layer)
    for (const img of Array.from(document.querySelectorAll("img"))) {
      const r = img.getBoundingClientRect();
      out.push(`img box=${Math.round(r.left)},${Math.round(r.top + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} src=…${img.src.split("?")[0].slice(-28)}`);
    }
    // 5. shadow-DOM hosts + non-standard elements (the base44 platform's
    //    custom elements evade every light-DOM census)
    for (const el of Array.from(document.querySelectorAll("*"))) {
      const shadow = (el as HTMLElement).shadowRoot;
      if (shadow) {
        out.push(`shadow-host ${el.tagName} box=${Math.round(el.getBoundingClientRect().left)},${Math.round(el.getBoundingClientRect().top + window.scrollY)} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)} innerImgs=${shadow.querySelectorAll("img").length} innerBgs=${Array.from(shadow.querySelectorAll("*")).filter((s) => getComputedStyle(s).backgroundImage !== "none").length}`);
      }
      if (el.tagName.includes("-") && !el.tagName.startsWith("NEXT")) {
        const r = el.getBoundingClientRect();
        if (r.width > 100) out.push(`custom ${el.tagName} box=${Math.round(r.left)},${Math.round(r.top + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }
    // 6. the page-level layers: body's direct children + html/body/main
    //    pseudos + any large pointer-events-none element (the painters
    //    elementFromPoint skips)
    for (const el of [document.documentElement, document.body, ...Array.from(document.body.children)]) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const cls = typeof (el as HTMLElement).className === "string" ? (el as HTMLElement).className.split(" ").slice(0, 2).join(".") : "";
      out.push(`layer ${el.tagName}.${cls} box=${Math.round(r.left)},${Math.round(r.top + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} bgc=${cs.backgroundColor} bgi=${cs.backgroundImage.slice(0, 70)} pe=${cs.pointerEvents} op=${cs.opacity} blend=${cs.mixBlendMode} z=${cs.zIndex}`);
      for (const pseudo of ["::before", "::after"]) {
        const pcs = getComputedStyle(el, pseudo);
        if (pcs.content !== "none" && pcs.content !== "normal" && pcs.content !== "") {
          out.push(`layer-pseudo ${el.tagName} ${pseudo} content=${pcs.content.slice(0, 12)} bgc=${pcs.backgroundColor} bgi=${pcs.backgroundImage.slice(0, 110)} w=${pcs.width} h=${pcs.height}`);
        }
      }
    }
    // 7. THE POINT STACK: every element whose box contains (60,500) —
    //    the painter is somewhere in this stack; print every
    //    paint-capable property
    const PX = 60, PY = 500;
    for (const el of Array.from(document.querySelectorAll("*")) as HTMLElement[]) {
      const r = el.getBoundingClientRect();
      if (r.left <= PX && r.right >= PX && r.top <= PY && r.bottom >= PY && r.width > 50 && r.height > 50) {
        const cs = getComputedStyle(el);
        const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 2).join(".") : "";
        out.push(`stack ${el.tagName}.${cls} ${Math.round(r.width)}x${Math.round(r.height)} bgc=${cs.backgroundColor} bgi=${cs.backgroundImage.slice(0, 60)} filter=${cs.filter.slice(0, 30)} bfilter=${cs.backdropFilter.slice(0, 25)} blend=${cs.mixBlendMode} op=${cs.opacity} mask=${(cs.maskImage || "none").slice(0, 25)} clip=${(cs.clipPath || "none").slice(0, 20)}`);
      }
    }
    // 8. the html element's own background
    const hcs = getComputedStyle(document.documentElement);
    out.push(`html bgc=${hcs.backgroundColor} bgi=${hcs.backgroundImage.slice(0, 60)}`);
    return out.slice(0, 30);
  });
  for (const l of lines) console.log(`[${label}] ${l}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ours, OUR_URL);
  await ours.goto(`${OUR_URL}/`, { waitUntil: "networkidle" });
  await ours.waitForTimeout(2500);
  await census(ours, "ours");
  await ours.screenshot({ path: "/tmp/painter-ours.png" });
  const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ref, REF_URL);
  await ref.goto(`${REF_URL}/`, { waitUntil: "networkidle" });
  await ref.waitForTimeout(2500);
  await census(ref, "ref");
  await ref.screenshot({ path: "/tmp/painter-ref.png" });
  await ref.waitForTimeout(4000);
  await ref.screenshot({ path: "/tmp/painter-ref2.png" });
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
