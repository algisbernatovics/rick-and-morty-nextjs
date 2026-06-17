# Rick and Morty Next.js

A TypeScript Next.js explorer for Rick and Morty characters, locations, and episodes.

## Overview

Rick and Morty Next.js is a modern App Router project built around [The Rick and Morty API](https://rickandmortyapi.com/). It provides typed API helpers, reusable UI styling, and data-generation support for a polished portfolio version of the earlier PHP API client.

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

## Getting Started

Install dependencies and start development:

```bash
npm install
npm run dev
```

Open the local URL shown by Next.js.

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

## Portfolio Notes

- Shows typed API integration in a modern Next.js app.
- Demonstrates portfolio-friendly UI work around a public API.
- Useful comparison point with the older custom PHP implementation.

## Status

Portfolio-ready Next.js application.
