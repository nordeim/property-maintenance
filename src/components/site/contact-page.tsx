"use client";

// Session-199 (the property-maintenance checkout round): the OASIS
// CONTACT PAGE — the reference's /contact (recon legs 8-9): the green
// gradient hero ("Get Your Free Quote"); the two-column body (the
// contact-details rail + the quote form card); the form inventory is
// the extracted reference inventory (name/phone/email/suburb-select/
// the 15 service checkboxes/the one_off-ongoing radios/the message
// textarea); the service-area section with the map image.
//
// SUPERSET (the plan §3): the reference's submit target is unobserved;
// OURS persists a real QuoteRequest row via POST /api/quote-requests
// (Zod at the boundary, the house envelope) and renders a thank-you
// face. The ?service= param from the services page's "Add to Quote"
// pre-checks the matching service checkbox.

import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CONTACT_PLACEHOLDERS,
  CONTACT_SERVICE_OPTIONS,
  CONTACT_SERVICE_TYPES,
  CONTACT_SUBURBS,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_REGIONS,
} from "@/lib/site-content";

const NATIVE_CHECKBOX_CLASS =
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 accent-[#2E7D5F]";

export function ContactPage({
  /** The services page's "Add to Quote" carry (?service= — read at the
   *  page level; the s24 URL-state doctrine bans the search-params hook
   *  inside components). Empty when the form is opened bare. */
  preselected = "",
}: {
  preselected?: string;
}) {
  const [services, setServices] = useState<string[]>(
    preselected && CONTACT_SERVICE_OPTIONS.includes(preselected) ? [preselected] : [],
  );
  const [serviceType, setServiceType] = useState("one_off");
  const [form, setForm] = useState({ name: "", phone: "", email: "", suburb: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const canSubmit = useMemo(
    () => form.name.trim() !== "" && form.phone.trim() !== "" && form.suburb !== "" && services.length > 0,
    [form, services],
  );

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services, serviceType }),
      });
      const payload = (await res.json()) as { ok: boolean; error?: { message?: string } };
      if (!res.ok || !payload.ok) {
        setError(payload.error?.message ?? "Something went wrong — please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative z-10">
      <div>
        <section className="bg-gradient-to-br from-[#2E7D5F]/90 to-[#236B4F]/90 backdrop-blur-md text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Get Your Free Quote
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Tell us what you need, and we&apos;ll get back to you with a free, no-obligation
                quote.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* ---- the details rail -------------------------------- */}
              <div className="space-y-6">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                  <h3 className="text-lg font-bold text-[#1F2933] mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <a
                      href={SITE_PHONE_HREF}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#2E7D5F] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#E8F3ED] rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                      </div>
                      {SITE_PHONE}
                    </a>
                    <a
                      href={SITE_EMAIL_HREF}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#2E7D5F] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#E8F3ED] rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                      </div>
                      {SITE_EMAIL}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-10 h-10 bg-[#E8F3ED] rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#2E7D5F]" aria-hidden="true" />
                      </div>
                      {SITE_REGIONS}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                  <h3 className="text-lg font-bold text-[#1F2933] mb-4">Quick Response Guarantee</h3>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#2E7D5F] mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-gray-600">
                      We aim to respond to all quote requests within 24 hours, usually much
                      faster. For urgent jobs, give us a call.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border bg-[#E8F3ED] p-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D5F] mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-[#1F2933]">
                      Fully insured with public liability. We take our work seriously and protect
                      your property.
                    </p>
                  </div>
                </div>
              </div>

              {/* ---- the quote form ----------------------------------- */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border bg-card text-card-foreground shadow-2xl">
                  <div className="p-8">
                    {sent ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-[#E8F3ED] rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-8 h-8 text-[#2E7D5F]" aria-hidden="true" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1F2933] mb-3">
                          Thanks — quote request received!
                        </h2>
                        <p className="text-gray-600 mb-2">
                          We&apos;ll get back to you within 24 hours with your free,
                          no-obligation quote.
                        </p>
                        <p className="text-sm text-gray-500">
                          Tip: Mention property size, access details, current condition, and any
                          specific preferences.
                        </p>
                      </div>
                    ) : (
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (canSubmit && !submitting) void submit();
                        }}
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-[#1F2933] mb-2">Request a Quote</h2>
                          <p className="text-gray-600">
                            Fill out the form below and we&apos;ll get back to you with pricing.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name *</Label>
                            <Input
                              id="name"
                              required
                              placeholder={CONTACT_PLACEHOLDERS.name}
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              placeholder={CONTACT_PLACEHOLDERS.phone}
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder={CONTACT_PLACEHOLDERS.email}
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="suburb">Suburb *</Label>
                            <div className="relative">
                              <select
                                id="suburb"
                                required
                                value={form.suburb}
                                onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                                className="flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="" disabled>
                                  Select your suburb
                                </option>
                                {CONTACT_SUBURBS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>What do you need? * (select all that apply)</Label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {CONTACT_SERVICE_OPTIONS.map((service) => (
                              <div key={service} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={service}
                                  className={NATIVE_CHECKBOX_CLASS}
                                  checked={services.includes(service)}
                                  onChange={(e) =>
                                    setServices(
                                      e.target.checked
                                        ? [...services, service]
                                        : services.filter((s) => s !== service),
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={service}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {service}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Service Type *</Label>
                          <div className="flex items-center space-x-6">
                            {CONTACT_SERVICE_TYPES.map((type, i) => {
                              const value = i === 0 ? "one_off" : "ongoing";
                              return (
                                <div key={type} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={value}
                                    name="service-type"
                                    value={value}
                                    checked={serviceType === value}
                                    onChange={() => setServiceType(value)}
                                    className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 accent-[#2E7D5F]"
                                  />
                                  <Label
                                    htmlFor={value}
                                    className="text-sm font-medium leading-none cursor-pointer"
                                  >
                                    {type}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Additional Details</Label>
                          <textarea
                            id="message"
                            rows={4}
                            placeholder={CONTACT_PLACEHOLDERS.message}
                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                        </div>

                        {error ? (
                          <p className="text-sm text-red-600" role="alert">
                            {error}
                          </p>
                        ) : null}

                        <p className="text-xs text-gray-500">
                          By submitting this form, you agree to be contacted by Green Cut Lawn
                          Care regarding your quote.
                        </p>

                        <Button
                          type="submit"
                          className="w-full h-11 rounded-md bg-[#2E7D5F] hover:bg-[#236B4F] text-white shadow-lg text-base"
                          disabled={!canSubmit || submitting}
                        >
                          Get My Free Quote
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- the service area -------------------------------------- */}
        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2933] mb-4">
                Proudly Servicing SE Queensland
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From the Gold Coast to South Brisbane - we&apos;ve got you covered
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
                alt="Service area map"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">And surrounding suburbs</p>
          </div>
        </section>
      </div>
    </main>
  );
}
