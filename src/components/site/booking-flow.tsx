"use client";

// Session-199 (the property-maintenance checkout round): the BOOKING
// FLOW — the reference's 3-step /booking construction, decoded from
// its live DOM (recon legs 7-8 + 12): the max-w-3xl rounded-[2.5rem]
// card; the progress bar (the w-8 h-8 rounded-full step dots + the
// hidden sm:block labels); step 1 the EstimateCard + Continue; step 2
// the react-day-picker calendar (past disabled) + the five slot
// buttons + Back/Continue (disabled until both picked); step 3 the
// details form + the #F5F1EB summary card ("$60–$80" — no spaces in
// THIS form, unlike the estimate card's "$60 – $80") + Back/Confirm.
//
// THE SUPERSET (the plan §3): the reference's Confirm target is
// Unknown (no delete path → the write-probe boundary stayed uncrossed);
// OURS persists a real Booking row via POST /api/bookings (Zod at the
// boundary, the house envelope) and renders a confirmation face.

import { DayPicker } from "react-day-picker";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, House } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EstimateCard } from "@/components/site/estimate-card";
import { bookingServiceById, estimateFor, STEP_LABELS, TIME_SLOTS } from "@/lib/booking";

type Step = 1 | 2 | 3;

interface Details {
  name: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  notes: string;
}

const EMPTY_DETAILS: Details = { name: "", phone: "", email: "", address: "", suburb: "", notes: "" };

function summaryLine(date: Date | undefined, slot: string | undefined, yardSize: number): string {
  const day = date
    ? date.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })
    : "";
  return `${day || "—"} · ${slot ?? "—"} · ~${yardSize}m²`;
}

export function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState("lawn");
  const [yardSize, setYardSize] = useState(400);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date>(new Date());
  const [slot, setSlot] = useState<string | undefined>(undefined);
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const service = bookingServiceById(serviceId);
  const estimate = estimateFor(serviceId);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          yardSize,
          date: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "",
          slot,
          ...details,
        }),
      });
      const payload = (await res.json()) as { ok: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) {
        setError(payload.error?.message ?? "Something went wrong — please try again.");
        return;
      }
      setConfirmed(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    // the reference's post-confirm face is Unknown (the write-probe
    // boundary); ours is the superset confirmation:
    return (
      <main className="relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="bg-white/85 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl p-6 md:p-10 text-center">
            <div className="w-16 h-16 bg-[#E8F3ED] rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarCheck className="w-8 h-8 text-[#2E7D5F]" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2933] mb-3">Booking confirmed!</h1>
            <p className="text-gray-500 mb-8">
              Thanks {details.name.split(" ")[0] || "there"} — we&apos;ve got your booking and
              will be in touch to confirm the final details.
            </p>
            <div className="bg-[#F5F1EB] rounded-xl p-4 flex items-center justify-between text-left mb-8">
              <div>
                <p className="text-sm font-semibold text-[#1F2933]">{service?.label}</p>
                <p className="text-xs text-gray-500">{summaryLine(date, slot, yardSize)}</p>
              </div>
              <p className="text-lg font-bold text-[#2E7D5F]" data-testid="confirm-estimate">
                {estimate?.replace(/ /g, "")}
              </p>
            </div>
            <Link href="/home">
              <Button variant="outline" className="h-9 px-8">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-white/85 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl p-6 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-3">Book a Service</h1>
            <p className="text-gray-500">Pick your service, see your price, choose your date.</p>
          </div>

          {/* ---- the progress bar ---------------------------------- */}
          {/* Session-208 (F-208a, decoded live on the reference): the
              dots row is a flat gap-2 flex — 3 dot groups + TWO sibling
              connectors (w-8 h-0.5) between them; the nested
              group-end connector (w-8 sm:w-12 h-px mx-2) retired. */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      done
                        ? "bg-[#2E7D5F] text-white"
                        : active
                          ? "bg-[#2E7D5F] text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                    aria-current={active ? "step" : undefined}
                  >
                    {n}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      active ? "text-[#1F2933]" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            }).reduce<React.ReactNode[]>((acc, group, i) => {
              // interleave the connectors between the groups
              if (i > 0) {
                acc.push(<div key={`connector-${i}`} className="w-8 h-0.5 bg-gray-200" />);
              }
              acc.push(group);
              return acc;
            }, [])}
          </div>

          {/* ---- step 1: service + estimate ------------------------- */}
          {step === 1 ? (
            <div>
              {/* Session-202 (F-201g cure #1): the OPAQUE INNER FORM CARD —
                  the reference's own anatomy (decoded live: 638x542 at
                  401,374, pad-32, radius-16, the 1px gray-100 border);
                  the step FIELDS ride it, the nav rows stay below. */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <EstimateCard
                  serviceId={serviceId}
                  onServiceChange={setServiceId}
                  yardSize={yardSize}
                  onYardSizeChange={setYardSize}
                />
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="shadow h-9 py-2 bg-[#2E7D5F] hover:bg-[#236B4F] text-white px-8"
                  onClick={() => setStep(2)}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ) : null}

          {/* ---- step 2: date + time -------------------------------- */}
          {step === 2 ? (
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarCheck className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                  <h3 className="font-bold text-[#1F2933]">Pick a date</h3>
                </div>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={month}
                  onMonthChange={setMonth}
                  disabled={{ before: new Date() }}
                  startMonth={new Date()}
                  className="rdp p-3 rounded-xl border"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                  <h3 className="font-bold text-[#1F2933]">Pick a time</h3>
                </div>
                <div className="space-y-2">
                  {TIME_SLOTS.map((s) => {
                    const selected = s === slot;
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSlot(s)}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                          selected
                            ? "border-[#2E7D5F] bg-[#E8F3ED] text-[#2E7D5F]"
                            : "border-gray-200 text-[#1F2933] hover:border-[#2E7D5F]/40"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                  <Button variant="outline" className="h-9 px-4 py-2" onClick={() => setStep(1)}>
                    <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
                    Back
                  </Button>
                  <Button
                    className="shadow h-9 py-2 bg-[#2E7D5F] hover:bg-[#236B4F] text-white px-8"
                    disabled={!date || !slot}
                    onClick={() => setStep(3)}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Button>
              </div>
            </div>
          ) : null}

          {/* ---- step 3: your details ------------------------------- */}
          {step === 3 ? (
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <House className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                <h3 className="font-bold text-[#1F2933]">Your details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking-name">Full name *</Label>
                  <Input
                    id="booking-name"
                    required
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="booking-phone">Phone *</Label>
                  <Input
                    id="booking-phone"
                    type="tel"
                    required
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="booking-email">Email</Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="booking-address">Street address</Label>
                  <Input
                    id="booking-address"
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="booking-suburb">Suburb *</Label>
                  <Input
                    id="booking-suburb"
                    required
                    value={details.suburb}
                    onChange={(e) => setDetails({ ...details, suburb: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="booking-notes">Anything we should know?</Label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="Gate codes, pets, problem areas..."
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={details.notes}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                />
              </div>
              <div className="bg-[#F5F1EB] rounded-xl p-4 flex items-center justify-between mt-6">
                <div>
                  <p className="text-sm font-semibold text-[#1F2933]">{service?.label}</p>
                  <p className="text-xs text-gray-500">{summaryLine(date, slot, yardSize)}</p>
                </div>
                <p className="text-lg font-bold text-[#2E7D5F]" data-testid="summary-estimate">
                  {estimate?.replace(/ /g, "")}
                </p>
              </div>
              </div>
              {error ? (
                <p className="text-sm text-red-600 mt-4" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="flex justify-between pt-2 mt-2">
                <Button variant="outline" className="h-9 px-4 py-2" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
                  Back
                </Button>
                <Button
                  className="shadow h-9 py-2 bg-[#2E7D5F] hover:bg-[#236B4F] text-white px-8"
                  disabled={
                    submitting || !details.name.trim() || !details.phone.trim() || !details.suburb.trim()
                  }
                  onClick={() => void submit()}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
