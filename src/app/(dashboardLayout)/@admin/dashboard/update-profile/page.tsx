"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession, updateProfile } from "@/actions/student.action";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function AdminUpdateProfilePage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
    } satisfies FormValues,
    onSubmit: async ({ value }) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message || "Invalid input");
        return;
      }

      const toastId = toast.loading("Updating profile...");
      try {
        await updateProfile({
          name: parsed.data.name.trim(),
          image: parsed.data.image?.trim() || undefined,
        });

        toast.success("Profile updated", { id: toastId });
        router.push("/dashboard/profile");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.message || "Update failed", { id: toastId });
      }
    },
  });

  React.useEffect(() => {
    const load = async () => {
      const { data } = await getSession();
      const user = data?.user;

      if (user) {
        form.setFieldValue("name", user.name || "");
        form.setFieldValue("image", user.image || "");
      }
    };

    load();
  }, [form]);

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card className="rounded-[1.75rem] border-border/70">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Profile Image URL</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
