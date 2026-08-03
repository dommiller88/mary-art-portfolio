import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getArtworks, getCategories } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the complete collection of paintings, drawings, prints, and more.",
};

export default async function GalleryPage() {
  const [artworks, categories] = await Promise.all([getArtworks(), getCategories()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <SectionHeading
        eyebrow="Gallery"
        title="The complete collection"
        description="Filter by medium to explore paintings, drawings, prints, digital work, photography, and sculpture."
      />

      <div className="mt-14">
        <GalleryGrid artworks={artworks} categories={categories} />
      </div>
    </div>
  );
}
