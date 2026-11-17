// Session-199: the /Contact capital-casing render alias — the reference's
// own links mix casings (its platform serves both). The .jsx-extension
// pattern is the house TS1149 dodge (paths differing only in casing trip
// TypeScript's casing check; the extension keeps the alias out of that
// collision while compiling identically through SWC). The lowercase
// route stays canonical. This alias is ASYNC: the contact page reads
// ?service= through its searchParams prop, so the alias resolves its
// own and passes it down (the s24 URL-state doctrine — the read lives
// at the page, never in a component).
import ContactPage from "../contact/page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Contact", route: "/Contact" });

export default async function ContactCapitalRoute({
  searchParams,
}) {
  const params = await searchParams;
  return <ContactPage preselected={params.service ?? ""} />;
}
