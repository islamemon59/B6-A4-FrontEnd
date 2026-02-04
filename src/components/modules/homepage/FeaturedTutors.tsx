import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { publicService } from "@/services/public.service";

export default async function FeaturedTutorCard() {
  const { data } = await publicService.getFeaturedTutor();

  const tutors = Array.isArray(data) ? data : [data];
  if (!tutors.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tutors.map((tutor) => {
        const rating =
          typeof tutor.ratingAvg === "number"
            ? tutor.ratingAvg.toFixed(1)
            : "N/A";

        const subjects = Array.isArray(tutor.subjects) ? tutor.subjects : [];
        const shownSubjects = subjects.slice(0, 3);

        const remaining = subjects.length - shownSubjects.length;

        if (!tutors || tutors.length === 0) {
          return (
            <div className="text-center py-12">
              <p className="text-xl font-semibold">
                No Featured Tutors Found 🎓
              </p>
              <p className="text-gray-500 mt-2">
                We’re working on adding more amazing tutors. Stay tuned!
              </p>
            </div>
          );
        }

        return (
          <Card
            key={tutor.id}
            className="relative overflow-hidden transition hover:shadow-lg"
          >
            <Badge className="absolute right-3 top-3 z-10">⭐ Featured</Badge>

            <CardHeader className="space-y-2">
              <h3 className="text-lg font-semibold line-clamp-2 mt-3">
                {tutor.headline}
              </h3>

              <div className="flex flex-wrap gap-2">
                {tutor.category?.name && (
                  <Badge variant="outline">{tutor.category.name}</Badge>
                )}
                <Badge variant="secondary">{tutor.meetingMode}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {tutor.about}
              </p>

              <div className="flex flex-wrap gap-2">
                {shownSubjects.map((s: string) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
                {remaining > 0 && <Badge variant="outline">+{remaining}</Badge>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {tutor.hourlyRate} {tutor.currency}/hr
                </span>
                <span>
                  ⭐ {rating}
                  <span className="text-muted-foreground">
                    {" "}
                    ({tutor.ratingCount})
                  </span>
                </span>
              </div>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
