"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-border/70 bg-card/75 p-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          disabled={page <= 1}
          onClick={() =>
            router.push(createPageHref(searchParams, Math.max(1, page - 1)))
          }
        >
          Previous
        </Button>

        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            type="button"
            variant={pageNumber === page ? "default" : "outline"}
            className="min-w-10 rounded-full"
            onClick={() => router.push(createPageHref(searchParams, pageNumber))}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          disabled={page >= totalPages}
          onClick={() =>
            router.push(
              createPageHref(searchParams, Math.min(totalPages, page + 1)),
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
