import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

function createPageHref(
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string" && value) {
      params.set(key, value);
    }
  });

  params.set("page", String(page));
  return `/tutor?${params.toString()}`;
}

export function TutorPagination({ page, totalPages, searchParams }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-[1.5rem] border border-border/70 bg-card/75 p-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          asChild
          variant="outline"
          className="rounded-full"
          disabled={page <= 1}
        >
          <Link href={createPageHref(searchParams, Math.max(1, page - 1))}>
            Previous
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full"
          disabled={page >= totalPages}
        >
          <Link
            href={createPageHref(searchParams, Math.min(totalPages, page + 1))}
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
