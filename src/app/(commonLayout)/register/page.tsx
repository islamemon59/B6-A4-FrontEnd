import { SignupForm } from "@/components/authentication/signup-form";

export default function Page() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Join SkillBridge
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Create a polished student or tutor account in minutes.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Registration is designed for both sides of the platform, with role
          selection built directly into the signup flow.
        </p>
      </div>

      <div className="w-full">
        <SignupForm />
      </div>
    </div>
  );
}
