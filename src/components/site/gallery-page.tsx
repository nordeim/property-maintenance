// Session-199 (the property-maintenance checkout round): the OASIS
// GALLERY PAGE — the reference's /gallery (recon leg 8): the green
// gradient hero; the md:2/lg:3 grid of before/after cards — the split
// h-80 image (the red Before pill / the green After pill / the white
// center divider / the hover overlay), the label + chip footer with
// the circular chevron button; the CTA band. The reference's "Click to
// View Full" overlay opens a lightbox (unobserved target); the maiden
// build renders the overlay face statically.

import Link from "next/link";
import { ArrowRight, ChevronRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GALLERY_CHIPS, GALLERY_PAIRS } from "@/lib/site-content";

export function GalleryPage() {
  return (
    <main className="relative z-10">
      <div>
        <section className="bg-gradient-to-br from-[#2E7D5F]/90 to-[#236B4F]/90 backdrop-blur-md text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Before &amp; After Gallery
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                See the transformation. Real results from real properties across SE Queensland.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GALLERY_PAIRS.map((pair, i) => (
                <div key={pair.label}>
                  <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="relative h-80 overflow-hidden">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element -- the reference's own hosted assets */}
                            <img
                              src={pair.before}
                              alt="Before"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              Before
                            </div>
                          </div>
                          <div className="w-1/2 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element -- the reference's own hosted assets */}
                            <img
                              src={pair.after}
                              alt="After"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-[#2E7D5F] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              After
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg transform -translate-x-1/2 z-10" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            Click to View Full
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-[#1F2933] mb-1">{pair.label}</h3>
                            <p className="text-sm text-gray-500">
                              {GALLERY_CHIPS[i] ?? GALLERY_CHIPS[0]}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-[#E8F3ED] flex items-center justify-center group-hover:bg-[#2E7D5F] transition-colors duration-300">
                            <Quote className="w-5 h-5 text-[#2E7D5F] group-hover:text-white" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#2E7D5F]/95 to-[#1d5942]/95 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-xl mx-4 sm:mx-6 lg:mx-auto lg:max-w-7xl px-8 py-16 text-center mb-8">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want your place to look like this?
            </h2>
            <p className="text-[#C9E5D8] max-w-xl mx-auto mb-8">
              Let us transform your outdoor space. Get a free quote and see the FreshCut
              difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button className="h-10 w-full sm:w-auto bg-white text-[#2E7D5F] hover:bg-gray-100 text-base px-8 shadow-xl">
                  Get Your Free Quote
                  <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  variant="outline"
                  className="h-10 w-full sm:w-auto border-white/50 bg-transparent text-white hover:bg-white/10 text-base px-8"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
