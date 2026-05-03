import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Privacy & Terms
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Clear expectations for data, accounts, and bookings
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[1.75rem] border-border/70">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Privacy basics</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                SkillBridge stores only the account, profile, booking, and review
                data needed to run the platform experience and role-based dashboards.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.75rem] border-border/70">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Platform terms</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Users are expected to provide accurate information, respect booking
                schedules, and avoid misuse of profile, review, and session features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
