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

    if (totalPages <= 1) return null;

    return (
        <nav className="my-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 ? (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    aria-label="Go to previous page"
                    className="focus-ring rounded-lg border border-border-subtle bg-surface-glass p-2 transition-colors hover:bg-primary/20"
                >
                    <ChevronLeft size={20} aria-hidden="true" />
                </Link>
            ) : (
                <span
                    aria-disabled="true"
                    aria-label="Previous page unavailable"
                    className="rounded-lg border border-border-subtle bg-surface-glass p-2 opacity-45"
                >
                    <ChevronLeft size={20} aria-hidden="true" />
                </span>
            )}

            {pages[0] > 1 && (
                <>
                    <Link
                        href={getPageUrl(1)}
                        aria-label="Go to page 1"
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-surface-glass font-bold transition-colors hover:bg-primary/20"
                    >
                        1
                    </Link>
                    {pages[0] > 2 && <span className="text-muted-foreground" aria-hidden="true">...</span>}
                </>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={getPageUrl(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={cn(
                        "focus-ring flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors",
                        currentPage === page
                            ? "bg-primary text-text-inverse shadow-[var(--shadow-primary)]"
                            : "border border-border-subtle bg-surface-glass hover:bg-primary/20"
                    )}
                >
                    {page}
                </Link>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && <span className="text-muted-foreground" aria-hidden="true">...</span>}
                    <Link
                        href={getPageUrl(totalPages)}
                        aria-label={`Go to page ${totalPages}`}
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-surface-glass font-bold transition-colors hover:bg-primary/20"
                    >
                        {totalPages}
                    </Link>
                </>
            )}

            {currentPage < totalPages ? (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    aria-label="Go to next page"
                    className="focus-ring rounded-lg border border-border-subtle bg-surface-glass p-2 transition-colors hover:bg-primary/20"
                >
                    <ChevronRight size={20} aria-hidden="true" />
                </Link>
            ) : (
                <span
                    aria-disabled="true"
                    aria-label="Next page unavailable"
                    className="rounded-lg border border-border-subtle bg-surface-glass p-2 opacity-45"
                >
                    <ChevronRight size={20} aria-hidden="true" />
                </span>
            )}
        </nav>
    );
}
