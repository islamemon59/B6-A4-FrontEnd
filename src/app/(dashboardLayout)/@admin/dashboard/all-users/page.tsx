export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user.type";
import StatusButton from "@/components/Admin/StatusButton";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage() {

    const {data} = await adminService.getAllUser();
    
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Users</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              data.map((u: User) => {
                const isBanned = u.status === "BAN";
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>

                    <TableCell>
                      <Badge variant="outline">{u.role}</Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={isBanned ? "destructive" : "default"}>
                        {isBanned ? "BANNED" : "ACTIVE"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <StatusButton
                        userId={u.id}
                        userStatus={u.status }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
