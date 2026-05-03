"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Enter a valid email address"),
  role: z.enum(["STUDENT", "TUTOR"], { message: "Role is required" }),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [socialLoading, setSocialLoading] = React.useState<"" | "google" | "facebook">(
    "",
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");

      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        if (data) {
          toast.success("Account created successfully", { id: toastId });
          router.push("/login");
        }
      } catch {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  async function handleSocialSignup(provider: "google" | "facebook") {
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error(
        provider === "facebook"
          ? "Facebook signup is not configured in this environment yet."
          : "Social signup failed. Please try again.",
      );
    } finally {
      setSocialLoading("");
    }
  }

  return (
    <Card
      {...props}
      className="w-full rounded-[2rem] border-border/70 bg-card/95 shadow-xl"
    >
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Join as a student or tutor and unlock the full SkillBridge workflow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signupForm"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      className="h-11 rounded-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      className="h-11 rounded-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      className="h-11 rounded-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="role">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11 w-full rounded-full border border-input bg-background px-4 text-sm outline-none focus:ring-2"
                    >
                      <option value="STUDENT">Student</option>
                      <option value="TUTOR">Tutor</option>
                    </select>
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button form="signupForm" type="submit" className="w-full rounded-full">
          {form.state.isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Button
            onClick={() => handleSocialSignup("google")}
            variant="outline"
            type="button"
            className="rounded-full"
            disabled={socialLoading !== ""}
          >
            {socialLoading === "google" ? "Connecting..." : "Google"}
          </Button>
          <Button
            onClick={() => handleSocialSignup("facebook")}
            variant="outline"
            type="button"
            className="rounded-full"
            disabled={socialLoading !== ""}
          >
            {socialLoading === "facebook" ? "Connecting..." : "Facebook"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
