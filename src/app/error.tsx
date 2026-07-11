"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-status-dead">
        Interdimensional error
      </p>
      <h1 className="text-4xl font-black uppercase tracking-tighter text-text-strong md:text-5xl">
        Something broke in this dimension
      </h1>
      <p className="max-w-md text-lg leading-8 text-muted-foreground">
        The page failed to load. Try again before the portal closes, or return to a stable index page.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="focus-ring rounded-xl bg-primary px-8 py-4 font-black uppercase tracking-wider text-text-inverse transition-transform hover:-translate-y-0.5"
        >
          Try again
        </button>
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-glass px-6 py-4 font-bold text-text-soft transition-colors hover:text-primary"
        >
          <Home size={20} aria-hidden="true" />
          Back home
        </Link>
      </div>
    </div>
  );
}
