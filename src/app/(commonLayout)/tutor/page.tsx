import TutorsClientFilters from "@/components/modules/homepage/TutorClientFilters";
import { TutorPagination } from "@/components/modules/homepage/TutorPagination";
import TutorsGrid from "@/components/modules/homepage/TutorsGrid";
import { Badge } from "@/components/ui/badge";
import { publicService } from "@/services/public.service";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const query = {
    q: typeof sp.q === "string" ? sp.q : undefined,
    categoryId: typeof sp.categoryId === "string" ? sp.categoryId : undefined,
    subject: typeof sp.subject === "string" ? sp.subject : undefined,
    minRating: typeof sp.minRating === "string" ? sp.minRating : undefined,
    minPrice: typeof sp.minPrice === "string" ? sp.minPrice : undefined,
    maxPrice: typeof sp.maxPrice === "string" ? sp.maxPrice : undefined,
    sortBy: typeof sp.sortBy === "string" ? sp.sortBy : "latest",
    sortOrder: typeof sp.sortOrder === "string" ? sp.sortOrder : "desc",
    page: typeof sp.page === "string" ? sp.page : "1",
    limit: typeof sp.limit === "string" ? sp.limit : "8",
  };

  const [result, categoriesRes] = await Promise.all([
    publicService.getAllTutor(query),
    publicService.getPublicCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Explore tutors
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Find the right tutor for your next milestone
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search published tutor profiles, compare pricing and ratings, and
            filter by the exact learning direction you need.
          </p>
        </div>

        <Badge variant="outline" className="w-fit rounded-full px-4 py-2 text-sm">
          {result.meta.total} tutors found
        </Badge>
      </div>

      <TutorsClientFilters categories={categoriesRes.data || []} />

      <TutorsGrid tutors={result.data || []} />

      <TutorPagination
        page={result.meta.page}
        totalPages={result.meta.totalPages}
        searchParams={sp}
      />
    </div>
  );
}
