import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Mail, Star, Wallet } from "lucide-react";
import TutorsGrid from "@/components/modules/homepage/TutorsGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTutorGalleryImages } from "@/lib/site-content";
import { publicService } from "@/services/public.service";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const end = new Date(endIso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${start} - ${end}`;
}

export default async function SingleTutorPage({ params }: PageProps) {
  const { id } = await params;
  const res = await publicService.getSingleTutor(id);
  const tutor = res?.data;

  if (!tutor) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-[2rem] border-dashed border-border/70">
          <CardContent className="p-10 text-center">
            <h1 className="text-2xl font-semibold">Tutor not found</h1>
            <p className="mt-3 text-muted-foreground">
              This profile may have been removed or is no longer public.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/tutor">Back to tutors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const gallery = getTutorGalleryImages(tutor.category?.name, tutor.user?.image);
  const availableSlots = (tutor.availabilitySlots || []).filter(
    (slot: any) => slot.isBooked !== true,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {tutor.isFeatured ? (
                <Badge className="rounded-full bg-accent text-accent-foreground">
                  Featured tutor
                </Badge>
              ) : null}
              {tutor.category?.name ? (
                <Badge variant="outline" className="rounded-full">
                  {tutor.category.name}
                </Badge>
              ) : null}
              <Badge variant="secondary" className="rounded-full">
                {tutor.meetingMode.replace("_", " ")}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-primary">
                {tutor.user?.name || "SkillBridge Tutor"}
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                {tutor.headline}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                {tutor.about}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="rounded-[1.5rem] border-border/70">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Wallet className="size-4" />
                  <span className="text-sm font-medium">Rate</span>
                </div>
                <p className="mt-3 text-2xl font-semibold">
                  {tutor.currency} {tutor.hourlyRate}
                </p>
                <p className="text-sm text-muted-foreground">Per hour session</p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] border-border/70">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Star className="size-4 text-accent" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <p className="mt-3 text-2xl font-semibold">
                  {tutor.ratingAvg?.toFixed(1) || "0.0"}
                </p>
                <p className="text-sm text-muted-foreground">
                  From {tutor.ratingCount} reviews
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] border-border/70">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-primary">
                  <CalendarDays className="size-4" />
                  <span className="text-sm font-medium">Availability</span>
                </div>
                <p className="mt-3 text-2xl font-semibold">{availableSlots.length}</p>
                <p className="text-sm text-muted-foreground">Open future slots</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/login">Login to book</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/tutor">Explore more tutors</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {gallery.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`relative overflow-hidden rounded-[2rem] ${
                index === 0 ? "h-80 sm:col-span-2" : "h-48"
              }`}
            >
              <Image
                src={src}
                alt={`${tutor.headline} gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
        <Card className="rounded-[2rem] border-border/70">
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold">What this tutor helps with</h2>
              <p className="mt-3 text-muted-foreground">{tutor.about}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold">Subjects</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(tutor.subjects || []).map((subject: string) => (
                  <Badge key={subject} variant="outline" className="rounded-full">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/70">
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Key information
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Session specifications</h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-secondary/60 p-4">
                <p className="text-sm text-muted-foreground">Teaching format</p>
                <p className="mt-1 font-semibold">{tutor.meetingMode.replace("_", " ")}</p>
              </div>
              <div className="rounded-[1.5rem] bg-secondary/60 p-4">
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <Mail className="size-4 text-primary" />
                  {tutor.user?.email}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-secondary/60 p-4">
                <p className="text-sm text-muted-foreground">Profile published</p>
                <p className="mt-1 font-semibold">{formatDate(tutor.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem] border-border/70">
          <CardContent className="space-y-5 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Availability
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Upcoming session windows</h2>
            </div>

            <div className="space-y-3">
              {availableSlots.length > 0 ? (
                availableSlots.slice(0, 6).map((slot: any) => (
                  <div
                    key={slot.id}
                    className="rounded-[1.5rem] border border-border/70 p-4"
                  >
                    <p className="font-semibold">{formatDate(slot.startTime)}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="size-4" />
                      {formatTimeRange(slot.startTime, slot.endTime)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No future slots are listed right now. Check back soon or contact the tutor.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/70">
          <CardContent className="space-y-5 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Reviews
              </p>
              <h2 className="mt-2 text-2xl font-semibold">What students are saying</h2>
            </div>

            <div className="space-y-4">
              {(tutor.reviews || []).length > 0 ? (
                tutor.reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="rounded-[1.5rem] border border-border/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">
                          {review.student?.name || "SkillBridge student"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {review.rating}/5
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {review.comment || "A rating was shared without a written review."}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No public reviews yet. Completed bookings will start showing up here.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Related tutors
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Similar experts learners explore next
          </h2>
        </div>
        <TutorsGrid tutors={tutor.relatedTutors || []} />
      </section>
    </div>
  );
}
