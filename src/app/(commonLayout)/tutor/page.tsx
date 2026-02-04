import TutorsClientFilters from "@/components/modules/homepage/TutorClientFilters";
import TutorsGrid from "@/components/modules/homepage/TutorsGrid";
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
    limit: typeof sp.limit === "string" ? sp.limit : "10",
  };

  const result = await publicService.getAllTutor(query);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <TutorsClientFilters />
      <TutorsGrid tutors={result?.data || []} />
    </div>
  );
}
