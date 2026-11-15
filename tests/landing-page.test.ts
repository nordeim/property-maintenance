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
