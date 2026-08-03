"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { ArtworkCard } from "@/components/gallery/artwork-card";
import { Button } from "@/components/ui/button";
import type { ArtworkSummary } from "@/types";

export function ArtworkCarousel({ artworks }: { artworks: ArtworkSummary[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: "smooth" });
  }

  if (artworks.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {artworks.map((artwork, index) => (
          <div
            key={artwork._id}
            className="w-[78%] flex-none snap-start sm:w-[45%] lg:w-[30%]"
          >
            <ArtworkCard artwork={artwork} priority={index < 2} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Scroll right"
          onClick={() => scrollByAmount(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
