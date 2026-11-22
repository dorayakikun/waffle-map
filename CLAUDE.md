# CLAUDE.md

This file provides context for Claude Code when working on this project.

## Project Overview

Waffle Map is a Japanese mesh code visualization tool built with React 19 and Leaflet. It renders mesh codes on an interactive map, supports URL-based routing for sharing specific mesh code locations, and generates dynamic Open Graph / X Card PNG previews on Netlify.

## Quick Commands

```bash
npm run dev                # Start development server (http://localhost:8080)
npm run build              # Build for production
npm test                   # Run unit tests (Vitest 5)
npm run test:property      # Run property-based tests (fast-check)
npm run test:mutation      # Run in-memory Oxc mutation tests (cached)
npm run test:mutation:diff # Run diff-driven mutation tests (--since origin/main)
npm run test:e2e           # Run E2E tests (Playwright)
npm run typecheck          # TypeScript type checking
npm run lint               # Lint with Biome
npm run lint:fix           # Fix linting issues
npm run fmt                # Format with Biome
npm run check              # Run Biome lint & format with auto-fix
```

## Architecture

### Directory Structure

```
src/
├── components/           # React & Leaflet components
│   ├── boundsfitter/     # Fit map bounds to mesh codes
│   ├── common/           # Shared UI (ErrorBoundary, GridToggle, MeshRectangle)
│   ├── coordpopup/       # Right-click coordinate & mesh scale popup
│   ├── debugtilelayer/   # Tile grid overlay
│   ├── geodeticInput/    # Datum (Tokyo/WGS84) & unit (millisec/degree) selector
│   ├── map/              # Main Leaflet map container
│   ├── markerinput/      # Marker lat,lng input & management UI
│   ├── markerlayer/      # Marker layer on map
│   ├── meshcodeinput/    # Mesh code & separator input
│   ├── meshdetails/      # Copyable mesh detail cards
│   ├── meshlayer/        # Interactive mesh grid layer
│   ├── meshtoggle/       # Mesh grid visibility toggle
│   ├── tileToggle/       # Tile grid visibility toggle
│   └── userinputmeshlayer/ # User-entered mesh code layer
├── domain/               # Domain logic (mesh calculations, datum/unit conversion)
├── errors/               # Typed error definitions and messages
├── hooks/                # Custom hooks (useUrlSync, useDebouncedValue)
├── og/                   # Dynamic OGP SVG/PNG rendering, GSI Pale tiles, fonts
├── pages/                # Main AppContainer layout
├── stores/               # Zustand v5 state stores
├── styles/               # Global CSS & Leaflet overrides
├── theme/                # Chakra UI v3 custom theme
│   ├── tokens/           # Design tokens (colors, spacing)
│   ├── semanticTokens/   # Semantic color definitions
│   └── constants.ts      # Leaflet color constants
├── types/                # Shared TypeScript types (Result, branded types, state)
├── utils/                # Utility functions (URL parsing/formatting)
└── index.tsx             # Application entry point

netlify/
├── edge-functions/       # Dynamic OGP meta tag injection (og-meta.ts)
└── functions/            # Dynamic OGP PNG endpoint (/api/og -> og.ts)

scripts/
└── mutator.mjs           # Diff-driven in-memory Oxc mutation test runner

e2e/
└── tests/                # Playwright E2E tests
```

### Key Technologies

- **Node.js**: v22 / v24 (`>=22.12.0`; `24` configured in `.node-version` and `mise.toml`)
- **React 19** + **TypeScript 7**
- **Chakra UI v3** with custom theme system (Light / Dark mode)
- **React Leaflet v5** for map rendering
- **Zustand v5** for state management
- **Vite 8** for build tooling (dev server on port `8080`, includes local OGP preview middleware)
- **Vitest 5** + **fast-check v4** + custom Oxc diff-driven mutation runner (`scripts/mutator.mjs`)
- **Playwright** for E2E testing
- **Biome v2** for linting/formatting
- **Netlify** for hosting (`netlify.toml`, `public/_redirects`, Netlify Functions & Edge Functions with `@resvg/resvg-js`)

### Design System

The app uses a custom Chakra UI theme with:
- **Primary color**: Indigo (50-950 scale)
- **Secondary color**: Purple (50-950 scale)
- **Neutral**: Gray scale for backgrounds/borders
- **Spacing**: 4px-based compact system
- **Layout**: Collapsible 340px sidebar + flexible map area

Color constants for Leaflet (which can't use Chakra theme) are in `src/theme/constants.ts`. Keep these in sync with `src/theme/tokens/colors.ts`.

### URL Routing & Hosting

The app is hosted on Netlify (`https://waffle-map.netlify.app/`) with SPA routing handled via `public/_redirects`.

Supported URL formats:
- `/5339-35-97,5339-35-98/` - Comma-separated mesh codes
- `/5339-35-97.5339-35-98/` - Dot-separated mesh codes

Implementation: `src/utils/meshcodeUrl.ts`, `src/hooks/useUrlSync.ts`, `netlify/edge-functions/og-meta.ts`

### State Management

Zustand stores in `src/stores/`:
- `useMeshcodesInputStore` - User input mesh codes and URL sync
- `useGeodeticInputStore` - Geodetic datum (Tokyo / WGS84) and unit (millisec / degree)
- `useMarkerInputStore` - Placed marker coordinates
- `useCoordPopupStore` - Right-click coordinate popup state
- `useMeshToggleStore` - Mesh grid overlay visibility
- `useTileToggleStore` - Tile grid overlay visibility
- `useColorModeStore` - Light / Dark color mode

## Testing

### Unit & Property Tests
```bash
npm test                  # Watch mode
npm test -- --run         # Single run
npm run test:coverage     # With coverage
npm run test:property     # Property-based tests
npm run test:mutation:diff # Diff-driven mutation tests
```

### E2E Tests
```bash
npm run test:e2e      # Headless
npm run test:e2e:ui   # With UI
```

E2E tests use Playwright and are located in `e2e/tests/`. They import color constants from `src/theme/constants.ts` for consistency.

## Conventions

- Use Biome for formatting and linting (not ESLint/Prettier)
- Prefer TypeScript strict mode
- Use Chakra UI semantic tokens for colors
- Keep Leaflet color constants in sync with theme tokens
- E2E tests should import shared constants rather than hardcoding values
