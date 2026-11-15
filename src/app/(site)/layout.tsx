import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

// Session-199 (the property-maintenance checkout round): the (site)
// route group — the OASIS public layer. Fully PUBLIC (the reference
// serves every marketing surface to guests — recon-verified: no login
// wall on any public page), its own chrome (SiteHeader/SiteFooter —
// NOT the CRM shell), no session resolution at all.
//
// The CRM back-office (the (app) group — dashboard/contacts/leads/
// calendar/activities/reports/settings/profile) stays session-gated
// and UNCHANGED: the kept functional SUPERSET over the reference
// (which has no CRM at all), reachable by URL, never advertised on
// the public layer (visual parity).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
