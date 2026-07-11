"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { APIResponse, Character, Episode, LocationData } from "@/types";
import { CharacterCard } from "@/components/CharacterCard";
import { EpisodeCard } from "@/components/EpisodeCard";
import { LocationCard } from "@/components/LocationCard";
import { Pagination } from "@/components/Pagination";
import { searchByName } from "@/lib/search";

type EntityType = "characters" | "episodes" | "locations";
type EntityItem = Character | Episode | LocationData;

interface StaticEntityIndexProps {
  entityType: EntityType;
  catalog: EntityItem[];
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
    accentClass: "focus:ring-primary/50",
  },
  episodes: {
    accentClass: "focus:ring-primary/50",
  },
  locations: {
    accentClass: "focus:ring-secondary/50",
  },
} satisfies Record<EntityType, { accentClass: string }>;

function runLocalSearch(catalog: EntityItem[], query: string, page: number): APIResponse<EntityItem> {
  return searchByName(catalog, query, page);
}

export function StaticEntityIndex({
  entityType,
  catalog,
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
  const searchInputId = useId();

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

  function runSearch(page = 1) {
    if (!trimmedQuery) {
      setSearchResult(null);
      setSearchPage(1);
      return;
    }

    const result = runLocalSearch(catalog, trimmedQuery, page);
    setSearchResult(result);
    setSearchPage(page);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch(1);
  }

  function clearSearch() {
    setQuery("");
    setSearchResult(null);
    setSearchPage(1);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
        <form onSubmit={handleSubmit} className="relative w-full md:max-w-md">
          <label htmlFor={searchInputId} className="sr-only">
            {searchPlaceholder}
          </label>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className={`focus-ring w-full rounded-2xl border border-border-subtle bg-surface-glass py-4 pl-12 pr-4 font-medium transition-colors placeholder:text-muted-foreground hover:border-border-strong ${entityConfig[entityType].accentClass}`}
          />
        </form>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {activeSearchResult ? (
            <button
              type="button"
              onClick={clearSearch}
              className="focus-ring rounded-xl border border-border-subtle bg-surface-glass px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:text-primary"
            >
              Clear search
            </button>
          ) : null}
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            {totalLabel}: <span className="text-text-strong">{displayTotal}</span>
          </p>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {items.length} {entityType} on this page.
      </p>

      {items.length > 0 ? (
        <div className={gridClassName}>{renderItems(entityType, items)}</div>
      ) : (
        <div className="panel rounded-3xl border-2 border-dashed border-border-subtle p-12 text-center">
          <p className="text-2xl font-black text-muted-foreground uppercase tracking-tighter">
            {emptyMessage}
          </p>
        </div>
      )}

      {activeSearchResult ? (
        <SearchPagination
          currentPage={searchPage}
          totalPages={activeSearchResult.info.pages}
          onPageChange={runSearch}
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
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <button
        type="button"
        disabled={currentPage <= 1}
        aria-label="Load previous search results page"
        onClick={() => onPageChange(currentPage - 1)}
        className="focus-ring rounded-xl border border-border-subtle bg-surface-glass px-5 py-3 font-bold transition-colors hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-muted-foreground font-bold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        aria-label="Load next search results page"
        onClick={() => onPageChange(currentPage + 1)}
        className="focus-ring rounded-xl border border-border-subtle bg-surface-glass px-5 py-3 font-bold transition-colors hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
