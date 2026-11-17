// Session-199: the /Services capital-casing render alias — the reference's
// own links mix casings (/Booking, /Services in its hero/CTA hrefs; its
// platform serves both). The .jsx-extension pattern is the house TS1149
// dodge (paths differing only in casing trip TypeScript's casing check;
// the extension keeps the alias out of that collision while compiling
// identically through SWC). The lowercase route stays canonical.
import ServicesPage from "../services/page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Services", route: "/Services" });

export default function ServicesCapitalRoute() {
  return <ServicesPage />;
}
