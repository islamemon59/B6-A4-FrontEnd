import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTutorsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-80 rounded-full" />
      <Skeleton className="h-44 w-full rounded-[2rem]" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1.5rem] border border-border/70 p-4"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-[1.25rem]" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
