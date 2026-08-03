"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox, type LightboxImage } from "@/components/gallery/lightbox";
import { AnimatedSection } from "@/components/shared/animated-section";

export function ImageMasonry({ images }: { images: LightboxImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2">
        {images.map((image, index) => (
          <AnimatedSection
            key={image.src}
            className="mb-6 break-inside-avoid"
            delay={Math.min(index * 0.05, 0.2)}
          >
            <div className="tape-corner relative border border-border bg-card p-2">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block w-full cursor-zoom-in overflow-hidden bg-muted"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={900}
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
