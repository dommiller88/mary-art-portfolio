import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArtworkCarousel } from "@/components/gallery/artwork-carousel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ArtworkSummary } from "@/types";

export function FeaturedWorks({ artworks }: { artworks: ArtworkSummary[] }) {
  if (artworks.length === 0) return null;

  return (
    <section className="bg-muted/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected works" title="Featured pieces" />
          <Link
            href="/gallery"
            className="flex items-center gap-1.5 text-sm underline underline-offset-4 hover:text-foreground"
          >
            View full gallery
            <ArrowRight className="size-3.5" />
          </Link>
        </AnimatedSection>

        <ArtworkCarousel artworks={artworks} />
      </div>
    </section>
  );
}
