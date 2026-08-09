import type { Metadata } from "next";

import { ArtworkCard } from "@/components/gallery/artwork-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCommissionedArtworks } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Commissions",
  description: "Commissioned works.",
};

export default async function CommissionsPage() {
  const artworks = await getCommissionedArtworks();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <SectionHeading
        eyebrow="Commissions"
        title="Commissioned works"
        description="A selection of pieces made for private commission."
      />

      {artworks.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, index) => (
            <ArtworkCard artwork={artwork} key={artwork._id} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No commissioned works yet.
        </p>
      )}
    </div>
  );
}
