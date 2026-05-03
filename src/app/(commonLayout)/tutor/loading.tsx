import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTutorsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-full" />
          <Skeleton className="h-4 w-[32rem] max-w-full rounded-full" />
        </div>
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>

      <div className="rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-52 rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-full rounded-full" />
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/90 shadow-sm"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-none" />

            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <Skeleton className="h-6 w-5/6 rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-4/5 rounded-full" />
              </div>

              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              <div className="space-y-3 rounded-2xl bg-secondary/55 p-4">
                <Skeleton className="h-4 w-2/3 rounded-full" />
                <Skeleton className="h-4 w-5/6 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </div>

              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-border/70 bg-card/75 p-4 sm:flex-row">
        <Skeleton className="h-4 w-28 rounded-full" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
