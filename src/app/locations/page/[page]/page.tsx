import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllLocations, getPaginatedLocationParams, paginateItems } from "@/lib/static-data";

interface LocationIndexPageProps {
  params: Promise<{ page: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPaginatedLocationParams();
}

export async function generateMetadata({ params }: LocationIndexPageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  return createMetadata({
    title: `Rick and Morty Locations Guide - Page ${pageNumber}`,
    description:
      "Continue browsing the static Rick and Morty locations guide with dimensions, location types, and linked resident pages.",
    path: `/locations/page/${pageNumber}`,
  });
}

export default async function LocationIndexPage({ params }: LocationIndexPageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const locations = getAllLocations();
  const paginatedLocations = paginateItems(locations, pageNumber);

  if (Number.isNaN(pageNumber) || pageNumber < 2 || pageNumber > paginatedLocations.totalPages) {
    notFound();
  }

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
          Continue exploring Rick and Morty locations across dimensions, location types, and resident lists with direct links to character pages throughout the universe.
        </p>
      </header>

      <StaticEntityIndex
        entityType="locations"
        initialItems={paginatedLocations.items}
        currentPage={paginatedLocations.currentPage}
        totalPages={paginatedLocations.totalPages}
        totalCount={paginatedLocations.totalCount}
        firstPageUrl="/locations"
        pageUrlPrefix="/locations/page"
        searchPlaceholder="Search locations..."
        emptyMessage="No Rick and Morty locations found through this portal."
        totalLabel="Total Locations"
      />
    </div>
  );
}
