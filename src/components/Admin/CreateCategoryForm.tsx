"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormValues } from "@/types/category.type";
import { createCategory } from "@/actions/admin.action";

function required(value: string, message: string) {
  if (!value?.trim()) return message;
  return undefined;
}
function minLen(value: string, len: number, message: string) {
  if (value.trim().length < len) return message;
  return undefined;
}

export default function CreateCategoryForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: true as FormValues["isActive"],
    } satisfies FormValues,

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        description: value.description.trim(),
        isActive: value.isActive,
      };

      const toastId = toast.loading("Creating category...");

      try {
        const res = await createCategory(payload);

        if (!res?.success) {
          throw new Error("Failed to create category");
        }

        toast.success("Category created successfully!", { id: toastId });

        form.reset();
      } catch (e: any) {
        toast.error(e?.message || "Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>Add a new subject category for tutors</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Name */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                required(value, "Category name is required") ||
                minLen(value, 2, "Minimum 2 characters"),
            }}
          >
            {(field) => {
              const showError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Category Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="e.g. Programming"
                  />

                  {showError ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                required(value, "Description is required") ||
                minLen(value, 10, "Minimum 10 characters"),
            }}
          >
            {(field) => {
              const showError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Write a short description about this category..."
                    className="min-h-28 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2"
                  />

                  {showError ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          {/* isActive */}
          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center gap-2">
                <input
                  id={field.name}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <Label htmlFor={field.name}>Active (visible to users)</Label>
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Creating..." : "Create Category"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
