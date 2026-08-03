import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-10 w-80" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />

      <div className="mt-14 flex gap-6 border-b border-border pb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] w-full" />
        ))}
      </div>
    </div>
  );
}
