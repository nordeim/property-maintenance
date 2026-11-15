"use client";

// Session-199 (the property-maintenance checkout round): the OASIS FAQ
// PAGE — the reference's /faq (recon legs 8 + 11): the gradient hero;
// the six groups (each the gradient h2 band + the Radix accordion with
// the border-b items, the px-6 py-4 buttons carrying the semibold
// slate question + the rotating chevron); the "Still have questions?"
// CTA (Call Us / Send a Message); the Quick Tips 1-2-3 grid. Every
// question + answer is the extracted reference content
// (src/lib/site-content.ts FAQ_ITEMS — 21 items, legs 11's
// click-open census).

import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, ChevronDown, CircleHelp, Lightbulb, MapPin, Scissors } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FAQ_GROUPS, FAQ_ITEMS, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/site-content";

const TIPS = [
  {
    n: "1",
    icon: Lightbulb,
    title: "Take Photos",
    body: "Send us photos of your property from different angles. It helps us quote accurately.",
  },
  {
    n: "2",
    icon: MapPin,
    title: "Note Access Details",
    body: "Let us know about gates, locks, pets, or any access considerations upfront.",
  },
  {
    n: "3",
    icon: Scissors,
    title: "Tell Us Your Preferences",
    body: "Do you want clippings removed? Short or slightly longer? Any areas to avoid? Just let us know.",
  },
] as const;

export function FaqPage() {
  return (
    <main className="relative z-10">
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-[#2E7D5F]/90 to-[#236B4F]/90 backdrop-blur-md text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              {/* Session-202 (F-201g cure #2): the reference's own hero
                  eyebrow — the glassy pill decoded live (its absence
                  was the 60px shift under every accordion header). */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <CircleHelp className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">We've Got Answers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Everything you need to know about our services, pricing, and how we work.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Session-203: the reference's own inter-card rhythm —
                space-y-12 (the decoded 48px gaps; was space-y-8). */}
            <div className="space-y-12">
              {FAQ_GROUPS.filter((group) => group !== "Still have questions?" && group !== "Quick Tips for Getting Started").map(
                (group) => (
                  <div key={group} className="rounded-2xl border bg-card text-card-foreground shadow overflow-hidden">
                    <div className="bg-gradient-to-r from-[#2E7D5F] to-[#236B4F] px-6 py-4">
                      <h2 className="text-2xl font-bold text-white">{group}</h2>
                    </div>
                    <Accordion.Root type="single" collapsible className="p-0" data-orientation="vertical">
                      {FAQ_ITEMS.filter((item) => item.group === group).map((item) => (
                        <Accordion.Item
                          key={item.question}
                          value={item.question}
                          className="border-b last:border-0"
                          data-orientation="vertical"
                        >
                          <Accordion.Header asChild>
                            <h3 data-orientation="vertical" className="flex">
                              <Accordion.Trigger className="flex flex-1 items-center justify-between text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180 px-6 py-4 text-left hover:bg-[#E8F3ED]/30 transition-colors">
                                <span className="font-semibold text-[#1F2933] pr-4">
                                  {item.question}
                                </span>
                                <ChevronDown
                                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                                  aria-hidden="true"
                                />
                              </Accordion.Trigger>
                            </h3>
                          </Accordion.Header>
                          <Accordion.Content
                            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                          >
                            <p className="px-6 py-4 text-gray-600 leading-relaxed">{item.answer}</p>
                          </Accordion.Content>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D5F] to-[#236B4F] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CircleHelp className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2933] mb-4">Still have questions?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;re here to help. Give us a call or send through your question and we&apos;ll
              get back to you quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SITE_PHONE_HREF}>
                <Button className="h-10 rounded-md bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-lg text-lg px-8">
                  Call Us: {SITE_PHONE}
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-10 rounded-md border-2 border-[#2E7D5F] text-[#2E7D5F] hover:bg-[#E8F3ED] text-lg px-8"
                >
                  Send a Message
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1F2933] mb-4">
                Quick Tips for Getting Started
              </h2>
              <p className="text-gray-600">Make your first service as smooth as possible</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TIPS.map((tip) => (
                <div key={tip.n} className="rounded-xl border bg-card text-card-foreground shadow">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-[#2E7D5F] rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl">
                      {tip.n}
                    </div>
                    <h3 className="font-bold text-[#1F2933] mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
