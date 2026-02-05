import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const points = [
  {
    title: "Verified tutors",
    desc: "Tutors build profiles, set availability, and earn trust through reviews.",
    badge: "Trust",
  },
  {
    title: "Flexible learning",
    desc: "Online, in-person, or both—choose how you want to learn.",
    badge: "Flexible",
  },
  {
    title: "Transparent pricing",
    desc: "See hourly rate upfront and filter tutors by your budget.",
    badge: "Fair",
  },
  {
    title: "Fast booking",
    desc: "Book sessions quickly with available time slots—no back-and-forth.",
    badge: "Quick",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-5xl text-center mb-2 font-semibold">Why choose SkillBridge</h2>
        <p className="text-xl text-center mb-12 font-semibold">
          Built for learners, tutors, and admins—simple, safe, and scalable.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {points.map((p, idx) => (
            <div key={p.title}>
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <Badge variant="outline">{p.badge}</Badge>
              </div>

              {idx !== points.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
