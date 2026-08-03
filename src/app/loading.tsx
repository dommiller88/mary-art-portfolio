import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="flex min-h-[92vh] w-full items-end bg-muted px-6 pb-24 lg:px-10">
      <div className="w-full max-w-3xl space-y-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-14 w-full max-w-xl" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
