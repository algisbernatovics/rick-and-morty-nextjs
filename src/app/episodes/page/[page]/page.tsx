import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Tv, Users } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllEpisodes, getPaginatedEpisodeParams, paginateItems } from "@/lib/static-data";
import { ExploreLinks } from "@/components/ExploreLinks";

interface EpisodeIndexPageProps {
  params: Promise<{ page: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPaginatedEpisodeParams();
}

export async function generateMetadata({ params }: EpisodeIndexPageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  return createMetadata({
    title: `Rick and Morty Episode Guide - Page ${pageNumber}`,
    description: `Browse page ${pageNumber} of the Rick and Morty episode guide with season codes, air dates, and links to cast pages for every story.`,
    path: `/episodes/page/${pageNumber}`,
  });
}

export default async function EpisodeIndexPage({ params }: EpisodeIndexPageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const episodes = getAllEpisodes();
  const paginatedEpisodes = paginateItems(episodes, pageNumber);

  if (Number.isNaN(pageNumber) || pageNumber < 2 || pageNumber > paginatedEpisodes.totalPages) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Tv className="text-primary shrink-0" size={56} strokeWidth={2.5} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-strong">
            RICK AND MORTY EPISODES
            <span className="mt-3 block text-2xl md:text-3xl tracking-[0.2em] text-secondary">
              Page {pageNumber}
            </span>
          </h1>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
          Continue browsing the Rick and Morty episode guide with searchable episode names, season codes, original air dates, and links to the characters featured in each story.
        </p>
        <ExploreLinks
          links={[
            { href: "/", label: "View characters", icon: Users },
            { href: "/locations", label: "Explore locations", icon: MapPin },
          ]}
        />
      </header>

      <StaticEntityIndex
        entityType="episodes"
        catalog={episodes}
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
