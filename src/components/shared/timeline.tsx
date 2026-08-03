import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";

export interface TimelineItem {
  key: string;
  year: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-border">
      {items.map((item, index) => {
        const content = (
          <>
            <p className="text-label text-muted-foreground">
              {item.year}
            </p>
            <h3 className="font-display mt-1.5 text-xl">{item.title}</h3>
            {item.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
            )}
            {item.description && (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}
          </>
        );

        return (
          <AnimatedSection as="section" key={item.key} delay={Math.min(index * 0.04, 0.3)}>
            <li className="group relative pb-12 pl-8 last:pb-0">
              <span className="absolute top-1.5 -left-[5px] size-[9px] rounded-full bg-foreground transition-transform group-hover:scale-125" />
              {item.href ? (
                <Link href={item.href} className="block">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          </AnimatedSection>
        );
      })}
    </ol>
  );
}
