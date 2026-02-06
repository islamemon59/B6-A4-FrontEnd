"use client"
import { getUser } from "@/actions/user.action";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react";

export function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getUser();
      setUser(res?.data.user || null);
    })();
  }, []);
  return (
    <Avatar>
      <AvatarImage src={user?.image} alt="@shadcn" />
      <AvatarFallback>{user?.name[0]}</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
