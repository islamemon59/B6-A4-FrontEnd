import Link from "next/link";
import { siteContact } from "@/lib/site-content";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/", label: "Home" },
      { href: "/tutor", label: "Find Tutors" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/privacy", label: "Privacy & Terms" },
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <span className="font-semibold">SB</span>
            </div>
            <div>
              <p className="font-semibold tracking-tight">SkillBridge</p>
              <p className="text-sm text-muted-foreground">
                Project-based tutoring that feels clear, trustworthy, and fast.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{siteContact.address}</p>
            <p>
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            </p>
            <p>
              <a href={`tel:${siteContact.phone.replaceAll(" ", "")}`}>
                {siteContact.phone}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-4 py-2 hover:bg-secondary"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-4 py-2 hover:bg-secondary"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-4 py-2 hover:bg-secondary"
            >
              GitHub
            </a>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          <p>Built for responsive learning flows, role-based operations, and production-ready delivery.</p>
        </div>
      </div>
    </footer>
  );
}
