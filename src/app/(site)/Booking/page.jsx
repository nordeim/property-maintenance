// Session-199: the /Booking capital-casing render alias — the reference's
// own links mix casings (/Booking, /Services in its hero/CTA hrefs; its
// platform serves both). The .jsx-extension pattern is the house TS1149
// dodge (paths differing only in casing trip TypeScript's casing check;
// the extension keeps the alias out of that collision while compiling
// identically through SWC). The lowercase route stays canonical.
import BookingFlow from "../booking/page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Booking", route: "/Booking" });

export default function BookingCapitalRoute() {
  return <BookingFlow />;
}
