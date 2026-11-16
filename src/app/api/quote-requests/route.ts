import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { quoteRequestCreateSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Session-199: the QUOTE-REQUEST boundary — the /contact form's SUPERSET
// submit (the same posture as /api/bookings: public POST behind the
// per-IP limiter + parseBody; session-gated GET for the back office).

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const requests = await db.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return ok(requests);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const rl = rateLimit(`quote-requests:${clientKey(req)}`, 8, 15 * 60_000);
  // Session-215 (F-216b — the bucket sweep debt): the same cure as the
  // bookings twin — the public POSTs join the sweep idiom (the login
  // route's own placement: after the limiter, so denied requests sweep
  // too; the auth family's 7 routes already do this).
  sweepRateLimits();
  if (!rl.allowed) {
    return ERR.RATE_LIMITED(rl.retryAfterSec);
  }

  const parsed = await parseBody(req, quoteRequestCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const record = await db.quoteRequest.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        suburb: body.suburb,
        services: JSON.stringify(body.services),
        serviceType: body.serviceType,
        message: body.message || null,
      },
    });
    return ok(record, /* status */ 201);
  } catch {
    return ERR.INTERNAL();
  }
}
