"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useAuth } from "@/Provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { UserMenu } from "@/components/authentication/UserMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/tutor", label: "Find Tutors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/privacy", label: "Privacy & Terms" },
];

export function Navbar() {
  const { user } = useAuth();

  const allLinks = user
    ? [...primaryLinks, { href: "/dashboard", label: "Dashboard" }]
    : primaryLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-semibold">SB</span>
          </div>
          <div>
            <p className="font-semibold tracking-tight">SkillBridge</p>
            <p className="text-xs text-muted-foreground">
              Learn from trusted tutors
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full px-4 text-sm">
                Resources
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl">
              {resourceLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ModeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px]">
              <SheetHeader>
                <SheetTitle>SkillBridge</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                {allLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="rounded-full">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
