import { Skeleton } from "@/components/ui/skeleton";

export default function ExhibitionDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 lg:px-10">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-10 h-3 w-28" />
      <Skeleton className="mt-4 h-14 w-full max-w-2xl" />

      <div className="mt-8 flex gap-12 border-t border-border pt-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-14 aspect-[16/9] w-full" />
    </div>
  );
}
