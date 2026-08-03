import type { Metadata } from "next";
import Image from "next/image";

import { AnimatedSection } from "@/components/shared/animated-section";
import { RichText } from "@/components/shared/portable-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBiography, getCvEntries } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "About",
  description: "Biography, artist statement, education, awards, and publications.",
};

const aboutSections = [
  { key: "education", label: "Education" },
  { key: "awards", label: "Awards" },
  { key: "publications", label: "Publications" },
] as const;

export default async function AboutPage() {
  const [biography, cvEntries] = await Promise.all([getBiography(), getCvEntries()]);

  const portraitUrl = urlForImage(biography?.portrait)?.width(1200).height(1500).url();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        {portraitUrl && (
          <AnimatedSection className="tape-corner relative border border-border bg-card p-2 lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={portraitUrl}
                alt={biography?.portrait?.alt ?? biography?.name ?? "Portrait"}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.1}>
          <SectionHeading eyebrow="About" title={biography?.name ?? "About the artist"} />

          <div className="mt-10">
            <h2 className="font-display text-xl">Biography</h2>
            <div className="mt-4">
              <RichText value={biography?.biography} />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl">Artist statement</h2>
            <div className="mt-4">
              <RichText value={biography?.artistStatement} />
            </div>
          </div>

          {aboutSections.map(({ key, label }) => {
            const entries = cvEntries.filter((entry) => entry.section === key);
            if (entries.length === 0) return null;

            return (
              <div key={key} className="mt-12">
                <h2 className="font-display text-xl">{label}</h2>
                <ul className="mt-4 space-y-3">
                  {entries.map((entry) => (
                    <li
                      key={entry._id}
                      className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span>
                        {entry.title}
                        {entry.organization && (
                          <span className="text-muted-foreground">
                            {" "}
                            — {entry.organization}
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground">{entry.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </AnimatedSection>
      </div>
    </div>
  );
}
