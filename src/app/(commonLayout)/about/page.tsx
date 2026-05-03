import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          About SkillBridge
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          A tutoring platform built around clarity, trust, and momentum
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          SkillBridge helps learners find the right tutor faster while giving
          tutors the tools to manage sessions, reviews, and availability from a
          single workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "For learners",
            text: "Search by meaningful filters, compare profiles with confidence, and track bookings through a clean dashboard.",
          },
          {
            title: "For tutors",
            text: "Publish a strong profile, manage live availability, and follow session outcomes through reviews and activity data.",
          },
          {
            title: "For platform owners",
            text: "Monitor categories, users, and bookings with role-based dashboards, overview cards, and filterable data tables.",
          },
        ].map((item) => (
          <Card key={item.title} className="rounded-[1.75rem] border-border/70">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
