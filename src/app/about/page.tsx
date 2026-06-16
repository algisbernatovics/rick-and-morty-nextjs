import type { Metadata } from "next";
import { Github, ExternalLink, Mail, Linkedin, Code2, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getAllCharacters, getAllEpisodes, getAllLocations, getSnapshotGeneratedAt } from "@/lib/static-data";

export const metadata: Metadata = createMetadata({
    title: "About Rick and Morty Explorer",
    description:
        "Learn about Rick and Morty Explorer, a Next.js guide for browsing characters, episodes, and locations from the Rick and Morty API.",
    path: "/about",
});

export default function AboutPage() {
    const stats = [
        { label: "Characters", value: getAllCharacters().length.toLocaleString(), tone: "text-primary" },
        { label: "Episodes", value: getAllEpisodes().length.toLocaleString(), tone: "text-secondary" },
        { label: "Locations", value: getAllLocations().length.toLocaleString(), tone: "text-accent" },
    ];
    const snapshotDate = new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(getSnapshotGeneratedAt()));

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <header className="mb-14 text-center">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-secondary">
                    Static Rick and Morty guide
                </p>
                <h1 className="text-balance mb-6 text-5xl font-black uppercase tracking-tighter text-text-strong md:text-7xl">
                    Built for fast browsing and crawlable SEO
                </h1>
                <p className="mx-auto max-w-3xl text-xl font-medium leading-8 text-muted-foreground">
                    Rick and Morty Explorer is a fan-made, English-language guide that turns the public API into static character,
                    episode, and location pages with internal links, structured data, and a persistent sitemap.
                </p>
            </header>

            <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Static export coverage">
                {stats.map((stat) => (
                    <div key={stat.label} className="panel rounded-3xl p-6 text-center">
                        <p className={`text-4xl font-black tracking-tighter ${stat.tone}`}>{stat.value}</p>
                        <p className="eyebrow mt-2">{stat.label} exported</p>
                    </div>
                ))}
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <section className="panel rounded-3xl border-l-4 border-l-primary p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-4">
                        <Code2 className="text-primary" size={32} aria-hidden="true" />
                        <h2 className="text-3xl font-black uppercase tracking-tight text-text-strong">Project background</h2>
                    </div>
                    <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                        Built by <span className="font-bold text-text-strong">Algis Bernatovics</span>, this project is a rewrite of an earlier Rick and Morty coursework app from Codelex, where the idea started in PHP.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        The modern version keeps the same exploration idea but rebuilds it with Next.js, TypeScript, reusable UI primitives, static export, and cleaner SEO foundations.
                    </p>
                </section>

                <section className="panel rounded-3xl border-l-4 border-l-secondary p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-4">
                        <RefreshCw className="text-secondary" size={32} aria-hidden="true" />
                        <h2 className="text-3xl font-black uppercase tracking-tight text-text-strong">How data updates</h2>
                    </div>
                    <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                        The app refreshes a build-time snapshot from the Rick and Morty API, then generates static pages from that data. If the API throttles during deploy, the last committed snapshot keeps the build working.
                    </p>
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Current snapshot: <span className="text-text-strong">{snapshotDate}</span>
                    </p>
                </section>

                <section className="panel rounded-3xl border-l-4 border-l-accent p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-4">
                        <ShieldCheck className="text-accent" size={32} aria-hidden="true" />
                        <h2 className="text-3xl font-black uppercase tracking-tight text-text-strong">SEO and UX focus</h2>
                    </div>
                    <ul className="space-y-3 text-lg leading-relaxed text-muted-foreground">
                        <li className="flex gap-3">
                            <Sparkles className="mt-1 shrink-0 text-primary" size={20} aria-hidden="true" />
                            Crawlable static URLs for listing pages and entity detail pages.
                        </li>
                        <li className="flex gap-3">
                            <Sparkles className="mt-1 shrink-0 text-secondary" size={20} aria-hidden="true" />
                            Route metadata, structured data, robots output, and a complete sitemap.
                        </li>
                        <li className="flex gap-3">
                            <Sparkles className="mt-1 shrink-0 text-accent" size={20} aria-hidden="true" />
                            Accessible navigation, pagination, focus states, and reduced-motion support.
                        </li>
                    </ul>
                </section>

                <section className="panel rounded-3xl border-l-4 border-l-primary p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-4">
                        <ExternalLink className="text-primary" size={32} aria-hidden="true" />
                        <h2 className="text-3xl font-black uppercase tracking-tight text-text-strong">Credits and contact</h2>
                    </div>
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                        Thanks to <span className="font-bold text-text-strong">Axel Fuhrmann</span> and the team behind the <Link href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="focus-ring rounded font-bold text-primary hover:underline">Rick and Morty API</Link> for making this kind of fan guide possible.
                    </p>
                    <div className="mb-8 space-y-4">
                        <Link
                            href="mailto:algis.bernatovics@gmail.com"
                            className="focus-ring flex items-center gap-3 rounded text-lg text-muted-foreground transition-colors hover:text-text-strong"
                        >
                            <Mail className="text-primary shrink-0" size={22} />
                            algis.bernatovics@gmail.com
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/algisbernatovics/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring flex items-center gap-3 rounded text-lg text-muted-foreground transition-colors hover:text-text-strong"
                        >
                            <Linkedin className="text-secondary shrink-0" size={22} />
                            linkedin.com/in/algisbernatovics
                        </Link>
                        <Link
                            href="https://github.com/algisbernatovics/rick-and-morty-njs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring flex items-center gap-3 rounded text-lg text-muted-foreground transition-colors hover:text-text-strong"
                        >
                            <Github className="text-accent shrink-0" size={22} />
                            Next.js repository
                        </Link>
                        <Link
                            href="https://github.com/algisbernatovics/rick-and-morty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring flex items-center gap-3 rounded text-lg text-muted-foreground transition-colors hover:text-text-strong"
                        >
                            <Github className="text-accent shrink-0" size={22} />
                            PHP repository
                        </Link>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        This application is deployed on <span className="font-bold text-text-strong">Vercel</span>. It is an unofficial fan project and is not affiliated with Adult Swim or the official Rick and Morty brand.
                    </p>
                </section>
            </div>
        </div>
    );
}
