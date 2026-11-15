"use client";

// Session-199 (the property-maintenance checkout round): the OASIS HOME
// PAGE — the reference's `/` (== /home), decoded from its live DOM
// (recon legs 7-8, home.html): the min-h-[86vh] hero with the
// white/90 blurred card (the map-pin badge, the two-tone h1, the CTA
// pair, the five-star trust row); the "What we do" 4-card band; the
// "Booked in three simple steps" band; the #estimate two-column band
// (copy + the shared EstimateCard); the green CTA band. Section cards
// share the rounded-[2.5rem] bg-white/85 backdrop-blur border-white/60
// shadow-xl idiom.
//
// The reference's cards mount with a scroll-triggered entrance
// (opacity:0 + translateY(20px) inline styles, animated in on view).
// The maiden build ships the RESTING face (opacity 1, no transform) —
// the animated-entrance genus is documented in the plan §8; the resting
// computed state is the parity target.

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Calculator,
  ChevronDown,
  Droplets,
  Flower2,
  House,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EstimateCard } from "@/components/site/estimate-card";
import { SITE_PHONE, SITE_PHONE_HREF, SITE_REGIONS } from "@/lib/site-content";

const HOME_SERVICE_CARDS = [
  {
    title: "Lawn Mowing & Edging",
    blurb: "Regular mowing, crisp edges and clippings removed — your lawn always guest-ready.",
    img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80",
    icon: Scissors,
  },
  {
    title: "Garden Maintenance",
    blurb: "Weeding, pruning, hedging and mulching to keep every garden bed thriving.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    icon: Flower2,
  },
  {
    title: "Pressure Washing",
    blurb: "Driveways, patios and exteriors restored to like-new with professional equipment.",
    img: "https://images.unsplash.com/photo-1610476840960-b309a3116da2?w=800&q=80",
    icon: Droplets,
  },
  {
    title: "Property Maintenance",
    blurb: "Gutter cleaning, minor repairs and full tidy-ups — one call covers it all.",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    icon: House,
  },
] as const;

const HOME_STEPS = [
  {
    n: "1",
    title: "Get your estimate",
    blurb: "Tell us your yard size and service — see your price range instantly, no waiting.",
    icon: Calculator,
  },
  {
    n: "2",
    title: "Pick your date",
    blurb: "Choose a day and time slot that suits you with our online booking calendar.",
    icon: CalendarDays,
  },
  {
    n: "3",
    title: "We make it shine",
    blurb: "Our team arrives on time, does the job properly, and leaves your place spotless.",
    icon: Sparkles,
  },
] as const;

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white/85 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl p-8 md:p-14">
        {children}
      </div>
    </section>
  );
}

export function HomePage() {
  const [serviceId, setServiceId] = useState("lawn");
  const [yardSize, setYardSize] = useState(400);

  return (
    <main className="relative z-10">
      <div>
        {/* ---- the hero ------------------------------------------------ */}
        <section className="relative min-h-[86vh] flex items-center overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-2xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-2xl rounded-3xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 bg-[#E8F3ED] border border-[#2E7D5F]/20 rounded-full px-4 py-1.5 mb-6">
                <MapPin className="w-3.5 h-3.5 text-[#2E7D5F]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#2E7D5F]">{SITE_REGIONS}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#1F2933] leading-tight md:leading-none mb-6">
                Your property,
                <span className="block text-[#2E7D5F]">perfectly maintained.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Lawns, gardens, pressure washing and property care — booked online in under a
                minute, with instant price estimates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#2E7D5F] hover:bg-[#236B4F] text-white text-base px-8 h-13 shadow-lg">
                    <CalendarCheck className="w-5 h-5 mr-2" aria-hidden="true" />
                    Book a Service
                  </Button>
                </Link>
                <a href="#estimate" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white border-gray-200 text-[#1F2933] hover:bg-gray-50 text-base px-8 h-13"
                  >
                    Get Instant Estimate
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Trusted by homeowners across SE Queensland
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md text-[#2E7D5F]">
            <span className="text-xs font-semibold tracking-wide mb-0.5">Watch us work</span>
            <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
          </div>
        </section>

        {/* ---- what we do ---------------------------------------------- */}
        <SectionCard>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#2E7D5F] uppercase tracking-wider mb-2">
              What we do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933]">
              Everything your property needs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_SERVICE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 bg-[#E8F3ED] rounded-xl flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[#1F2933] mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#2E7D5F] font-semibold hover:gap-3 transition-all"
            >
              View all services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </SectionCard>

        {/* ---- how it works -------------------------------------------- */}
        <SectionCard>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#2E7D5F] uppercase tracking-wider mb-2">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933]">
              Booked in three simple steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOME_STEPS.map((step) => (
              <div key={step.n} className="relative text-center px-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D5F] to-[#236B4F] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-7 h-7 bg-[#F5A623] text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.n}
                </div>
                <h3 className="font-bold text-lg text-[#1F2933] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.blurb}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ---- the instant estimate ------------------------------------ */}
        <section id="estimate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white/85 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-[#2E7D5F] uppercase tracking-wider mb-2">
                Instant pricing
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
                Know your price before you book
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                No waiting for callbacks. Slide to your yard size, pick a service, and get an
                honest price range on the spot. Happy with it? Book your date in the next step.
              </p>
              <Link href="/booking">
                <Button className="shadow h-10 bg-[#2E7D5F] hover:bg-[#236B4F] text-white">
                  Book a Service
                </Button>
              </Link>
            </div>
            <EstimateCard
              serviceId={serviceId}
              onServiceChange={setServiceId}
              yardSize={yardSize}
              onYardSizeChange={setYardSize}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8"
            />
          </div>
        </section>

        {/* ---- the CTA band -------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#2E7D5F]/95 to-[#1d5942]/95 backdrop-blur-md border border-white/20 shadow-xl px-8 py-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=60"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for a healthier, tidier property?
              </h2>
              <p className="text-[#C9E5D8] max-w-xl mx-auto mb-8">
                Book online in under a minute, or give us a call — we&apos;ll take care of the
                rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button className="h-10 w-full sm:w-auto bg-white text-[#2E7D5F] hover:bg-gray-100 text-base px-8 shadow-xl">
                    <CalendarCheck className="w-5 h-5 mr-2" aria-hidden="true" />
                    Book Now
                  </Button>
                </Link>
                <a href={SITE_PHONE_HREF} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-10 w-full sm:w-auto border-white/50 bg-transparent text-white hover:bg-white/10 text-base px-8"
                  >
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    {SITE_PHONE}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
