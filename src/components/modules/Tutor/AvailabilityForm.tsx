"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { setAvailability } from "@/actions/tutor.action";


function isoToLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
function localInputToIso(value: string) {
  if (!value) return "";
  const [datePart, timePart] = value.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);

  const localDate = new Date(y, m - 1, d, hh, mm, 0);
  return localDate.toISOString();
}

const schema = z
  .object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (v) => new Date(v.startTime).getTime() < new Date(v.endTime).getTime(),
    { message: "End time must be after start time", path: ["endTime"] },
  );

type FormValues = z.infer<typeof schema>;

function toIso(val: string) {
  return new Date(val).toISOString();
}

export default function AvailabilityForm() {
  const form = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    } satisfies FormValues,

    onSubmit: async ({ value }) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message || "Invalid input");
        return;
      }

      const toastId = toast.loading("Creating slot...");
      try {
        const data = await setAvailability(parsed.data);

        toast.success("Slot created!", { id: toastId });

        if (!data.success) {
          toast.error(`${data.message}`, { id: toastId });
        }

        form.reset({ startTime: "", endTime: "" });
      } catch (e: any) {
        toast.error(e?.message || "Failed to create slot", { id: toastId });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Availability</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="startTime">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Start Time</Label>
                <input
                  id={field.name}
                  type="datetime-local"
                  value={isoToLocalInput(field.state.value)}
                  onChange={(e) =>
                    field.handleChange(localInputToIso(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                />

                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="endTime">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>End Time</Label>
                <input
                  id={field.name}
                  type="datetime-local"
                  value={isoToLocalInput(field.state.value)}
                  onChange={(e) =>
                    field.handleChange(localInputToIso(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                  min={isoToLocalInput(form.state.values.startTime)} // optional: prevent end before start
                />

                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Saving..." : "Create Slot"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
