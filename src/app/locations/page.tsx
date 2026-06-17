import type { Metadata } from "next";
import { MapPin, Tv, Users } from "lucide-react";
import { StaticEntityIndex } from "@/components/StaticEntityIndex";
import { createMetadata } from "@/lib/seo";
import { getAllLocations, paginateItems } from "@/lib/static-data";
import { ExploreLinks } from "@/components/ExploreLinks";

export const dynamic = "force-static";

export const metadata: Metadata = createMetadata({
    title: "Rick and Morty Locations Guide",
    description:
        "Explore a searchable Rick and Morty locations guide with dimensions, location types, and linked resident pages.",
    path: "/locations",
});

export default function LocationsPage() {
    const locations = getAllLocations();
    const paginatedLocations = paginateItems(locations, 1);

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
                <ExploreLinks
                    links={[
                        { href: "/", label: "View characters", icon: Users },
                        { href: "/episodes", label: "Episode guide", icon: Tv },
                    ]}
                />
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
