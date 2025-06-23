# waffle-map

> Fantastic mesh renderer

[![Netlify Status](https://api.netlify.com/api/v1/badges/798c58bf-4950-41de-9f4e-27b39fa16fed/deploy-status)](https://app.netlify.com/sites/waffle-map/deploys)
[![Known Vulnerabilities](https://snyk.io/test/github/dorayakikun/waffle-map/badge.svg?style=flat-square)](https://snyk.io/test/github/dorayakikun/waffle-map)
[![tested with vitest](https://img.shields.io/badge/tested_with-vitest-6E9F18.svg)](https://github.com/vitest-dev/vitest)

Mesh code is a very useful project, but it is not intuitive. Waffle Map generates a mesh from the mesh code and render it on the map. I would be happy if we can help everyone understand the mesh code !!

# ![Waffle Map](media/header.gif)

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
- [Demo](#demo)
- [Development](#development)
- [Testing](#testing)
- [Building](#building)
- [Extending Waffle Map](#extending-waffle-map)
- [Architecture](#architecture)
- [Author](#author)

## Features

- 🗺️ **Interactive Map Visualization**: Visualize mesh codes on an interactive map using Leaflet
- 🎨 **Modern UI**: Built with shadcn/ui components and TailwindCSS v4 with comprehensive dark mode support
- 📱 **Responsive Design**: Optimized layout with fixed header and scrollable sections for all screen sizes
- 📋 **Clipboard Integration**: Click-to-copy functionality for coordinates and mesh codes
- 🔧 **Extensible Architecture**: Pluggable mesh calculator system for custom mesh logic
- ♿ **Accessibility**: Enhanced keyboard navigation and WCAG-compliant contrast ratios
- ⚡ **Performance**: Built with Vite and optimized with Zustand state management

## Requirements

- Node.js v22 or higher
- npm v8 or higher

## Usage

```console
$ git clone https://github.com/dorayakikun/waffle-map.git
$ cd waffle-map
$ npm install
$ npm run dev
```

## Development

Start the development server with hot module replacement:

```console
$ npm run dev
```

The application will be available at `http://localhost:3000`

## Testing

Run tests with Vitest:

```console
# Run all tests
$ npm test

# Run tests in watch mode
$ npm run test:watch

# Type checking
$ npm run typecheck
```

## Building

Build for production:

```console
$ npm run build
```

Preview the production build:

```console
$ npm run preview
```

## Demo

Please See https://waffle-map.netlify.com/

## Extending Waffle Map

### first step

Prepare below modules

- name: waffle-map-mesh-calculator-{your-logic-name}
- functions:
  - toMeshCode: (lat: number, lng: number, scale: number) => string
  - toBounds: (meshCode: string) => Bounds
  - toCenterLatLng: (meshCode: string) => LatLng
  - scaleFrom(zoom: number): number
  - offset(meshCode: string, x: number, y: number): string
- constant
  - SCALES: [number]

Please see [here](https://github.com/dorayakikun/waffle-map-mesh-calculator-basic) as sample code.

### second step

Append wafflemap config in package.json.

```json
"wafflemap": {
  "meshcalculator": "your-logic-name"
}
```

## Architecture

### Modern Tech Stack

- **Frontend Framework**: React 18+ with modern JSX transform
- **Build Tool**: Vite with ES2022 targets for optimal performance
- **State Management**: Zustand for lightweight and performant state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS v4 with comprehensive dark mode support
- **Testing**: Vitest with jsdom environment and coverage reporting
- **Code Quality**: Deno 2.x for formatting and linting
- **Type Safety**: TypeScript with strict mode and `exactOptionalPropertyTypes`

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── map/            # Map-related components
│   └── ...             # Feature-specific components
├── stores/             # Zustand state stores
├── domain/             # Business logic and utilities
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

### State Management

The application uses Zustand stores for efficient state management:
- `geodeticInputStore` - Geodetic system and coordinate settings
- `coordPopupLayerStore` - Coordinate popup layer state
- `markerInputStore` - Marker input and positioning
- `meshcodesInputStore` - Mesh code processing
- `meshToggleStore` - Mesh grid visibility
- `tileToggleStore` - Tile grid visibility

## Author

- dorayakikun
