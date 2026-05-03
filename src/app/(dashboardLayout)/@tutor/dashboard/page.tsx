import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { tutorServices } from "@/services/tutor.service";

export default async function TutorDashboardPage() {
  const [sessionsRes, reviewsRes, profileRes] = await Promise.all([
    tutorServices.getTutorSessions(),
    tutorServices.getTutorReviews(),
    tutorServices.getProfile(),
  ]);

  const sessions = sessionsRes.data || [];
  const reviews = reviewsRes.data || [];
  const profile = profileRes.data;

  const sessionStatusCounts = sessions.reduce(
    (acc: Record<string, number>, session: any) => {
      acc[session.status] = (acc[session.status] || 0) + 1;
      return acc;
    },
    {},
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum: number, review: any) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Tutor overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Session delivery, feedback, and teaching signals
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Sessions"
          value={sessions.length}
          caption="All teaching sessions"
        />
        <StatCard
          label="Completed"
          value={sessionStatusCounts.COMPLETED || 0}
          caption="Finished sessions"
        />
        <StatCard
          label="Reviews"
          value={reviews.length}
          caption={`Average rating ${averageRating}`}
        />
        <StatCard
          label="Subjects"
          value={profile?.subjects?.length || 0}
          caption="Current teaching focus areas"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <MiniBarChart
          title="Session status mix"
          description="A quick view of active, completed, and cancelled sessions"
          items={Object.entries(sessionStatusCounts).map(([label, value]) => ({
            label,
            value: Number(value),
          }))}
        />
        <MiniBarChart
          title="Review score distribution"
          description="How students are rating completed sessions"
          items={[1, 2, 3, 4, 5].map((score) => ({
            label: `${score} star`,
            value: reviews.filter((review: any) => review.rating === score).length,
          }))}
        />
      </div>
    </div>
  );
}
