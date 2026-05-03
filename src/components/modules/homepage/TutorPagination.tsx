"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

type PaginationItem = number | "ellipsis";

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

  const pages: PaginationItem[] = [];

  if (totalPages <= 7) {
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      pages.push(pageNumber);
    }
  } else {
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    pages.push(1);

    if (start > 2) {
      pages.push("ellipsis");
    }

    for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
      pages.push(pageNumber);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
  }

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

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 min-w-10 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={item === page ? "default" : "outline"}
              className="min-w-10 rounded-full"
              onClick={() => router.push(createPageHref(searchParams, item))}
            >
              {item}
            </Button>
          ),
        )}

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
