import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string | number;
  caption: string;
}) {
  return (
    <Card className="rounded-[1.5rem] border-border/70">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
      </CardContent>
    </Card>
  );
}
