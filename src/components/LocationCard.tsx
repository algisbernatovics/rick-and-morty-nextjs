import Link from "next/link";
import { MapPin } from "lucide-react";
import { LocationData } from "@/types";

interface LocationCardProps {
    location: LocationData;
}

export function LocationCard({ location }: LocationCardProps) {
    return (
        <Link
            href={`/location/${location.id}`}
            aria-label={`View ${location.name} location guide`}
            className="panel panel-interactive focus-ring group relative flex h-full flex-col overflow-hidden p-8"
        >
            <div className="absolute right-0 top-0 p-4 text-secondary opacity-10 transition-opacity group-hover:opacity-20" aria-hidden="true">
                <MapPin size={120} />
            </div>

            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-secondary">
                {location.type}
            </p>
            <h2 className="mb-4 line-clamp-2 text-2xl font-black text-text-strong transition-colors group-hover:text-primary">
                {location.name}
            </h2>

            <div className="mt-auto space-y-4 border-t border-border-subtle pt-4">
                <div>
                    <p className="eyebrow">Dimension</p>
                    <p className="line-clamp-1 font-bold uppercase text-text-soft">{location.dimension}</p>
                </div>
                <div>
                    <p className="eyebrow">Resident Count</p>
                    <p className="font-bold text-text-soft">{location.residents.length} known residents</p>
                </div>
            </div>
        </Link>
    );
}
