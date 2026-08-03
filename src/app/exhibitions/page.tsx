import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatExhibitionDates } from "@/lib/format";
import { getExhibitions } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";
import type { Exhibition } from "@/types";

export const metadata: Metadata = {
  title: "Exhibitions",
  description: "A chronological history of solo and group exhibitions.",
};

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();

  const now = Date.now();
  const current = exhibitions.filter((exhibition) => {
    const end = exhibition.endDate ? new Date(exhibition.endDate).getTime() : null;
    return end === null ? false : end >= now;
  });
  const past = exhibitions.filter((exhibition) => !current.includes(exhibition));

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 lg:px-10">
      <SectionHeading
        eyebrow="Exhibitions"
        title="Exhibitions & selected showings"
        description="Solo and group exhibitions, most recent first. Each entry opens a page with installation photographs and the works on view."
      />

      {exhibitions.length === 0 && (
        <p className="mt-20 text-sm text-muted-foreground">
          Exhibitions will appear here once added in the CMS.
        </p>
      )}

      {current.length > 0 && (
        <ExhibitionSection title="Current & upcoming" exhibitions={current} />
      )}
      {past.length > 0 && (
        <ExhibitionSection
          title={current.length > 0 ? "Past" : "All exhibitions"}
          exhibitions={past}
        />
      )}
    </div>
  );
}

function ExhibitionSection({
  title,
  exhibitions,
}: {
  title: string;
  exhibitions: Exhibition[];
}) {
  return (
    <section className="mt-20">
      <h2 className="text-label border-b border-border pb-4 text-muted-foreground">
        {title}
      </h2>

      <ul>
        {exhibitions.map((exhibition, index) => (
          <AnimatedSection as="section" key={exhibition._id} delay={Math.min(index * 0.05, 0.25)}>
            <li>
              <ExhibitionRow exhibition={exhibition} />
            </li>
          </AnimatedSection>
        ))}
      </ul>
    </section>
  );
}

function ExhibitionRow({ exhibition }: { exhibition: Exhibition }) {
  const thumbnailUrl = urlForImage(exhibition.coverImage)?.width(320).height(240).url();

  return (
    <Link
      href={`/exhibitions/${exhibition.slug.current}`}
      className="group grid grid-cols-1 items-center gap-x-8 gap-y-4 border-b border-border py-8 sm:grid-cols-[9rem_7rem_1fr_auto] sm:py-7"
    >
      <div className="text-label text-muted-foreground">
        <span className="block">{exhibition.type === "solo" ? "Solo" : "Group"}</span>
        <span className="mt-1 block normal-case tracking-normal">
          {formatExhibitionDates(exhibition.startDate, exhibition.endDate)}
        </span>
      </div>

      <div className="relative hidden aspect-[4/3] overflow-hidden bg-muted sm:block">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={exhibition.coverImage?.alt ?? exhibition.title}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl leading-snug transition-colors group-hover:text-muted-foreground">
          {exhibition.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {exhibition.venue}, {exhibition.city}
          {exhibition.country ? `, ${exhibition.country}` : ""}
        </p>
      </div>

      <ArrowRight className="hidden size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground sm:block" />
    </Link>
  );
}
