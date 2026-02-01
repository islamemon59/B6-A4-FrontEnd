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
import { Booking } from "@/types/bookings.type";

const API_BASE = "http://localhost:5000";

function statusBadgeVariant(status: Booking["status"]) {
  if (status === "CANCELLED") return "destructive";
  if (status === "COMPLETED") return "secondary";
  return "default";
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default async function AdminBookingsTable() {
  const { data } = await adminService.getAllBookings();
  const bookings = data;
  console.log(data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Bookings</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm text-muted-foreground"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((b: Booking) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.subject}</TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={statusBadgeVariant(b.status)}>
                        {b.status}
                      </Badge>
                      {b.status === "CANCELLED" && b.cancelledBy ? (
                        <span className="text-xs text-muted-foreground">
                          by {b.cancelledBy}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    <div>{formatDateTime(b.startTime)}</div>
                    <div className="text-muted-foreground">
                      → {formatDateTime(b.endTime)}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {b.tutorProfile?.headline ? (
                      <div className="font-medium">
                        {b.tutorProfile.headline}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">N/A</div>
                    )}
                    {b.tutorProfile?.id ? (
                      <div className="text-xs text-muted-foreground">
                        {b.tutorProfile.id}
                      </div>
                    ) : null}
                  </TableCell>

                  <TableCell>
                    {b.category?.name ? (
                      <Badge variant="outline">{b.category.name}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm">
                    {b.availabilitySlot ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          {b.availabilitySlot.id}
                        </span>
                        <span>
                          {formatDateTime(b.availabilitySlot.startTime)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm">
                    {formatDateTime(b.createdAt)}
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
