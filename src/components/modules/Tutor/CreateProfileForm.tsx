"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Category,
  CURRENCIES,
  FormValues,
  MEETING_MODES,
  PROFILE_STATUS,
} from "@/types/tutorProfile.type";
import { createProfile, getCategory } from "@/actions/tutor.action";

export default function CreateTutorProfileForm() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoadingCats(true);
        const json = await getCategory();
        const list = Array.isArray(json) ? json : (json.data ?? []);
        setCategories(list);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      categoryId: "",
      headline: "",
      about: "",
      subjectsText: "",
      meetingMode: "ONLINE",
      hourlyRate: "" as FormValues["hourlyRate"],
      currency: "BDT",
      isFeatured: false as FormValues["isFeatured"],
      profileStatus: "DRAFT",
    } satisfies FormValues,

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating tutor profile...");

      try {
        if (!value.categoryId) {
          toast.error("Please select a category", { id: toastId });
          return;
        }
        if (!value.headline.trim()) {
          toast.error("Headline is required", { id: toastId });
          return;
        }
        if (!value.about.trim()) {
          toast.error("About is required", { id: toastId });
          return;
        }
        if (value.hourlyRate === "" || Number(value.hourlyRate) <= 0) {
          toast.error("Hourly rate must be greater than 0", { id: toastId });
          return;
        }

        const subjects: string[] = value.subjectsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        if (subjects.length === 0) {
          toast.error("Add at least one subject (comma separated)", {
            id: toastId,
          });
          return;
        }

        const payload = {
          categoryId: value.categoryId,
          headline: value.headline.trim(),
          about: value.about.trim(),
          subjects,
          meetingMode: value.meetingMode,
          hourlyRate: Number(value.hourlyRate),
          currency: value.currency,
          isFeatured: value.isFeatured,
          profileStatus: value.profileStatus,
        };

        const res = await createProfile(payload);

        if (!res.success) {
          toast.error("Failed to create profile", {
            id: toastId,
          });
          return;
        }

        toast.success("Tutor profile created successfully", { id: toastId });
        window.location.href = "/dashboard/profile";
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Create Tutor Profile</CardTitle>
        <CardDescription>
          Fill in your teaching details. You can edit later.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="tutorProfileForm"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <FieldGroup>
            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel>Select Category</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                    disabled={loadingCats}
                  >
                    <option value="" disabled>
                      {loadingCats
                        ? "Loading categories..."
                        : "Select a category"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>

            {/* Headline */}
            <form.Field name="headline">
              {(field) => (
                <Field>
                  <FieldLabel>Headline</FieldLabel>
                  <Input
                    type="text"
                    placeholder="e.g. Math Tutor | 5+ years experience"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* About */}
            <form.Field name="about">
              {(field) => (
                <Field>
                  <FieldLabel>About</FieldLabel>
                  <textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write about your teaching style, experience, who you teach..."
                    className="min-h-28 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2"
                  />
                </Field>
              )}
            </form.Field>

            {/* Subjects */}
            <form.Field name="subjectsText">
              {(field) => (
                <Field>
                  <FieldLabel>Subjects (comma separated)</FieldLabel>
                  <Input
                    type="text"
                    placeholder="JavaScript, React, Node.js"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: Algebra, Calculus, Geometry
                  </p>
                </Field>
              )}
            </form.Field>

            {/* Meeting Mode */}
            <form.Field name="meetingMode">
              {(field) => (
                <Field>
                  <FieldLabel>Meeting Mode</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as any)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                  >
                    {MEETING_MODES.map((m) => (
                      <option key={m} value={m}>
                        {m.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>

            {/* Hourly Rate */}
            <form.Field name="hourlyRate">
              {(field) => (
                <Field>
                  <FieldLabel>Hourly Rate</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    placeholder="e.g. 500"
                    value={field.state.value}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.handleChange(v === "" ? "" : Number(v));
                    }}
                  />
                </Field>
              )}
            </form.Field>

            {/* Currency */}
            <form.Field name="currency">
              {(field) => (
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as any)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>

            {/* Featured */}
            <form.Field name="isFeatured">
              {(field) => (
                <Field>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                    Featured profile (admin only usually)
                  </label>
                </Field>
              )}
            </form.Field>

            {/* Profile Status */}
            <form.Field name="profileStatus">
              {(field) => (
                <Field>
                  <FieldLabel>Profile Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as any)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
                  >
                    {PROFILE_STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button form="tutorProfileForm" type="submit" className="w-full">
          Create Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
