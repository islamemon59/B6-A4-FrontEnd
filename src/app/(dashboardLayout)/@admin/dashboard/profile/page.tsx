import Link from "next/link";
import { userService } from "@/services/user.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminProfilePage() {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Profile</h1>
          <p className="text-sm text-muted-foreground">
            Account details for the current administrator.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/update-profile">Update Profile</Link>
        </Button>
      </div>

      <Card className="rounded-[1.75rem] border-border/70">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.25rem] bg-secondary/60 p-4">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 font-semibold">{user.email}</p>
          </div>
          <div className="rounded-[1.25rem] bg-secondary/60 p-4">
            <p className="text-sm text-muted-foreground">Role</p>
            <div className="mt-2">
              <Badge>{user.role}</Badge>
            </div>
          </div>
          <div className="rounded-[1.25rem] bg-secondary/60 p-4">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-1 font-semibold">{user.status}</p>
          </div>
          <div className="rounded-[1.25rem] bg-secondary/60 p-4">
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="mt-1 font-semibold">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
