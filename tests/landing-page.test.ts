// Session-199 (the property-maintenance checkout round): the MARKETING
// BATTERY — the Oasis public layer's construction pins. This suite
// REPLACED the s142 landing battery (the neo-crm landing's DOM pins,
// retired with the surface it pinned: that landing cloned a DIFFERENT
// reference's marketing arms; the Oasis build (the plan §2) replaced
// the pages, so the old pins now assert markup that no longer exists
// by design — the retirement pattern, their forms joining the
// negatives ladder below).
//
// Every positive pin below is the live-recon ground truth
// (scripts/recon-199*.ts legs 8-12; the extracted content rides
// src/lib/site-content.ts).
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string): string => {
  try {
    return readFileSync(p, "utf-8");
  } catch {
    return "";
  }
};

// the retired s142 landing forms never return (the negatives ladder —
// the neo-crm landing's own copy, retired WITH its surface)
const RETIRED_LANDING_FORMS = [
  'import { LandingPage } from "@/components/landing/landing-page"',
  "Open the dashboard",
  "See pricing",
] as const;

describe("session-199: the (site) group — the Oasis public layer's routes", () => {
  it("the eight public routes render their pages under the site chrome", () => {
    for (const [route, marker] of [
      ["(site)/page.tsx", "HomePage"],
      ["(site)/home/page.tsx", "HomePage"],
      ["(site)/services/page.tsx", "ServicesPage"],
      ["(site)/gallery/page.tsx", "GalleryPage"],
      ["(site)/faq/page.tsx", "FaqPage"],
      ["(site)/about/page.tsx", "AboutPage"],
      ["(site)/contact/page.tsx", "ContactPage"],
      ["(site)/booking/page.tsx", "BookingFlow"],
    ] as const) {
      expect(read(`src/app/${route}`), route).toContain(marker);
    }
  });

  it("the (site) layout is PUBLIC — no session resolution, the site chrome not the AppShell", () => {
    const layout = read("src/app/(site)/layout.tsx");
    expect(layout).toContain("SiteHeader");
    expect(layout).toContain("SiteFooter");
    expect(layout).not.toContain("getSessionUser");
    expect(layout).not.toContain("AppShell");
  });

  it("F-201e the OASIS public background canvas — the reference's own full-viewport painter, mirrored (the sky-to-lawn gradient + the sun band + the foliage blobs)", () => {
    // ------------------------------------------------------------------
    // Session-201 (F-201e): the full-map drift gate's landing
    // adjudication — the reference paints its public pages' backdrop
    // with a fixed inset-0 CANVAS (a stylized sky-over-lawn scene:
    // the flat sky #AEE2FF -> the lawn #8BC687, a
    // warm sun band at ~62-74%, the darker-green foliage blobs at
    // both edges + the bottom-right; ~static — 0.47% frame drift over
    // 4s). Our clone rendered NOTHING there (the plain gray-50 body)
    // — the dominant genus of every public page's standing diff (the
    // landing 76.66 · about 55.41 · contact 38.67 · services 42.57 ·
    // gallery 36.23 · faq 66.37 · booking 77.66). The canvas rides
    // the reference's SEVEN public pages ONLY — its login + its 404
    // render white (the not-found pair sits at the 0.02% floor
    // proving it) — so the mount rides the (site) layout (the auth
    // routes + the root 404 live OUTSIDE the group).
    // ------------------------------------------------------------------
    const layout = read("src/app/(site)/layout.tsx");
    expect(layout).toContain("SiteBackgroundCanvas");
    expect(
      layout.indexOf("SiteBackgroundCanvas"),
      "the canvas mounts BEFORE the chrome (the backdrop, not the content)",
    ).toBeLessThan(layout.indexOf("<SiteHeader />"));
    const src = read("src/components/site/background-canvas.tsx");
    // the decoded palette (sampled at the uncovered right edge of the
    // reference's own landing capture)
    expect(src).toContain("#AEE2FF"); // the flat sky (0-28%)
    expect(src).not.toContain("#E7F6FF"); // the retired crest misread (the white/70 header over the sky decodes as 231,246,255)
    expect(src).toContain("#8BC687"); // the lawn
    expect(src).toContain("216, 209, 189"); // the warm sun band
    expect(src).toContain("44, 147, 64"); // the left horizon bush
    expect(src).toContain("46, 152, 67"); // the right horizon bush
    expect(src).toContain("87, 93, 99"); // the sun-band rocks
    expect(src).toContain("16, 96, 28"); // the corner's deep green
    // ------------------------------------------------------------------
    // Session-204 (the F-201e refinement — the faq/booking exposure):
    // the narrow-content pages expose canvas zones the landing's
    // full-bleed content always covered, so the s201 decode never saw
    // them. Decoded from the reference's faq margins (grid-sampled,
    // both edges): a FULL-WIDTH ROCK STRATUM (y~560-650, the 87,93,99
    // gray — solid across both margins), a WARM GLOW zone sandwiching
    // it (y~505-675, the 202,193,172/193,185,166 soft tones), a BUSH
    // HEDGE along the left edge (x0-115, y~690-775), a mid-left bush
    // (x~135-265, y~510-560), the right-corner dark-green mass +
    // soil browns at both bottom corners. Our first-pass mirror
    // painted only small rock blobs + a misplaced left tint there.
    // The one slowly-moving glow element (the sun's gap position
    // differs between captures) stays the documented animation-drift
    // floor — the static scene is what mirrors.
    // ------------------------------------------------------------------
    expect(src).toContain("STRATUM"); // the full-width rock stratum
    expect(src).toContain("0.615"); // its top edge (y~553 of 900)
    expect(src).toContain("0.725"); // its bottom edge (y~652)
    expect(src).toContain("193, 185, 166"); // the glow's solid wash (near-opaque — the lawn never shows through)
    expect(src).toContain("89, 67, 37"); // the bottom-left soil brown
    expect(src).not.toContain("TINT_LEFT"); // the misplaced left tint, retired
    expect(src).not.toContain("0.008, 0.665"); // the small rock blobs, retired
    // ------------------------------------------------------------------
    // Session-204 (the LANDING half — the reference's canvas updated
    // TODAY: the horizon sits higher): the lawn now begins ~y250 (the
    // sky-to-lawn transition ~25.5-28.5% — was 28-36%), a BIG dark
    // foliage mass rides the horizon at x~1050-1250 ((95,143,51) +
    // the deeper (75,124,38)) + the right edge descends in dark greens
    // (x~1380+, y~280-340). The red sprite + the diagonal warm streak
    // are MOVING elements (they flip between captures) — the
    // animation-drift floor, not mirrored. The faq/booking hero bands
    // cover the whole transition zone — insensitive to this cure.
    // ------------------------------------------------------------------
    expect(src).toContain("0.255"); // the sky's last flat stop
    expect(src).toContain("0.285"); // the lawn's first solid stop
    expect(src).toContain("95, 143, 51"); // the horizon foliage mass
    expect(src).toContain("75, 124, 38"); // its deeper lobe
    expect(src).toContain("30, 116, 48"); // the right-edge descending foliage
    // ------------------------------------------------------------------
    // Session-204 (the left tree — decoded from the ref's booking AND
    // landing margins, byte-identical on both): a TALL bush darkening
    // downward into a BROWN base — green (48,147,67)->(24,107,36) over
    // y~275-340, then the brown (91,67,37)/(77,59,31) y~340-365, then
    // the lawn. Our first-pass core painted the mid-zone too dark and
    // carried no base.
    // ------------------------------------------------------------------
    expect(src).toContain("blob(ctx, w, h, 0.042, 0.365, 0.028, EDGE_GREEN)"); // the lower dark lobe
    expect(src).toContain("blob(ctx, w, h, 0.045, 0.385, 0.03, SOIL_BROWN)"); // the brown base
    // the painter is a fixed, aria-hidden, pointer-events-none canvas
    // below the content (the reference's own construction)
    expect(src).toContain("fixed inset-0");
    expect(src).toContain('aria-hidden="true"');
    expect(src).toContain("pointer-events-none");
    // the negatives: the canvas never rides the 404 or the auth pages
    // (the reference's own posture — both render white)
    expect(read("src/app/not-found.tsx")).not.toContain("SiteBackgroundCanvas");
    expect(read("src/app/login/page.tsx")).not.toContain("SiteBackgroundCanvas");
  });

  it("the retired neo-crm landing forms never return (the negatives ladder)", () => {
    for (const form of RETIRED_LANDING_FORMS) {
      expect(read("src/app/(site)/page.tsx")).not.toContain(form);
    }
    // the retired landing component itself is GONE (the dead-code
    // doctrine: no orphaned components)
    expect(read("src/components/landing/landing-page.tsx")).toBe("");
  });

  it("the capital-casing aliases ride the .jsx dodge (the reference's mixed-case hrefs)", () => {
    for (const cap of ["Home", "Services", "Gallery", "FAQ", "About", "Contact", "Booking"]) {
      const src = read(`src/app/(site)/${cap}/page.jsx`);
      expect(src, `${cap} alias`).toContain(`from "../${cap.toLowerCase()}/page"`);
    }
  });
});

describe("session-199: the site chrome construction (the recon-decoded anatomy)", () => {
  it("the header: sticky white/70 blur-xl + the h-20 bar + the six nav links + Book Now", () => {
    const src = read("src/components/site/site-header.tsx");
    expect(src).toContain("sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm");
    expect(src).toContain("h-20");
    expect(src).toContain('href="/home"');
    expect(src).toContain("bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-md");
    // the mobile menu: the icon-only lg:hidden button + the dialog
    expect(src).toContain('aria-haspopup="dialog"');
    expect(src).toContain("lg:hidden");
  });

  it("the footer: the #1F2933 dark band + the four columns + the ©2026 line", () => {
    const src = read("src/components/site/site-footer.tsx");
    expect(src).toContain("bg-[#1F2933] text-white");
    expect(src).toContain("Quick Links");
    expect(src).toContain("Healthy lawns. Tidy homes. Reliable service.");
    expect(src).toContain("© 2026 Green Cut Lawn Care. All rights reserved.");
    expect(src).toContain("Emergency/storm clean-up available");
  });
});

describe("session-199: the Oasis surfaces' content wiring", () => {
  it("the home: the hero copy + the #estimate section + the shared estimate card", () => {
    const src = read("src/components/site/home-page.tsx");
    expect(src).toContain("Your property,");
    expect(src).toContain("perfectly maintained.");
    expect(src).toContain('id="estimate"');
    expect(src).toContain("EstimateCard");
    expect(src).toContain("Trusted by homeowners across SE Queensland");
    // ------------------------------------------------------------------
    // Session-201 (F-201d): the hero buttons' METRICS pin — decoded live
    // from the reference (the landing drift adjudication): its hero CTAs
    // render py-0 px-8 at the natural content height (24px, pad=0px 32px
    // computed) while OURS forced h-13 + the base py-2 (52px) — the 25px
    // overflow pushed the hero past its 86vh floor (801 vs the
    // reference's 776), rescaling the full-bleed cover photo and
    // shifting every row below: the landing's 77.28% drift, uniform
    // across every band. The cure: the reference's compact form.
    // ------------------------------------------------------------------
    expect(
      src,
      "the primary hero CTA must carry the reference's compact metrics (px-8 h-auto py-0)",
    ).toContain("text-base px-8 h-auto py-0 shadow-lg");
    expect(
      src,
      "the secondary hero CTA must carry the same compact metrics",
    ).toContain("text-base px-8 h-auto py-0");
    expect(
      src,
      "the retired h-13 tall-button form must be gone (the 52px overflow genus)",
    ).not.toContain("h-13");
  });

  it("the services page: the five groups + the extracted card catalog + the Add to Quote superset", () => {
    const src = read("src/components/site/services-page.tsx");
    expect(src).toContain("SERVICE_PAGE_GROUPS");
    expect(src).toContain("SERVICE_PAGE_CARDS");
    expect(src).toContain("Add to Quote");
    expect(src).toContain("/contact?service=");
  });

  it("the gallery: the six before/after pairs on the reference's own assets", () => {
    const src = read("src/components/site/gallery-page.tsx");
    expect(src).toContain("GALLERY_PAIRS");
    expect(src).toContain("bg-red-500");
    expect(src).toContain("Before &amp; After Gallery");
  });

  it("the FAQ: the Radix accordion over the extracted 21 items", () => {
    const src = read("src/components/site/faq-page.tsx");
    expect(src).toContain("@radix-ui/react-accordion");
    expect(src).toContain("FAQ_ITEMS");
    expect(src).toContain("Still have questions?");
    // ------------------------------------------------------------------
    // Session-202 (F-201g cure #2): the faq hero's EYEBROW — decoded live
    // on the reference (its hero runs 332px vs our 272: the missing 60px
    // was this element): a glassy pill above the h1 —
    // inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full
    // mb-6 — carrying the CircleHelp icon (w-5 h-5) + the span
    // "We've Got Answers" (text-sm font-medium). Its absence shifted
    // every accordion header below by 60px (the faq drift's dominant
    // genus).
    // ------------------------------------------------------------------
    expect(src).toContain(
      'className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"',
    );
    expect(src).toContain("<CircleHelp className=\"w-5 h-5\" aria-hidden=\"true\" />");
    expect(src).toContain("We've Got Answers");
    // ------------------------------------------------------------------
    // Session-203 (the faq residual, leg 1): the INTER-CARD RHYTHM —
    // decoded live: the reference's accordion list runs space-y-12
    // (the observed 48px gaps; ours space-y-8's 32px — the +16/gap
    // genus, ~48px of the 64px container delta). The ref's middle-gap
    // +20 is a margin-collapse artifact of its classless cards (the
    // answer <p>'s margin rides OUTSIDE the card) — not reproducible
    // inside our bordered cards without a hack; recorded as the floor.
    // ------------------------------------------------------------------
    expect(src).toContain('className="space-y-12"');
    expect(src).not.toContain('className="space-y-8"');
  });

  it("the contact: the extracted form inventory + the superset quote submit", () => {
    const src = read("src/components/site/contact-page.tsx");
    expect(src).toContain("CONTACT_SERVICE_OPTIONS");
    expect(src).toContain("CONTACT_SUBURBS");
    expect(src).toContain('"/api/quote-requests"');
    // the s24 doctrine: the ?service= read lives at the PAGE, the
    // component takes a prop (no useSearchParams anywhere)
    expect(src).not.toContain("useSearchParams");
  });

  it("the booking flow: the three steps + the seam wiring + the superset submit", () => {
    const src = read("src/components/site/booking-flow.tsx");
    expect(src).toContain("STEP_LABELS");
    expect(src).toContain("TIME_SLOTS");
    expect(src).toContain("react-day-picker");
    expect(src).toContain('"/api/bookings"');
    expect(src).toContain("Confirm Booking");
    // ------------------------------------------------------------------
    // Session-202 (F-201g cure #1): the OPAQUE INNER FORM CARD — decoded
    // live on the reference's booking flow (steps 1 AND 2 censused: the
    // same card at 401,374, 638x542/393, pad-32, radius-16, the 1px
    // gray-100 border). Our step fields rode the /85 outer card directly
    // — the greenish tint showed through (the booking drift's 42%
    // genus, post-canvas). The reference's anatomy: the outer card
    // carries heading + progress + the step zone; the INNER opaque card
    // wraps the step FIELDS; the nav rows (Back/Continue/Confirm) stay
    // BELOW the card in the outer zone.
    // ------------------------------------------------------------------
    expect(
      src,
      "every step's fields ride the opaque inner card (the reference's own construction)",
    ).toContain('className="bg-white rounded-2xl border border-gray-100 p-8"');
    const wraps = src.split('className="bg-white rounded-2xl border border-gray-100 p-8"').length - 1;
    expect(wraps, "all THREE steps carry the inner card").toBe(3);
    expect(
      src.indexOf('className="bg-white rounded-2xl border border-gray-100 p-8"'),
      "the inner card wraps the EstimateCard (step 1), not the nav row",
    ).toBeLessThan(src.indexOf("Confirm Booking"));
    // ------------------------------------------------------------------
    // Session-203 (the booking residual, leg 2): the ESTIMATE HEADER
    // RHYTHM — decoded live on the reference: its "Instant Estimate"
    // header row sits mb-6 (the 24px gap to "What do you need?"; ours
    // mb-4's 16px — the -8px genus carried through EVERY row below:
    // the label, the services grid, the yard row, the estimate strip).
    // The yard slider's LABEL-ANCESTRY construction stays ours — the
    // s199 axe two-gate contract (aria-input-field-name) rides it.
    // ------------------------------------------------------------------
    const est = read("src/components/site/estimate-card.tsx");
    expect(est).toContain('className="flex items-center gap-3 mb-6"');
    expect(est).not.toContain('className="flex items-center gap-3 mb-4"');
  });
});

describe("session-199: the login + 404 re-skins", () => {
  it("the login card carries the Oasis identity + the three social buttons", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain("Welcome to Oasis Property Maintenance");
    expect(src).toContain("Continue with Google");
    expect(src).toContain("Continue with Facebook");
    expect(src).toContain("Continue with Apple");
    expect(src).toContain("1f56b6773_logo.png");
    // the retired neo-crm title never returns
    expect(src).not.toContain("Welcome to NEO CRM");
  });

  it("the 404 rides the site chrome + Go Home points at /home", () => {
    const notFound = read("src/app/not-found.tsx");
    expect(notFound).toContain("SiteHeader");
    expect(notFound).toContain("SiteFooter");
    const body = read("src/app/not-found-body.tsx");
    expect(body).toContain('href="/home"');
  });
});
