# Diplomatic Interaction Web

A Next.js application that visualizes global diplomatic interactions and mentions across ~160 countries using the GlobalDiplomacyNET dataset. For now, the project provides an interactive world map, country-level detail pages with mentions, and a network graph view.

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run the dev server
npm run dev
# App runs at http://localhost:3000
```

If you see build warnings related to ESM modules or map libraries, they are handled in `next.config.mjs`.

## Tech Stack
- Next.js 14 (pages router)
- React 18
- Semantic UI React (+ CDN stylesheet in `_document.js`)
- react-simple-maps for the world map
- Custom network graph component (ReactGraphVis / @xyflow/react)
- Firebase Realtime Database
- Google Analytics (gtag)

## Project Structure

```
/ (root)
  pages/                 # Next.js pages (routes)
    index.js             # Landing + world map entry
    interactions-mentions/
      index.js           # Countries listing & search
      [countryCode].js   # Country detail (mentions, interactions, network)
    publications/        # Publications listing
    api/                 # API routes (proxy Firebase reads, shape responses)
      mentions/          # Mentions endpoints
        index.js         # /api/mentions?overview=true
        country.js       # /api/mentions/country?countryCode=...
      country/
        [countryCode].js # /api/country/:countryCode (mentions with pagination)
  components/            # Reusable UI & map/network components
  data/                  # Static data: countries list, publications
  lib/firebase.js        # Firebase init + MentionsService
  styles/                # Global styles
  public/                # Static assets
  next.config.mjs        # Webpack tweaks for ESM & map libs
  vercel.json            # Build configuration (Vercel)
```

## Environment & Config

This repository includes a pre-configured Firebase project in `lib/firebase.js`. If you fork this project, either:
- Use the existing Firebase project as-is (read-only access assumed in your environment), or
- Replace the config with your own Firebase credentials and database URL.

Key locations:
- `lib/firebase.js` initializes Firebase and the Realtime Database and exports:
  - `mentionsService`: high-level reads for countries and interactions
  - Country ID/code mappings (in-memory map)
- `next.config.mjs` handles ESM and map library compat and sets `images.unoptimized = true`.
- Google Analytics is configured with measurement ID `G-4QY8YT7STT` in `_app.js` and `_document.js`.

No `.env` file is required for local development with the current config. If you swap Firebase or GA, you can migrate those values to environment variables and read them in code.

## NPM Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "static": "rm -rf .next out && next build && touch ./out/.nojekyll && echo 'www.globaldiplomacy.net' > ./out/CNAME",
  "deploy": "gh-pages -d out --dotfiles"
}
```

- `dev`: Run the local dev server on port 3000.
- `build`: Production build.
- `start`: Start a production server (after build).
- `lint`: Run Next.js ESLint.

[Following scripts are OUTDATED after switching to Vercel deployment]
-  `static`: Build and prepare a static export folder at `out` with a CNAME. Note: the app primarily uses API routes and Firebase calls; full static export may be limited.
- `deploy`: Publish the `out` directory via `gh-pages` if you choose static hosting.

## Key Features and Routes

- `/` Landing page with project intro and a world map section (`components/map/worldMapScreen`).
- `/interactions-mentions` Countries list with search. Fetches overview data from `/api/mentions?overview=true` and falls back to static `data/countries.js`.
- `/interactions-mentions/[countryCode]` Country details:
  - Mentions table with pagination (client-side prefetching of next pages)
  - Interactions (no data is available yet for this section)
  - Network graph (visual)

## API Endpoints (Next.js API Routes)

- `GET /api/country/[countryCode]?limit=20&offset=0`
  - Returns mentions for a country with pagination and caching headers.
- `GET /api/mentions?overview=true`
  - Get overview data which includes countries and interaction counts

These endpoints proxy reads from Firebase and shape the response for the UI. See `lib/firebase.js` for service methods.

## Data Model (Firebase)

Realtime Database paths referenced by `MentionsService`:
- `countries`: id -> { name, code, ... }
- `interactions`: id -> { reporting, reported, date, type, ... }
- `index/byCountry/<countryId>/asReported`: array of interaction IDs for faster lookup

Mentions fetching flow:
- Country code -> internal numeric ID via a local map
- Retrieve interaction IDs via the `index/byCountry/...` array
- Fetch details from `interactions` and enrich with country names/codes and dates

## Development Notes

- World map uses `react-simple-maps` and loads topojson from a CDN (`world-atlas`). No Mapbox token is required.
- UI styling relies on Semantic UI CSS loaded via CDN in `_document.js`.
- Google Analytics is wired in `_app.js` and `_document.js`. Disable or replace the ID as needed for local testing.
- Image optimization is disabled (`images.unoptimized = true`) to simplify CI/static exports.

## Deployment

- Vercel: The repository includes `vercel.json` with build/install commands. Connect the repo to Vercel and deploy.
- Static hosting: Use `npm run static` and then host the `out` directory. Note: API routes and dynamic Firebase reads may not work in a purely static environment.

## Troubleshooting

- Build errors about ESM modules or `fs`/`net` fallbacks:
  - Handled by `next.config.mjs` (custom webpack config and `esmExternals: 'loose'`).
- Network graph or country page shows no data:
  - Ensure Firebase database URL and rules allow read access for the paths listed above.
  - Confirm `index/byCountry/<id>/asReported` exists and `interactions` contains referenced IDs.
- Countries list empty:
  - The page requests `/api/mentions?overview=true`. Implement or verify `mentionsService.getOverviewData()` if using a different Firebase dataset.
- GA events not firing locally:
  - Disable or replace the measurement ID. Ad blockers can prevent GA.

## Contributing

- Prefer to follow a component based design for a modular code.