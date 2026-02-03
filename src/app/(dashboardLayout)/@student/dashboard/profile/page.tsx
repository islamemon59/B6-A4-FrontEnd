import Link from "next/link";
import { userService } from "@/services/user.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const { data } = await userService.getSession();
  const user = data?.user;


  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-sm text-muted-foreground">You are not logged in.</p>
      </div>
    );
  }

  const isBanned = user.status === "BAN";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your account information.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/update-profile">Update Profile</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">{user.name}</CardTitle>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge variant={isBanned ? "destructive" : "secondary"}>
              {user.status}
            </Badge>
            {user.emailVerified ? <Badge>Email Verified</Badge> : null}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border p-4 space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="rounded-md border p-4 space-y-1">
              <p className="text-sm font-medium">User ID</p>
              <p className="text-sm text-muted-foreground break-all">
                {user.id}
              </p>
            </div>

            <div className="rounded-md border p-4 space-y-1">
              <p className="text-sm font-medium">Created At</p>
              <p className="text-sm text-muted-foreground">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "—"}
              </p>
            </div>

            <div className="rounded-md border p-4 space-y-1">
              <p className="text-sm font-medium">Updated At</p>
              <p className="text-sm text-muted-foreground">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>

          {user.image ? (
            <div className="rounded-md border p-4 space-y-2">
              <p className="text-sm font-medium">Profile Image</p>
              {/* If you're using next/image you can replace this img */}
              <img
                src={user?.image}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
