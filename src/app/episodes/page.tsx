import type { Metadata } from "next";
import { Tv } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllEpisodes, paginateItems } from "@/lib/static-data";

export const dynamic = "force-static";

export const metadata: Metadata = createMetadata({
    title: "Rick and Morty Episode Guide",
    description:
        "Browse a searchable Rick and Morty episode guide with episode codes, air dates, and links to full cast pages.",
    path: "/episodes",
});

export default function EpisodesPage() {
    const episodes = getAllEpisodes();
    const paginatedEpisodes = paginateItems(episodes, 1);

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
            </header>

            <StaticEntityIndex
                entityType="episodes"
                initialItems={paginatedEpisodes.items}
                currentPage={paginatedEpisodes.currentPage}
                totalPages={paginatedEpisodes.totalPages}
                totalCount={paginatedEpisodes.totalCount}
                firstPageUrl="/episodes"
                pageUrlPrefix="/episodes/page"
                searchPlaceholder="Search episodes..."
                emptyMessage="No Rick and Morty episodes found on this channel."
                totalLabel="Total Episodes"
            />
        </div>
    );
}
