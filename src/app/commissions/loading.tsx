import { Skeleton } from "@/components/ui/skeleton";

export default function CommissionsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-4 h-10 w-72" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] w-full" />
        ))}
      </div>
    </div>
  );
}
