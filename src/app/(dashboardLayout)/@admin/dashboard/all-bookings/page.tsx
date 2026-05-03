export const dynamic = "force-dynamic";

import { AdminBookingsTableClient } from "@/components/Admin/AdminBookingsTableClient";
import { adminService } from "@/services/admin.service";

export default async function AdminBookingsTable() {
  const { data } = await adminService.getAllBookings();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Bookings</h1>
      </div>

      <AdminBookingsTableClient bookings={data} />
    </div>
  );
}
