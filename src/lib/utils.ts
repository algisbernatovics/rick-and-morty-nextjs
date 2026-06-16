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

export function getIdFromUrl(url: string): number {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1]);
}

export const getEpisodeIdFromUrl = getIdFromUrl;
