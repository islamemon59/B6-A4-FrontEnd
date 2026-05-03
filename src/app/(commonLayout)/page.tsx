import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { publicService } from "@/services/public.service";
import {
  blogHighlights,
  faqItems,
  featureHighlights,
  getTutorGalleryImages,
  marketingStats,
  processSteps,
  testimonials,
} from "@/lib/site-content";

export default async function Home() {
  const [{ data: featuredTutors }, { data: categories }, { data: metrics }, latest] =
    await Promise.all([
      publicService.getFeaturedTutor(),
      publicService.getPublicCategories(),
      publicService.getHomeMetrics(),
      publicService.getAllTutor({
        page: "1",
        limit: "4",
        sortBy: "latest",
        sortOrder: "desc",
      }),
    ]);

  const tutors = Array.isArray(featuredTutors) ? featuredTutors : [];
  const heroImages = tutors
    .slice(0, 3)
    .flatMap((tutor: any) =>
      getTutorGalleryImages(tutor.category?.name, tutor.user?.image).slice(0, 1),
    );

  return (
    <div className="pb-20">
      <section className="mx-auto grid min-h-[66vh] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center gap-6">
          <Badge className="w-fit rounded-full bg-accent/80 text-accent-foreground">
            Production-ready tutoring platform
          </Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn with tutors who can turn sessions into real momentum.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              SkillBridge helps students discover trusted mentors, compare live
              availability, and keep every session connected to measurable
              progress.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/tutor">
                Explore tutors
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="/register">Create your account</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {marketingStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-border/70 bg-card/85 p-4 shadow-sm"
              >
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#featured-tutors"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            See what learners book first
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="overflow-hidden rounded-[2rem] border-border/60 sm:col-span-2">
            <CardContent className="grid gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 rounded-[1.5rem] bg-primary p-6 text-primary-foreground">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                  <Sparkles className="size-4" />
                  Verified learning journeys
                </div>
                <h2 className="text-3xl font-semibold leading-tight">
                  Search, book, review, and grow from one shared workflow.
                </h2>
                <div className="grid gap-3 text-sm text-primary-foreground/90">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4" />
                    Rich tutor profiles with meaningful subject, price, and rating context
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4" />
                    Booking flow connected to availability, reviews, and dashboards
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4" />
                    Responsive dark and light experiences with consistent visual rhythm
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroImages.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className={`relative overflow-hidden rounded-[1.5rem] ${
                      index === 0 ? "sm:col-span-2 h-52" : "h-40"
                    }`}
                  >
                    <Image
                      src={src}
                      alt="Learning session"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/75 p-6 sm:grid-cols-2 xl:grid-cols-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Live metrics
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Platform health at a glance</h2>
          </div>
          <div className="rounded-[1.5rem] bg-secondary/60 p-4">
            <p className="text-2xl font-semibold">{metrics?.tutors || 0}</p>
            <p className="text-sm text-muted-foreground">Published tutors</p>
          </div>
          <div className="rounded-[1.5rem] bg-secondary/60 p-4">
            <p className="text-2xl font-semibold">{metrics?.categories || 0}</p>
            <p className="text-sm text-muted-foreground">Active categories</p>
          </div>
          <div className="rounded-[1.5rem] bg-secondary/60 p-4">
            <p className="text-2xl font-semibold">{metrics?.completedBookings || 0}</p>
            <p className="text-sm text-muted-foreground">Completed sessions</p>
          </div>
          <div className="rounded-[1.5rem] bg-secondary/60 p-4">
            <p className="text-2xl font-semibold">{metrics?.averageRating || 0}</p>
            <p className="text-sm text-muted-foreground">Average rating</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Categories
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Popular learning tracks</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/tutor">Browse all tutors</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {(categories || []).slice(0, 8).map((category: any) => (
            <Card key={category.id} className="rounded-[1.5rem] border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-primary">
                  {category._count?.tutorProfiles || 0} tutors
                </p>
                <h3 className="mt-3 text-xl font-semibold">{category.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="featured-tutors" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Featured tutors
          </p>
          <h2 className="text-3xl font-semibold">High-signal mentors students keep booking</h2>
          <p className="max-w-2xl text-muted-foreground">
            Each profile highlights practical outcomes, subject focus, and
            scheduling flexibility so learners can decide confidently.
          </p>
        </div>
        <div className="mt-8">
          <FeaturedTutors />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {featureHighlights.map((item) => (
            <Card key={item.title} className="rounded-[1.75rem] border-border/70">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-secondary/55 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              A smoother flow for both learners and tutors
            </h2>
            <p className="mt-3 text-muted-foreground">
              We focused the experience around finding fit, booking quickly, and
              making progress visible after the session ends.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="rounded-[1.75rem] border-border/70">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="rounded-[1.75rem] border-border/70 bg-card/90">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <p className="text-base leading-7 text-foreground/90">
                  “{item.quote}”
                </p>
                <div className="mt-8">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Insights
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Platform notes and learner guidance</h2>
          </div>
          <Badge variant="outline" className="rounded-full px-4 py-2">
            {latest.meta.total} tutors currently searchable
          </Badge>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {blogHighlights.map((post) => (
            <Card key={post.title} className="rounded-[1.75rem] border-border/70">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Questions learners usually ask first</h2>
        </div>
        <Card className="mt-8 rounded-[2rem] border-border/70">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="rounded-[2.2rem] border-border/70 bg-primary text-primary-foreground">
          <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Ready to explore
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Create an account, try the demo login, and test the full student flow.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                The seeded demo data is designed to show live tutors, reviews,
                bookings, and dashboard metrics instead of empty-state-only screens.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/login">Try demo login</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
