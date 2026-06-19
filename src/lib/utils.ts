import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function getResourceIdFromUrl(url: string): number | null {
    const parts = url.split("/");
    const id = Number.parseInt(parts[parts.length - 1], 10);
    return Number.isFinite(id) ? id : null;
}

/** @deprecated Use getResourceIdFromUrl */
export function getEpisodeIdFromUrl(url: string): number {
    return getResourceIdFromUrl(url) ?? 0;
}
