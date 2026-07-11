import type { Metadata } from "next";
import { MapPin, Tv, Users } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllCharacters, paginateItems } from "@/lib/static-data";
import { ExploreLinks } from "@/components/ExploreLinks";

export const dynamic = "force-static";

export const metadata: Metadata = createMetadata({
  title: "Rick and Morty Explorer",
  description:
    "Browse a searchable Rick and Morty character guide with names, species, status, origin, and linked episode appearances.",
  path: "/",
});

export default function Home() {
  const characters = getAllCharacters();
  const paginatedCharacters = paginateItems(characters, 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Users className="text-primary shrink-0" size={56} strokeWidth={2.5} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-strong">
            RICK AND MORTY CHARACTERS
          </h1>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
          Explore a searchable Rick and Morty character index with names, species, status, origin details, and links to every character page and episode appearance in the multiverse.
        </p>
        <ExploreLinks
          links={[
            { href: "/episodes", label: "Browse episodes", icon: Tv },
            { href: "/locations", label: "Explore locations", icon: MapPin },
          ]}
        />
      </header>

      <StaticEntityIndex
        entityType="characters"
        catalog={characters}
        initialItems={paginatedCharacters.items}
        currentPage={paginatedCharacters.currentPage}
        totalPages={paginatedCharacters.totalPages}
        totalCount={paginatedCharacters.totalCount}
        firstPageUrl="/"
        pageUrlPrefix="/characters/page"
        searchPlaceholder="Search characters..."
        emptyMessage="No Rick and Morty characters found in this dimension."
        totalLabel="Total Characters"
      />
    </div>
  );
}
