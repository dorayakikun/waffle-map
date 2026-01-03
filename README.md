# waffle-map

> Fantastic mesh renderer

**Requires Node.js v20, v22, or v24**

[![Netlify Status](https://api.netlify.com/api/v1/badges/798c58bf-4950-41de-9f4e-27b39fa16fed/deploy-status)](https://app.netlify.com/sites/waffle-map/deploys)
[![Known Vulnerabilities](https://snyk.io/test/github/dorayakikun/waffle-map/badge.svg?style=flat-square)](https://snyk.io/test/github/dorayakikun/waffle-map)
[![tested with vitest](https://img.shields.io/badge/tested_with-vitest-6E9F18.svg)](https://vitest.dev/)
[![Built with Vite](https://img.shields.io/badge/built_with-vite-646CFF.svg)](https://vitejs.dev/)
[![Formatted with Biome](https://img.shields.io/badge/formatted_with-biome-60A5FA.svg)](https://biomejs.dev/)

Mesh code is a very useful project, but it is not intuitive. Waffle Map generates a mesh from the mesh code and render it on the map. I would be happy if we can help everyone understand the mesh code !!

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

Share mesh codes directly via URL. The app supports URL-based routing for mesh codes:

```
https://waffle-map.netlify.com/5339-35-97,5339-35-98/
https://waffle-map.netlify.com/5339-35-97.5339-35-98/
```

**Supported separators:**
- `,` (comma): `/{meshcode1},{meshcode2}/`
- `.` (dot): `/{meshcode1}.{meshcode2}/`

When you access a URL with mesh codes, the app automatically parses and displays them on the map. The URL updates as you add or remove mesh codes, making it easy to share specific locations.

### Clipboard Integration

Copy mesh codes to clipboard with a single click for easy sharing.

### Interactive Map

- Click on the map to add mesh codes at any location
- Zoom in/out to change mesh code scale (1-6)
- Pan and explore the entire Japan mesh code grid

## Tech Stack

### Core
- **Node.js**: v20 / v22 / v24
- **TypeScript**: v5
- **React**: v19

### Build & Development
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Test Framework**: [Vitest](https://vitest.dev/) - Blazing fast unit test framework
- **E2E Testing**: [Playwright](https://playwright.dev/) - Modern end-to-end testing
- **Linter & Formatter**: [Biome](https://biomejs.dev/) - Fast formatter and linter

### State Management
- **Zustand**: Lightweight state management

### UI Framework
- **Chakra UI**: v3 - Modular component library with custom theme
- **React Leaflet**: v5 - Map rendering library
- **Lucide React**: Icon library

### Design System
- **Color Palette**: Indigo (primary) / Purple (secondary) with neutral grays
- **Spacing**: 4px-based compact spacing system
- **Layout**: Fixed-width sidebar (320px) with flexible map area
- **Dark Mode**: Full dark mode support

### Mesh Calculator
- **waffle-map-mesh-calculator-basic**: Mesh code calculation logic

## Usage

### Prerequisites
- Node.js v20, v22, or v24
- npm v9 or later

### Installation & Development

```console
$ git clone https://github.com/dorayakikun/waffle-map.git
$ cd waffle-map
$ npm ci
$ npm run dev
```

Open http://localhost:5173 in your browser.

### Available Scripts

```console
# Development
$ npm run dev          # Start development server with HMR

# Build
$ npm run build        # Build for production
$ npm run preview      # Preview production build

# Testing
$ npm test             # Run tests in watch mode
$ npm test -- --run    # Run tests once
$ npm run test:ui      # Run tests with UI
$ npm run test:coverage  # Generate coverage report

# Code Quality
$ npm run lint         # Lint code with Biome
$ npm run lint:fix     # Fix linting issues
$ npm run fmt          # Format code with Biome
$ npm run fmt:check    # Check formatting
$ npm run typecheck    # Type checking with TypeScript
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

## Author

- dorayakikun
