import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_BASE_URL = "https://rickandmortyapi.com/api";
const CONCURRENCY_LIMIT = 4;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");
const outputPath = path.join(workspaceRoot, "src", "generated", "rick-and-morty-data.json");

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Rick and Morty API request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

async function mapWithConcurrency(items, mapper, limit = CONCURRENCY_LIMIT) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker())
  );

  return results;
}

async function fetchCollection(resource) {
  const firstPage = await fetchJson(`${API_BASE_URL}/${resource}/?page=1`);
  const remainingPages = Array.from(
    { length: Math.max(0, firstPage.info.pages - 1) },
    (_, index) => index + 2
  );

  const remainingResults = await mapWithConcurrency(remainingPages, async (page) => {
    const pageData = await fetchJson(`${API_BASE_URL}/${resource}/?page=${page}`);
    return pageData.results;
  });

  return {
    info: firstPage.info,
    results: [firstPage.results, ...remainingResults].flat(),
  };
}

async function main() {
  const [characters, episodes, locations] = await Promise.all([
    fetchCollection("character"),
    fetchCollection("episode"),
    fetchCollection("location"),
  ]);

  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: API_BASE_URL,
    characters,
    episodes,
    locations,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(`${outputPath}.tmp`, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  await rename(`${outputPath}.tmp`, outputPath);

  console.log(
    `Generated Rick and Morty snapshot: ${characters.results.length} characters, ` +
      `${episodes.results.length} episodes, ${locations.results.length} locations.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
