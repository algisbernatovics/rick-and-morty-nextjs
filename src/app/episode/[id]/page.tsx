import type { Metadata } from "next";
import { getIdFromUrl } from "@/lib/utils";
import { CharacterCard } from "@/components/CharacterCard";
import { ChevronLeft, Calendar, Tv, Users } from "lucide-react";
import Link from "next/link";
import { buildEpisodeJsonLd, buildEpisodeSummary, createMetadata, formatEpisodeCode } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getCharactersByIds, getEpisodeById, getEpisodeIds } from "@/lib/static-data";

interface EpisodePageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getEpisodeIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
    const { id } = await params;
    const episodeId = Number.parseInt(id, 10);

    if (Number.isNaN(episodeId)) {
        return createMetadata({
            title: "Episode Not Found",
            description: "The requested Rick and Morty episode page could not be found.",
            path: `/episode/${id}`,
        });
    }

    const episode = getEpisodeById(episodeId);

    if (!episode) {
        return createMetadata({
            title: "Episode Not Found",
            description: "The requested Rick and Morty episode page could not be found.",
            path: `/episode/${id}`,
        });
    }

    return createMetadata({
        title: `${episode.name} Episode Guide`,
        description: buildEpisodeSummary(episode),
        path: `/episode/${episode.id}`,
    });
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const { id } = await params;
    const episodeId = Number.parseInt(id, 10);

    if (Number.isNaN(episodeId)) {
        notFound();
    }

    const episode = getEpisodeById(episodeId);

    if (!episode) {
        notFound();
    }

    const characterIds = episode.characters.map((url) => getIdFromUrl(url));
    const characters = getCharactersByIds(characterIds);
    const summary = buildEpisodeSummary(episode);
    const jsonLd = buildEpisodeJsonLd(episode);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link
                href="/episodes"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
            >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                BACK TO ALL EPISODES
            </Link>

            <header className="mb-16 text-center">
                <p className="text-primary font-black tracking-[0.3em] uppercase mb-4 animate-fade-in group">
                    {formatEpisodeCode(episode.episode)}
                </p>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
                    {episode.name}
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
                    {summary}
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                        <Calendar className="text-secondary" size={24} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Air Date</p>
                            <p className="font-bold text-white">{episode.air_date}</p>
                        </div>
                    </div>
                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                        <Users className="text-accent" size={24} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Characters Featured</p>
                            <p className="font-bold text-white">{characters.length} dimensional beings</p>
                        </div>
                    </div>
                </div>
            </header>

            <section>
                <div className="flex items-center justify-center gap-3 mb-8">
                    <Tv className="text-primary" size={32} />
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase text-center">
                        Characters in Rick and Morty Episode {episode.name}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {characters.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            </section>
        </div>
    );
}
