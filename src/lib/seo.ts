import type { Metadata } from "next";
import type { Character, Episode, LocationData } from "@/types";

const DEFAULT_SITE_URL = "http://localhost:3000";
const SITE_NAME = "Rick and Morty Explorer";
const SITE_DESCRIPTION =
  "Explore Rick and Morty characters, episodes, and locations with searchable guides, episode details, and resident indexes.";

type OpenGraphType = "website" | "article";

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;

  try {
    return new URL(siteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function getSiteName() {
  return SITE_NAME;
}

export function getSiteDescription() {
  return SITE_DESCRIPTION;
}

export function getMetadataBase() {
  return getBaseUrl();
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export function buildCanonical(path = "/") {
  return getAbsoluteUrl(path);
}

function buildTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

const DEFAULT_OG_IMAGE = "/icon.svg";

export function createMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: OpenGraphType;
}): Metadata {
  const url = buildCanonical(path);
  const fullTitle = buildTitle(title);
  const imageUrl = getAbsoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: imageUrl, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function formatEpisodeCode(code: string) {
  const match = /^S(\d+)E(\d+)$/i.exec(code);
  if (!match) return code;

  const season = Number.parseInt(match[1], 10);
  const episode = Number.parseInt(match[2], 10);

  return `Season ${season}, Episode ${episode}`;
}

export function buildCharacterSummary(character: Character) {
  const details = [
    `${character.name} is a ${character.status.toLowerCase()} ${character.species.toLowerCase()} character in Rick and Morty.`,
    `${character.gender} character.`,
    `Origin: ${character.origin.name}.`,
    `Last known location: ${character.location.name}.`,
    `Appears in ${character.episode.length} episode${character.episode.length === 1 ? "" : "s"}.`,
  ];

  if (character.type) {
    details.splice(1, 0, `Type: ${character.type}.`);
  }

  return cleanText(details.join(" "));
}

export function buildEpisodeSummary(episode: Episode) {
  return cleanText(
    `${episode.name} is ${formatEpisodeCode(episode.episode)} of Rick and Morty. ` +
      `Original air date: ${episode.air_date}. ` +
      `This episode page lists ${episode.characters.length} featured character${episode.characters.length === 1 ? "" : "s"}.`
  );
}

export function buildLocationSummary(location: LocationData) {
  return cleanText(
    `${location.name} is a Rick and Morty location in the ${location.dimension} dimension. ` +
      `Location type: ${location.type}. ` +
      `Known residents: ${location.residents.length}.`
  );
}

export function buildSearchResultsDescription({
  entityLabel,
  query,
  fallbackDescription,
}: {
  entityLabel: string;
  query?: string;
  fallbackDescription: string;
}) {
  if (!query) return fallbackDescription;

  return cleanText(
    `Browse Rick and Morty ${entityLabel} matching "${query}" with searchable results, linked detail pages, and updated multiverse data.`
  );
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  about,
}: {
  title: string;
  description: string;
  path: string;
  about: Record<string, unknown>;
}) {
  const url = buildCanonical(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getAbsoluteUrl("/"),
    },
    about,
  };
}

export function buildCharacterJsonLd(character: Character) {
  const description = buildCharacterSummary(character);

  return buildWebPageJsonLd({
    title: `${character.name} Character Guide`,
    description,
    path: `/character/${character.id}`,
    about: {
      "@type": "Thing",
      name: character.name,
      description,
      image: character.image,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Status", value: character.status },
        { "@type": "PropertyValue", name: "Species", value: character.species },
        { "@type": "PropertyValue", name: "Gender", value: character.gender },
        { "@type": "PropertyValue", name: "Origin", value: character.origin.name },
        { "@type": "PropertyValue", name: "Location", value: character.location.name },
        { "@type": "PropertyValue", name: "Episode Count", value: character.episode.length.toString() },
      ],
    },
  });
}

export function buildEpisodeJsonLd(episode: Episode) {
  const description = buildEpisodeSummary(episode);

  return buildWebPageJsonLd({
    title: `${episode.name} Episode Guide`,
    description,
    path: `/episode/${episode.id}`,
    about: {
      "@type": "TVEpisode",
      name: episode.name,
      description,
      episodeNumber: episode.episode,
      partOfSeries: {
        "@type": "TVSeries",
        name: "Rick and Morty",
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Code", value: episode.episode },
        { "@type": "PropertyValue", name: "Original Air Date", value: episode.air_date },
        { "@type": "PropertyValue", name: "Character Count", value: episode.characters.length.toString() },
      ],
    },
  });
}

export function buildLocationJsonLd(location: LocationData) {
  const description = buildLocationSummary(location);

  return buildWebPageJsonLd({
    title: `${location.name} Location Guide`,
    description,
    path: `/location/${location.id}`,
    about: {
      "@type": "Place",
      name: location.name,
      description,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Type", value: location.type },
        { "@type": "PropertyValue", name: "Dimension", value: location.dimension },
        { "@type": "PropertyValue", name: "Resident Count", value: location.residents.length.toString() },
      ],
    },
  });
}
