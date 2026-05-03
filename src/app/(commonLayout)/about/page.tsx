import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const audienceCards = [
  {
    title: "For learners",
    text: "Students can search by subject, price, rating, and teaching mode, then keep every booking connected to a visible learning journey.",
  },
  {
    title: "For tutors",
    text: "Tutors can publish stronger profiles, control live availability, manage sessions, and understand student feedback through one dashboard.",
  },
  {
    title: "For platform owners",
    text: "Admins get a clearer operations layer with user management, booking visibility, category control, and dynamic dashboard summaries.",
  },
];

const valueCards = [
  {
    title: "Clarity first",
    text: "We reduce friction at every step, from tutor discovery to booking follow-through, so users always understand what happens next.",
  },
  {
    title: "Trust through detail",
    text: "Published profiles, real availability, live review data, and role-aware dashboards help the product feel dependable instead of improvised.",
  },
  {
    title: "Momentum over noise",
    text: "SkillBridge is designed to move students from browsing to meaningful progress, not just to create one more directory of tutor cards.",
  },
];

const workflowSteps = [
  "Learners discover tutors through search, category filters, ratings, and pricing signals.",
  "Tutors keep profiles current with subjects, availability slots, and published teaching details.",
  "Bookings create a shared record that powers progress tracking, session status updates, and reviews.",
  "Dashboard views turn raw activity into something useful for students, tutors, and admins.",
];

export default function AboutPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <Badge className="w-fit rounded-full bg-accent/80 text-accent-foreground">
              About SkillBridge
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A tutoring platform built around clarity, trust, and momentum
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              SkillBridge helps learners find the right tutor faster while
              giving tutors the tools to manage sessions, reviews, and
              availability from a single workflow. The product is designed to
              feel structured, production-ready, and useful from the first click.
            </p>
          </div>

          <Card className="rounded-[2rem] border-border/70 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="size-5" />
                <span className="font-semibold">What SkillBridge focuses on</span>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Better tutor discovery with meaningful filters instead of vague listings.
                </p>
                <p>
                  Stronger teaching workflows with availability, booking, and review loops.
                </p>
                <p>
                  Role-based visibility so students, tutors, and admins each see what matters.
                </p>
              </div>
              <Button asChild className="w-full rounded-full">
                <Link href="/tutor">
                  Explore tutors
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {audienceCards.map((item) => (
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

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[2rem] border-border/70 bg-secondary/45">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Mission
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Make tutor matching feel reliable, measurable, and calm
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The platform exists to reduce the uncertainty that usually comes
                with finding the right tutor. Instead of sending users through a
                generic marketplace, SkillBridge connects tutor quality,
                session availability, and ongoing feedback into one consistent experience.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {valueCards.map((item) => (
              <Card key={item.title} className="rounded-[1.75rem] border-border/70">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-[2rem] border-border/70">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Workflow
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                How the platform turns browsing into progress
              </h2>
              <div className="mt-6 space-y-4">
                {workflowSteps.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/70">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Why it matters
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                A stronger structure for real teaching relationships
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Great tutoring platforms do more than list experts. They help
                users compare clearly, commit confidently, and continue
                learning with visible follow-through. SkillBridge is built to
                support that end-to-end rhythm, not just the first click.
              </p>
              <div className="mt-6 rounded-[1.5rem] bg-secondary/55 p-5 text-sm text-muted-foreground">
                The result is a product experience that feels more like a real
                learning operations platform and less like a thin marketing shell.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
