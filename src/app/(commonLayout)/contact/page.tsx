import { Clock3, Headset, Mail, MapPin, Phone, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteContact } from "@/lib/site-content";

const supportChannels = [
  {
    title: "Student support",
    description:
      "Help with account access, booking questions, reviews, and tutor discovery issues.",
    icon: Headset,
  },
  {
    title: "Tutor onboarding",
    description:
      "Guidance for profile quality, publishing availability, and improving student-facing credibility.",
    icon: Users,
  },
  {
    title: "Partnerships & operations",
    description:
      "Platform feedback, collaborations, deployment questions, and product improvement requests.",
    icon: Mail,
  },
];

const responseExpectations = [
  "General email support: within 24 business hours",
  "Tutor onboarding questions: same business day when possible",
  "Operational or deployment-related topics: usually within 1 to 2 business days",
];

export default function ContactPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Reach the SkillBridge team with the right context, faster
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Use the details below for student support, tutor onboarding,
              product feedback, deployment-related questions, or partnership conversations.
            </p>
          </div>

          <Card className="rounded-[2rem] border-border/70 bg-card/90 shadow-sm">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="mt-1 block text-sm text-primary"
                  >
                    {siteContact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a
                    href={`tel:${siteContact.phone.replaceAll(" ", "")}`}
                    className="mt-1 block text-sm text-primary"
                  >
                    {siteContact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteContact.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Support hours</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sunday to Thursday, 10:00 AM to 6:00 PM (Bangladesh time)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {supportChannels.map((item) => {
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

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-[2rem] border-border/70">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Before you message us
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                The more specific the issue, the faster the help
              </h2>
              <div className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  Include the page you were using, the role you were signed in as,
                  and what you expected to happen.
                </p>
                <p>
                  If the question is booking-related, mention the tutor, subject,
                  and approximate session time.
                </p>
                <p>
                  For technical or deployment issues, include the environment and any visible error text.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/70 bg-secondary/45">
            <CardContent className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Response expectations
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                What kind of turnaround to expect
              </h2>
              <div className="mt-6 space-y-4">
                {responseExpectations.map((item) => (
                  <div key={item} className="rounded-[1.25rem] bg-background/70 p-4 text-sm text-muted-foreground">
                    {item}
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
