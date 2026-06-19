import Link from "next/link";
import { Episode } from "@/types";
import { formatDate } from "@/lib/utils";

interface EpisodeRowProps {
    episode: Episode;
}

export function EpisodeRow({ episode }: EpisodeRowProps) {
    return (
        <Link
            href={`/episode/${episode.id}`}
            aria-label={`View ${episode.name} episode guide`}
            className="panel panel-interactive focus-ring group flex items-center justify-between rounded-xl p-4"
        >
            <div>
                <p className="mb-0.5 text-xs font-black uppercase tracking-tighter text-primary">
                    {episode.episode}
                </p>
                <h3 className="text-lg font-bold text-text-strong transition-colors group-hover:text-secondary">
                    {episode.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                    {formatDate(episode.air_date)}
                </p>
            </div>
            <div className="hidden text-right sm:block">
                <p className="eyebrow">Air Date</p>
                <p className="text-sm font-medium text-text-soft">{formatDate(episode.air_date)}</p>
            </div>
        </Link>
    );
}
