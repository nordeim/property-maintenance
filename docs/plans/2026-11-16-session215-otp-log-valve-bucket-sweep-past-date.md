# Session-215 — The Standing Rotation: The OTP Log Valve + The Bucket Sweep Debt + The Past-Date Gate (TDD)

**Date:** 2026-11-16 · **Rotation trigger:** `f16b339` (the owner's
session_20.md archive — the s214 execution record) · **Head at start:**
`f16b339` · **Baseline:** lint 0/0 · tsc 0 · **139 suites / 2816 unit
GREEN** · db census MATCH (15/24/10/23/12 + 4 users) · probe:ref
**STABLE** (bundle `ee166dd5` — no parity event; every standing layer
STANDING) · the mobile-nav walk at 390 re-verified live: geometry
`{70,0,320,844}` byte-MATCH · 8-link vocabulary MATCH · animation
`enter/0.5s` MATCH (**no Tailwind v4 bug**) · Esc-close + focus-return
holding (the a11y supersets standing).

## The audit (the df3f69a collateral rotation)

Five findings (2 Medium, 3 Low), none Critical/High; the s214 collateral
itself (the poll-gate repairs, the ladder doctrine, the zero-data guard)
verified clean in six areas (the census verdict seam, the badge pair,
the docs lockstep, the count ladder, the configs, the SEO surface).

| ID | Sev | Site | The defect |
| --- | --- | --- | --- |
| F-216a | Med | `src/app/api/auth/resend/route.ts:55` + `src/app/api/auth/signup/route.ts:91` | the OTP verification code logs to stdout UNCONDITIONALLY — the `NEO_DISABLE_IN_APP_OTP=1` kill-switch nulls the response payload but the `console.info(\`… code for ${email}: ${code} …\`)` still writes every 6-digit code to the server log. A production deployment with a real mail transport still leaks the codes it paid to hide — the kill-switch's own purpose defeated by its log line |
| F-216b | Med | `src/app/api/bookings/route.ts:31` + `src/app/api/quote-requests/route.ts:24` | the two PUBLIC POST routes never call `sweepRateLimits()` — the auth family's 7 routes sweep on every request, but the two most stranger-exposed endpoints on a public marketing site don't. Expired buckets reset lazily at their own next access, but a rotating-IP burst mints one never-reaccessed bucket per IP; the shared `buckets` Map grows unbounded until some auth route happens to fire |
| F-216c | Low | `src/lib/schemas.ts:741-743` | `bookingCreateSchema.date` validates FORMAT only (`^\d{4}-\d{2}-\d{2}$`) — the UI disables past days at render (`disabled={{ before: new Date() }}`) but the server accepts yesterday: a client left open overnight (or a scripted POST) persists a booking for a past date. The slot is enum-checked, the service catalog-checked; the date is the one field without a semantic server check |
| F-216d | Low | `scripts/drift-probe.ts:47-48` + `scripts/sweep.ts:799-800` | the reference demo login pair hardcoded as env fallbacks in the parity tooling. Documented in `.env.example` as the demo pair; a credential literal in the repo either way (Low: the pair is the operator's own published demo login) |
| F-216e | Low | `src/lib/booking.ts:49,98` | `serviceIdByLabel` + `calendarGrid` are production-dead exports (test-pinned seams only). The house doctrine keeps test-pinned pure seams, so this is a record-not-cure: the file header already documents the battery as the consumer |

## The cures (TDD — every code pin RED-first)

- **R-01 (F-216a) the OTP log valve:** the `console.info` moves INSIDE
  the `inAppOtpEnabled` gate (both routes) — when the kill-switch is on,
  nothing is logged; when demo mode is on, the log line keeps its
  e2e/debugging role. The pin: the log line sits inside the gate in both
  routes (source-pin form, the auth-contract suite's own idiom).
- **R-02 (F-216b) the bucket sweep debt:** both public routes call
  `sweepRateLimits()` right after their `rateLimit(` call (the login
  route's own form — the idiom the auth family already uses). The pin:
  both routes contain `sweepRateLimits()` (source-pin form).
- **R-03 (F-216c) the past-date gate:** `bookingCreateSchema.date` gains
  a real-calendar refinement (the web-application skill §7 doctrine:
  regex + component round-trip) AND a not-in-the-past check
  (`toDateString()` comparison — day granularity, the react-day-picker
  `disabled={{ before: new Date() }}` semantics mirrored server-side;
  today is bookable, yesterday is not). Message:
  "Please pick today or a later date". The pin: the schema rejects
  yesterday, accepts today, accepts tomorrow (pure-seam execution pin
  via `bookingCreateSchema.safeParse`).
- **R-04 (F-216d) the creds fallback record:** NO code change (the
  documented demo pair; the tools' env override contract already
  covers it) — the plan records the disposition.
- **R-05 (F-216e) the dead-export record:** NO code change (the
  test-pinned-seam doctrine) — the plan records the disposition.

## The verification battery

lint 0/0 · tsc 0 · unit (the new count) · build · smoke 14/14 · e2e
193/193 (the CI=1 fresh boot) · the drift-gate battery (four band
sweeps + fullpage + census) · the mobile-nav walk at 390 · captures 69
(a fresh landing/desktop + the mobile menu open) · the docs lockstep
(the count ladder + session_21 + the worklog) · commit + push via the
SSH wrapper.

## Execution ledger

- [x] R-01 the OTP log valve (TDD) — the log line inside the demo-mode gate, both routes
- [x] R-02 the bucket sweep debt (TDD) — `sweepRateLimits()` at both public POST routes
- [x] R-03 the past-date gate (TDD) — the real-calendar + not-past refinements, the execution pin
- [x] R-04 the creds fallback — recorded disposition (no change)
- [x] R-05 the dead exports — recorded disposition (no change)
- [x] R-06 the verification battery — lint 0/0 · tsc 0 · 140/2822 unit · build · smoke 14/14 · e2e 193/193 · the drift-gate battery · the mobile-nav walk · captures 69 · the docs lockstep; pushed via the SSH wrapper
