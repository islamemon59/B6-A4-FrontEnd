"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { updateUserStatus } from "@/actions/admin.action";
import { useRouter } from "next/navigation";

const StatusButton = ({
  userId,
  userStatus,
}: {
  userId: string;
  userStatus: string;
}) => {
  const router = useRouter();

  // ✅ local status (so UI updates instantly)
  const [status, setStatus] = useState<string>(userStatus);
  const [loading, setLoading] = useState(false);

  // ✅ keep local state synced if server refresh changes props
  useEffect(() => {
    setStatus(userStatus);
  }, [userStatus]);

  const isBanned = status === "BAN";

  const toggleStatus = async () => {
    const prevStatus = status;
    const nextStatus: string = status === "UNBAN" ? "BAN" : "UNBAN";

    // ✅ instant UI update
    setStatus(nextStatus);
    setLoading(true);

    const toastId = toast.loading(`Updating user status to ${nextStatus}...`);

    try {
      const res = await updateUserStatus(userId, nextStatus);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to update status");
      }

      toast.success("User status updated", { id: toastId });

      // ✅ optional: refresh server table (badge/status in row will update)
      router.refresh();
    } catch (e: any) {
      // ❌ rollback if failed
      setStatus(prevStatus);
      toast.error(e?.message || "Failed to update status", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isBanned ? "outline" : "destructive"}
      disabled={loading}
      onClick={toggleStatus}
    >
      {loading ? "Updating..." : isBanned ? "Unban" : "Ban"}
    </Button>
  );
};

export default StatusButton;
