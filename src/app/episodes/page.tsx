import type { Metadata } from "next";
import { rickAndMortyApi } from "@/lib/api";
import { Pagination } from "@/components/Pagination";
import { Search, Tv } from "lucide-react";
import { EpisodeCard } from "@/components/EpisodeCard";
import Link from "next/link";
import { buildSearchResultsDescription, createMetadata } from "@/lib/seo";
import { getSearchName, parsePageParam } from "@/lib/search-params";

interface EpisodesProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: EpisodesProps): Promise<Metadata> {
    const params = await searchParams;
    const name = getSearchName(params.name);

    return createMetadata({
        title: name ? `Rick and Morty Episodes Matching ${name}` : "Rick and Morty Episode Guide",
        description: buildSearchResultsDescription({
            entityLabel: "episodes",
            query: name,
            fallbackDescription:
                "Browse a searchable Rick and Morty episode guide with episode codes, air dates, and links to full cast pages.",
        }),
        path: "/episodes",
    });
}

export default async function EpisodesPage({ searchParams }: EpisodesProps) {
    const params = await searchParams;
    const page = parsePageParam(params.page);
    const name = getSearchName(params.name);

    const searchUrlParams = new URLSearchParams();
    searchUrlParams.set("page", page.toString());
    if (name) searchUrlParams.set("name", name);

    const result = await rickAndMortyApi.getEpisodes(searchUrlParams).catch((error: Error) => ({
        error,
    }));

    if ("error" in result) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-4xl font-black mb-4 text-red-500">DIMENSIONAL RIFT!</h1>
                <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
                    {result.error.message === "Resource not found"
                        ? "We could not find any Rick and Morty episodes matching that search."
                        : "Something went wrong in this dimension. Please try again later."}
                </p>
                <Link href="/episodes" className="px-8 py-4 rounded-xl bg-primary text-black font-black hover:scale-105 transition-transform">
                    CLEAR INTERDIMENSIONAL CABLE
                </Link>
            </div>
        );
    }

    const { results: episodes, info } = result;
    const paginationQuery = name ? { name } : undefined;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <Tv className="text-primary shrink-0" size={56} strokeWidth={2.5} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary">
                        RICK AND MORTY EPISODES
                    </h1>
                </div>
                <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
                    Browse the Rick and Morty episode guide with searchable episode names, season codes, original air dates, and links to the characters featured in each story.
                </p>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form action="/episodes" className="relative w-full md:max-w-md">
                        <label htmlFor="episode-search" className="sr-only">
                            Search episodes
                        </label>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} aria-hidden />
                        <input
                            id="episode-search"
                            type="search"
                            name="name"
                            defaultValue={name}
                            placeholder="Search episodes..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                    </form>

                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
                        Total Episodes: <span className="text-white">{info.count}</span>
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={info.pages}
                baseUrl="/episodes"
                queryParams={paginationQuery}
            />
        </div>
    );
}
