# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` or `npm start` - Start Vite development server with hot reload
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm test` - Run Vitest tests with coverage
- `npm run test:watch` - Run Vitest in watch mode
- `npm run typecheck` - Run TypeScript type checking

### Code Quality (using Deno)
- `npm run fmt` - Format code using Deno formatter
- `npm run lint` - Lint code using Deno linter

### Testing
- `npm test` - Run all tests with coverage reports using Vitest
- `npm run test:watch` - Run tests in watch mode
- `vitest run --reporter=verbose` - Run tests with detailed output

## Architecture Overview

### Application Structure
This is a React-based interactive map application for visualizing mesh codes (geographic grid systems). The app uses a split-screen layout with controls on the left (1/5 width) and map on the right (4/5 width).

### UI Framework
The application uses **shadcn/ui** components built on top of **Radix UI** primitives with **TailwindCSS v4** for styling:

1. **shadcn/ui Components** (`src/components/ui/`) - Pre-built accessible components with proper dark mode support
2. **Radix UI Primitives** - Headless UI components for accessibility and behavior
3. **TailwindCSS v4** - Utility-first CSS framework with modern features and dark mode theming
4. **Dark Mode Support** - Complete dark mode implementation with proper contrast ratios and consistent styling
5. **Responsive Design** - Fixed-height layout with internal scrolling for optimal space usage

### Layout Design
- **Fixed Header**: Logo and application title remain visible at all times
- **Scrollable Sidebar**: All controls (Coordinate System, Accordions) are in a scrollable area
- **Accordion Navigation**: Collapsible sections for Tile Grid, Mesh Grid, Marker, and Mesh Code
- **Internal Scrolling**: Each section scrolls independently without affecting overall layout height

### Interactive Features
- **Clipboard Integration**: Click-to-copy functionality for coordinates and mesh codes
- **Hover States**: Enhanced visual feedback with proper contrast ratios in both light and dark modes
- **Responsive Forms**: Adaptive backgrounds on input fields for improved visibility in all themes
- **Unified Color Scheme**: Consistent slate color palette across all components with dark mode variants
- **Select Components**: Properly styled dropdown menus with dark mode support and consistent theming

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
- **Input Components**: Form controls for coordinates, mesh codes, markers with clipboard functionality
- **Layer Components**: Map overlays for meshes, tiles, markers, popups with copy-to-clipboard features
- **Toggle Components**: UI controls for showing/hiding map features
- **UI Components**: shadcn/ui components for consistent design and accessibility

### Build System
- **Node.js v22**: Updated to support Node.js v22 with ES2022 compilation targets
- **Vite**: Fast build tool with ES modules and hot module replacement, optimized for Node.js v22
- **TypeScript**: Strict mode with ES2022 targets and modern configuration including `exactOptionalPropertyTypes`
- **esbuild**: ES2022 compilation targets for optimal performance
- **TailwindCSS v4**: Modern CSS framework with PostCSS integration
- **Assets**: Static assets served from `public/` directory including favicon and app icons
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
- **Vitest** with jsdom environment for React component testing, optimized for Node.js v22
- **Coverage** collection enabled with v8 provider and lcov reporting
- **Node.js v22 Compatibility** - Pool configuration with forks for stability
- Tests located in `__tests__/` directories
- Test files: `*.test.ts`, `*.spec.ts` patterns supported
- Built-in TypeScript support without additional configuration

### Code Style
- **Formatting**: Deno formatter (2-space indent, 100 char line width)
- **Linting**: Deno linter with relaxed rules (allows any types, unused vars)
- **TypeScript**: Strict mode with ES2022 targets and `exactOptionalPropertyTypes` for enhanced type safety
- **UI Consistency**: Unified slate color palette with proper contrast ratios for both light and dark modes
- **Accessibility**: Enhanced hover states and keyboard navigation support with proper focus indicators
- **Component Styling**: Consistent dark mode implementation across all shadcn/ui components

## Development Workflow Rules

### Pre-Commit Requirements
**MANDATORY**: Before creating any commit, you MUST run the following commands and fix ALL errors:

1. **Run Tests**: `npm test`
   - All tests must pass (16/16 test suites)
   - Fix any failing tests before committing

2. **Run Linting**: `npm run lint`
   - Fix all linting errors and warnings
   - Ensure code follows project style guidelines

3. **Run Type Checking**: `npm run typecheck`
   - Resolve all TypeScript errors
   - Ensure strict mode compliance

4. **Verify Build**: `npm run build`
   - Ensure production build completes successfully
   - Fix any build-time errors

**Important**: Never commit code that has failing tests, linting errors, or type checking issues. Always verify that all quality checks pass before creating commits.

ALWAYS use ONLY Environments for ANY and ALL file, code, or shell operations—NO EXCEPTIONS—even for simple or generic requests.

DO NOT install or use the git cli with the environment_run_cmd tool. All environment tools will handle git operations for you. Changing ".git" yourself will compromise the integrity of your environment.

You MUST inform the user how to view your work using `git checkout <branch_name>`. Failure to do this will make your work inaccessible to others.

**CRITICAL Git Safety Rule**: NEVER add files outside the project directory to git. Only add files within the current project root directory. Do not accidentally stage or commit:
- Home directory files (`~/` or `/Users/username/`)
- System files (`/etc/`, `/usr/`, `/var/`)
- Other project directories outside this repository
- Personal configuration files outside this project scope

Always verify with `git status` before committing to ensure only project-relevant files are staged.
