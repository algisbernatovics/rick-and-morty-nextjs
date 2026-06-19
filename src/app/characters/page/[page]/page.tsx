import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Tv, Users } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllCharacters, getPaginatedCharacterParams, paginateItems } from "@/lib/static-data";
import { ExploreLinks } from "@/components/ExploreLinks";

interface CharacterIndexPageProps {
  params: Promise<{ page: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPaginatedCharacterParams();
}

export async function generateMetadata({ params }: CharacterIndexPageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  return createMetadata({
    title: `Rick and Morty Characters Guide - Page ${pageNumber}`,
    description:
      "Continue browsing the static Rick and Morty character guide with crawlable pages for every character profile.",
    path: `/characters/page/${pageNumber}`,
  });
}

export default async function CharacterIndexPage({ params }: CharacterIndexPageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const characters = getAllCharacters();
  const paginatedCharacters = paginateItems(characters, pageNumber);

  if (Number.isNaN(pageNumber) || pageNumber < 2 || pageNumber > paginatedCharacters.totalPages) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Users className="text-primary shrink-0" size={56} strokeWidth={2.5} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary">
            RICK AND MORTY CHARACTERS
          </h1>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
          Continue exploring the static Rick and Morty character index with names, species, status, origin details, and links to every character page and episode appearance.
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
