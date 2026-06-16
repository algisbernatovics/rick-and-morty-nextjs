"use client";

import { FormEvent, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { APIResponse, Character, Episode, LocationData } from "@/types";
import { CharacterCard } from "@/components/CharacterCard";
import { EpisodeCard } from "@/components/EpisodeCard";
import { LocationCard } from "@/components/LocationCard";
import { Pagination } from "@/components/Pagination";

type EntityType = "characters" | "episodes" | "locations";
type EntityItem = Character | Episode | LocationData;

interface StaticEntityIndexProps {
  entityType: EntityType;
  initialItems: EntityItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  firstPageUrl: string;
  pageUrlPrefix: string;
  searchPlaceholder: string;
  emptyMessage: string;
  totalLabel: string;
}

const entityConfig = {
  characters: {
    endpoint: "character",
    accentClass: "focus:ring-primary/50",
  },
  episodes: {
    endpoint: "episode",
    accentClass: "focus:ring-primary/50",
  },
  locations: {
    endpoint: "location",
    accentClass: "focus:ring-secondary/50",
  },
} satisfies Record<EntityType, { endpoint: string; accentClass: string }>;

export function StaticEntityIndex({
  entityType,
  initialItems,
  currentPage,
  totalPages,
  totalCount,
  firstPageUrl,
  pageUrlPrefix,
  searchPlaceholder,
  emptyMessage,
  totalLabel,
}: StaticEntityIndexProps) {
  const [query, setQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchResult, setSearchResult] = useState<APIResponse<EntityItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const trimmedQuery = query.trim();
  const activeSearchResult = trimmedQuery.length > 0 ? searchResult : null;
  const items = activeSearchResult ? activeSearchResult.results : initialItems;
  const displayTotal = activeSearchResult ? activeSearchResult.info.count : totalCount;

  const gridClassName = useMemo(() => {
    if (entityType === "characters") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8";
    }

    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  }, [entityType]);

  async function runSearch(page = 1) {
    if (!trimmedQuery) {
      setSearchResult(null);
      setError(null);
      setSearchPage(1);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page: String(page), name: trimmedQuery });
      const response = await fetch(
        `https://rickandmortyapi.com/api/${entityConfig[entityType].endpoint}/?${params.toString()}`
      );

      if (response.status === 404) {
        setSearchResult({
          info: { count: 0, pages: 1, next: null, prev: null },
          results: [],
        });
        setSearchPage(1);
        return;
      }

      if (!response.ok) {
        throw new Error("Search failed. Please try again later.");
      }

      const result = (await response.json()) as APIResponse<EntityItem>;
      setSearchResult(result);
      setSearchPage(page);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Search failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(1);
  }

  function clearSearch() {
    setQuery("");
    setSearchResult(null);
    setError(null);
    setSearchPage(1);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
        <form onSubmit={handleSubmit} className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className={`w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 transition-all font-medium ${entityConfig[entityType].accentClass}`}
          />
        </form>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {activeSearchResult ? (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 rounded-xl glass font-black uppercase tracking-widest text-xs hover:text-primary transition-colors"
            >
              Clear search
            </button>
          ) : null}
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            {totalLabel}: <span className="text-white">{displayTotal}</span>
          </p>
        </div>
      </div>

      {error ? (
        <div className="glass p-8 rounded-3xl mb-8 text-center text-red-400 font-bold">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="glass p-8 rounded-3xl mb-8 text-center text-muted-foreground font-bold uppercase tracking-widest">
          Searching the multiverse...
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className={gridClassName}>{renderItems(entityType, items)}</div>
      ) : (
        <div className="glass p-12 rounded-3xl text-center border-2 border-dashed border-white/10">
          <p className="text-2xl font-black text-muted-foreground uppercase tracking-tighter">
            {emptyMessage}
          </p>
        </div>
      )}

      {activeSearchResult ? (
        <SearchPagination
          currentPage={searchPage}
          totalPages={activeSearchResult.info.pages}
          onPageChange={(page) => void runSearch(page)}
          isLoading={isLoading}
        />
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          firstPageUrl={firstPageUrl}
          pageUrlPrefix={pageUrlPrefix}
        />
      )}
    </>
  );
}

function renderItems(entityType: EntityType, items: EntityItem[]) {
  if (entityType === "characters") {
    return (items as Character[]).map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }

  if (entityType === "episodes") {
    return (items as Episode[]).map((episode) => (
      <EpisodeCard key={episode.id} episode={episode} />
    ));
  }

  return (items as LocationData[]).map((location) => (
    <LocationCard key={location.id} location={location} />
  ));
}

function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <button
        type="button"
        disabled={currentPage <= 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-5 py-3 rounded-xl glass font-bold disabled:opacity-50 disabled:pointer-events-none hover:bg-primary/20 transition-colors"
      >
        Previous
      </button>
      <span className="text-muted-foreground font-bold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages || isLoading}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-5 py-3 rounded-xl glass font-bold disabled:opacity-50 disabled:pointer-events-none hover:bg-primary/20 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
