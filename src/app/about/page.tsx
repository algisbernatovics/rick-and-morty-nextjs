import type { Metadata } from "next";
import { Github, ExternalLink, Heart, Mail, Linkedin, Code2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
    title: "About Rick and Morty Explorer",
    description:
        "Learn about Rick and Morty Explorer, a Next.js guide for browsing characters, episodes, and locations from the Rick and Morty API.",
    path: "/about",
});

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
                    About the <span className="text-primary">Guide</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                    Rick and Morty Explorer is an English-language fan project for browsing characters, episodes, and locations from the series with fast search, linked detail pages, and a production-ready Next.js stack.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-primary">
                    <div className="flex items-center gap-4 mb-6">
                        <Code2 className="text-primary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Project Background</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                        Built by <span className="text-white font-bold">Algis Bernatovics</span>, this project is a rewrite of my earlier Rick and Morty coursework app from Codelex, where I started as a PHP developer.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        The original PHP version began on May 7, 2023 and is publicly available on GitHub. This Next.js version rebuilds the same idea with a stronger frontend architecture, cleaner routing, better SEO, and a more polished user experience.
                    </p>
                </section>

                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-primary">
                    <div className="flex items-center gap-4 mb-6">
                        <RefreshCw className="text-primary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">What Changed in the Rewrite</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                        This rewrite moves the project from a PHP coursework foundation to a modern Next.js and TypeScript application with App Router, reusable components, responsive layouts, and a cleaner deployment workflow.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        It also adds route metadata, structured SEO improvements, sitemap and robots support, and Google Analytics integration while keeping the Rick and Morty API as the core data source.
                    </p>
                </section>

                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-secondary">
                    <div className="flex items-center gap-4 mb-6">
                        <Heart className="text-secondary" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Special Thanks</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        A huge thanks to the <span className="text-white font-bold">Axel Fuhrmann</span> and the team behind the <Link href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Rick and Morty API</Link>.
                        Your amazing work makes this kind of exploration possible across all dimensions.
                    </p>
                </section>

                <section className="glass p-8 md:p-12 rounded-3xl border-l-4 border-accent">
                    <div className="flex items-center gap-4 mb-6">
                        <ExternalLink className="text-accent" size={32} />
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Contacts</h2>
                    </div>
                    <div className="space-y-4 mb-8">
                        <Link
                            href="mailto:algis.bernatovics@gmail.com"
                            className="flex items-center gap-3 text-lg text-muted-foreground hover:text-white transition-colors"
                        >
                            <Mail className="text-primary shrink-0" size={22} />
                            algis.bernatovics@gmail.com
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/algisbernatovics/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-lg text-muted-foreground hover:text-white transition-colors"
                        >
                            <Linkedin className="text-secondary shrink-0" size={22} />
                            linkedin.com/in/algisbernatovics
                        </Link>
                        <Link
                            href="https://github.com/algisbernatovics/rick-and-morty-njs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-lg text-muted-foreground hover:text-white transition-colors"
                        >
                            <Github className="text-accent shrink-0" size={22} />
                            Next.js repository
                        </Link>
                        <Link
                            href="https://github.com/algisbernatovics/rick-and-morty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-lg text-muted-foreground hover:text-white transition-colors"
                        >
                            <Github className="text-accent shrink-0" size={22} />
                            PHP repository
                        </Link>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        This application is deployed on <span className="text-white font-bold">Vercel</span>. It is an unofficial fan project and is not affiliated with Adult Swim or the official Rick and Morty brand.
                    </p>
                </section>
            </div>
        </div>
    );
}
