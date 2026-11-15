// Session-199 (the property-maintenance checkout round): the OASIS SITE
// FOOTER — the reference's dark footer, decoded from its live DOM
// (recon leg 8): bg-[#1F2933] text-white; the 4-column grid (the brand
// tile with the gradient leaf glyph; Quick Links; the Services list;
// Contact Us with phone/mail/regions/emergency); the border-t ©2026
// bar. A pure server component — no state, no client JS.

import Link from "next/link";
import { Leaf, Mail, Phone } from "lucide-react";

import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE,
  SITE_PHONE_HREF,
} from "@/lib/site-content";

const QUICK_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

const FOOTER_SERVICES = [
  "Lawn Mowing & Edging",
  "Garden Maintenance",
  "Pressure Washing",
  "Gutter Cleaning",
  "Property Maintenance",
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-[#1F2933] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2E7D5F] to-[#236B4F] rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <div className="font-bold text-lg">Green Cut</div>
                <div className="text-xs text-[#E8F3ED]">Lawn Care</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">Healthy lawns. Tidy homes. Reliable service.</p>
            <p className="text-xs text-gray-500">ABN: [To be registered]</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#2E7D5F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={SITE_PHONE_HREF}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#2E7D5F] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {SITE_PHONE}
              </a>
              <a
                href={SITE_EMAIL_HREF}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#2E7D5F] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {SITE_EMAIL}
              </a>
              <p className="text-sm text-gray-400 mt-4">Gold Coast · Logan · South Brisbane</p>
              <p className="text-xs text-[#2E7D5F] font-medium mt-2">
                Emergency/storm clean-up available
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">© 2026 Green Cut Lawn Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
