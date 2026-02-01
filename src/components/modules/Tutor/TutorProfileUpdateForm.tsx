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
  CreateTutorProfilePayload,
  CURRENCIES,
  FormValues,
  MEETING_MODES,
  PROFILE_STATUS,
} from "@/types/tutorProfile.type";
import { tutorServices } from "@/services/tutor.service";
import { getCategory, getTutorProfile, updateProfile } from "@/actions/tutor.action";

export default function TutorProfileUpdateForm() {
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [initial, setInitial] = React.useState<FormValues>({
    categoryId: "",
    headline: "",
    about: "",
    subjectsText: "",
    meetingMode: "ONLINE",
    hourlyRate: "",
    currency: "BDT",
    isFeatured: false,
    profileStatus: "DRAFT",
  });

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const catJson = await getCategory();
        const cats: Category[] = Array.isArray(catJson)
          ? catJson
          : (catJson?.data ?? []);
        setCategories(cats);

        const profileJson = await getTutorProfile();
        if (!profileJson.success) {
          throw new Error("Failed to load profile");
        }
        const p: CreateTutorProfilePayload = profileJson?.data ?? profileJson;

        setInitial({
          categoryId: p.categoryId,
          headline: p.headline ?? "",
          about: p.about ?? "",
          subjectsText: (p.subjects ?? []).join(", "),
          meetingMode: p.meetingMode ?? "ONLINE",
          hourlyRate: p.hourlyRate ?? "",
          currency: p.currency ?? "BDT",
          isFeatured: Boolean(p.isFeatured),
          profileStatus: p.profileStatus ?? "DRAFT",
        });
      } catch (e: any) {
        toast.error(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const form = useForm({
    // ✅ this enables re-init when `initial` changes
    defaultValues: initial satisfies FormValues,

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

      try {
        // basic checks
        if (!value.categoryId) {
          toast.error("Category is required", { id: toastId });
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

        const subjects = value.subjectsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        if (subjects.length === 0) {
          toast.error("Add at least one subject", { id: toastId });
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

        const res = await updateProfile(payload)
        console.log(res);


        if (!res.success) {
          toast.error( "Update failed", { id: toastId });
          return;
        }

        toast.success("Profile updated successfully", { id: toastId });
        window.location.href = "/dashboard/profile";
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  // ✅ Important: when initial values change after fetch, reset form
  React.useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Fetching your profile data</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Please wait.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Update Tutor Profile</CardTitle>
        <CardDescription>
          Edit your profile details and save changes
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="tutorUpdateForm"
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
                  >
                    <option value="" disabled>
                      Select a category
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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Math Tutor | 5+ years experience"
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
                    className="min-h-28 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2"
                    placeholder="Write about your teaching style, experience..."
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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="JavaScript, React, Node.js"
                  />
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
                    value={field.state.value}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.handleChange(v === "" ? "" : Number(v));
                    }}
                    placeholder="e.g. 500"
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
                    Featured (usually admin only)
                  </label>
                </Field>
              )}
            </form.Field>

            {/* Status */}
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

      <CardFooter className="flex gap-3 flex-col">
        <Button variant="outline" asChild className="w-full">
          <a href="/tutor/profile">Cancel</a>
        </Button>
        <Button form="tutorUpdateForm" type="submit" className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
