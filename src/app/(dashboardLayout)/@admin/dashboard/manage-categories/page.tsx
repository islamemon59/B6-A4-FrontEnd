import { AdminCategoriesTableClient } from "@/components/Admin/AdminCategoriesTableClient";
import { adminService } from "@/services/admin.service";

export default async function AdminCategoriesTable() {
  const res = await adminService.getAllCategory();
  const categories = res.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
      </div>
      <AdminCategoriesTableClient categories={categories} />
    </div>
  );
}
