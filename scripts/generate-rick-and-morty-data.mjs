import { access, mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_BASE_URL = process.env.RICK_AND_MORTY_API_BASE_URL || "https://rickandmortyapi.com/api";
const CONCURRENCY_LIMIT = getPositiveInteger(process.env.RICK_AND_MORTY_API_CONCURRENCY, 1);
const REQUEST_DELAY_MS = getPositiveInteger(process.env.RICK_AND_MORTY_API_DELAY_MS, 300);
const MAX_ATTEMPTS = getPositiveInteger(process.env.RICK_AND_MORTY_API_ATTEMPTS, 5);
const FORCE_REFRESH = process.env.RICK_AND_MORTY_FORCE_REFRESH === "1";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");
const outputPath = path.join(workspaceRoot, "src", "generated", "rick-and-morty-data.json");

function getPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(status) {
  return status === 408 || (status >= 420 && status <= 429) || status >= 500;
}

function getRetryDelayMs(response, attempt) {
  const retryAfter = response.headers.get("retry-after");

  if (retryAfter) {
    const retryAfterSeconds = Number.parseInt(retryAfter, 10);

    if (Number.isFinite(retryAfterSeconds)) {
      return retryAfterSeconds * 1000;
    }
  }

  return Math.min(REQUEST_DELAY_MS * 2 ** attempt, 5000);
}

async function fetchJson(url, attempt = 0) {
  await sleep(REQUEST_DELAY_MS);
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    if (attempt < MAX_ATTEMPTS - 1) {
      const retryDelayMs = Math.min(REQUEST_DELAY_MS * 2 ** attempt, 5000);
      console.warn(
        `Rick and Morty API request failed for ${url}; ` +
          `retrying in ${retryDelayMs}ms (${attempt + 2}/${MAX_ATTEMPTS}).`
      );
      await sleep(retryDelayMs);
      return fetchJson(url, attempt + 1);
    }

    throw error;
  }

  if (!response.ok) {
    if (attempt < MAX_ATTEMPTS - 1 && shouldRetry(response.status)) {
      const retryDelayMs = getRetryDelayMs(response, attempt);
      console.warn(
        `Rick and Morty API returned ${response.status} for ${url}; ` +
          `retrying in ${retryDelayMs}ms (${attempt + 2}/${MAX_ATTEMPTS}).`
      );
      await sleep(retryDelayMs);
      return fetchJson(url, attempt + 1);
    }

    const responseText = await response.text().catch(() => "");
    const details = responseText ? `: ${responseText.slice(0, 200)}` : "";
    throw new Error(`Rick and Morty API request failed (${response.status}) for ${url}${details}`);
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
  try {
    // Fetch collections sequentially to avoid bursting the public API during CI builds.
    const characters = await fetchCollection("character");
    const episodes = await fetchCollection("episode");
    const locations = await fetchCollection("location");

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
  } catch (error) {
    if (!FORCE_REFRESH && (await fileExists(outputPath))) {
      console.warn(
        "Could not refresh Rick and Morty data; continuing with the committed snapshot so static export can complete."
      );
      console.warn(error instanceof Error ? error.message : error);
      return;
    }

    throw error;
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
