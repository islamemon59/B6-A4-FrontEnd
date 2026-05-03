import { siteContact } from "@/lib/site-content";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Reach the SkillBridge team
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Use the details below for student support, tutor onboarding, product
          feedback, or deployment-related questions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-[1.75rem] border-border/70">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Email</h2>
            <a href={`mailto:${siteContact.email}`} className="mt-3 block text-primary">
              {siteContact.email}
            </a>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem] border-border/70">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Phone</h2>
            <a
              href={`tel:${siteContact.phone.replaceAll(" ", "")}`}
              className="mt-3 block text-primary"
            >
              {siteContact.phone}
            </a>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem] border-border/70">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Office</h2>
            <p className="mt-3 text-muted-foreground">{siteContact.address}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
