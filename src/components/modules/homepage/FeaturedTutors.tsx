import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
            className="flex h-full flex-col relative overflow-hidden transition hover:shadow-lg"
          >
            {/* Featured Badge */}
            <Badge className="absolute right-3 top-3 z-10">⭐ Featured</Badge>

            <CardHeader className="space-y-2">
              {/* Headline */}
              <CardTitle className="text-base md:text-lg leading-snug line-clamp-2 mt-3 pr-12">
                {tutor.headline}
              </CardTitle>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2">
                {tutor.category?.name ? (
                  <Badge variant="outline">{tutor.category.name}</Badge>
                ) : null}
                <Badge variant="secondary">{tutor.meetingMode}</Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              {/* About */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {tutor.about}
              </p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2">
                {shownSubjects.map((s: string) => (
                  <Badge key={s} variant="outline" className="font-normal">
                    {s}
                  </Badge>
                ))}
                {remaining > 0 ? (
                  <Badge variant="outline" className="font-normal">
                    +{remaining}
                  </Badge>
                ) : null}
              </div>

              {/* Rate + Rating */}
              <div className="flex items-center justify-between pt-2 text-sm">
                <p className="font-semibold">
                  {tutor.hourlyRate} {tutor.currency}
                  <span className="text-muted-foreground font-normal">/hr</span>
                </p>

                <p className="font-medium">
                  ⭐ {rating}
                  <span className="text-muted-foreground">
                    {" "}
                    ({tutor.ratingCount})
                  </span>
                </p>
              </div>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild className="w-full rounded-xl">
                <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
