"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormValues } from "@/types/category.type";
import { getSingleCategory, updateCategory } from "@/actions/admin.action";

export default function UpdateCategoryForm({
  categoryId,
}: {
  categoryId: string;
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: true as FormValues["isActive"],
    } satisfies FormValues,

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating category...");
      try {
        await updateCategory(categoryId, {
          name: value.name.trim(),
          description: value.description.trim(),
          isActive: value.isActive,
        });
        toast.success("Category updated", { id: toastId });
      } catch (e: any) {
        toast.error(e?.message || "Update failed", { id: toastId });
      }
    },
  });

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await getSingleCategory(categoryId);

        if (!res?.data) throw new Error("Category not found");

        form.reset({
          name: res.data.name ?? "",
          description: res.data.description ?? "",
          isActive: Boolean(res.data.isActive),
        });
      } catch (e: any) {
        toast.error(e?.message || "Failed to load category");
      }
    };

    load();
  }, [categoryId, form]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4" 
    >
      {/* Name */}
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            value.trim().length < 2 ? "Minimum 2 characters" : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.isTouched &&
            field.state.meta.errors.length > 0 ? (
              <p className="text-sm text-red-500">
                {field.state.meta.errors[0]}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {/* Description */}
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) =>
            value.trim().length < 10 ? "Minimum 10 characters" : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Description</Label>
            <textarea
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="min-h-24 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2"
            />
            {field.state.meta.isTouched &&
            field.state.meta.errors.length > 0 ? (
              <p className="text-sm text-red-500">
                {field.state.meta.errors[0]}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {/* isActive */}
      <form.Field name="isActive">
        {(field) => (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            Active (visible)
          </label>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
