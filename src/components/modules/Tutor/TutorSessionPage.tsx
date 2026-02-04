"use client";

import * as React from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cancelTutorSession, completeTutorSession, getTutorSessions } from "@/actions/tutor.action";
import Link from "next/link";

type Session = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  isReviewed: boolean;
  cancelReason?: string | null;
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function variant(status: Session["status"]) {
  if (status === "CONFIRMED") return "secondary";
  if (status === "COMPLETED") return "outline";
  return "destructive";
}

export default function TutorSessionsPage() {
  const [status, setStatus] = React.useState<"ALL" | Session["status"]>("ALL");
  const [data, setData] = React.useState<Session[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionId, setActionId] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await getTutorSessions();
      setData(res.data || []);
    } catch (e: any) {
      toast.error("Failed to load sessions", { description: e?.message });
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, [status]);

  async function complete(id: string) {
    setActionId(id);
    const tId = toast.loading("Marking as completed...");
    try {
      await completeTutorSession(id);
      toast.success("Completed", { id: tId });
      await load();
    } catch (e: any) {
      toast.error("Failed", { id: tId, description: e?.message });
    } finally {
      setActionId(null);
    }
  }

  async function cancel(id: string) {
    setActionId(id);
    const tId = toast.loading("Cancelling session...");
    try {
      await cancelTutorSession(id, "Tutor cancelled");
      toast.success("Cancelled", { id: tId });
      await load();
    } catch (e: any) {
      toast.error("Failed", { id: tId, description: e?.message });
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Teaching sessions</h2>

        <Tabs value={status} onValueChange={(v: string) => setStatus(v as any)}>
          <TabsList>
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
          Loading sessions...
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-2xl border p-6 text-center">
          <p className="font-semibold">No sessions found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Sessions will appear here when students book you.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((s) => (
            <Card key={s.id} className="rounded-2xl">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{s.subject}</CardTitle>
                  <Badge variant={variant(s.status)}>{s.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Start:</span>{" "}
                    <span className="font-medium">{fmt(s.startTime)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">End:</span>{" "}
                    <span className="font-medium">{fmt(s.endTime)}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className="rounded-xl"
                    disabled={s.status !== "CONFIRMED" || actionId === s.id}
                    onClick={() => complete(s.id)}
                  >
                    {actionId === s.id ? "Processing..." : "Mark completed"}
                  </Button>

                  <Button
                    variant="destructive"
                    className="rounded-xl"
                    disabled={s.status !== "CONFIRMED" || actionId === s.id}
                    onClick={() => cancel(s.id)}
                  >
                    {actionId === s.id ? "Processing..." : "Cancel session"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
