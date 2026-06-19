"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    queryParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, baseUrl, queryParams }: PaginationProps) {
    const getPageUrl = (page: number) => {
        const url = new URL(baseUrl, "http://localhost");
        url.searchParams.set("page", page.toString());

        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value) {
                    url.searchParams.set(key, value);
                }
            });
        }

        return url.pathname + url.search;
    };

    const pages = [];
    const delta = 2;

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        pages.push(i);
    }

    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center space-x-2 my-12">
            {prevDisabled ? (
                <span
                    aria-disabled="true"
                    className="p-2 rounded-lg glass opacity-50"
                >
                    <ChevronLeft size={20} aria-hidden />
                    <span className="sr-only">Previous page</span>
                </span>
            ) : (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    aria-label="Previous page"
                    className="p-2 rounded-lg glass transition-all hover:bg-primary/20"
                >
                    <ChevronLeft size={20} aria-hidden />
                </Link>
            )}

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
                    aria-current={currentPage === page ? "page" : undefined}
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

            {nextDisabled ? (
                <span
                    aria-disabled="true"
                    className="p-2 rounded-lg glass opacity-50"
                >
                    <ChevronRight size={20} aria-hidden />
                    <span className="sr-only">Next page</span>
                </span>
            ) : (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    aria-label="Next page"
                    className="p-2 rounded-lg glass transition-all hover:bg-primary/20"
                >
                    <ChevronRight size={20} aria-hidden />
                </Link>
            )}
        </nav>
    );
}
