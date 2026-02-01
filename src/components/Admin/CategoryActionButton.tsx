"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FormValues } from "@/types/category.type";
import { deleteCategory } from "@/actions/admin.action";

const CategoryActionButton = ({ category }: { category: FormValues }) => {
  const router = useRouter();
  const onDelete = async (id: string) => {
    const ok = window.confirm("Delete this category?");
    if (!ok) return;

    const toastId = toast.loading("Deleting...");
    try {
      await deleteCategory(id);
      toast.success("Deleted", { id: toastId });
      router.refresh()
    } catch (e: any) {
      // rollback
      toast.error(e?.message || "Delete failed", { id: toastId });
    }
  };
  return (
    <div className="text-right flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() =>
          router.push(`/dashboard/manage-categories/${category.id}`)
        }
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        onClick={() => onDelete(category.id as string)}
      >
        Delete
      </Button>
    </div>
  );
};

export default CategoryActionButton;
