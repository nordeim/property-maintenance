// Session-199 (the property-maintenance checkout round): the OASIS
// ABOUT PAGE — the reference's /about (recon leg 8): the gradient hero
// ("Local, reliable, not a random Facebook guy."); the two-column
// story (the team photo + the "Our Story" badge + the four paragraphs);
// the "What Makes Us Different" 4-card grid; the "Servicing SE
// Queensland" regions; the closing CTA. Copy is the extracted
// reference content, verbatim.

import Link from "next/link";
import { ArrowRight, BadgeCheck, HeartHandshake, MapPin, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Reliable & Punctual",
    body: "We send reminders, we show up on the day, and we keep notes on your property so the next visit is faster.",
  },
  {
    icon: ShieldCheck,
    title: "Professional & Insured",
    body: "Fully insured with public liability. We take our work seriously and protect your property.",
  },
  {
    icon: MapPin,
    title: "Local & Trusted",
    body: "Not a random Facebook guy. We're a local business with a reputation to protect and real reviews.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Focused",
    body: "We listen first. If something isn't right, we fix it. No arguments, no excuses.",
  },
] as const;

const REGIONS = [
  { name: "Gold Coast", detail: "From Southport down to Currumbin" },
  { name: "Logan", detail: "Including Springwood, Daisy Hill, Shailer Park" },
  { name: "South Brisbane", detail: "Sunnybank through to Calamvale" },
] as const;

export function AboutPage() {
  return (
    <main className="relative z-10">
      <div>
        <section className="bg-gradient-to-br from-[#2E7D5F]/90 to-[#236B4F]/90 backdrop-blur-md text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About Green Cut</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Local, reliable, not a random Facebook guy.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element -- the reference's own hosted asset */}
                  <img
                    src="https://media.base44.com/images/public/6907475d81a975154143174e/1d21ce02f_generated_image.png"
                    alt="Green Cut Lawn Care Team"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#E8F3ED] px-4 py-2 rounded-full">
                  <BadgeCheck className="w-4 h-4 text-[#2E7D5F]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#2E7D5F]">Our Story</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933]">
                  Started to help busy families, investors and NDIS participants
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Green Cut Lawn Care was founded to solve a simple problem: finding reliable,
                    professional outdoor maintenance shouldn&apos;t be hard. Too many property
                    owners were frustrated with missed appointments, poor communication, and
                    inconsistent quality.
                  </p>
                  <p>
                    We built Green Cut differently. We use scheduling systems that send reminders.
                    We take notes about your property preferences. We show up when we say we will.
                    And we stand behind our work with full insurance and professional equipment.
                  </p>
                  <p>
                    Today, we work with busy families, property investors, real estate agents,
                    body corporate managers, and NDIS support coordinators across the Gold Coast,
                    Logan, and South Brisbane. Every property gets the same attention to detail,
                    whether it&apos;s a weekly mow or a full property restoration.
                  </p>
                  <p className="font-medium text-[#2E7D5F]">
                    We&apos;re not the cheapest option - but we&apos;re the one you can count on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933] mb-4">
                What Makes Us Different
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We operate with transparency, consistency, and genuine care for your property.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {DIFFERENTIATORS.map((card) => (
                <div key={card.title}>
                  <div className="rounded-xl border bg-card text-card-foreground shadow h-full hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#2E7D5F] to-[#236B4F] rounded-2xl flex items-center justify-center mb-4">
                        <card.icon className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2933] mb-3">{card.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933] mb-4">
                Servicing SE Queensland
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From the Gold Coast to South Brisbane - we&apos;ve got you covered
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {REGIONS.map((region) => (
                <div
                  key={region.name}
                  className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center"
                >
                  <div className="w-12 h-12 bg-[#E8F3ED] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-[#2E7D5F]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2933] mb-2">{region.name}</h3>
                  <p className="text-gray-600">{region.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933] mb-4">
              Ready to work with a team you can trust?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get your free quote today and experience the Green Cut difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button className="h-10 rounded-md bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-lg px-8">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="h-10 rounded-md border-2 border-[#2E7D5F] text-[#2E7D5F] hover:bg-[#E8F3ED] px-8"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
