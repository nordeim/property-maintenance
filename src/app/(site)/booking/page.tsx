import { BookingFlow } from "@/components/site/booking-flow";
import { pageMetadata } from "@/lib/site";

// Session-199: /booking — the reference's 3-step booking flow (service
// + estimate → date + time → details; the SUPERSET Confirm persists a
// Booking row via POST /api/bookings).
export const metadata = pageMetadata({ page: "Booking", route: "/booking" });

export default function BookingRoute() {
  return <BookingFlow />;
}
