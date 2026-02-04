"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await authClient.signOut();
  };
  return (
    <div>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
