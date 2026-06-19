import type { Metadata } from "next";
import { rickAndMortyApi } from "@/lib/api";
import { Pagination } from "@/components/Pagination";
import { Search, MapPin } from "lucide-react";
import { LocationCard } from "@/components/LocationCard";
import Link from "next/link";
import { buildSearchResultsDescription, createMetadata } from "@/lib/seo";
import { getSearchName, parsePageParam } from "@/lib/search-params";

interface LocationsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: LocationsProps): Promise<Metadata> {
    const params = await searchParams;
    const name = getSearchName(params.name);

    return createMetadata({
        title: name ? `Rick and Morty Locations Matching ${name}` : "Rick and Morty Locations Guide",
        description: buildSearchResultsDescription({
            entityLabel: "locations",
            query: name,
            fallbackDescription:
                "Explore a searchable Rick and Morty locations guide with dimensions, location types, and linked resident pages.",
        }),
        path: "/locations",
    });
}

export default async function LocationsPage({ searchParams }: LocationsProps) {
    const params = await searchParams;
    const page = parsePageParam(params.page);
    const name = getSearchName(params.name);

    const searchUrlParams = new URLSearchParams();
    searchUrlParams.set("page", page.toString());
    if (name) searchUrlParams.set("name", name);

    const result = await rickAndMortyApi.getLocations(searchUrlParams).catch((error: Error) => ({
        error,
    }));

    if ("error" in result) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-4xl font-black mb-4 text-secondary">LOST IN SPACE!</h1>
                <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
                    {result.error.message === "Resource not found"
                        ? "We could not find any Rick and Morty locations matching that search."
                        : "Something went wrong in this dimension. Please try again later."}
                </p>
                <Link href="/locations" className="px-8 py-4 rounded-xl bg-secondary text-black font-black hover:scale-105 transition-transform">
                    OPEN PORTAL BACK
                </Link>
            </div>
        );
    }

    const { results: locations, info } = result;
    const paginationQuery = name ? { name } : undefined;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <MapPin className="text-secondary shrink-0" size={56} strokeWidth={2.5} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-secondary">
                        RICK AND MORTY LOCATIONS
                    </h1>
                </div>
                <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
                    Explore Rick and Morty locations across dimensions, location types, and resident lists with direct links to character pages throughout the universe.
                </p>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form action="/locations" className="relative w-full md:max-w-md">
                        <label htmlFor="location-search" className="sr-only">
                            Search locations
                        </label>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} aria-hidden />
                        <input
                            id="location-search"
                            type="search"
                            name="name"
                            defaultValue={name}
                            placeholder="Search locations..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                        />
                    </form>

                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
                        Total Locations: <span className="text-white">{info.count}</span>
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={info.pages}
                baseUrl="/locations"
                queryParams={paginationQuery}
            />
        </div>
    );
}
