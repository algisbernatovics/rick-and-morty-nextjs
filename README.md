# Rick and Morty Multi-Dimensional Explorer

A premium, modern web application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. This project is a complete rewrite and enhancement of the original PHP-based Rick and Morty explorer.

## 🚀 Features

- **Characters Explorer**: Browse and search through the entire database of Rick and Morty characters.
- **Episodes & Locations**: Detailed listing of all episodes and locations with advanced search.
- **Deep Interconnectivity**:
    - View characters featured in a specific episode.
    - View residents of any location.
    - Discover which episodes a character appeared in.
- **Premium UI/UX**:
    - **Glassmorphism Design**: High-end aesthetic with frosted glass effects and vibrant accents.
    - **Smooth Animations**: Powered by Framer Motion for a fluid, reactive feel.
    - **Responsive Layout**: Fully optimized for mobile, tablet, and desktop screens.
- **Performance Optimized**:
    - **Static Export**: Every listing, detail page, sitemap, and robots output is generated into `out/` for CDN/static hosting.
    - **Export-Safe Images**: Uses `next/image` with unoptimized remote images for static hosting compatibility.
    - **Build-Time API Snapshot**: Rick and Morty API collection pages are fetched once per build and reused across all generated pages.
- **Error Handling**: Graceful "Dimensional Glitch" error states and search fallback UIs.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [The Rick and Morty API](https://rickandmortyapi.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository (if applicable).
2. Navigate to the project directory:
   ```bash
   cd rickmorty-njs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building Static Production Output

Set the canonical production URL before building so metadata, `robots.txt`, and `sitemap.xml` do not point at localhost:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```

On Vercel, the app also falls back to `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL` when `NEXT_PUBLIC_SITE_URL` is not set.

```bash
npm run build
npm run start
```

`npm run build` runs `npm run generate:data` first, then `next build` writes the static export to `out/`. `npm run start` serves the generated `out/` directory locally.

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components (Navbar, CharacterCard, Pagination, etc.).
- `src/components/ui/`: Shared design primitives such as panels, status badges, and safe JSON-LD output.
- `src/lib/`: Unified API client and utility functions.
- `src/types/`: Centralized TypeScript interfaces.
- `src/hooks/`: Custom React hooks (if any).

## Design and Security Notes

- Semantic design tokens live in `src/app/globals.css` and back reusable utilities such as `panel`, `panel-interactive`, `focus-ring`, and `eyebrow`.
- Static-host browser security headers are configured in `vercel.json`.
- Structured data is rendered through the escaped `JsonLd` helper to avoid unsafe script content.

---

*Wubba Lubba Dub Dub!* 🛸✨
