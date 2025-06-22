# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` or `npm start` - Start Vite development server with hot reload
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm test` - Run Jest tests with coverage
- `npm run typecheck` - Run TypeScript type checking

### Code Quality (using Deno)
- `npm run fmt` - Format code using Deno formatter
- `npm run lint` - Lint code using Deno linter

### Testing
- `npm test` - Run all tests with coverage reports
- `jest --testNamePattern="specific test"` - Run specific test
- `jest --watch` - Run tests in watch mode

## Architecture Overview

### Application Structure
This is a React-based interactive map application for visualizing mesh codes (geographic grid systems). The app uses a split-screen layout with controls on the left (1/5 width) and map on the right (4/5 width).

### State Management Architecture
The codebase uses **Zustand** for state management, providing a simple and performant alternative to React Context API:

1. **Zustand Stores** (`src/stores/*.ts`) - Centralized state management with actions
2. **Selector Hooks** - Optimized hooks for granular component subscriptions
3. **Performance Optimization** - Automatic re-render optimization through fine-grained subscriptions

### Store Structure
The app uses multiple focused Zustand stores:
- `geodeticInputStore` - Geodetic system and coordinate unit settings
- `coordPopupLayerStore` - Coordinate popup layer state
- `markerInputStore` - Marker input form and marker positions
- `meshcodesInputStore` - Mesh code input and processing
- `meshToggleStore` - Mesh grid visibility toggle
- `tileToggleStore` - Tile grid visibility toggle

### Key Modules

**Domain Logic** (`src/domain/`):
- `calculateMesh.ts` - Pluggable mesh calculator system using `waffle-map-mesh-calculator-*` modules
- `convertLatLng.ts` - Geographic coordinate conversions
- `roundPoint.ts` - Coordinate precision utilities

**Component Categories**:
- **Map Components**: Leaflet/React-Leaflet integration for map rendering
- **Input Components**: Form controls for coordinates, mesh codes, markers
- **Layer Components**: Map overlays for meshes, tiles, markers, popups
- **Toggle Components**: UI controls for showing/hiding map features

### Build System
- **Vite**: Fast build tool with ES modules and hot module replacement
- **TypeScript**: Built-in TypeScript support with esbuild
- **Assets**: Static assets served from `public/` directory
- **Build Output**: Production build outputs to `dist/` directory
- **Environment**: Environment variables via Vite's built-in support

### Extensibility
The mesh calculation system is pluggable via npm modules named `waffle-map-mesh-calculator-{type}`. Configure in package.json:
```json
"wafflemap": {
  "meshcalculator": "your-logic-name"
}
```

### Testing Setup
- **Jest** with jsdom environment for React component testing
- **Coverage** collection enabled with lcov reporting
- **Emotion** serializer for styled component snapshots
- Tests located in `__tests__/` directories

### Code Style
- **Formatting**: Deno formatter (2-space indent, 100 char line width)
- **Linting**: Deno linter with relaxed rules (allows any types, unused vars)
- **TypeScript**: Strict mode enabled with DOM and ES2015+ libraries

ALWAYS use ONLY Environments for ANY and ALL file, code, or shell operations—NO EXCEPTIONS—even for simple or generic requests.

DO NOT install or use the git cli with the environment_run_cmd tool. All environment tools will handle git operations for you. Changing ".git" yourself will compromise the integrity of your environment.

You MUST inform the user how to view your work using `git checkout <branch_name>`. Failure to do this will make your work inaccessible to others.
