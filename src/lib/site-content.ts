// Session-199 (the property-maintenance checkout round): the OASIS
// SITE CONTENT — every string, list and URL below is the live-recon
// ground truth from the reference deployment (scripts/recon-199*.ts,
// legs 8-11; extracted 2026-11-15). The photography is the reference's
// own hosted stock (Unsplash URLs + the Green Cut base44 media assets)
// — the owner's clone authorization covers referencing them, and the
// same URLs keep the two apps pixel-comparable (the shared-source
// genus, documented in the plan §8).
//
// Content is DATA, not markup: the pages render these constants, so a
// content fix is one edit here (and the e2e marketing battery pins the
// rendered result).

// ---- The services page: the five groups + the twelve cards ---------
export interface ServiceCard {
  title: string;
  blurb: string;
  img: string;
}

export const SERVICE_PAGE_GROUPS: readonly string[] = [
  "Lawn & Garden Care",
  "Exterior Cleaning",
  "Property & General Maintenance",
  "NDIS & Support Homes",
  "Need something else?",
] as const;

export const SERVICE_PAGE_CARDS: readonly ServiceCard[] = [
  { title: "Lawn Mowing & Edging", blurb: "Professional mowing with clean edges, blow down, and optional clippings removal. Prices depend on block size & access.", img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600" },
  { title: "Whipper Snipping", blurb: "Trim hard-to-reach areas, edges, and overgrown sections with precision.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600" },
  { title: "Garden Tidy-Ups", blurb: "Seasonal clean-ups, weeding, and general garden maintenance to keep your space looking fresh.", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600" },
  { title: "Hedge & Shrub Trimming", blurb: "Keep hedges shaped and safe from overgrowth with professional trimming services.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" },
  { title: "Mulch Top-Ups", blurb: "Fresh mulch application to keep garden beds healthy and weed-free.", img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600" },
  { title: "Pressure Washing", blurb: "High-pressure cleaning for driveways, paths, patios and pool areas. Perfect for removing mould and grime.", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600" },
  { title: "Soft Wash", blurb: "Gentle cleaning solution for delicate outdoor surfaces and painted areas.", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600" },
  { title: "Gutter Cleaning", blurb: "Prevent roof and water damage with professional gutter cleaning - perfect before storm season.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600" },
  { title: "Green Waste Removal", blurb: "Same-day removal where possible. We take it away so you don't have to deal with it.", img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600" },
  { title: "Rental / Bond Tidy", blurb: "End-of-lease garden and outdoor tidy-ups to help you get your bond back.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" },
  { title: "Small Handyman Tasks", blurb: "Minor repairs and maintenance - door fixes, gate repairs, outdoor lights, letterbox repair.", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600" },
  { title: "Strata & Body Corporate", blurb: "Regular maintenance visits for common areas and grounds of body corporate properties.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" },
] as const;

// ---- The gallery: the six before/after pairs ------------------------
export interface GalleryPair { label: string; before: string; after: string; }

export const GALLERY_PAIRS: readonly GalleryPair[] = [
  { label: "Overgrown → Restored", before: "https://media.base44.com/images/public/6907475d81a975154143174e/5c0e0a134_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/e45da878a_generated_image.png" },
  { label: "Mouldy Driveway → Clean", before: "https://media.base44.com/images/public/6907475d81a975154143174e/56fd4e72a_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/a73684544_generated_image.png" },
  { label: "Neglected Garden → Tidy", before: "https://media.base44.com/images/public/6907475d81a975154143174e/300b8254e_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/617a8c313_generated_image.png" },
  { label: "Long Grass → Manicured", before: "https://media.base44.com/images/public/6907475d81a975154143174e/0aa10b0ba_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/332d94d58_generated_image.png" },
  { label: "Storm Cleanup → Safe Access", before: "https://media.base44.com/images/public/6907475d81a975154143174e/43fc99952_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/a3311a110_generated_image.png" },
  { label: "Overgrown Hedge → Shaped", before: "https://media.base44.com/images/public/6907475d81a975154143174e/b794fcee2_generated_image.png", after: "https://media.base44.com/images/public/6907475d81a975154143174e/38567b80b_generated_image.png" },
] as const;

export const GALLERY_CHIPS: readonly string[] = ["Lawn Care", "Pressure Washing", "Garden Tidy", "Lawn Mowing", "Green Waste", "Hedge Trimming"] as const;

// ---- The FAQ: the six groups + the twenty-one accordion items -------
export interface FaqItem { group: string; question: string; answer: string; }

export const FAQ_GROUPS: readonly string[] = [
  "Pricing & Quotes",
  "Services & Scheduling",
  "Property Access & Safety",
  "Specific Services",
  "Payment & Admin",
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  { group: "Pricing & Quotes", question: "How much is lawn mowing?", answer: "Most small residential lawns start from $45-$65 depending on access, slope, and green waste removal. Block size, terrain, and whether clippings need to be removed all affect the price. We provide free quotes so you know exactly what to expect." },
  { group: "Pricing & Quotes", question: "How do you calculate the price?", answer: "We consider several factors: property size, access (gates, stairs, slopes), current condition, frequency of service, and whether you want clippings removed. Regular customers often get better rates than one-off visits." },
  { group: "Pricing & Quotes", question: "Do you charge extra for green waste removal?", answer: "It depends on the service. For lawn mowing, we can include clippings removal or mulch them on-site. For larger jobs like garden tidy-ups or storm cleanup, green waste removal is usually quoted separately based on volume." },
  { group: "Pricing & Quotes", question: "Can I get a quote without a site visit?", answer: "For most standard residential properties, we can provide an accurate quote from photos and your address (we use satellite view to check size). For larger or complex properties, we prefer a quick site visit to give you the best price." },
  { group: "Services & Scheduling", question: "Do you take the clippings?", answer: "Yes, clippings removal can be included in your service. We can either take them away, or mulch them back into the lawn (which is better for the lawn health). Just let us know your preference." },
  { group: "Services & Scheduling", question: "Can I book regular visits?", answer: "Absolutely! We offer weekly, fortnightly, or every 4 weeks scheduling. Regular customers get priority booking and often better rates. We send reminders before each visit and keep notes about your property preferences." },
  { group: "Services & Scheduling", question: "What if I need a one-off service?", answer: "No problem. We do plenty of one-off jobs - end of lease tidy-ups, pre-sale cleanups, storm damage, or just catching up on an overgrown property. One-off pricing is slightly higher than regular service rates." },
  { group: "Services & Scheduling", question: "Do you work in the rain?", answer: "We avoid mowing in heavy rain as it damages lawns and creates a mess. If weather prevents your scheduled service, we'll reschedule at no extra charge. For other services like gutter cleaning or pressure washing, light rain is usually fine." },
  { group: "Services & Scheduling", question: "How do I reschedule or cancel?", answer: "Just call or text us. We ask for 24 hours notice if possible. For regular customers on a schedule, we're flexible and will work around your needs." },
  { group: "Property Access & Safety", question: "Do I need to be home?", answer: "No, as long as we can access your property. Many of our regular customers provide gate codes or leave gates unlocked on service days. We'll send a message when we're done and can leave before/after photos." },
  { group: "Property Access & Safety", question: "What about my pets?", answer: "We love pets! Just let us know if you have dogs. If they're friendly and secured, we can work around them. If they're protective, we might need you home or for them to be inside during the service." },
  { group: "Property Access & Safety", question: "Are you insured?", answer: "Yes – we carry public liability insurance. We can provide a copy of our certificate if needed (common for body corporate or NDIS work). We also take photos before starting work for record-keeping." },
  { group: "Property Access & Safety", question: "What if something gets damaged?", answer: "We take care to avoid damage, but if something does happen, we'll let you know immediately and work with you to fix it. That's what our insurance is for." },
  { group: "Specific Services", question: "Can you clean single-storey gutters?", answer: "Yes, we handle single-storey gutter cleaning. We clear out leaves and debris, flush downpipes, and provide photos of the work done. Perfect before storm season (October-March in SE QLD)." },
  { group: "Specific Services", question: "Do you do two-storey houses?", answer: "For most services yes, but for gutter cleaning we currently only service single-storey properties. For two-storey gutters, we can recommend a specialist." },
  { group: "Specific Services", question: "What pressure washing surfaces can you clean?", answer: "Driveways, paths, patios, pool surrounds, tennis courts, and most outdoor hard surfaces. We use appropriate pressure for the surface – high pressure for concrete, gentler pressure for pavers and delicate surfaces." },
  { group: "Specific Services", question: "Can you trim high hedges?", answer: "We can trim hedges up to about 2.5-3 metres. For very tall hedges or those requiring specialist equipment, we may need to bring in additional help or refer you to a specialist arborist." },
  { group: "Specific Services", question: "Do you work with NDIS participants?", answer: "Yes, we work with support coordinators to maintain safe, accessible outdoor spaces for NDIS participants. We understand the importance of clear pathways, safe access, and consistent quality for support homes." },
  { group: "Payment & Admin", question: "When do I pay?", answer: "We typically invoice after the service is completed. Regular customers can set up direct debit or pay by invoice. We accept bank transfer, cash, or card payment." },
  { group: "Payment & Admin", question: "Do you provide receipts and invoices?", answer: "Yes, all work is invoiced properly with ABN. Perfect for rental property owners, body corporate, or anyone who needs documentation for tax or records." },
  { group: "Payment & Admin", question: "Can you invoice my property manager?", answer: "Absolutely. We work with many property managers and real estate agents. Just provide their details and we'll send invoices directly to them." },
] as const;

// ---- The contact form inventory --------------------------------------
export const CONTACT_PLACEHOLDERS = {
  name: "John Smith",
  phone: "0400 000 000",
  email: "john@example.com",
  message: "Tell us more about your property, any specific requirements, best time to call you, etc.",
} as const;

export const CONTACT_SERVICE_OPTIONS: readonly string[] = [
  "Email Address",
  "Lawn mowing & edging",
  "Whipper snipping",
  "Garden tidy-up",
  "Hedge trimming",
  "Mulch top-up",
  "Pressure washing",
  "Gutter cleaning",
  "Green waste removal",
  "Bond/rental tidy",
  "Handyman tasks",
  "Strata maintenance",
  "Other",
] as const;

export const CONTACT_SERVICE_TYPES: readonly string[] = [
  "One-off job",
  "Ongoing/regular service",
] as const;

export const CONTACT_SUBURBS: readonly string[] = [
  "Parkwood",
  "Arundel",
  "Helensvale",
  "Coomera",
  "Pimpama",
  "Southport",
  "Robina",
  "Shailer Park",
  "Daisy Hill",
  "Springwood",
  "Beenleigh",
  "Loganholme",
  "Underwood",
  "Eight Mile Plains",
  "Sunnybank",
  "Calamvale",
  "Stretton",
  "Kuraby",
  "Other",
] as const;


// ---- The site chrome constants (the header/footer/nav) ---------------
export const SITE_LOGO_SRC =
  "https://media.base44.com/images/public/6907475d81a975154143174e/aa271b98d_image.png" as const;
export const SITE_NAME = "Oasis Property Maintenance" as const;
export const SITE_TAGLINE = "Healthy lawns. Tidy homes. Reliable service." as const;
export const SITE_PHONE = "0400 000 000" as const;
export const SITE_PHONE_HREF = "tel:+61400000000" as const;
export const SITE_EMAIL = "info@greencutlawncare.com.au" as const;
export const SITE_EMAIL_HREF = "mailto:info@greencutlawncare.com.au" as const;
export const SITE_REGIONS = "Gold Coast · Logan · South Brisbane" as const;

export const SITE_NAV_LINKS: readonly { label: string; href: string }[] = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
