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

// session-216 (F-217b): brace-matching extractor — finds the line that
// declares the inAppOtpEnabled gate, then walks the source forward from
// that line's first `{` counting depth until its matching `}`; the
// returned slice is the gate's full if-block (the containment window
// the code-log must ride inside).
function extractGateBlock(src: string): { gateLine: string; gateBlock: string } {
  const lines = src.split("\n");
  const gateLineIdx = lines.findIndex((l) =>
    l.includes('process.env.NEO_DISABLE_IN_APP_OTP !== "1"'),
  );
  if (gateLineIdx < 0) return { gateLine: "", gateBlock: "" };
  // the declaration's own line ends in `{` (the house form:
  // `const inAppOtpEnabled = ...;` then `if (inAppOtpEnabled) {`)
  let start = -1;
  for (let i = gateLineIdx; i < lines.length; i++) {
    const open = lines[i].indexOf("{");
    if (open >= 0) {
      start = i;
      break;
    }
  }
  if (start < 0) return { gateLine: lines[gateLineIdx], gateBlock: "" };
  let depth = 0;
  let block = "";
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth++;
      if (ch === "}") depth--;
    }
    block += lines[i] + "\n";
    if (depth <= 0) break;
  }
  return { gateLine: lines[gateLineIdx], gateBlock: block };
}

describe("session-215: the OTP log valve + the bucket sweep + the past-date gate", () => {
  it("F-216a/F-217b: the resend route's code log rides INSIDE the gate's brace window (containment, not ordering)", () => {
    const src = resendRoute();
    // the gate + the log both present…
    expect(src).toContain('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    expect(src).toContain("[verification] code for");
    // …and the log line sits AFTER the gate's declaration (inside its
    // branch), never before it — the ordering face
    const gateAt = src.indexOf('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    const logAt = src.indexOf("[verification] code for");
    expect(gateAt).toBeGreaterThanOrEqual(0);
    expect(logAt).toBeGreaterThan(gateAt);
    // the unconditional form stays retired: a console.info on the code
    // OUTSIDE any gate (the pre-215 shape) must not return
    const preGate = src.slice(0, gateAt);
    expect(preGate).not.toContain("[verification] code for");
    // session-216 (F-217b — the CONTAINMENT face): ordering alone passes a
    // log hoisted BELOW the gate's closing brace (outside the branch); the
    // brace window is the contract. Extract the if-block by brace matching
    // from the gate's line and assert the log sits inside it, and that the
    // source after the block carries no code-log either.
    const { gateBlock } = extractGateBlock(src);
    expect(gateBlock, "the console.info must sit inside the if (inAppOtpEnabled) block").toContain(
      "[verification] code for",
    );
    const afterBlock = src.slice(src.indexOf(gateBlock) + gateBlock.length);
    expect(afterBlock, "no code-log may ride outside the gate's block (the hoist genus F-217b)").not.toContain(
      "[verification] code for",
    );
  });

  it("F-216a/F-217b: the signup route's code log rides INSIDE the gate's brace window (containment, not ordering)", () => {
    const src = signupRoute();
    expect(src).toContain('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    expect(src).toContain("[verification] code for");
    const gateAt = src.indexOf('process.env.NEO_DISABLE_IN_APP_OTP !== "1"');
    const logAt = src.indexOf("[verification] code for");
    expect(gateAt).toBeGreaterThanOrEqual(0);
    expect(logAt).toBeGreaterThan(gateAt);
    const preGate = src.slice(0, gateAt);
    expect(preGate).not.toContain("[verification] code for");
    const { gateBlock } = extractGateBlock(src);
    expect(gateBlock, "the console.info must sit inside the if (inAppOtpEnabled) block").toContain(
      "[verification] code for",
    );
    const afterBlock = src.slice(src.indexOf(gateBlock) + gateBlock.length);
    expect(afterBlock, "no code-log may ride outside the gate's block (the hoist genus F-217b)").not.toContain(
      "[verification] code for",
    );
  });

  it("F-216b/F-217b: the bookings POST route sweeps its rate buckets after the limiter, before the denied return (placement, not existence)", () => {
    const src = bookingsRoute();
    expect(src).toContain("sweepRateLimits()");
    // the sweep import present (the login route's own form)
    expect(src).toMatch(/import \{[^}]*sweepRateLimits[^}]*\} from "@\/lib\/rate-limit"/);
    // session-216 (F-217b — the PLACEMENT face): the sweep sits between
    // the rateLimit( call and the denied return — the login route's exact
    // idiom; a sweep moved after the `if (!rl.allowed) return` line would
    // pass an existence pin while denying the sweep to denied requests
    // (the genus the audit named).
    const rlAt = src.indexOf("rateLimit(`bookings:");
    const sweepAt = src.indexOf("sweepRateLimits()");
    const deniedAt = src.indexOf("if (!rl.allowed)");
    expect(rlAt).toBeGreaterThanOrEqual(0);
    expect(sweepAt).toBeGreaterThan(rlAt);
    expect(deniedAt).toBeGreaterThan(sweepAt);
  });

  it("F-216b/F-217b: the quote-requests POST route sweeps after the limiter, before the denied return", () => {
    const src = quoteRequestsRoute();
    expect(src).toContain("sweepRateLimits()");
    expect(src).toMatch(/import \{[^}]*sweepRateLimits[^}]*\} from "@\/lib\/rate-limit"/);
    const rlAt = src.indexOf("rateLimit(`quote-requests:");
    const sweepAt = src.indexOf("sweepRateLimits()");
    const deniedAt = src.indexOf("if (!rl.allowed)");
    expect(rlAt).toBeGreaterThanOrEqual(0);
    expect(sweepAt).toBeGreaterThan(rlAt);
    expect(deniedAt).toBeGreaterThan(sweepAt);
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
