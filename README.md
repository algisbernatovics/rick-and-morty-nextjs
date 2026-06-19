# Rick and Morty Next.js

A TypeScript Next.js explorer for Rick and Morty characters, locations, and episodes.

Live demo: [rickmorty-hub.vercel.app](https://rickmorty-hub.vercel.app)

## Overview

Rick and Morty Next.js is a modern App Router project built around [The Rick and Morty API](https://rickandmortyapi.com/). It provides typed API helpers, reusable UI styling, data-generation support, and a polished public demo.

## Features

- Fetches characters, locations, and episodes from the public Rick and Morty API.
- Uses typed API helpers and shared TypeScript models.
- Includes static data generation scripts for optimized data access.
- Modern App Router structure with Tailwind CSS styling.
- Uses shared design utilities such as `panel`, `panel-interactive`, `focus-ring`, and `eyebrow` from `src/app/globals.css`.
- Includes animation/icon dependencies for richer UI polish.

## Tech Stack

- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Rick and Morty API

## Run

```bash
npm install
npm run dev
```

Optional data generation:

```bash
npm run generate:data
```

## Project Structure

- `src/lib/api.ts` - typed API client
- `src/types/` - shared TypeScript types
- `scripts/generate-rick-and-morty-data.mjs` - data generation helper
- `src/app/` - App Router pages
- `src/app/globals.css` - global styles and semantic design utilities

## Planned Improvements

- Add screenshots or a short GIF of the live UI.
- Add Lighthouse/performance notes after the next manual audit.
- Keep the PHP version linked as a comparison point for technical growth.

## License

MIT License. See [LICENSE](./LICENSE).
