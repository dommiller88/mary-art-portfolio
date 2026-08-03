import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtworkCard } from "@/components/gallery/artwork-card";
import { ImageMasonry } from "@/components/gallery/image-masonry";
import { AnimatedSection } from "@/components/shared/animated-section";
import { RichText } from "@/components/shared/portable-text";
import { formatExhibitionDates } from "@/lib/format";
import { getExhibitionBySlug, getExhibitionSlugs } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getExhibitionSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) return {};

  const imageUrl = urlForImage(exhibition.coverImage)?.width(1200).height(630).url();

  return {
    title: exhibition.title,
    description: `${exhibition.type === "solo" ? "Solo" : "Group"} exhibition at ${exhibition.venue}, ${exhibition.city}.`,
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  };
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) notFound();

  const coverUrl = urlForImage(exhibition.coverImage)?.width(2000).height(1125).url();
  const artworks = exhibition.artworks ?? [];

  const installationImages =
    exhibition.installationImages
      ?.map((image) => {
        const src = urlForImage(image)?.width(1400).url();
        return src ? { src, alt: image.alt ?? exhibition.title } : null;
      })
      .filter((image): image is { src: string; alt: string } => image !== null) ?? [];

  return (
    <article className="mx-auto max-w-6xl px-6 py-32 lg:px-10">
      <Link
        href="/exhibitions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All exhibitions
      </Link>

      <AnimatedSection>
        <header className="mt-10">
          <p className="text-label text-muted-foreground">
            {exhibition.type === "solo" ? "Solo exhibition" : "Group exhibition"}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[1.1] font-light sm:text-6xl">
            {exhibition.title}
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-8">
            <MetaItem label="Venue" value={exhibition.venue} />
            <MetaItem
              label="Location"
              value={[exhibition.city, exhibition.country].filter(Boolean).join(", ")}
            />
            <MetaItem
              label="Dates"
              value={formatExhibitionDates(exhibition.startDate, exhibition.endDate)}
            />
          </dl>

          {exhibition.url && (
            <a
              href={exhibition.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Visit the venue&apos;s page
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </header>
      </AnimatedSection>

      {coverUrl && (
        <AnimatedSection className="relative mt-14 aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={coverUrl}
            alt={exhibition.coverImage?.alt ?? exhibition.title}
            fill
            priority
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </AnimatedSection>
      )}

      {exhibition.description && exhibition.description.length > 0 && (
        <AnimatedSection className="mt-16 max-w-2xl">
          <RichText value={exhibition.description} />
        </AnimatedSection>
      )}

      {installationImages.length > 0 && (
        <section className="mt-24">
          <h2 className="text-label border-b border-border pb-4 text-muted-foreground">
            Installation views
          </h2>
          <div className="mt-10">
            <ImageMasonry images={installationImages} />
          </div>
        </section>
      )}

      {artworks.length > 0 && (
        <section className="mt-24">
          <h2 className="text-label border-b border-border pb-4 text-muted-foreground">
            Works in this exhibition
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork, index) => (
              <ArtworkCard key={artwork._id} artwork={artwork} priority={index < 3} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-label text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm">{value}</dd>
    </div>
  );
}
