import { TutorProfile } from "@/types/tutor.type";
import TutorCard from "./TutorCard";

export default function TutorsGrid({ tutors }: { tutors: TutorProfile[] }) {
  if (!tutors.length) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-card/70 p-10 text-center">
        <p className="text-base font-semibold">No tutors matched these filters</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting the category, rating, subject, or price range.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
