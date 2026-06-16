import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo";
import {
  getAllCharacters,
  getAllEpisodes,
  getAllLocations,
  getPaginatedCharacterParams,
  getPaginatedEpisodeParams,
  getPaginatedLocationParams,
  getSnapshotGeneratedAt,
} from "@/lib/static-data";

export const dynamic = "force-static";

const lastModified = new Date(getSnapshotGeneratedAt());

function getStaticRoutes(): MetadataRoute.Sitemap {
  return [
    { url: getAbsoluteUrl("/"), lastModified, changeFrequency: "daily", priority: 1 },
    { url: getAbsoluteUrl("/episodes"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/locations"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: getAbsoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getStaticRoutes();

  routes.push(
    ...getPaginatedCharacterParams().map(({ page }) => ({
      url: getAbsoluteUrl(`/characters/page/${page}`),
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );
  routes.push(
    ...getPaginatedEpisodeParams().map(({ page }) => ({
      url: getAbsoluteUrl(`/episodes/page/${page}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );
  routes.push(
    ...getPaginatedLocationParams().map(({ page }) => ({
      url: getAbsoluteUrl(`/locations/page/${page}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  routes.push(
    ...getAllCharacters().map((character) => ({
      url: getAbsoluteUrl(`/character/${character.id}`),
      lastModified: new Date(character.created),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );
  routes.push(
    ...getAllEpisodes().map((episode) => ({
      url: getAbsoluteUrl(`/episode/${episode.id}`),
      lastModified: new Date(episode.created),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );
  routes.push(
    ...getAllLocations().map((location) => ({
      url: getAbsoluteUrl(`/location/${location.id}`),
      lastModified: new Date(location.created),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return routes;
}
