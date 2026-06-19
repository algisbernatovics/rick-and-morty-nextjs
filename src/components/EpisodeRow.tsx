"use client";

import Link from "next/link";
import { Episode } from "@/types";
import { formatDate } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface EpisodeRowProps {
    episode: Episode;
}

export function EpisodeRow({ episode }: EpisodeRowProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={reduceMotion ? undefined : { x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <Link
                href={`/episode/${episode.id}`}
                className="flex items-center justify-between p-4 rounded-xl glass hover:bg-white/5 transition-colors border border-white/5 group"
            >
                <div>
                    <p className="text-xs font-black text-primary uppercase tracking-tighter mb-0.5">
                        {episode.episode}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                        {episode.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                        {formatDate(episode.air_date)}
                    </p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Air Date</p>
                    <p className="text-sm font-medium text-gray-300">{formatDate(episode.air_date)}</p>
                </div>
            </Link>
        </motion.div>
    );
}
