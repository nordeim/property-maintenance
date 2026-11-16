// Session-212 (F-212a): the floating call FAB — the reference's own
// mobile-only affordance, live-decoded 2026-11-16 at 390 on ALL SEVEN
// public pages (/, /services, /gallery, /about, /faq, /contact,
// /booking — absent on /login, which renders outside the site chrome).
// The reference's construction (live outerHTML): the container
// `lg:hidden fixed bottom-6 right-6 z-40` wrapping the tel: anchor
// around a shadcn button carrying `px-8 rounded-full w-16 h-16
// shadow-2xl bg-[#2E7D5F] hover:bg-[#236B4F] border-4 border-white
// text-primary-foreground` and the lucide Phone (w-6 h-6). Computed
// @390: the 64×64 circle at (294,756)–(366,820), bg rgb(46,125,95),
// the 4px solid white border, the 24px glyph.
//
// Two documented supersets over the reference's own FAB (the standing
// "match the reference, fix its defects" doctrine):
//   1. THE ANCHOR IS THE BUTTON — the reference nests a button element
//      inside the anchor (interactive inside interactive, invalid HTML);
//      ours renders the anchor itself with the button's classes, so
//      the computed styles stay identical with valid nesting.
//   2. THE ICON-ONLY aria-label — the reference ships no accessible
//      name on an icon-only control; ours carries one (the standing
//      a11y floor for icon-only affordances).

import { Phone } from "lucide-react";

import { SITE_PHONE_HREF } from "@/lib/site-content";

export function CallFab() {
  return (
    <a
      href={SITE_PHONE_HREF}
      aria-label="Call us"
      className="lg:hidden fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full w-16 h-16 shadow-2xl bg-[#2E7D5F] hover:bg-[#236B4F] border-4 border-white text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
    >
      <Phone className="w-6 h-6" aria-hidden="true" />
    </a>
  );
}
