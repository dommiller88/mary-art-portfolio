import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-10">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="mt-4 h-10 w-64" />

      <div className="mt-16 space-y-8 border-t border-border pt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-8">
            <Skeleton className="aspect-[3/2] w-full" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
