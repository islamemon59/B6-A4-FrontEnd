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
  const [status, setStatus] = useState<string>(userStatus);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setStatus(userStatus);
  }, [userStatus]);

  const isBanned = status === "BAN";

  const toggleStatus = async () => {
    const prevStatus = status;
    const nextStatus: string = status === "UNBAN" ? "BAN" : "UNBAN";

   
    setStatus(nextStatus);
    setLoading(true);

    const toastId = toast.loading(`Updating user status to ${nextStatus}...`);

    try {
      const res = await updateUserStatus(userId, nextStatus);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to update status");
      }

      toast.success("User status updated", { id: toastId });

     
      router.refresh();
    } catch (e: any) {
     
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
