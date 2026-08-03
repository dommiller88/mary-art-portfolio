import { Skeleton } from "@/components/ui/skeleton";

export default function ExhibitionsLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-32 lg:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="mt-16 space-y-10 border-l border-border pl-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full max-w-md" />
        ))}
      </div>
    </div>
  );
}
