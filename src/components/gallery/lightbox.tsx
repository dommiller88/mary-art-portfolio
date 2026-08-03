"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface LightboxImage {
  src: string;
  alt: string;
}

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const isOpen = index !== null;
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + images.length) % images.length;
      onNavigate(next);
    },
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goTo]);

  const current = index !== null ? images[index] : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="h-[92vh] w-[96vw] max-w-6xl border-none bg-black/95 p-0 sm:rounded-none"
      >
        <DialogTitle className="sr-only">{current?.alt ?? "Artwork image"}</DialogTitle>
        {current && (
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="96vw"
              className="object-contain p-6 sm:p-12"
              priority
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
