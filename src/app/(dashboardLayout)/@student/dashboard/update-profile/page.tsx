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

export default function UpdateProfile() {
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

        toast.success("Profile updated!", { id: toastId });
        router.push("/dashboard/profile");
        router.refresh();
      } catch (e: any) {
        toast.error(e?.message || "Update failed", { id: toastId });
      }
    },
  });

 
  React.useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getSession();
        const user = data?.user;

        if (user) {
          form.setFieldValue("name", user.name || "");
          form.setFieldValue("image", user.image || "");
        }
      } finally {
        
      }
    };

    load();
    
  }, []);


  return (
    <div className=" max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Your name"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Image */}
            <form.Field name="image">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Profile Image URL (optional)</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://..."
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}

                  {field.state.value ? (
                    <img
                      src={field.state.value}
                      alt="Preview"
                      className="h-16 w-16 rounded-full border object-cover"
                    />
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
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
