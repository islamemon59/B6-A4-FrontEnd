export const dynamic = "force-dynamic";
import { AdminUsersTableClient } from "@/components/Admin/AdminUsersTableClient";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage() {
  const { data } = await adminService.getAllUser();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Users</h1>
      </div>
      <AdminUsersTableClient users={data} />
    </div>
  );
}
