"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useAuth } from "@/Provider/AuthProvider";

const LogoutButton = () => {
  const { refreshUser } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut();
    await refreshUser()
  };
  return (
    <div>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
