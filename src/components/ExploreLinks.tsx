import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

interface ExploreLinksProps {
  links: ExploreLink[];
  label?: string;
  className?: string;
}

export function ExploreLinks({ links, label = "Explore more", className }: ExploreLinksProps) {
  return (
    <nav
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-3", className)}
    >
      {links.map(({ href, label: linkLabel, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-glass px-4 py-2 text-sm font-black uppercase tracking-wider text-text-soft transition-colors hover:text-primary"
        >
          {Icon ? <Icon size={16} aria-hidden="true" /> : null}
          {linkLabel}
        </Link>
      ))}
    </nav>
  );
}
