"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { ArtworkSummary } from "@/types";

export function ArtworkCard({
  artwork,
  priority = false,
}: {
  artwork: ArtworkSummary;
  priority?: boolean;
}) {
  const imageUrl = urlForImage(artwork.mainImage)?.width(900).height(1125).url();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/artwork/${artwork.slug.current}`} className="group block">
        <div className="tape-corner relative aspect-[4/5] border border-border bg-card p-2">
          <div className="relative h-full w-full overflow-hidden bg-muted">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={artwork.mainImage?.alt ?? artwork.title}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                priority={priority}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />

            {(artwork.commissioned || artwork.availability === "sold") && (
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {artwork.availability === "sold" && <span className="stamp">Sold</span>}
                {artwork.commissioned && (
                  <span className="stamp" style={{ transform: "rotate(2deg)" }}>
                    Commissioned
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Catalogue-style caption: always visible rather than hover-only, so
            the metadata is readable on touch devices and to screen readers. */}
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="font-display text-lg leading-snug transition-colors group-hover:text-muted-foreground">
            {artwork.title}
          </p>
          <p className="text-label shrink-0 text-muted-foreground">{artwork.year}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{artwork.medium}</p>
      </Link>
    </motion.div>
  );
}
