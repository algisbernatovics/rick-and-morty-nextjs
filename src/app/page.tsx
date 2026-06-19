import type { Metadata } from "next";
import { rickAndMortyApi } from "@/lib/api";
import { CharacterCard } from "@/components/CharacterCard";
import { Pagination } from "@/components/Pagination";
import { Search, Users } from "lucide-react";
import { buildSearchResultsDescription, createMetadata } from "@/lib/seo";
import { getSearchName, parsePageParam } from "@/lib/search-params";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const params = await searchParams;
  const name = getSearchName(params.name);

  return createMetadata({
    title: name ? `Rick and Morty Characters Matching ${name}` : "Rick and Morty Characters Guide",
    description: buildSearchResultsDescription({
      entityLabel: "characters",
      query: name,
      fallbackDescription:
        "Browse a searchable Rick and Morty character guide with names, species, status, origin, and linked episode appearances.",
    }),
    path: "/",
  });
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parsePageParam(params.page);
  const name = getSearchName(params.name);

  const searchUrlParams = new URLSearchParams();
  searchUrlParams.set("page", page.toString());
  if (name) searchUrlParams.set("name", name);

  const result = await rickAndMortyApi.getCharacters(searchUrlParams).catch((error: Error) => ({
    error,
  }));

  if ("error" in result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-black mb-4 text-red-500">WUBBA LUBBA DUB DUB!</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          {result.error.message === "Resource not found"
            ? "We could not find any Rick and Morty characters matching that search."
            : "Something went wrong in this dimension. Please try again later."}
        </p>
        <Link href="/" className="px-8 py-4 rounded-xl bg-primary text-black font-black hover:scale-105 transition-transform">
          BACK TO REALITY
        </Link>
      </div>
    );
  }

  const { results: characters, info } = result;
  const paginationQuery = name ? { name } : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Users className="text-primary shrink-0" size={56} strokeWidth={2.5} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary">
            RICK AND MORTY CHARACTERS
          </h1>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed mb-6">
          Explore a searchable Rick and Morty character index with names, species, status, origin details, and links to every character page and episode appearance in the multiverse.
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <form action="/" className="relative w-full md:max-w-md">
            <label htmlFor="character-search" className="sr-only">
              Search characters
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} aria-hidden />
            <input
              id="character-search"
              type="search"
              name="name"
              defaultValue={name}
              placeholder="Search characters..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            />
          </form>

          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            Total Characters: <span className="text-white">{info.count}</span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        baseUrl="/"
        queryParams={paginationQuery}
      />
    </div>
  );
}
