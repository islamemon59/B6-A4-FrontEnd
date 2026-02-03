import Link from "next/link";

export default function TutorCard({ tutor }: { tutor: any }) {
  return (
    <div className="rounded-md border p-4 space-y-2 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold line-clamp-1">
        {tutor.headline}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {tutor.about}
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        {tutor.subjects?.map((s: string) => (
          <span
            key={s}
            className="rounded bg-muted px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm pt-2">
        <span className="font-medium">
          {tutor.hourlyRate} {tutor.currency}/hr
        </span>
        <span>
          ⭐ {tutor.ratingAvg ?? "N/A"} ({tutor.ratingCount})
        </span>
      </div>

      <Link
        href={`/tutor/${tutor.id}`}
        className="inline-block text-sm font-medium text-primary underline underline-offset-4"
      >
        View Profile
      </Link>
    </div>
  );
}
