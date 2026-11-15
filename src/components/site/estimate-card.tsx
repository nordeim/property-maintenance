"use client";

// Session-199 (the property-maintenance checkout round): the INSTANT
// ESTIMATE CARD — the reference's estimate widget, decoded from its
// live DOM (recon legs 7-8): the "Instant Estimate" heading row, the
// "What do you need?" service grid (selected: border-[#2E7D5F]
// bg-[#E8F3ED] text-[#2E7D5F]; idle: border-gray-200 text-[#1F2933]
// hover:border-[#2E7D5F]/40), the Radix yard-size slider (100–2000 m²,
// the bold green readout, the Small/Large hints), and the #F5F1EB
// price card. Shared by the home #estimate section and the booking
// flow's step 1 (the reference renders the same construction twice).
//
// The estimate itself is the pure seam (src/lib/booking.ts —
// service-driven, the observed contract); this component only renders.

import * as Slider from "@radix-ui/react-slider";
import { Calculator } from "lucide-react";
import { useMemo } from "react";

import {
  BOOKING_SERVICES,
  YARD_DEFAULT,
  YARD_MAX,
  YARD_MIN,
  estimateFor,
  formatYardSize,
} from "@/lib/booking";

export interface EstimateCardProps {
  /** The selected service id (controlled — the booking flow owns it). */
  serviceId: string;
  onServiceChange: (serviceId: string) => void;
  /** The yard size in m² (controlled — the booking flow's summary rides it). */
  yardSize: number;
  onYardSizeChange: (m2: number) => void;
  /** Extra classes for the wrapping card (the home + booking faces differ). */
  className?: string;
}

export function EstimateCard({
  serviceId,
  onServiceChange,
  yardSize,
  onYardSizeChange,
  className = "",
}: EstimateCardProps) {
  const estimate = useMemo(() => estimateFor(serviceId), [serviceId]);

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#E8F3ED] rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-[#1F2933]">Instant Estimate</h3>
      </div>

      <p className="text-sm font-medium text-[#1F2933] mb-3">What do you need?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {BOOKING_SERVICES.map((service) => {
          const selected = service.id === serviceId;
          return (
            <button
              key={service.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onServiceChange(service.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium text-left border transition-all ${
                selected
                  ? "border-[#2E7D5F] bg-[#E8F3ED] text-[#2E7D5F]"
                  : "border-gray-200 text-[#1F2933] hover:border-[#2E7D5F]/40"
              }`}
            >
              {service.label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-baseline mb-3">
        <p className="text-sm font-medium text-[#1F2933]">How big is your yard?</p>
        <span className="text-sm font-bold text-[#2E7D5F]">{formatYardSize(yardSize)}</span>
      </div>

      <Slider.Root
        dir="ltr"
        orientation="horizontal"
        className="relative flex w-full touch-none select-none items-center mb-2"
        value={[yardSize]}
        min={YARD_MIN}
        max={YARD_MAX}
        step={10}
        aria-label="Yard size in square metres"
        onValueChange={(value) => onYardSizeChange(value[0] ?? YARD_DEFAULT)}
      >
        <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#2E7D5F]/20">
          <Slider.Range className="absolute h-full bg-[#2E7D5F]" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border border-[#2E7D5F]/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>

      <div className="flex justify-between text-xs text-gray-400 mb-6">
        <span>Small (100m²)</span>
        <span>Large (2000m²)</span>
      </div>

      <div className="bg-[#F5F1EB] rounded-xl p-5 text-center">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Estimated price</p>
        <p className="text-3xl font-bold text-[#2E7D5F]" data-testid="estimate-price">
          {estimate ?? "—"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Final price confirmed after a quick look at your property
        </p>
      </div>
    </div>
  );
}
