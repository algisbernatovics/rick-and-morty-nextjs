import Link from "next/link";
import { Heart, Home, MapPin, SearchX, Tv, Users } from "lucide-react";

const recoveryLinks = [
  { href: "/", label: "Browse characters", icon: Users },
  { href: "/episodes", label: "Browse episodes", icon: Tv },
  { href: "/locations", label: "Browse locations", icon: MapPin },
  { href: "/about", label: "About this guide", icon: Heart },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-4 py-16 text-center">
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-border-subtle bg-surface-glass text-primary shadow-[var(--shadow-primary)]">
        <SearchX size={48} aria-hidden="true" />
      </div>

      <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-secondary">
        Portal destination missing
      </p>
      <h1 className="text-balance text-5xl font-black uppercase leading-none tracking-tighter text-text-strong md:text-7xl">
        This dimension does not exist
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        The page may have moved, the entity ID may not be part of the current static export, or the portal URL may be mistyped.
        Start from one of the generated indexes below.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 font-black uppercase tracking-wider text-text-inverse transition-transform hover:-translate-y-0.5"
        >
          <Home size={20} aria-hidden="true" />
          Back home
        </Link>
        <div className="flex flex-wrap justify-center gap-3">
          {recoveryLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface-glass px-5 py-3 text-sm font-bold text-text-soft transition-colors hover:text-primary"
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
