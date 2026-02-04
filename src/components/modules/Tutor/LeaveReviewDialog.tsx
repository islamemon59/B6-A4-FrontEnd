"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/actions/student.action";

function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xl ${filled ? "opacity-100" : "opacity-30"}`}
      aria-label={filled ? "Filled star" : "Empty star"}
    >
      ★
    </button>
  );
}

export function LeaveReviewDialog({
  bookingId,
  onDone,
}: {
  bookingId: string;
  onDone?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit() {
    setLoading(true);
    const tId = toast.loading("Submitting review...");

    try {
      await createReview({ bookingId, rating, comment });

      toast.success("Review submitted!", {
        id: tId,
        description: "Thanks for your feedback.",
      });

      setOpen(false);
      setComment("");
      setRating(5);
      onDone?.();
    } catch (e: any) {
      toast.error("Failed to submit review", {
        id: tId,
        description: e?.message || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Leave review</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                filled={i < rating}
                onClick={() => setRating(i + 1)}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating}/5
            </span>
          </div>

          <Textarea
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="Write your experience (optional)"
            className="rounded-xl"
          />
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
          <Button className="rounded-xl" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
