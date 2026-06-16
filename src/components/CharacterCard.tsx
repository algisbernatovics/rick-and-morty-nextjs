import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CharacterCardProps {
    character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
    return (
        <Link
            href={`/character/${character.id}`}
            aria-label={`View ${character.name} character guide`}
            className="panel panel-interactive focus-ring group relative flex h-full flex-col overflow-hidden rounded-2xl"
        >
            <div className="p-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border-subtle bg-surface-hover p-1">
                    <div className="h-full w-full overflow-hidden rounded-lg">
                        <Image
                            src={character.image}
                            alt={character.name}
                            width={400}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                    <StatusBadge status={character.status} />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {character.species}
                    </span>
                </div>

                <h3 className="mb-4 line-clamp-1 text-xl font-black text-text-strong transition-colors group-hover:text-primary">
                    {character.name}
                </h3>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Last known location</p>
                        <p className="line-clamp-1 text-sm font-medium text-text-soft transition-colors group-hover:text-secondary">
                            {character.location.name}
                        </p>
                    </div>

                    <div>
                        <p className="eyebrow">Origin</p>
                        <p className="line-clamp-1 text-sm font-medium text-text-soft">
                            {character.origin.name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute right-4 top-4">
                <span className="rounded border border-border-subtle bg-background/70 px-2 py-1 text-[10px] font-bold uppercase text-text-strong backdrop-blur-md">
                    #{character.id}
                </span>
            </div>
        </Link>
    );
}
