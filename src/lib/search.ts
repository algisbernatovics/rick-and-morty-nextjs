import type { APIResponse } from "@/types";

const LIST_PAGE_SIZE = 20;

function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase();
}

export function searchByName<T extends { name: string }>(
  items: T[],
  query: string,
  page: number,
  pageSize = LIST_PAGE_SIZE
): APIResponse<T> {
  const normalizedQuery = normalizeSearchQuery(query);
  const filtered = normalizedQuery
    ? items.filter((item) => item.name.toLowerCase().includes(normalizedQuery))
    : items;
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    info: {
      count: totalCount,
      pages: totalPages,
      next: currentPage < totalPages ? "local-search" : null,
      prev: currentPage > 1 ? "local-search" : null,
    },
    results: filtered.slice(start, start + pageSize),
  };
}
