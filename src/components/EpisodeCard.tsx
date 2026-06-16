import Link from "next/link";
import { Tv } from "lucide-react";
import { Episode } from "@/types";

interface EpisodeCardProps {
    episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
    return (
        <Link
            href={`/episode/${episode.id}`}
            aria-label={`View ${episode.name} episode guide`}
            className="panel panel-interactive focus-ring group relative flex h-full flex-col overflow-hidden p-8"
        >
            <div className="absolute right-0 top-0 p-4 text-primary opacity-10 transition-opacity group-hover:opacity-20" aria-hidden="true">
                <Tv size={100} />
            </div>

            <p className="mb-2 text-sm font-black uppercase tracking-widest text-primary">
                {episode.episode}
            </p>
            <h2 className="mb-4 line-clamp-2 text-2xl font-black text-text-strong transition-colors group-hover:text-secondary">
                {episode.name}
            </h2>

            <div className="mt-auto space-y-4 border-t border-border-subtle pt-4">
                <div>
                    <p className="eyebrow">Original Air Date</p>
                    <p className="font-bold text-text-soft">{episode.air_date}</p>
                </div>
                <div>
                    <p className="eyebrow">Characters Featured</p>
                    <p className="font-bold text-text-soft">{episode.characters.length} dimensional beings</p>
                </div>
            </div>
        </Link>
    );
}
