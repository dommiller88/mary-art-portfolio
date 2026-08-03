import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatExhibitionDates } from "@/lib/format";
import type { Exhibition } from "@/types";

export function RecentExhibitions({ exhibitions }: { exhibitions: Exhibition[] }) {
  if (exhibitions.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <AnimatedSection className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Exhibitions" title="Recent & upcoming" />
        <Link
          href="/exhibitions"
          className="flex items-center gap-1.5 text-sm underline underline-offset-4 hover:text-foreground"
        >
          Full exhibition history
          <ArrowRight className="size-3.5" />
        </Link>
      </AnimatedSection>

      <ul className="divide-y divide-border border-t border-border">
        {exhibitions.map((exhibition, index) => (
          <AnimatedSection as="section" delay={index * 0.06} key={exhibition._id}>
            <li>
              <Link
                href={`/exhibitions/${exhibition.slug.current}`}
                className="group flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-display text-xl transition-colors group-hover:text-muted-foreground">
                    {exhibition.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {exhibition.venue}, {exhibition.city}
                  </p>
                </div>
                <p className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground">
                  {formatExhibitionDates(exhibition.startDate, exhibition.endDate)}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          </AnimatedSection>
        ))}
      </ul>
    </section>
  );
}
