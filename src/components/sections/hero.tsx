import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import type { ArtworkSummary } from "@/types";

export function Hero({
  artwork,
  name,
  tagline,
}: {
  artwork: ArtworkSummary | null;
  name: string;
  tagline?: string;
}) {
  const imageUrl = artwork
    ? urlForImage(artwork.mainImage)?.width(1000).height(1250).url()
    : undefined;

  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-28 lg:px-10">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <p className="text-label text-muted-foreground">{name}</p>
          <h1 className="font-display relative mt-5 max-w-2xl text-5xl leading-[1.08] font-light italic sm:text-7xl">
            {tagline ?? "Paintings and works on paper"}
          </h1>

          <p className="font-hand text-ink mt-6 -rotate-1 text-2xl">
            welcome to the studio —
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="h-14 gap-2.5 px-8 text-base">
              <Link href="/gallery">
                View the gallery
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            {artwork && (
              <Link
                href={`/artwork/${artwork.slug.current}`}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {artwork.title}, {artwork.year}
              </Link>
            )}
          </div>
        </div>

        {imageUrl && artwork && (
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <div className="tape-corner relative aspect-[4/5] rotate-2 border border-border bg-card p-2 shadow-[0_12px_28px_-12px_oklch(0.2_0_0/0.25)]">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={artwork.mainImage?.alt ?? artwork.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-hand text-ink mt-4 rotate-1 text-center text-xl">
              {artwork.title}, {artwork.year}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
