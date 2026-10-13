import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArtistStatement } from "@/components/sections/artist-statement";
import { FeaturedWorks } from "@/components/sections/featured-works";
import { Hero } from "@/components/sections/hero";
import { RecentExhibitions } from "@/components/sections/recent-exhibitions";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  getBiography,
  getFeaturedArtworks,
  getRecentExhibitions,
} from "@/sanity/lib/fetchers";

export default async function HomePage() {
  const [biography, featuredArtworks, recentExhibitions] = await Promise.all([
    getBiography(),
    getFeaturedArtworks(),
    getRecentExhibitions(),
  ]);

  const heroArtwork = featuredArtworks[0] ?? null;

  return (
    <>
      <Hero
        artwork={heroArtwork}
        name={biography?.name ?? "Artist"}
        tagline={biography?.shortBio}
      />

      <FeaturedWorks artworks={featuredArtworks} />

      <ArtistStatement biography={biography} />

      <RecentExhibitions exhibitions={recentExhibitions} />

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl">
              Explore the full body of work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Browse paintings, drawings, prints, and more across the complete
              gallery.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/gallery">
                Visit the gallery
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
