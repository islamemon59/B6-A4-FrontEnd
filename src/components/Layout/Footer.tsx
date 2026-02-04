import { cn } from "@/lib/utils";
import { Logo, LogoText } from "@/components/ui/logo";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "border-t bg-background py-6",
        className
      )}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Logo */}
        <Logo url="/">
          <LogoText className="text-xl font-bold tracking-tighter">
            SkillBridge 🎓
          </LogoText>
        </Logo>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} SkillBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export { Footer };
