import type { Metadata } from "next";
import { getEntityHrefFromApiUrl, getIdFromUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Tv } from "lucide-react";
import { EpisodeRow } from "@/components/EpisodeRow";
import { buildCharacterJsonLd, buildCharacterSummary, createMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getCharacterById, getCharacterIds, getEpisodesByIds } from "@/lib/static-data";
import { JsonLd } from "@/components/ui/JsonLd";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CharacterPageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getCharacterIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
    const { id } = await params;
    const characterId = Number.parseInt(id, 10);

    if (Number.isNaN(characterId)) {
        return createMetadata({
            title: "Character Not Found",
            description: "The requested Rick and Morty character page could not be found.",
            path: `/character/${id}`,
        });
    }

    const character = getCharacterById(characterId);

    if (!character) {
        return createMetadata({
            title: "Character Not Found",
            description: "The requested Rick and Morty character page could not be found.",
            path: `/character/${id}`,
        });
    }

    return createMetadata({
        title: `${character.name} Character Guide`,
        description: buildCharacterSummary(character),
        path: `/character/${character.id}`,
    });
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    const { id } = await params;
    const characterId = Number.parseInt(id, 10);

    if (Number.isNaN(characterId)) {
        notFound();
    }

    const character = getCharacterById(characterId);

    if (!character) {
        notFound();
    }

    const episodeIds = character.episode.map((url) => getIdFromUrl(url));
    const episodes = getEpisodesByIds(episodeIds);
    const summary = buildCharacterSummary(character);
    const jsonLd = buildCharacterJsonLd(character);
    const originHref = getEntityHrefFromApiUrl(character.origin.url, "location");
    const currentLocationHref = getEntityHrefFromApiUrl(character.location.url, "location");

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <JsonLd data={jsonLd} />
            <Link
                href="/"
                className="focus-ring mb-8 inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition-colors hover:text-primary"
            >
                <ChevronLeft size={20} aria-hidden="true" />
                BACK TO ALL CHARACTERS
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                <div className="md:col-span-1">
                    <div className="sticky top-32">
                        <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-primary/20 shadow-[var(--shadow-primary)]">
                            <Image
                                src={character.image}
                                alt={character.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(min-width: 768px) 33vw, 100vw"
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <StatusBadge status={character.status} className="py-3 text-sm" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h1 className="mb-4 text-6xl font-black leading-none tracking-tighter text-text-strong md:text-8xl">
                            {character.name.toUpperCase()}
                        </h1>
                        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
                            {summary}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <span className="rounded-full border border-border-subtle bg-surface-glass px-4 py-2 text-sm font-bold uppercase text-secondary">
                                {character.species}
                            </span>
                            {character.type && (
                                <span className="rounded-full border border-border-subtle bg-surface-glass px-4 py-2 text-sm font-bold uppercase text-accent">
                                    {character.type}
                                </span>
                            )}
                            <span className="rounded-full border border-border-subtle bg-surface-glass px-4 py-2 text-sm font-bold uppercase text-muted-foreground">
                                {character.gender}
                            </span>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Panel className="flex items-start gap-4 rounded-2xl border-l-4 border-l-primary p-6">
                            <MapPin className="text-primary shrink-0" size={24} aria-hidden="true" />
                            <div>
                                <p className="eyebrow mb-1">Origin</p>
                                {originHref ? (
                                    <Link
                                        href={originHref}
                                        className="focus-ring rounded text-lg font-bold leading-tight text-text-strong transition-colors hover:text-primary"
                                    >
                                        {character.origin.name}
                                    </Link>
                                ) : (
                                    <p className="text-lg font-bold leading-tight text-text-strong">{character.origin.name}</p>
                                )}
                            </div>
                        </Panel>

                        <Panel className="flex items-start gap-4 rounded-2xl border-l-4 border-l-secondary p-6">
                            <MapPin className="text-secondary shrink-0" size={24} aria-hidden="true" />
                            <div>
                                <p className="eyebrow mb-1">Last Known Location</p>
                                {currentLocationHref ? (
                                    <Link
                                        href={currentLocationHref}
                                        className="focus-ring rounded text-lg font-bold leading-tight text-text-strong transition-colors hover:text-secondary"
                                    >
                                        {character.location.name}
                                    </Link>
                                ) : (
                                    <p className="text-lg font-bold leading-tight text-text-strong">{character.location.name}</p>
                                )}
                            </div>
                        </Panel>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Tv className="text-primary" size={28} aria-hidden="true" />
                            <h2 className="text-2xl font-black uppercase tracking-tight text-text-strong">Rick and Morty Episodes Featuring {character.name}</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {episodes.map((episode) => (
                                <EpisodeRow key={episode.id} episode={episode} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
