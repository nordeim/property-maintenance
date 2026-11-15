// Session-199 (the property-maintenance checkout round): the BOOKING
// SEAM — the pure functions behind the Oasis reference's booking flow
// and instant-estimate widget. Every exported constant and form below
// is the live-recon ground truth (scripts/recon-199*.ts, legs 4-7,
// observed 2026-11-15 at 1440x900):
//
//   - the five service buttons + the "$min – $max" estimate forms
//     (service-driven: the yard slider never moved the displayed range
//     at any observed position, for any service — the seam encodes the
//     observed behavior, not an invented price formula);
//   - the yard-size slider contract (100–2000 m², default 400, the
//     "NNN m²" readout);
//   - the five observed time windows + the three progress-step labels;
//   - the calendar: a Sun-start, week-aligned grid with adjacent-month
//     padding and past-day disabling (the Nov-2026 observation: 35
//     cells for a 30-day Sunday-start month, past days disabled).
//
// Pure by design (the §3 seam law): the UI renders it, the API
// validates against it, the unit battery (tests/booking.test.ts) pins
// it. No DOM, no db, no clock reads — `today` is always an argument.

export interface BookingService {
  id: string;
  label: string;
  priceMin: number;
  priceMax: number;
}

/** The five observed services, in the reference's button order. */
export const BOOKING_SERVICES: readonly BookingService[] = [
  { id: "lawn", label: "Lawn Mowing & Edging", priceMin: 60, priceMax: 80 },
  { id: "garden", label: "Garden Maintenance", priceMin: 70, priceMax: 90 },
  { id: "pressure", label: "Pressure Washing", priceMin: 120, priceMax: 160 },
  { id: "gutter", label: "Gutter Cleaning", priceMin: 90, priceMax: 120 },
  { id: "tidy", label: "Full Property Tidy-Up", priceMin: 145, priceMax: 195 },
] as const;

/** The exact "$min – $max" display form (en dash, thin spacing) — or
 * null for an unknown service (never an invented price). */
export function estimateFor(serviceId: string): string | null {
  const svc = BOOKING_SERVICES.find((s) => s.id === serviceId);
  return svc ? `$${svc.priceMin} – $${svc.priceMax}` : null;
}

export function bookingServiceById(serviceId: string): BookingService | undefined {
  return BOOKING_SERVICES.find((s) => s.id === serviceId);
}

export function serviceIdByLabel(label: string): string | undefined {
  return BOOKING_SERVICES.find((s) => s.label === label)?.id;
}

/** The yard-size slider bounds + default (observed: "Small (100m²)" …
 * "Large (2000m²)", the readout resting at 400 m²). */
export const YARD_MIN = 100;
export const YARD_MAX = 2000;
export const YARD_DEFAULT = 400;

export function formatYardSize(m2: number): string {
  return `${m2} m²`;
}

/** The five observed booking windows, in order. */
export const TIME_SLOTS: readonly string[] = [
  "8am-10am",
  "10am-12pm",
  "12pm-2pm",
  "2pm-4pm",
  "4pm-6pm",
] as const;

/** The three observed progress-stage labels. */
export const STEP_LABELS: readonly [string, string, string] = [
  "Service & Estimate",
  "Date & Time",
  "Your Details",
];

export interface CalendarCell {
  day: number;
  /** ISO yyyy-mm-dd — built from the numbers, never `new Date(string)`
   * (no timezone drift across runtimes). */
  dateISO: string;
  inMonth: boolean;
  disabled: boolean;
}

function isoOf(year: number, monthIndex: number, day: number): string {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/** The Sun-start, week-aligned month grid. Padding carries the
 * adjacent month's day numbers (flagged inMonth: false). Past days —
 * strictly before the LOCAL calendar day of `today` — are disabled;
 * today itself stays selectable (the reference's same-day windows). */
export function calendarGrid(year: number, monthIndex: number, today: Date): CalendarCell[] {
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  // JS: day 0 = Sunday — the observed grid's start of week.
  const leading = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
  const total = Math.ceil((leading + daysInMonth) / 7) * 7;

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate(),
  ).padStart(2, "0")}`;

  const cells: CalendarCell[] = [];
  for (let i = 0; i < total; i++) {
    const dayNumber = i - leading + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      // adjacent-month padding: project into the neighbor month
      const probe = new Date(Date.UTC(year, monthIndex, dayNumber));
      const y = probe.getUTCFullYear();
      const m = probe.getUTCMonth();
      const d = probe.getUTCDate();
      cells.push({ day: d, dateISO: isoOf(y, m, d), inMonth: false, disabled: false });
    } else {
      const dateISO = isoOf(year, monthIndex, dayNumber);
      cells.push({ day: dayNumber, dateISO, inMonth: true, disabled: dateISO < todayKey });
    }
  }
  return cells;
}
