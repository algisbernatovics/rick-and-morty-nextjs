# Rick and Morty Multi-Dimensional Explorer

A premium, modern web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project is a complete rewrite and enhancement of the original PHP-based Rick and Morty explorer.

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
    - **Server-Side Rendering (SSR)**: Fast initial loads and great SEO.
    - **Optimized Images**: Using `next/image` for automatic resizing and lazy loading.
    - **Smart Caching**: API responses are cached to minimize network requests.
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

### Building for Production

```bash
npm run build
npm run start
```

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components (Navbar, CharacterCard, Pagination, etc.).
- `src/lib/`: Unified API client and utility functions.
- `src/types/`: Centralized TypeScript interfaces.
- `src/hooks/`: Custom React hooks (if any).

---

*Wubba Lubba Dub Dub!* 🛸✨

