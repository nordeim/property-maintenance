import { ContactPage } from "@/components/site/contact-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /contact — the quote-request surface (the extracted
// form inventory; the SUPERSET submit → POST /api/quote-requests).
export const metadata = pageMetadata({ page: "Contact", route: "/contact" });

export default async function ContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  // Next 16: searchParams is a Promise on the server — awaited here (the
  // s24 doctrine: the URL read lives at the page, the component takes a
  // prop).
  const params = await searchParams;
  return <ContactPage preselected={params.service ?? ""} />;
}
