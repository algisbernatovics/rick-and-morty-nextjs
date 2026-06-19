import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Characters" },
  { href: "/episodes", label: "Episodes" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-glass">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-4 py-8 text-center sm:px-6 lg:px-8">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
              <Link
                href={href}
                className="focus-ring rounded-lg text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </Link>
            </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rick and Morty Explorer
        </p>
      </div>
    </footer>
  );
}
