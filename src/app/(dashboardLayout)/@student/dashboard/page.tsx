import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { studentServices } from "@/services/student.service";

export default async function StudentDashboard() {
  const { data } = await studentServices.getMyBookings();
  const bookings = data || [];

  const statusCounts = bookings.reduce(
    (acc: Record<string, number>, booking: any) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    },
    {},
  );

  const reviewedCount = bookings.filter((booking: any) => booking.isReviewed).length;
  const estimatedSpend = bookings.reduce((sum: number, booking: any) => {
    return sum + (booking.tutorProfile?.hourlyRate || 0);
  }, 0);
  const topSubjects = Array.from<[string, number]>(
    bookings.reduce((acc: Map<string, number>, booking: any) => {
      acc.set(booking.subject, (acc.get(booking.subject) || 0) + 1);
      return acc;
    }, new Map<string, number>()).entries(),
  )
    .map(([label, value]) => ({ label, value }))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Student overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Booking progress and learning activity
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total bookings" value={bookings.length} caption="All booked sessions" />
        <StatCard
          label="Confirmed"
          value={statusCounts.CONFIRMED || 0}
          caption="Upcoming active sessions"
        />
        <StatCard
          label="Completed"
          value={statusCounts.COMPLETED || 0}
          caption="Sessions finished successfully"
        />
        <StatCard
          label="Reviewed"
          value={reviewedCount}
          caption={`Estimated spend ${estimatedSpend} BDT`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <MiniBarChart
          title="Bookings by status"
          description="A quick view of how your learning pipeline is moving"
          items={Object.entries(statusCounts).map(([label, value]) => ({
            label,
            value: Number(value),
          }))}
        />
        <MiniBarChart
          title="Top booked subjects"
          description="Subjects from your existing bookings"
          items={topSubjects}
        />
      </div>
    </div>
  );
}
