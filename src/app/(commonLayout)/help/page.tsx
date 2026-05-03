import { LifeBuoy, ShieldCheck, UserCog } from "lucide-react";
import { faqItems } from "@/lib/site-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const quickHelpCards = [
  {
    title: "Getting started",
    description:
      "Create an account, choose the right role, and begin exploring tutor profiles or publishing your own.",
    icon: LifeBuoy,
  },
  {
    title: "Booking and session flow",
    description:
      "Use tutor availability, confirm a session, and track status changes from confirmed to completed.",
    icon: UserCog,
  },
  {
    title: "Account, trust, and safety",
    description:
      "Role-based access, profile controls, reviews, and published tutor information help keep the workflow reliable.",
    icon: ShieldCheck,
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Help Center
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Common answers for students, tutors, and admins
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            This page is designed to answer the questions users usually have
            first, especially around profiles, bookings, reviews, and dashboard access.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {quickHelpCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-[1.75rem] border-border/70">
                <CardContent className="p-6">
                  <Icon className="size-6 text-primary" />
                  <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="rounded-[2rem] border-border/70 bg-secondary/45">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Practical guidance
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                A few things that solve most issues quickly
              </h2>
              <div className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  Make sure you are signed in with the correct role before opening dashboard routes.
                </p>
                <p>
                  If a tutor does not appear in search, check whether the profile is published and has active details.
                </p>
                <p>
                  If booking behavior looks unusual, refresh the session and verify the tutor slot is still available.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/70">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`help-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
