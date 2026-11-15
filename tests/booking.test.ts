// Session-199 (the property-maintenance checkout round): the BOOKING
// SEAM battery — the pure functions behind the Oasis booking flow +
// instant estimate. The contract is the live-recon ground truth
// (scripts/recon-199*.ts, legs 4-7 — every value below was OBSERVED on
// the reference at 1440x900 on 2026-11-15; the estimate matrix is
// service-driven — the yard slider at 100/400/800/1200/2000 m² never
// moved the displayed range for any service, so the seam encodes
// exactly that observed behavior).
//
// TDD: this battery was written RED-first against the not-yet-existing
// src/lib/booking.ts (the seam), then made green. The e2e leg
// (tests/e2e/marketing-site.spec.ts) pins the rendered faces.
import { describe, expect, it } from "vitest";

import {
  BOOKING_SERVICES,
  TIME_SLOTS,
  STEP_LABELS,
  YARD_MIN,
  YARD_MAX,
  YARD_DEFAULT,
  bookingServiceById,
  calendarGrid,
  estimateFor,
  formatYardSize,
  serviceIdByLabel,
} from "@/lib/booking";

describe("session-199: the booking seam (the Oasis instant-estimate contract)", () => {
  it("the service catalog carries the five observed services with their exact labels", () => {
    expect(BOOKING_SERVICES.map((s) => s.label)).toEqual([
      "Lawn Mowing & Edging",
      "Garden Maintenance",
      "Pressure Washing",
      "Gutter Cleaning",
      "Full Property Tidy-Up",
    ]);
  });

  it("every service id is unique + stable (the API + URL contracts key on it)", () => {
    const ids = BOOKING_SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(BOOKING_SERVICES.length);
  });

  it("estimateFor renders the reference's exact '$min – $max' forms (en dash)", () => {
    // the observed matrix, service by service (the recon leg-7 table):
    expect(estimateFor("lawn")).toBe("$60 – $80");
    expect(estimateFor("garden")).toBe("$70 – $90");
    expect(estimateFor("pressure")).toBe("$120 – $160");
    expect(estimateFor("gutter")).toBe("$90 – $120");
    expect(estimateFor("tidy")).toBe("$145 – $195");
  });

  it("estimateFor answers null for an unknown service (no invented prices)", () => {
    expect(estimateFor("does-not-exist" as never)).toBeNull();
  });

  it("the catalog's min/max carry the numeric halves the API validates against", () => {
    const lawn = bookingServiceById("lawn");
    expect(lawn?.priceMin).toBe(60);
    expect(lawn?.priceMax).toBe(80);
    expect(bookingServiceById("nope" as never)).toBeUndefined();
  });

  it("serviceIdByLabel resolves the button labels the UI renders", () => {
    expect(serviceIdByLabel("Lawn Mowing & Edging")).toBe("lawn");
    expect(serviceIdByLabel("Full Property Tidy-Up")).toBe("tidy");
    expect(serviceIdByLabel("Unknown")).toBeUndefined();
  });

  it("the yard slider contract: 100–2000 m², default 400, the 'NNN m²' readout", () => {
    expect(YARD_MIN).toBe(100);
    expect(YARD_MAX).toBe(2000);
    expect(YARD_DEFAULT).toBe(400);
    expect(formatYardSize(400)).toBe("400 m²");
    expect(formatYardSize(2000)).toBe("2000 m²");
    expect(formatYardSize(100)).toBe("100 m²");
  });

  it("the slot list is the five observed windows, in order", () => {
    expect(TIME_SLOTS).toEqual(["8am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm", "4pm-6pm"]);
  });

  it("the step labels are the three observed progress stages", () => {
    expect(STEP_LABELS).toEqual(["Service & Estimate", "Date & Time", "Your Details"]);
  });

  it("calendarGrid builds a Sun-start week-aligned grid; past days disable (the Nov-2026 observation: 35 cells)", () => {
    // Nov 2026 starts on a Sunday, 30 days => exactly 5 weeks (35 cells)
    const grid = calendarGrid(2026, 10, new Date("2026-11-15T00:00:00"));
    expect(grid).toHaveLength(35);
    expect(grid[0]).toMatchObject({ day: 1, inMonth: true, disabled: true }); // the 1st is past
    // the 15th is TODAY — still selectable on the reference (same-day
    // booking is allowed); the 16th+ are future:
    const today = grid.find((c) => c.day === 15);
    expect(today?.disabled).toBe(false);
    const future = grid.find((c) => c.day === 16);
    expect(future?.disabled).toBe(false);
    // every cell carries an ISO date the API can validate:
    expect(grid[0].dateISO).toBe("2026-11-01");
  });

  it("calendarGrid pads with adjacent-month cells, flagged out-of-month", () => {
    // Dec 2026 starts on a Tuesday: 2 leading Nov cells + 31 days + 4
    // trailing Jan cells = 37 cells => 6 weeks (42 grid cells):
    const grid = calendarGrid(2026, 11, new Date("2026-12-01T00:00:00"));
    expect(grid.length % 7).toBe(0);
    expect(grid[0].inMonth).toBe(false);
    expect(grid.find((c) => c.inMonth)?.day).toBe(1);
  });

  it("the grid never disables a future month entirely (a fresh month's 1st is live)", () => {
    const grid = calendarGrid(2027, 0, new Date("2026-11-15T00:00:00"));
    const inMonth = grid.filter((c) => c.inMonth);
    expect(inMonth).toHaveLength(31);
    expect(inMonth.every((c) => !c.disabled)).toBe(true);
  });
});
