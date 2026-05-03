"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/bookings.type";

const PAGE_SIZE = 8;

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

export function AdminBookingsTableClient({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = bookings.filter((booking) => {
    const target = `${booking.subject} ${booking.status} ${booking.category?.name || ""} ${
      booking.tutorProfile?.headline || ""
    } ${booking.student?.name || ""}`.toLowerCase();
    return target.includes(query.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Filter by subject, student, tutor, category, or status"
          className="max-w-md rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          {filtered.length} booking{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              visible.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.subject}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.student?.name || "N/A"}</TableCell>
                  <TableCell>
                    {booking.tutorProfile?.user?.name || booking.tutorProfile?.headline || "N/A"}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>{formatDateTime(booking.startTime)}</div>
                    <div className="text-muted-foreground">{formatDateTime(booking.endTime)}</div>
                  </TableCell>
                  <TableCell>{booking.category?.name || "N/A"}</TableCell>
                  <TableCell className="text-sm">{formatDateTime(booking.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-full"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
