# waffle-map

> Fantastic mesh renderer

**Requires Node.js >= 22.12.0 (v22 or v24)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/798c58bf-4950-41de-9f4e-27b39fa16fed/deploy-status)](https://app.netlify.com/sites/waffle-map/deploys)
[![Known Vulnerabilities](https://snyk.io/test/github/dorayakikun/waffle-map/badge.svg?style=flat-square)](https://snyk.io/test/github/dorayakikun/waffle-map)
[![tested with vitest](https://img.shields.io/badge/tested_with-vitest-6E9F18.svg)](https://vitest.dev/)
[![Built with Vite](https://img.shields.io/badge/built_with-vite-646CFF.svg)](https://vitejs.dev/)
[![Formatted with Biome](https://img.shields.io/badge/formatted_with-biome-60A5FA.svg)](https://biomejs.dev/)

Mesh code is a very useful system, but it is not always intuitive. Waffle Map generates meshes from Japanese mesh codes and renders them interactively on a map.

# ![Waffle Map](media/header.gif)

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Demo](#demo)
- [Extending Waffle Map](#extending-waffle-map)
- [Author](#author)

## Features

### URL-based Mesh Code Routing

Share mesh codes directly via URL with bidirectional URL synchronization:

```text
https://waffle-map.netlify.app/5339-35-97,5339-35-98/
https://waffle-map.netlify.app/5339-35-97.5339-35-98/
```

**Supported separators:**
- `,` (comma): `/{meshcode1},{meshcode2}/`
- `.` (dot): `/{meshcode1}.{meshcode2}/`

When you open a URL with mesh codes, Waffle Map automatically parses, renders, and fits the map bounds to them. The URL updates as you edit mesh codes, and you can copy the shareable URL with a single click from the sidebar header.

### Dynamic OGP / X Card Previews

Shared mesh URLs automatically serve dynamically generated `1200×630` Open Graph / X Card (`summary_large_image`) PNG previews via Netlify Edge Functions (`og-meta`) and Netlify Functions (`/api/og`). Each card composites real GSI Pale map tiles (Geospatial Information Authority of Japan) with the requested mesh overlays rendered by `@resvg/resvg-js`.

### Interactive Map & Inspector

- **Coordinate & Mesh Scale Inspection**: Right-click anywhere on the map to inspect the coordinates and all mesh code scales (1–6) in a popup, with one-click clipboard copy
- **Mesh Code Rendering**: Enter multiple mesh codes to render labeled mesh rectangles on the map and view copyable mesh detail cards
- **Grid Overlays**: Toggle Tile Grid and Mesh Grid overlays independently
- **Markers**: Place markers by `lat,lng` input (supports Enter to add), remove individual markers, or clear all
- **Coordinate System**: Switch between geodetic datums (`Tokyo` / `WGS84`) and units (`millisec` / `degree`)
- **Modern Workspace UI**: Collapsible sidebar (340px), Light / Dark mode toggle (with dark-styled map tiles), and floating status HUD

## Tech Stack

### Core
- **Node.js**: v22 / v24 (`>=22.12.0`; `24` configured in `.node-version` and `mise.toml`)
- **TypeScript**: v7
- **React**: v19

### Build, Testing & Code Quality
- **Build Tool**: [Vite](https://vitejs.dev/) v8
- **Unit & Property Testing**: [Vitest](https://vitest.dev/) v5 + [fast-check](https://fast-check.dev/) v4
- **Mutation Testing**: Custom diff-driven in-memory [Oxc](https://oxc.rs/) mutation runner (`scripts/mutator.mjs`)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Linter & Formatter**: [Biome](https://biomejs.dev/) v2

### State Management
- **Zustand**: v5 - Lightweight state management

### UI & Mapping
- **Chakra UI**: v3 - Modular component library with custom theme
- **React Leaflet**: v5 (Leaflet v1.9) - Interactive map rendering
- **Lucide React**: v1 - Icon library

### Dynamic OGP & Hosting
- **Netlify**: Static hosting with SPA routing (`public/_redirects`), Netlify Functions (`netlify/functions/og.ts`), and Netlify Edge Functions (`netlify/edge-functions/og-meta.ts`)
- **OGP Renderer**: `@resvg/resvg-js` + GSI Pale map tiles

### Design System
- **Color Palette**: Indigo (primary) / Purple (secondary) with neutral grays
- **Spacing**: 4px-based compact spacing system
- **Layout**: Collapsible sidebar (340px) with flexible map canvas
- **Dark Mode**: Full Light / Dark mode support

### Mesh Calculator
- **waffle-map-mesh-calculator-basic**: Mesh code calculation logic

## Usage

### Prerequisites
- Node.js `>=22.12.0` (v22 or v24 recommended)
- npm

### Installation & Development

```console
$ git clone https://github.com/dorayakikun/waffle-map.git
$ cd waffle-map
$ npm ci
$ npm run dev
```

Open http://localhost:8080 in your browser.

During local development, Vite middleware also mirrors Netlify's dynamic OGP endpoints so you can preview generated cards at `http://localhost:8080/api/og?codes=5339.5340`.

### Available Scripts

```console
# Development
$ npm run dev                 # Start development server with HMR (port 8080)

# Build
$ npm run build               # Build for production
$ npm run preview             # Preview production build

# Testing
$ npm test                    # Run unit tests in watch mode
$ npm test -- --run           # Run unit tests once
$ npm run test:ui             # Run unit tests with Vitest UI
$ npm run test:coverage       # Generate test coverage report
$ npm run test:property       # Run property-based tests (fast-check)
$ npm run test:mutation       # Run in-memory Oxc mutation tests (cached)
$ npm run test:mutation:diff  # Run diff-driven mutation tests (--since origin/main)
$ npm run test:e2e            # Run Playwright E2E tests
$ npm run test:e2e:ui         # Run Playwright E2E tests with UI
$ npm run test:all            # Run unit and E2E tests

# Code Quality
$ npm run lint                # Lint code with Biome
$ npm run lint:fix            # Fix linting issues with Biome
$ npm run fmt                 # Format code with Biome
$ npm run fmt:check           # Check formatting with Biome
$ npm run check               # Run Biome lint & format with auto-fix
$ npm run typecheck           # Type checking with TypeScript
```

## Demo

Please see https://waffle-map.netlify.app/

## Extending Waffle Map

### First step

Prepare a module with the following interface:

- Name: `waffle-map-mesh-calculator-{your-logic-name}`
- Functions:
  - `toMeshCode: (lat: number, lng: number, scale: number) => string`
  - `toBounds: (meshCode: string) => Bounds`
  - `toCenterLatLng: (meshCode: string) => LatLng`
  - `scaleFrom(zoom: number): number`
  - `offset(meshCode: string, x: number, y: number): string`
- Constant:
  - `SCALES: number[]`

See [waffle-map-mesh-calculator-basic](https://github.com/dorayakikun/waffle-map-mesh-calculator-basic) as a reference implementation.

### Second step

Add the `wafflemap` config to `package.json`:

```json
"wafflemap": {
  "meshcalculator": "your-logic-name"
}
```

## Author

- dorayakikun
