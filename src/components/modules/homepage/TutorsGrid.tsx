import TutorCard from "./TutorCard";

export default function TutorsGrid({ tutors }: { tutors: any[] }) {
  if (!tutors.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No tutors found for your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
