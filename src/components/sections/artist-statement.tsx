import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { RichText } from "@/components/shared/portable-text";
import { urlForImage } from "@/sanity/lib/image";
import type { Biography } from "@/types";

export function ArtistStatement({ biography }: { biography: Biography | null }) {
  if (!biography) return null;

  const portraitUrl = urlForImage(biography.portrait)?.width(1000).height(1250).url();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {portraitUrl && (
          <AnimatedSection className="tape-corner relative order-2 -rotate-1 border border-border bg-card p-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={portraitUrl}
                alt={biography.portrait?.alt ?? biography.name}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.1} className="order-1 lg:order-2">
          <p className="text-label text-muted-foreground">
            Artist statement
          </p>
          <div className="mt-6">
            <RichText value={biography.artistStatement} />
          </div>
          <Link
            href="/about"
            className="mt-2 inline-block text-sm underline underline-offset-4 hover:text-foreground"
          >
            More about {biography.name}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
