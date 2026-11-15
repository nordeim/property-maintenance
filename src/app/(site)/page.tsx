import { HomePage } from "@/components/site/home-page";
import { pageMetadata } from "@/lib/site";

// Session-199: the root route moved into the (site) group (the Oasis
// public chrome; the old src/app/page.tsx — the neo-crm landing —
// retired with the s142 marketing layer it served). The reference
// serves this page at BOTH "/" and "/home" (its nav's Home link points
// at /home; the root is the same construction — recon-verified).
export const metadata = pageMetadata({ page: null, route: "/" });

export default function SiteHomeRoute() {
  return <HomePage />;
}
