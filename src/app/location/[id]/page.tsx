import type { Metadata } from "next";
import { getIdFromUrl } from "@/lib/utils";
import { CharacterCard } from "@/components/CharacterCard";
import { ChevronLeft, Globe, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { buildLocationJsonLd, buildLocationSummary, createMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getAllLocations, getCharactersByIds, getLocationById, getLocationIds } from "@/lib/static-data";
import { JsonLd } from "@/components/ui/JsonLd";
import { Panel } from "@/components/ui/Panel";

interface LocationPageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getLocationIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
    const { id } = await params;
    const locationId = Number.parseInt(id, 10);

    if (Number.isNaN(locationId)) {
        return createMetadata({
            title: "Location Not Found",
            description: "The requested Rick and Morty location page could not be found.",
            path: `/location/${id}`,
        });
    }

    const location = getLocationById(locationId);

    if (!location) {
        return createMetadata({
            title: "Location Not Found",
            description: "The requested Rick and Morty location page could not be found.",
            path: `/location/${id}`,
        });
    }

    return createMetadata({
        title: `${location.name} Location Guide`,
        description: buildLocationSummary(location),
        path: `/location/${location.id}`,
    });
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { id } = await params;
    const locationId = Number.parseInt(id, 10);

    if (Number.isNaN(locationId)) {
        notFound();
    }

    const location = getLocationById(locationId);

    if (!location) {
        notFound();
    }

    const characterIds = location.residents.map((url) => getIdFromUrl(url));
    const characters = getCharactersByIds(characterIds);
    const summary = buildLocationSummary(location);
    const jsonLd = buildLocationJsonLd(location);
    const relatedLocations = getAllLocations()
        .filter((candidate) => {
            if (candidate.id === location.id) return false;
            return candidate.dimension === location.dimension || candidate.type === location.type;
        })
        .slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <JsonLd data={jsonLd} />
            <Link
                href="/locations"
                className="focus-ring mb-8 inline-flex items-center gap-2 rounded-lg font-bold text-muted-foreground transition-colors hover:text-primary"
            >
                <ChevronLeft size={20} aria-hidden="true" />
                BACK TO ALL LOCATIONS
            </Link>

            <header className="mb-16 text-center">
                <p className="text-secondary font-black tracking-[0.3em] uppercase mb-4 animate-fade-in group">
                    {location.type} • {location.dimension}
                </p>
                <h1 className="mb-8 bg-gradient-to-r from-secondary to-primary bg-clip-text text-5xl font-black uppercase leading-none tracking-tighter text-transparent md:text-8xl">
                    {location.name}
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
                    {summary}
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Panel className="flex items-center gap-3 rounded-2xl px-8 py-4">
                        <Globe className="text-secondary" size={24} aria-hidden="true" />
                        <div>
                            <p className="eyebrow">Dimension</p>
                            <p className="font-bold uppercase text-text-strong">{location.dimension}</p>
                        </div>
                    </Panel>
                    <Panel className="flex items-center gap-3 rounded-2xl px-8 py-4">
                        <Users className="text-primary" size={24} aria-hidden="true" />
                        <div>
                            <p className="eyebrow">Known Residents</p>
                            <p className="font-bold text-text-strong">{characters.length} beings</p>
                        </div>
                    </Panel>
                </div>
            </header>

            <section>
                <div className="flex items-center justify-center gap-3 mb-8">
                    <MapPin className="text-secondary" size={32} aria-hidden="true" />
                    <h2 className="text-center text-3xl font-black uppercase tracking-tight text-text-strong">
                        Residents of Rick and Morty Location {location.name}
                    </h2>
                </div>

                {characters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {characters.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                ) : (
                    <Panel className="rounded-3xl border-2 border-dashed border-border-subtle p-12 text-center">
                        <p className="text-2xl font-black text-muted-foreground uppercase tracking-tighter">
                            No known residents in this location... yet.
                        </p>
                    </Panel>
                )}
            </section>

            {relatedLocations.length > 0 ? (
                <section className="mt-16">
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <MapPin className="text-primary" size={28} aria-hidden="true" />
                        <h2 className="text-center text-2xl font-black uppercase tracking-tight text-text-strong">
                            Related Rick and Morty locations
                        </h2>
                    </div>
                    <Panel className="rounded-3xl p-6">
                        <div className="flex flex-wrap justify-center gap-3">
                            {relatedLocations.map((relatedLocation) => (
                                <Link
                                    key={relatedLocation.id}
                                    href={`/location/${relatedLocation.id}`}
                                    className="focus-ring rounded-full border border-border-subtle bg-surface-glass px-4 py-2 text-sm font-bold text-text-soft transition-colors hover:text-secondary"
                                >
                                    {relatedLocation.name}
                                </Link>
                            ))}
                        </div>
                    </Panel>
                </section>
            ) : null}
        </div>
    );
}
