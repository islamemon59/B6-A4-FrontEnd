import { faqItems } from "@/lib/site-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="flex flex-1">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Help Center
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Common answers for students, tutors, and admins
          </h1>
        </div>

        <Card className="rounded-[2rem] border-border/70">
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`help-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
