"use client";

import Link from "next/link";
import { Tv } from "lucide-react";
import { Episode } from "@/types";
import { formatDate } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface EpisodeCardProps {
    episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={reduceMotion ? undefined : { y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full"
        >
            <Link
                href={`/episode/${episode.id}`}
                className="flex flex-col h-full glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group relative overflow-hidden shadow-xl"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Tv size={100} aria-hidden />
                </div>

                <p className="text-primary font-black tracking-widest text-sm uppercase mb-2">
                    {episode.episode}
                </p>
                <h2 className="text-2xl font-black text-white group-hover:text-secondary transition-colors mb-4 line-clamp-2">
                    {episode.name}
                </h2>

                <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Air Date</p>
                        <p className="font-bold text-gray-200">{formatDate(episode.air_date)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Characters Featured</p>
                        <p className="font-bold text-gray-200">{episode.characters.length} dimensional beings</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
