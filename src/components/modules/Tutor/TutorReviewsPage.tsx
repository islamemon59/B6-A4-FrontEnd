"use client";

import * as React from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTutorReviews } from "@/actions/tutor.action";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  booking: { id: string; subject: string; startTime: string };
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TutorReviewsPage() {
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState<any>(null);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  async function load() {
    setLoading(true);
    try {
      const [r] = await Promise.all([
        getTutorReviews(),
      ]);
      setReviews(r.data || []);
    } catch (e: any) {
      toast.error("Failed to load reviews", { description: e?.message });
      setStats(null);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading reviews...
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Ratings & reviews</h2>



      {/* List */}
      {reviews.length === 0 ? (
        <div className="rounded-2xl border p-6 text-center">
          <p className="font-semibold">No reviews yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Reviews will appear after students complete sessions.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((rv) => (
            <Card key={rv.id} className="rounded-2xl">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">
                    {rv.booking.subject}
                  </CardTitle>
                  <Badge variant="secondary">{rv.rating}/5</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Session: {new Date(rv.booking.startTime).toLocaleString()} •
                  Review: {fmt(rv.createdAt)}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {rv.comment?.trim() ? rv.comment : "No comment provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
