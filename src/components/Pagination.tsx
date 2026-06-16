"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    firstPageUrl: string;
    pageUrlPrefix: string;
}

export function Pagination({ currentPage, totalPages, firstPageUrl, pageUrlPrefix }: PaginationProps) {
    const getPageUrl = (page: number) => {
        return page === 1 ? firstPageUrl : `${pageUrlPrefix}/${page}`;
    };

    const pages = [];
    const delta = 2;

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2 my-12">
            <Link
                href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
                className={cn(
                    "p-2 rounded-lg glass transition-all hover:bg-primary/20",
                    currentPage <= 1 && "opacity-50 pointer-events-none"
                )}
            >
                <ChevronLeft size={20} />
            </Link>

            {pages[0] > 1 && (
                <>
                    <Link href={getPageUrl(1)} className="w-10 h-10 flex items-center justify-center rounded-lg glass hover:bg-primary/20 font-bold transition-all">
                        1
                    </Link>
                    {pages[0] > 2 && <span className="text-muted-foreground">...</span>}
                </>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all",
                        currentPage === page
                            ? "bg-primary text-black shadow-[0_0_15px_rgba(151,206,76,0.5)]"
                            : "glass hover:bg-primary/20"
                    )}
                >
                    {page}
                </Link>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && <span className="text-muted-foreground">...</span>}
                    <Link href={getPageUrl(totalPages)} className="w-10 h-10 flex items-center justify-center rounded-lg glass hover:bg-primary/20 font-bold transition-all">
                        {totalPages}
                    </Link>
                </>
            )}

            <Link
                href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
                className={cn(
                    "p-2 rounded-lg glass transition-all hover:bg-primary/20",
                    currentPage >= totalPages && "opacity-50 pointer-events-none"
                )}
            >
                <ChevronRight size={20} />
            </Link>
        </div>
    );
}
