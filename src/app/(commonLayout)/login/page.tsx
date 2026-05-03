import { LoginForm } from "@/components/authentication/LoginForm";

const LoginPage = () => {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Student demo login
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Access bookings, tutor profiles, and role-based dashboards.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Use the demo login button to auto-fill seeded credentials or sign in with
          your own account.
        </p>
      </div>

      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
