"use client";

// Session-199 (the property-maintenance checkout round): the OASIS SITE
// HEADER — the reference's sticky blurred chrome, decoded from its live
// DOM (recon leg 8, home.html): sticky top-0 z-50 bg-white/70
// backdrop-blur-xl border-b border-white/40 shadow-sm; the max-w-7xl
// h-20 bar; the logo (h-16) → /home; the six nav links (px-4 py-2
// rounded-lg text-sm font-medium text-[#1F2933] hover:bg-[#E8F3ED]/50
// hover:text-[#2E7D5F]); the phone link + the Book Now CTA
// (bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-md, the shadcn
// base); and the lg:hidden icon-only menu button opening a Radix
// dialog (aria-haspopup="dialog") — the reference's own mobile menu,
// live-verified at 390 (1 icon-only button; the menu opens to the six
// links).

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE_NAV_LINKS, SITE_LOGO_SRC, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/home" className="flex items-center group">
            <img
              src={SITE_LOGO_SRC}
              alt="Green Cut Lawn Care"
              className="h-16 w-auto transform group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Site">
            {SITE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[#1F2933] hover:bg-[#E8F3ED]/50 hover:text-[#2E7D5F]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE_PHONE_HREF}
              className="flex items-center gap-2 text-sm text-[#1F2933] hover:text-[#2E7D5F] transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">{SITE_PHONE}</span>
            </a>
            <Link href="/booking">
              <Button className="bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-md">
                Book Now
              </Button>
            </Link>
          </div>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              {/* the icon-only trigger's accessible name (the reference's
                  own aria-haspopup="dialog" now rides Radix's Trigger) */}
              <Button variant="ghost" className="h-9 w-9 lg:hidden" type="button" aria-label="Open menu">
                <Menu className="w-6 h-6 text-[#1F2933]" aria-hidden="true" />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 lg:hidden" />
              <DialogPrimitive.Content
                aria-label="Site menu"
                className="fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm w-80 bg-white lg:hidden"
              >
                {/* the reference's own close spot: the absolute top-right X */}
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    className="absolute right-4 top-4 h-9 w-9"
                    type="button"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-[#1F2933]" aria-hidden="true" />
                  </Button>
                </DialogPrimitive.Close>
                <div className="flex flex-col h-full">
                  {/* the logo row (the reference's own construction: the
                      h-14 image, NO title text band) */}
                  <div className="flex items-center gap-2 pb-6 border-b">
                    <img src={SITE_LOGO_SRC} alt="Green Cut Lawn Care" className="h-14 w-auto" />
                  </div>
                  <nav className="flex flex-col gap-2 py-6 flex-1" aria-label="Site mobile">
                    {SITE_NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-lg text-base font-medium transition-all text-[#1F2933] hover:bg-[#E8F3ED]/50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t pt-6 space-y-3">
                    {/* the phone PILL — the reference's tinted construction */}
                    <a
                      href={SITE_PHONE_HREF}
                      className="flex items-center gap-3 px-4 py-3 bg-[#E8F3ED] rounded-lg text-[#2E7D5F] font-medium"
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      <span>{SITE_PHONE}</span>
                    </a>
                    {/* the ANCHOR-WRAPPED Book Now (the reference's own
                        nesting: the button inside the /booking anchor) */}
                    <Link href="/booking" onClick={() => setOpen(false)} className="block">
                      <Button className="w-full bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-md">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
