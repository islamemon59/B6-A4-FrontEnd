"use client";

import * as React from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MyBookingsSkeleton } from "@/components/modules/Booking/MyBookingSkeleton";
import { cancelBooking, getMyBookings } from "@/actions/student.action";
import { LeaveReviewDialog } from "@/components/modules/Tutor/LeaveReviewDialog";

type Booking = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  isReviewed: boolean;
  tutorProfile: {
    headline: string;
    meetingMode: string;
    hourlyRate: number;
    currency: string;
    category?: { name: string } | null;
  };
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusVariant(status: Booking["status"]) {
  if (status === "CONFIRMED") return "secondary";
  if (status === "COMPLETED") return "outline";
  return "destructive";
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = React.useState<Booking[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [cancelLoadingId, setCancelLoadingId] = React.useState<string | null>(
    null,
  );

  async function load() {
    setLoading(true);
    try {
      const { data } = await getMyBookings();
      setBookings(data);
    } catch (e: any) {
      toast.error("Failed to load bookings", {
        description: e?.message || "Please try again.",
      });
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  async function handleCancel(id: string) {
    setCancelLoadingId(id);

    const tId = toast.loading("Cancelling booking...");
    try {
      const data = await cancelBooking(id, "Changed my plan");

      if (!data.success) {
        return toast.error(`${data.message}`, {
          id: tId,
        });
      }

      toast.success("Booking cancelled", {
        id: tId,
      });

      await load();
    } catch (e: any) {
      toast.error("Cancel failed", {
        id: tId,
        description: e?.message || "Please try again.",
      });
    } finally {
      setCancelLoadingId(null);
    }
  }

  if (loading) return <MyBookingsSkeleton />;

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border p-6 text-center">
          <p className="text-base font-semibold">No bookings yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Book a tutor slot and it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {bookings.map((b) => (
        <Card key={b.id} className="rounded-2xl">
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-base">
                {b.tutorProfile.headline}
              </CardTitle>
              <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{b.subject}</Badge>
              <Badge variant="secondary">{b.tutorProfile.meetingMode}</Badge>
              <Badge variant="outline">
                {b.tutorProfile.currency} {b.tutorProfile.hourlyRate}/hr
              </Badge>
              {b.tutorProfile.category?.name ? (
                <Badge variant="outline">{b.tutorProfile.category.name}</Badge>
              ) : null}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="text-sm">
              <p>
                <span className="text-muted-foreground">Start:</span>{" "}
                <span className="font-medium">
                  {formatDateTime(b.startTime)}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">End:</span>{" "}
                <span className="font-medium">{formatDateTime(b.endTime)}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              <Button
                variant="destructive"
                className="rounded-xl"
                disabled={b.status !== "CONFIRMED" || cancelLoadingId === b.id}
                onClick={() => handleCancel(b.id)}
              >
                {cancelLoadingId === b.id ? "Cancelling..." : "Cancel booking"}
              </Button>

              {b.status === "COMPLETED" && !b.isReviewed ? (
                <LeaveReviewDialog bookingId={b.id} onDone={load} />
              ) : b.isReviewed ? (
                <Button variant="secondary" className="rounded-xl" disabled>
                  Reviewed ✅
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
