// Session-199 (the property-maintenance checkout round): the OASIS
// SERVICES PAGE — the reference's /services, decoded from its live DOM
// (recon leg 8): the green gradient hero band; the five groups (each a
// 16x16 gradient icon tile + h2, its cards in a md:grid-cols-2 grid);
// the "Need something else?" CTA. The card construction: the h-48 image
// with the floating white "Add to Quote" chip; the body with the 12x12
// gradient icon tile, h3 + blurb.
//
// SUPERSET (the plan §3): the reference's "Add to Quote" target is
// unobserved; OURS carries the service to /contact and pre-checks it
// on the quote form (the contact page reads ?service=).

import Link from "next/link";
import { ArrowRight, Droplets, HeartHandshake, Leaf, Plus, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICE_PAGE_CARDS, SERVICE_PAGE_GROUPS } from "@/lib/site-content";

const GROUP_ICONS = [Leaf, Droplets, Wrench, HeartHandshake] as const;

// cards are grouped by index ranges observed in the DOM order:
// Lawn & Garden (4) · Exterior Cleaning (2: pressure washing + soft
// wash… the extraction's 12 cards run group-by-group in order).
const GROUP_CARD_COUNTS = [4, 3, 3, 2] as const;

export function ServicesPage() {
  const groups = SERVICE_PAGE_GROUPS.slice(0, 4);
  // the running offset derives from the PRIOR counts (no render-time
  // reassignment — the react-compiler rule)
  const grouped = groups.map((group, i) => {
    const offset = GROUP_CARD_COUNTS.slice(0, i).reduce((a, b) => a + b, 0);
    const count = GROUP_CARD_COUNTS[i] ?? 0;
    const cards = SERVICE_PAGE_CARDS.slice(offset, offset + count);
    return { group, icon: GROUP_ICONS[i] ?? Leaf, cards };
  });

  return (
    <main className="relative z-10">
      <div>
        <section className="bg-gradient-to-br from-[#2E7D5F]/90 to-[#236B4F]/90 backdrop-blur-md text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                From weekly lawn care to complete property maintenance - we offer comprehensive
                services to keep your outdoor spaces beautiful and functional.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-md py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {grouped.map(({ group, icon: Icon, cards }) => (
              <div key={group} className="mb-16 last:mb-0">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933]">{group}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {cards.map((card) => (
                    <div key={card.title}>
                      <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={card.img}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-4 right-4">
                            <Link
                              href={`/contact?service=${encodeURIComponent(card.title)}`}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors h-8 rounded-md px-3 text-xs shadow-lg bg-white text-[#2E7D5F] hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4 mr-1" aria-hidden="true" />
                              Add to Quote
                            </Link>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-[#1F2933] mb-2">{card.title}</h3>
                              <p className="text-gray-600">{card.blurb}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <Link href="/contact">
                <Button className="shadow h-10 rounded-md px-8 bg-[#2E7D5F] hover:bg-[#236B4F] text-white">
                  Request a Site Visit
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933] mb-6">
              Need something else?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              If you don&apos;t see what you need, just ask. We handle all kinds of property
              maintenance jobs across SE Queensland.
            </p>
            <Link href="/contact">
              <Button className="h-10 rounded-md bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-lg text-lg px-8">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
