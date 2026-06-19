"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import { motion, useReducedMotion } from "framer-motion";

interface CharacterCardProps {
    character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={reduceMotion ? undefined : { y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-white/5 shadow-xl transition-all hover:border-primary/50"
        >
            <Link
                href={`/character/${character.id}`}
                className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`View ${character.name} character details`}
            >
                <div className="p-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
                        <div className="h-full w-full overflow-hidden rounded-lg">
                            <Image
                                src={character.image}
                                alt={character.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className={`h-2.5 w-2.5 rounded-full ${character.status === 'Alive' ? 'bg-green-500' :
                                character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                                } shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
                            aria-hidden
                        />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {character.status} — {character.species}
                        </span>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors line-clamp-1 mb-4">
                        {character.name}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Last known location:</p>
                            <p className="text-sm font-medium text-gray-200 group-hover:text-secondary transition-colors line-clamp-1">
                                {character.location.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">First seen in:</p>
                            <p className="text-sm font-medium text-gray-200 line-clamp-1">
                                {character.origin.name}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase">
                    #{character.id}
                </span>
            </div>
        </motion.div>
    );
}
