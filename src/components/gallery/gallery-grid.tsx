"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ArtworkCard } from "@/components/gallery/artwork-card";
import { cn } from "@/lib/utils";
import type { ArtworkSummary, Category } from "@/types";

// "Commissioned" is a cross-cutting flag rather than a medium, so it lives
// alongside the category slugs as its own reserved filter value.
const ALL = "all";
const COMMISSIONED = "commissioned";

export function GalleryGrid({
  artworks,
  categories,
}: {
  artworks: ArtworkSummary[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string>(ALL);

  const hasCommissioned = useMemo(
    () => artworks.some((artwork) => artwork.commissioned),
    [artworks]
  );

  const filtered = useMemo(() => {
    if (active === ALL) return artworks;
    if (active === COMMISSIONED) return artworks.filter((artwork) => artwork.commissioned);
    return artworks.filter((artwork) => artwork.category?.slug?.current === active);
  }, [artworks, active]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter artworks"
        className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-border pb-6"
      >
        <FilterButton active={active === ALL} onClick={() => setActive(ALL)}>
          All works
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category._id}
            active={active === category.slug.current}
            onClick={() => setActive(category.slug.current)}
          >
            {category.title}
          </FilterButton>
        ))}

        {hasCommissioned && (
          <>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <FilterButton
              active={active === COMMISSIONED}
              onClick={() => setActive(COMMISSIONED)}
            >
              Commissioned
            </FilterButton>
          </>
        )}
      </div>

      {/* Intentionally not wrapped in AnimatePresence: with mode="wait" the
          exit transition for the outgoing filter never resolved in testing,
          permanently freezing the grid on the previous filter. */}
      {filtered.length > 0 ? (
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((artwork, index) => (
            <ArtworkCard artwork={artwork} key={artwork._id} priority={index < 3} />
          ))}
        </motion.div>
      ) : (
        <motion.p
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          No works in this category yet.
        </motion.p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "text-label relative py-1 text-muted-foreground transition-colors hover:text-foreground",
        active && "text-foreground"
      )}
    >
      {children}
      {active && (
        <span
          aria-hidden="true"
          className="bg-ink/70 absolute -bottom-1 left-0 h-[3px] w-full"
          style={{
            maskImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 4'%3E%3Cpath d='M0 2 Q5 0 10 2 T20 2 T30 2 T40 2' stroke='black' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            maskSize: "100% 100%",
          }}
        />
      )}
    </button>
  );
}
