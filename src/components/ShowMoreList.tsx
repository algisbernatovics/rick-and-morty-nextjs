"use client";

import { Children, useMemo, useState } from "react";

interface ShowMoreListProps {
    children: React.ReactNode;
    initialCount?: number;
    step?: number;
    itemLabel?: string;
    className?: string;
}

export function ShowMoreList({
    children,
    initialCount = 15,
    step = 15,
    itemLabel = "items",
    className,
}: ShowMoreListProps) {
    const items = useMemo(() => Children.toArray(children), [children]);
    const [visibleCount, setVisibleCount] = useState(initialCount);

    if (items.length <= initialCount) {
        return <div className={className}>{children}</div>;
    }

    const visibleItems = items.slice(0, visibleCount);
    const remaining = items.length - visibleCount;

    return (
        <>
            <div className={className}>{visibleItems}</div>
            {remaining > 0 ? (
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setVisibleCount((count) => Math.min(count + step, items.length))}
                        className="focus-ring rounded-xl border border-border-subtle bg-surface-glass px-6 py-3 text-sm font-black uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
                    >
                        Show {Math.min(step, remaining)} more {itemLabel}
                        <span className="text-muted-foreground"> ({remaining} remaining)</span>
                    </button>
                </div>
            ) : null}
        </>
    );
}
