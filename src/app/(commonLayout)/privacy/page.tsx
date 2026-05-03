import { Card, CardContent } from "@/components/ui/card";

const privacySections = [
  {
    title: "What data the platform uses",
    text: "SkillBridge stores account details, tutor profile information, booking records, reviews, and operational dashboard data required to run the platform experience.",
  },
  {
    title: "Why that data matters",
    text: "These details support role-based access, tutor discovery, session scheduling, profile management, and review visibility across the product.",
  },
  {
    title: "What users are expected to do",
    text: "Users should provide accurate profile information, respect session workflows, and avoid abuse of reviews, identity fields, or protected dashboard areas.",
  },
];

const platformRules = [
  "Students should book only available tutor slots and use reviews honestly after completed sessions.",
  "Tutors should keep profile details and availability accurate so learners can make reliable decisions.",
  "Admins may manage categories, users, and bookings to keep the platform safe, clear, and operational.",
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Privacy & Terms
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Clear expectations for data, accounts, and bookings
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            This page summarizes how SkillBridge handles platform information
            and what kind of behavior is expected from students, tutors, and administrators.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {privacySections.map((item) => (
            <Card key={item.title} className="rounded-[1.75rem] border-border/70">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[2rem] border-border/70 bg-secondary/45">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Privacy basics
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Data is used to support the workflow, not to create unnecessary noise
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The platform only relies on the information needed to connect
                users to the right dashboards, tutor profiles, reviews, and bookings.
                That includes authentication context, role-aware page access, and the records required for session history.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/70">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Platform terms
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                A few practical rules that keep the product usable
              </h2>
              <div className="mt-6 space-y-4">
                {platformRules.map((rule) => (
                  <div
                    key={rule}
                    className="rounded-[1.25rem] bg-secondary/55 p-4 text-sm leading-7 text-muted-foreground"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
