# Session-21 (session-215) — The Standing Rotation: The OTP Log Valve + The Bucket Sweep Debt + The Past-Date Gate

**Rotation trigger:** `f16b339` (the owner's session_20.md archive) ·
**Head at start:** `f16b339` · **Plan:**
`docs/plans/2026-11-16-session215-otp-log-valve-bucket-sweep-past-date.md`

## The round

The s214 archive landed; the standing rotation ran: the baseline gate
GREEN at the exact s214 ship state (lint 0/0 · tsc 0 · 139/2816 · db
census MATCH) · probe:ref **STABLE** (bundle ee166dd5 — no parity
event; every standing layer STANDING) · the mobile-nav walk at 390
re-verified live BEFORE any change: geometry {70,0,320,844}
byte-MATCH · 8-link vocabulary MATCH · animation `enter/0.5s` MATCH
(**no Tailwind v4 bug** — the operator's named focus held at entry).
The audit rotation (the web-application skill dimensions over the
df3f69a collateral + the full src/ sweep) found five findings (2
Medium, 3 Low — none Critical/High): F-216a the OTP log valve, F-216b
the bucket sweep debt, F-216c the past-date gate, F-216d the parity
tools' creds fallback (recorded), F-216e booking.ts's test-pinned dead
exports (recorded).

## The cures (TDD, six pins RED-first then GREEN)

- **F-216a the OTP log valve:** the verification code's `console.info`
  rode OUTSIDE the `NEO_DISABLE_IN_APP_OTP` gate in signup + resend —
  a production deployment with a real mail transport still wrote every
  6-digit code to stdout, defeating the kill-switch's own purpose (the
  signup route's own comment even said "the console log stays either
  way" — the defect in prose). The log line now rides INSIDE the gate.
  Pins: the ordering (the log AFTER the gate's declaration, never
  before — the pre-gate slice clean) in both routes.
- **F-216b the bucket sweep debt:** the two PUBLIC POST routes
  (bookings + quote-requests) never called `sweepRateLimits()` — the
  auth family's 7 routes sweep on every request, but the two most
  stranger-exposed endpoints on a public marketing site didn't (an
  unbounded buckets Map under rotating-IP bursts). Both now sweep
  (the login route's own placement: after the limiter, so denied
  requests sweep too). Pins: the import + the call in both routes.
- **F-216c the past-date gate:** `bookingCreateSchema.date` validated
  FORMAT only — the server accepted yesterday (the UI's react-day-picker
  disables past days, but a scripted POST or an overnight-open client
  persisted past bookings). The cure: the real-calendar refinement
  (regex alone accepts 2026-02-30 — the web-application skill §7
  doctrine) + the not-in-the-past check at DAY granularity (today
  bookable, yesterday rejected — the UI semantics mirrored
  server-side). Pins: yesterday rejected with the exact message ·
  today + tomorrow accepted · 2026-02-30 rejected by the CALENDAR
  refinement (not the regex).

## The verification battery

lint 0/0 · tsc 0 · **140 suites / 2822 unit GREEN** (+6, the
session-215-audit suite born) · build GREEN · smoke 14/14 · the e2e
battery 193/193 (the CI=1 fresh boot) · the drift-gate battery (four
band sweeps + fullpage + census) · the mobile-nav walk at 390 (the
post-cure re-verify) · captures 69 (the landing at 1440 + the mobile
menu open at 390).

## The docs lockstep

The count ladder 2816 → 2822 at every live-tense site (README badge
3009 → 3015, the Tested row, the gate line + the suite list's
session-215-audit join · AGENTS commands + gate · CLAUDE's four ·
PAD's five · both SKILLs' forms) · the neo-crm SKILL head surgery
(v1.216.0 → v1.217.0, the s215 layer live, the s211 head demoted at
its 2816 ship counts) · the pm-SKILL v1.10.1 → v1.11.0 (+ the §7
session layer note) · the schemas.ts 784 → 814 line re-anchor · the
layer-axis pin re-anchored at the s215/s211 pair · this session_21
log + the worklog Task 215 entry + the plan's execution ledger.

Pushed to `main` via the SSH wrapper.
