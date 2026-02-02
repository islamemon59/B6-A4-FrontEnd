import { publicService } from "@/services/public.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDay(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatTimeRange(startIso: string, endIso: string) {
  try {
    const start = new Date(startIso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = new Date(endIso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${start} - ${end}`;
  } catch {
    return `${startIso} - ${endIso}`;
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default async function SingleTutorPage({ params }: PageProps) {
  const { id } = await params;

  const res = await publicService.getSingleTutor(id);
  console.log(res);
  const tutor = res?.data;

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-sm text-muted-foreground">Tutor not found.</p>
      </div>
    );
  }

  const rating =
    typeof tutor.ratingAvg === "number" ? tutor.ratingAvg.toFixed(1) : "N/A";

  const subjects: string[] = Array.isArray(tutor.subjects)
    ? tutor.subjects
    : [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{tutor.headline}</CardTitle>

              <div className="flex flex-wrap gap-2">
                {tutor.isFeatured ? <Badge>⭐ Featured</Badge> : null}

                {tutor.category?.name ? (
                  <Badge variant="outline">{tutor.category.name}</Badge>
                ) : tutor.categoryId ? (
                  <Badge variant="outline">Category: {tutor.categoryId}</Badge>
                ) : null}

                <Badge variant="secondary">{tutor.meetingMode}</Badge>

                <Badge variant="outline">{tutor.profileStatus}</Badge>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold">
                {tutor.hourlyRate} {tutor.currency}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / hour
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                ⭐ {rating} ({tutor.ratingCount} reviews)
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* About */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold">About</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {tutor.about}
            </p>
          </div>

          <Separator />

          {/* Subjects */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Subjects</h2>
            {subjects.length ? (
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No subjects added yet.
              </p>
            )}
          </div>

          <Separator />

          {/* Meta info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border p-4 space-y-2">
              <h3 className="font-semibold">Tutor Info</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Tutor Profile ID:
                </span>{" "}
                {tutor.id}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">User ID:</span>{" "}
                {tutor.userId}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Category ID:
                </span>{" "}
                {tutor.categoryId}
              </p>
            </div>

            <div className="rounded-md border p-4 space-y-2">
              <h3 className="font-semibold">Timeline</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Created At:</span>{" "}
                {formatDate(tutor.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Updated At:</span>{" "}
                {formatDate(tutor.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Step area (optional placeholder) */}
      <Card>
        <CardContent>
          {/* Availability Slots */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Availability</h2>

            {tutor.availabilitySlots?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tutor.availabilitySlots
                  // optional: only show not booked slots if your API includes isBooked
                  .filter((s: any) => s?.isBooked !== true)
                  .map((slot: any) => (
                    <div
                      key={slot.id}
                      className="rounded-md border p-3 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {formatDay(slot.startTime)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTimeRange(slot.startTime, slot.endTime)}
                        </p>
                      </div>

                      <Badge variant="outline">Available</Badge>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No availability slots available right now. Please check back
                later.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
