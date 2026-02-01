import CategoryActionButton from "@/components/Admin/CategoryActionButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminService } from "@/services/admin.service";
import { FormValues } from "@/types/category.type";

export default async function AdminCategoriesTable() {
  const res = await adminService.getAllCategory();
  const categories = res.data;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-muted-foreground"
                >
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              categories.map((c: FormValues) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {c.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.isActive ? "default" : "secondary"}>
                      {c.isActive ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CategoryActionButton category={c}/>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
