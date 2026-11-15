import { AboutPage } from "@/components/site/about-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /about — the reference's About Green Cut surface. The
// (marketing) group's neo-crm About (a DIFFERENT reference's marketing
// arm) retired with that group.
export const metadata = pageMetadata({ page: "About", route: "/about" });

export default function AboutRoute() {
  return <AboutPage />;
}
