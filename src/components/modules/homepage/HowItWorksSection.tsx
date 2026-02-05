import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: "Step 1",
    title: "Find the right tutor",
    desc: "Search by subject, category, rating, and price to match your learning goal.",
  },
  {
    step: "Step 2",
    title: "Pick a time slot",
    desc: "Check availability and choose a session time that fits your schedule.",
  },
  {
    step: "Step 3",
    title: "Book & start learning",
    desc: "Book instantly and focus on your growth. Leave a review after your session.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-5xl text-center mb-2 font-semibold">How SkillBridge works</h2>
        <p className="text-xl text-center mb-12 font-semibold">
          Start learning in minutes with a simple booking flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s) => (
          <Card key={s.step}>
            <CardHeader className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                {s.step}
              </Badge>
              <CardTitle className="text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
