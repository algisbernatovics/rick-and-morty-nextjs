import type { Metadata } from "next";
import { getIdFromUrl } from "@/lib/utils";
import { CharacterCard } from "@/components/CharacterCard";
import { ChevronLeft, Globe, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { buildLocationJsonLd, buildLocationSummary, createMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getCharactersByIds, getLocationById, getLocationIds } from "@/lib/static-data";

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
            >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                BACK TO ALL LOCATIONS
            </Link>

            <header className="mb-16 text-center">
                <p className="text-secondary font-black tracking-[0.3em] uppercase mb-4 animate-fade-in group">
                    {location.type} • {location.dimension}
                </p>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {location.name}
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-8">
                    {summary}
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                        <Globe className="text-secondary" size={24} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dimension</p>
                            <p className="font-bold text-white uppercase">{location.dimension}</p>
                        </div>
                    </div>
                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3">
                        <Users className="text-primary" size={24} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Known Residents</p>
                            <p className="font-bold text-white">{characters.length} beings</p>
                        </div>
                    </div>
                </div>
            </header>

            <section>
                <div className="flex items-center justify-center gap-3 mb-8">
                    <MapPin className="text-secondary" size={32} />
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase text-center">
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
                    <div className="glass p-12 rounded-3xl text-center border-2 border-dashed border-white/10">
                        <p className="text-2xl font-black text-muted-foreground uppercase tracking-tighter">
                            No known residents in this location... yet.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
