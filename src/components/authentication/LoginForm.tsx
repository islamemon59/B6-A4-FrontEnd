"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useAuth } from "@/Provider/AuthProvider";
import { authClient } from "@/lib/auth-client";
import {
  getAuthErrorMessage,
  getOAuthErrorMessage,
  GoogleIcon,
} from "@/components/authentication/google-auth";
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

const demoCredentials = {
  email: "student.demo@skillbridge.dev",
  password: "SkillBridge123!",
};

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [socialLoading, setSocialLoading] = React.useState(false);
  const hasHandledOAuthError = React.useRef(false);
  const callbackURL =
    typeof window !== "undefined"
      ? `${window.location.origin}/`
      : "/";

  React.useEffect(() => {
    if (hasHandledOAuthError.current) {
      return;
    }

    const message = getOAuthErrorMessage(
      searchParams.get("error"),
      searchParams.get("error_description"),
    );

    if (!message) {
      return;
    }

    hasHandledOAuthError.current = true;
    toast.error(message);
    router.replace(pathname);
  }, [pathname, router, searchParams]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing you in...");

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(
            getAuthErrorMessage(error, "Login failed. Please try again."),
            { id: toastId },
          );
          return;
        }

        if (data) {
          form.reset();
          await refreshUser();
          router.push("/");
          router.refresh();
        }

        toast.success("Login successful", { id: toastId });
      } catch {
        toast.error("Login failed. Please try again.", { id: toastId });
      }
    },
  });

  async function handleSocialLogin() {
    setSocialLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL:
          typeof window !== "undefined"
            ? `${window.location.origin}/login`
            : "/login",
      });
    } catch {
      toast.error("Google login failed. Please try again.");
    } finally {
      setSocialLoading(false);
    }
  }

  return (
    <Card className="w-full rounded-[2rem] border-border/70 bg-card/95 shadow-xl">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Login to manage bookings, explore tutors, and track dashboard activity.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="loginForm"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
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
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      className="h-11 rounded-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button form="loginForm" type="submit" className="w-full rounded-full">
          {form.state.isSubmitting ? "Signing in..." : "Login"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full rounded-full"
          onClick={() => {
            form.setFieldValue("email", demoCredentials.email);
            form.setFieldValue("password", demoCredentials.password);
            toast.success("Demo credentials filled");
          }}
        >
          Use demo login
        </Button>

        <div className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full"
            onClick={handleSocialLogin}
            disabled={socialLoading}
          >
            <GoogleIcon className="size-4" />
            {socialLoading ? "Connecting..." : "Continue with Google"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Need an account?{" "}
          <Link href="/register" className="font-medium text-primary">
            Create one here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
