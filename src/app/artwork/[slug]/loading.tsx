import { Skeleton } from "@/components/ui/skeleton";

export default function ArtworkLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <Skeleton className="h-4 w-32" />
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Skeleton className="aspect-[4/5] w-full" />
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-9 w-64" />
          <Skeleton className="mt-3 h-5 w-16" />
          <div className="mt-8 space-y-4 border-t border-border pt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
