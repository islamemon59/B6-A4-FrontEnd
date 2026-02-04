"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/actions/student.action";

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type TutorProfile = {
  id: string;
  headline: string;
  hourlyRate: number;
  currency: string;
  meetingMode: "ONLINE" | "OFFLINE" | "BOTH";
  subjects: string[];
  availabilitySlots: Slot[];
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

export default function TutorBookingSection({
  tutor,
}: {
  tutor: TutorProfile;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState<Slot | null>(null);
  const [subject, setSubject] = React.useState<string>(
    tutor.subjects?.[0] || "",
  );
  const [loading, setLoading] = React.useState(false);

  const [slots, setSlots] = React.useState<Slot[]>(
    tutor.availabilitySlots || [],
  );

  React.useEffect(() => {
    setSlots(tutor.availabilitySlots || []);
  }, [tutor.availabilitySlots]);

  const availableSlots = slots.filter((s) => !s.isBooked);

  async function handleConfirmBooking() {
    if (!selectedSlot) return;

    setLoading(true);
    const tId = toast.loading("Booking your slot...");

    try {
      const data = await createBooking({
        tutorProfileId: tutor.id,
        availabilitySlotId: selectedSlot.id,
        subject,
      });

      console.log(data);

      setSlots((prev) =>
        prev.map((s) =>
          s.id === selectedSlot.id ? { ...s, isBooked: true } : s,
        ),
      );

      toast.success("Booking confirmed!", {
        id: tId,
        description: `Subject: ${subject} • ${formatDateTime(selectedSlot.startTime)}`,
      });

      setOpen(false);
      setSelectedSlot(null);
    } catch (e: any) {
      const msg = e?.message?.toLowerCase?.() || "";

      if (msg.includes("already booked") || msg.includes("slot")) {
        toast.warning("Slot not available", {
          id: tId,
          description:
            "Someone already booked this slot. Please pick another one.",
        });

       
        setSlots((prev) =>
          prev.map((s) =>
            s.id === selectedSlot.id ? { ...s, isBooked: true } : s,
          ),
        );

        setOpen(false);
        setSelectedSlot(null);
        return;
      }

  
      toast.error("Booking failed", {
        id: tId,
        description: e?.message || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{tutor.headline}</CardTitle>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{tutor.meetingMode}</Badge>
          <Badge variant="outline">
            {tutor.currency} {tutor.hourlyRate}/hr
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Subject picker */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Choose a subject</p>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {tutor.subjects?.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Slots */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Available slots</p>

          {availableSlots.length === 0 ? (
            <div className="rounded-xl border p-4 text-sm text-muted-foreground">
              No available slots right now. Please check back later.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {availableSlots.map((slot) => (
                <div key={slot.id} className="rounded-xl border p-3">
                  <p className="text-sm font-medium">
                    {formatDateTime(slot.startTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    To: {formatDateTime(slot.endTime)}
                  </p>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="mt-3 w-full rounded-xl"
                        onClick={() => setSelectedSlot(slot)}
                        disabled={loading}
                      >
                        Book this slot
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-2xl">
                      <DialogHeader>
                        <DialogTitle>Confirm booking</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-muted-foreground">
                            Subject:
                          </span>{" "}
                          <span className="font-medium">{subject}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Time:</span>{" "}
                          <span className="font-medium">
                            {selectedSlot
                              ? formatDateTime(selectedSlot.startTime)
                              : "-"}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Rate:</span>{" "}
                          <span className="font-medium">
                            {tutor.currency} {tutor.hourlyRate}/hr
                          </span>
                        </p>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => setOpen(false)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="rounded-xl"
                          onClick={handleConfirmBooking}
                          disabled={loading || !selectedSlot}
                        >
                          {loading ? "Booking..." : "Confirm booking"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
