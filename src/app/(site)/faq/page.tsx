import { FaqPage } from "@/components/site/faq-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /faq — the 21-item accordion surface (the extracted
// reference content; the Radix accordion construction).
export const metadata = pageMetadata({ page: "FAQ", route: "/faq" });

export default function FaqRoute() {
  return <FaqPage />;
}
