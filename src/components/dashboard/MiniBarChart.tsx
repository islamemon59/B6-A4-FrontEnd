import { Card, CardContent } from "@/components/ui/card";

type ChartItem = {
  label: string;
  value: number;
};

export function MiniBarChart({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ChartItem[];
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <Card className="rounded-[1.75rem] border-border/70">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary/70">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
