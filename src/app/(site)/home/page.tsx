import { HomePage } from "@/components/site/home-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /home — the reference's own canonical home path (its
// header/footer Home links point here; the root "/" serves the same
// construction).
export const metadata = pageMetadata({ page: null, route: "/home" });

export default function SiteHomeNamedRoute() {
  return <HomePage />;
}
