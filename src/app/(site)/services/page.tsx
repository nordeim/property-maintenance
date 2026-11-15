import { ServicesPage } from "@/components/site/services-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /services — the reference's services surface (recon
// leg 8; the five groups + the twelve extracted cards).
export const metadata = pageMetadata({ page: "Services", route: "/services" });

export default function ServicesRoute() {
  return <ServicesPage />;
}
