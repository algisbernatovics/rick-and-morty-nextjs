import data from "@/generated/rick-and-morty-data.json";
import type { APIResponse, Character, Episode, LocationData } from "@/types";

export const LIST_PAGE_SIZE = 20;

interface StaticDataSnapshot {
  generatedAt: string;
  source: string;
  characters: APIResponse<Character>;
  episodes: APIResponse<Episode>;
  locations: APIResponse<LocationData>;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const snapshot = data as StaticDataSnapshot;

const charactersById = new Map(snapshot.characters.results.map((character) => [character.id, character]));
const episodesById = new Map(snapshot.episodes.results.map((episode) => [episode.id, episode]));
const locationsById = new Map(snapshot.locations.results.map((location) => [location.id, location]));

export function getSnapshotGeneratedAt() {
  return snapshot.generatedAt;
}

export function getAllCharacters() {
  return snapshot.characters.results;
}

export function getAllEpisodes() {
  return snapshot.episodes.results;
}

export function getAllLocations() {
  return snapshot.locations.results;
}

export function getCharacterById(id: number) {
  return charactersById.get(id);
}

export function getEpisodeById(id: number) {
  return episodesById.get(id);
}

export function getLocationById(id: number) {
  return locationsById.get(id);
}

export function getCharactersByIds(ids: number[]) {
  return ids
    .map((id) => charactersById.get(id))
    .filter((character): character is Character => Boolean(character));
}

export function getEpisodesByIds(ids: number[]) {
  return ids
    .map((id) => episodesById.get(id))
    .filter((episode): episode is Episode => Boolean(episode));
}

export function getLocationIds() {
  return snapshot.locations.results.map((location) => location.id);
}

export function getCharacterIds() {
  return snapshot.characters.results.map((character) => character.id);
}

export function getEpisodeIds() {
  return snapshot.episodes.results.map((episode) => episode.id);
}

export function getTotalPages(totalCount: number, pageSize = LIST_PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize = LIST_PAGE_SIZE
): PaginatedResult<T> {
  const totalPages = getTotalPages(items.length, pageSize);
  const currentPage = Number.isFinite(page) ? Math.min(Math.max(1, page), totalPages) : 1;
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    totalCount: items.length,
  };
}

export function getPaginatedCharacterParams() {
  return getPaginatedParams(getAllCharacters().length);
}

export function getPaginatedEpisodeParams() {
  return getPaginatedParams(getAllEpisodes().length);
}

export function getPaginatedLocationParams() {
  return getPaginatedParams(getAllLocations().length);
}

function getPaginatedParams(totalCount: number) {
  return Array.from({ length: getTotalPages(totalCount) - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}
