import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { adminService } from "@/services/admin.service";

export default async function AdminDashboard() {
  const [{ data: users }, { data: bookings }, { data: categories }] = await Promise.all([
    adminService.getAllUser(),
    adminService.getAllBookings(),
    adminService.getAllCategory(),
  ]);

  const roleCounts = users.reduce(
    (acc: Record<string, number>, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    {},
  );

  const bookingStatusCounts = bookings.reduce(
    (acc: Record<string, number>, booking: any) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    },
    {},
  );

  const categoryUsage = categories
    .map((category: any) => ({
      label: category.name,
      value: category._count?.tutorProfiles || 0,
    }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Admin overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Platform operations and activity snapshot
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={users.length} caption="All registered accounts" />
        <StatCard
          label="Tutors"
          value={roleCounts.TUTOR || 0}
          caption="Published and draft tutor accounts"
        />
        <StatCard label="Bookings" value={bookings.length} caption="All session records" />
        <StatCard
          label="Categories"
          value={categories.length}
          caption="Active academic and skill tracks"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <MiniBarChart
          title="Users by role"
          description="Role balance across the platform"
          items={Object.entries(roleCounts).map(([label, value]) => ({
            label,
            value: Number(value),
          }))}
        />
        <MiniBarChart
          title="Bookings by status"
          description="Live operational distribution"
          items={Object.entries(bookingStatusCounts).map(([label, value]) => ({
            label,
            value: Number(value),
          }))}
        />
        <MiniBarChart
          title="Top categories"
          description="Where tutor supply is currently strongest"
          items={categoryUsage}
        />
      </div>
    </div>
  );
}
