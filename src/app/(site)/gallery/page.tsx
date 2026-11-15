import { GalleryPage } from "@/components/site/gallery-page";
import { pageMetadata } from "@/lib/site";

// Session-199: /gallery — the before/after surface (six extracted
// pairs on the reference's own hosted assets).
export const metadata = pageMetadata({ page: "Gallery", route: "/gallery" });

export default function GalleryRoute() {
  return <GalleryPage />;
}
