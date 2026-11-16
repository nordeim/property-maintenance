import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-215 pins (F-216a/b/c — the standing audit rotation's three
// cures): the OTP log valve, the public-route bucket sweep, and the
// booking past-date gate. The house convention (the s46 dch + the s66
// badge-contract precedent, per the auth-contract suite's own header):
// source-contract pins read COMMENT-STRIPPED sources — a literal pinned
// by a record comment alone is a vacuous pin, and an absence pin must
// not fail on the retired form quoted inside its own documentation.
//
// The pinned surfaces:
// - F-216a: the OTP verification code's console.info rides INSIDE the
//   in-app delivery gate (NEO_DISABLE_IN_APP_OTP) in BOTH routes — the
//   kill-switch that nulls the response payload must also silence the
//   log line, or a production deployment with a real mail transport
//   still writes every 6-digit code to stdout.
// - F-216b: the two PUBLIC POST routes (bookings + quote-requests) call
//   sweepRateLimits() — the auth family's 7 routes sweep on every
//   request; the two most stranger-exposed endpoints on a public
//   marketing site must not be the ones that never sweep (an unbounded
//   buckets Map under rotating-IP bursts).
// - F-216c: bookingCreateSchema.date rejects PAST dates — the UI's
//   disabled={{ before: new Date() }} mirrored server-side at day
//   granularity (today bookable, yesterday not) + the real-calendar
//   refinement (the web-application skill §7 doctrine — regex alone
//   accepts rollovers like 2026-02-30).

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const resendRoute = () => stripComments(read("src/app/api/auth/resend/route.ts") ?? "");
const signupRoute = () => stripComments(read("src/app/api/auth/signup/route.ts") ?? "");
const bookingsRoute = () => stripComments(read("src/app/api/bookings/route.ts") ?? "");
const quoteRequestsRoute = () =>
  stripComments(read("src/app/api/quote-requests/route.ts") ?? "");

describe("session-215: the OTP log valve + the bucket sweep + the past-date gate", () => {
  it("F-216a: the resend route's code log rides INSIDE the in-app delivery gate (the kill-switch silences the log too)", () => {
    const src = resendRoute();
    // the gate + the log both present…
    expect(src).toContain('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    expect(src).toContain("[verification] code for");
    // …and the log line sits AFTER the gate's declaration (inside its
    // branch), never before it — the ordering IS the valve
    const gateAt = src.indexOf('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    const logAt = src.indexOf("[verification] code for");
    expect(gateAt).toBeGreaterThanOrEqual(0);
    expect(logAt).toBeGreaterThan(gateAt);
    // the unconditional form stays retired: a console.info on the code
    // OUTSIDE any gate (the pre-215 shape) must not return
    const preGate = src.slice(0, gateAt);
    expect(preGate).not.toContain("[verification] code for");
  });

  it("F-216a: the signup route's code log rides INSIDE the in-app delivery gate", () => {
    const src = signupRoute();
    expect(src).toContain('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    expect(src).toContain("[verification] code for");
    const gateAt = src.indexOf('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    const logAt = src.indexOf("[verification] code for");
    expect(gateAt).toBeGreaterThanOrEqual(0);
    expect(logAt).toBeGreaterThan(gateAt);
    const preGate = src.slice(0, gateAt);
    expect(preGate).not.toContain("[verification] code for");
  });

  it("F-216b: the bookings POST route sweeps its rate buckets (the auth family's own idiom)", () => {
    const src = bookingsRoute();
    expect(src).toContain("sweepRateLimits()");
    // the sweep import present (the login route's own form)
    expect(src).toMatch(/import \{[^}]*sweepRateLimits[^}]*\} from "@\/lib\/rate-limit"/);
  });

  it("F-216b: the quote-requests POST route sweeps its rate buckets", () => {
    const src = quoteRequestsRoute();
    expect(src).toContain("sweepRateLimits()");
    expect(src).toMatch(/import \{[^}]*sweepRateLimits[^}]*\} from "@\/lib\/rate-limit"/);
  });

  it("F-216c: bookingCreateSchema rejects yesterday, accepts today + tomorrow (the day-granularity mirror of the UI's disabled-before-today)", async () => {
    const { bookingCreateSchema } = await import("@/lib/schemas");
    const valid = {
      serviceId: "lawn",
      yardSize: 400,
      date: "2026-01-01",
      slot: "8am-10am",
      name: "Pin Walker",
      phone: "0400 000 000",
      suburb: "Parkwood",
    };
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const past = bookingCreateSchema.safeParse({ ...valid, date: iso(yesterday) });
    expect(past.success).toBe(false);
    if (!past.success) {
      expect(past.error.issues[0].message).toBe("Please pick today or a later date");
    }

    const now = bookingCreateSchema.safeParse({ ...valid, date: iso(today) });
    expect(now.success).toBe(true);

    const future = bookingCreateSchema.safeParse({ ...valid, date: iso(tomorrow) });
    expect(future.success).toBe(true);
  });

  it("F-216c: the date field rejects calendar rollovers (the regex-alone genus — 2026-02-30 is not a day)", async () => {
    const { bookingCreateSchema } = await import("@/lib/schemas");
    const valid = {
      serviceId: "lawn",
      yardSize: 400,
      date: "2026-01-01",
      slot: "8am-10am",
      name: "Pin Walker",
      phone: "0400 000 000",
      suburb: "Parkwood",
    };
    const rolled = bookingCreateSchema.safeParse({ ...valid, date: "2026-02-30" });
    expect(rolled.success).toBe(false);
    // the round-trip refinement is LIVE (not the regex's own rejection):
    // a FUTURE rollover date would pass regex AND fail the calendar —
    // pin the message the refinement carries
    if (!rolled.success) {
      expect(rolled.error.issues[0].message).toBe("Please pick a valid date");
    }
  });
});
