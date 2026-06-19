import { APIResponse, Character, Episode, LocationData } from "@/types";

const BASE_URL = "https://rickandmortyapi.com/api";

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
        ...options,
        cache: options?.cache ?? "force-cache",
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Resource not found");
        }
        throw new Error("Failed to fetch data from Rick and Morty API");
    }

    return response.json();
}

export const rickAndMortyApi = {
    getCharacters: async (params?: URLSearchParams) => {
        const query = params ? `?${params.toString()}` : "";
        return apiRequest<APIResponse<Character>>(`character/${query}`);
    },
    getSingleCharacter: async (id: number) => {
        return apiRequest<Character>(`character/${id}`);
    },
    getMultipleCharacters: async (ids: number[]) => {
        if (ids.length === 0) return [];
        const response = await apiRequest<Character | Character[]>(`character/${ids.join(",")}`);
        return Array.isArray(response) ? response : [response];
    },

    getLocations: async (params?: URLSearchParams) => {
        const query = params ? `?${params.toString()}` : "";
        return apiRequest<APIResponse<LocationData>>(`location/${query}`);
    },
    getSingleLocation: async (id: number) => {
        return apiRequest<LocationData>(`location/${id}`);
    },
    getMultipleLocations: async (ids: number[]) => {
        if (ids.length === 0) return [];
        const response = await apiRequest<LocationData | LocationData[]>(`location/${ids.join(",")}`);
        return Array.isArray(response) ? response : [response];
    },

    getEpisodes: async (params?: URLSearchParams) => {
        const query = params ? `?${params.toString()}` : "";
        return apiRequest<APIResponse<Episode>>(`episode/${query}`);
    },
    getSingleEpisode: async (id: number) => {
        return apiRequest<Episode>(`episode/${id}`);
    },
    getMultipleEpisodes: async (ids: number[]) => {
        if (ids.length === 0) return [];
        const response = await apiRequest<Episode | Episode[]>(`episode/${ids.join(",")}`);
        return Array.isArray(response) ? response : [response];
    },
};
