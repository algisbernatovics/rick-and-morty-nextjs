import Link from "next/link";
import { ExternalLink, Github, Heart, Linkedin, Mail, MapPin, Tv, Users } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Characters", icon: Users },
  { href: "/episodes", label: "Episodes", icon: Tv },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/about", label: "About", icon: Heart },
];

const socialLinks = [
  {
    href: "mailto:algis.bernatovics@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://www.linkedin.com/in/algisbernatovics/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/algisbernatovics/rick-and-morty-njs",
    label: "GitHub",
    icon: Github,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-glass">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="focus-ring inline-flex rounded-lg text-2xl font-black tracking-tighter text-primary">
            RICK<span className="text-secondary">&</span>MORTY
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            A static Rick and Morty guide with crawlable character, episode, and location pages generated from the public API.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Unofficial fan project. Not affiliated with Adult Swim.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="space-y-3">
            {footerLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="focus-ring inline-flex items-center gap-3 rounded-lg text-sm font-bold text-text-soft transition-colors hover:text-primary"
                >
                  <Icon size={18} className="text-primary" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">Credits and contact</h2>
          <ul className="space-y-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="focus-ring inline-flex items-center gap-3 rounded-lg text-sm font-bold text-text-soft transition-colors hover:text-secondary"
                >
                  <Icon size={18} className="text-secondary" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://rickandmortyapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-3 rounded-lg text-sm font-bold text-text-soft transition-colors hover:text-accent"
              >
                <ExternalLink size={18} className="text-accent" aria-hidden="true" />
                Rick and Morty API
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-subtle px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rick and Morty Explorer. Static pages, sitemap, and robots are generated at build time.
      </div>
    </footer>
  );
}
