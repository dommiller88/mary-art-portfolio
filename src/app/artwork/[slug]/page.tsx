import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ImageMasonry } from "@/components/gallery/image-masonry";
import { AnimatedSection } from "@/components/shared/animated-section";
import { RichText } from "@/components/shared/portable-text";
import { Badge } from "@/components/ui/badge";
import { formatDimensions } from "@/lib/format";
import {
  getAdjacentArtworks,
  getArtworkBySlug,
  getArtworkSlugs,
} from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getArtworkSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) return {};

  const imageUrl = urlForImage(artwork.mainImage)?.width(1200).height(1500).url();

  return {
    title: `${artwork.title} (${artwork.year})`,
    description:
      artwork.seo?.metaDescription ?? `${artwork.medium}, ${artwork.year} by ${artwork.title}.`,
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  };
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) notFound();

  const { previous, next } = await getAdjacentArtworks(artwork._id, artwork.year);

  const mainImageUrl = urlForImage(artwork.mainImage)?.width(1600).height(2000).url();
  const dimensions = formatDimensions(artwork.dimensions);

  const additionalImages =
    artwork.additionalImages
      ?.map((image) => {
        const src = urlForImage(image)?.width(1200).url();
        return src ? { src, alt: image.alt ?? artwork.title } : null;
      })
      .filter((image): image is { src: string; alt: string } => image !== null) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to gallery
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <AnimatedSection className="tape-corner relative aspect-[4/5] border border-border bg-card p-2">
          <div className="relative h-full w-full overflow-hidden bg-muted">
            {mainImageUrl && (
              <Image
                src={mainImageUrl}
                alt={artwork.mainImage?.alt ?? artwork.title}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-label text-muted-foreground">
            {artwork.category?.title}
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl">{artwork.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{artwork.year}</p>

          <div className="mt-8 space-y-3 border-t border-border pt-8">
            <InfoRow label="Medium" value={artwork.medium} />
            {dimensions && <InfoRow label="Dimensions" value={dimensions} />}
            {artwork.collection && <InfoRow label="Collection" value={artwork.collection} />}
            {artwork.commissioned && <InfoRow label="Commission" value="Commissioned work" />}
            <InfoRow
              label="Availability"
              value={
                <Badge variant={artwork.availability === "available" ? "default" : "secondary"}>
                  {artwork.availability === "available"
                    ? "Available"
                    : artwork.availability === "sold"
                      ? "Sold"
                      : "Not for sale"}
                </Badge>
              }
            />
            {artwork.availability === "available" && artwork.price && (
              <InfoRow label="Price" value={artwork.price} />
            )}
          </div>

          {artwork.description && artwork.description.length > 0 && (
            <div className="mt-8 border-t border-border pt-8">
              <RichText value={artwork.description} />
            </div>
          )}
        </AnimatedSection>
      </div>

      {additionalImages.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display mb-8 text-2xl">Additional views</h2>
          <ImageMasonry images={additionalImages} />
        </div>
      )}

      <nav className="mt-24 flex items-center justify-between border-t border-border pt-8">
        {previous ? (
          <Link
            href={`/artwork/${previous.slug.current}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="text-label block text-muted-foreground">Previous</span>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/artwork/${next.slug.current}`}
            className="group flex items-center gap-2 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>
              <span className="text-label block text-muted-foreground">Next</span>
              {next.title}
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-label text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
