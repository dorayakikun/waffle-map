# CLAUDE.md

This file provides context for Claude Code when working on this project.

## Project Overview

Waffle Map is a Japanese mesh code visualization tool built with React 19 and Leaflet. It renders mesh codes on an interactive map and supports URL-based routing for sharing specific mesh code locations.

## Quick Commands

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm test             # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
npm run typecheck    # TypeScript type checking
npm run lint         # Lint with Biome
npm run lint:fix     # Fix linting issues
npm run fmt          # Format with Biome
```

## Architecture

### Directory Structure

```
src/
├── components/       # React components
│   ├── markerinput/  # Mesh code input UI
│   └── layer/        # Leaflet map layers
├── domain/           # Domain logic (mesh calculations)
├── pages/            # Page components
├── stores/           # Zustand state stores
├── theme/            # Chakra UI custom theme
│   ├── tokens/       # Design tokens (colors, spacing)
│   ├── semanticTokens/ # Semantic color definitions
│   └── constants.ts  # Leaflet color constants
├── utils/            # Utility functions
└── index.tsx         # Application entry point

e2e/
└── tests/            # Playwright E2E tests
```

### Key Technologies

- **React 19** + TypeScript 5
- **Chakra UI v3** with custom theme system
- **React Leaflet v5** for map rendering
- **Zustand** for state management
- **Vite 7** for build tooling
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **Biome** for linting/formatting

### Design System

The app uses a custom Chakra UI theme with:
- **Primary color**: Indigo (50-950 scale)
- **Secondary color**: Purple (50-950 scale)
- **Neutral**: Gray scale for backgrounds/borders
- **Spacing**: 4px-based compact system
- **Layout**: Fixed 320px sidebar + flexible map area

Color constants for Leaflet (which can't use Chakra theme) are in `src/theme/constants.ts`. Keep these in sync with `src/theme/tokens/colors.ts`.

### URL Routing

The app supports URL-based mesh code routing:
- `/5339-35-97,5339-35-98/` - Comma-separated mesh codes
- `/5339-35-97.5339-35-98/` - Dot-separated mesh codes

Implementation: `src/utils/meshcodeUrl.ts`

### State Management

Zustand stores in `src/stores/`:
- `useMeshcodesInputStore` - User input mesh codes and URL sync
- `useScaleStore` - Current mesh code scale (1-6)
- `useMapCenterStore` - Map center coordinates

## Testing

### Unit Tests
```bash
npm test              # Watch mode
npm test -- --run     # Single run
npm run test:coverage # With coverage
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
