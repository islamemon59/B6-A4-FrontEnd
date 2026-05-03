import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TutorProfile } from "@/types/tutor.type";
import { getTutorGalleryImages } from "@/lib/site-content";

export default function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const image = getTutorGalleryImages(tutor.category?.name, tutor.user?.image)[0];

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border-border/70 bg-card/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={tutor.user?.name || tutor.headline}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
        {tutor.isFeatured ? (
          <Badge className="absolute left-4 top-4 rounded-full bg-accent text-accent-foreground">
            Featured
          </Badge>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-medium text-white/90">
            {tutor.user?.name || "SkillBridge Tutor"}
          </p>
          <p className="text-xs text-white/75">{tutor.category?.name}</p>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
            {tutor.headline}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {tutor.about}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 3).map((subject) => (
            <Badge key={subject} variant="outline" className="rounded-full">
              {subject}
            </Badge>
          ))}
        </div>

        <div className="grid gap-3 rounded-2xl bg-secondary/55 p-4 text-sm">
          <div className="flex items-center gap-2">
            <Wallet className="size-4 text-primary" />
            <span className="font-medium">
              {tutor.currency} {tutor.hourlyRate}/hr
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="size-4 text-accent" />
            <span>
              {tutor.ratingAvg?.toFixed(1) || "0.0"} rating
              <span className="text-muted-foreground">
                {" "}
                ({tutor.ratingCount} reviews)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <span>{tutor.meetingMode.replace("_", " ")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-5 pt-0">
        <Button asChild className="w-full rounded-full">
          <Link href={`/tutor/${tutor.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
