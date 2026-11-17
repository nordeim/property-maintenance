import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { bookingCreateSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { bookingServiceById } from "@/lib/booking";

export const dynamic = "force-dynamic";

// Session-199 (the property-maintenance checkout round): the BOOKINGS
// boundary — the Oasis booking flow's SUPERSET submit. PUBLIC POST
// (the reference's flow is public; the write is guarded by the
// per-IP fixed-window limiter — the auth-family posture), Zod at the
// boundary via parseBody, the serviceId/slot validated against the
// seam's own catalogs upstream. GET is the CRM back-office read
// (session-gated — the superset's admin surface).

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const bookings = await db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return ok(bookings);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  // 8 bookings / 15 min / IP — the public-form posture (tighter than
  // the auth family's 10: a booking is a heavier write).
  const rl = rateLimit(`bookings:${clientKey(req)}`, 8, 15 * 60_000);
  // Session-215 (F-216b — the bucket sweep debt): the auth family's 6
  // routes sweep on every request (the s217 F-218c census); these two public POSTs are the MOST
  // stranger-exposed endpoints on a public marketing site (rotating-IP
  // bursts mint one never-reaccessed bucket per IP) — the sweep joins
  // the idiom (the login route's own placement: after the limiter, so
  // denied requests sweep too).
  sweepRateLimits();
  if (!rl.allowed) {
    return ERR.RATE_LIMITED(rl.retryAfterSec);
  }

  const parsed = await parseBody(req, bookingCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  const service = bookingServiceById(body.serviceId);
  if (!service) return ERR.BAD_REQUEST("Please pick one of our services");

  try {
    const booking = await db.booking.create({
      data: {
        serviceId: service.id,
        serviceName: service.label,
        yardSize: body.yardSize,
        date: body.date,
        slot: body.slot,
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        address: body.address || null,
        suburb: body.suburb,
        notes: body.notes || null,
      },
    });
    return ok(booking, /* status */ 201);
  } catch {
    return ERR.INTERNAL();
  }
}
