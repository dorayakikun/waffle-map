# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run start` - Start development server with hot reload
- `npm run build` - Build production bundle
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

### Context Architecture Pattern
The codebase implements a **Separation of Concerns Context Pattern** that splits state management into distinct layers:

1. **Core State Hook** (`useCore*.ts`) - Contains reducer logic and action creators
2. **State Context** (`*StateContext.ts`) - Provides read-only state access 
3. **Dispatch Context** (`*DispatchContext.ts`) - Provides action dispatchers
4. **Provider Component** (`*Provider.tsx`) - Wires contexts together

This pattern optimizes performance by preventing unnecessary re-renders and maintains clear separation between state consumption and action dispatching.

### Provider Hierarchy
The app uses nested context providers in `src/index.tsx`:
```
ChakraProvider > CoordPopupLayerProvider > GeodeticInputProvider > 
MeshToggleProvider > MarkerInputProvider > MeshcodesInputProvider > TileToggleProvider
```

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
- **Webpack**: Bundles to `public/bundle.js`
- **TypeScript**: Compiled via ts-loader
- **Assets**: Images and fonts handled as webpack assets
- **Environment**: `LOGIC_TYPE` webpack define plugin for mesh calculator selection

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
