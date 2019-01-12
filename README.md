# waffle-map

> Fantastic mesh renderer

[![CircleCI](https://circleci.com/gh/dorayakikun/waffle-map.svg?style=svg)](https://circleci.com/gh/dorayakikun/waffle-map)
[![Greenkeeper Enabledflat](https://badges.greenkeeper.io/dorayakikun/waffle-map.svg)](https://greenkeeper.io/)
 [![Known Vulnerabilities](https://snyk.io/test/github/dorayakikun/waffle-map/badge.svg?style=flat-square)](https://snyk.io/test/github/dorayakikun/waffle-map) 
[![Code Climate](https://codeclimate.com/github/dorayakikun/waffle-map/badges/gpa.svg)](https://codeclimate.com/github/dorayakikun/waffle-map)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)

Mesh code is a very useful project, but it is not intuitive. Waffle Map generates a mesh from the mesh code and render it on the map. I would be happy if we can help everyone understand the mesh code !!

# ![Waffle Map](media/header.gif)

## Contents

- [Usage](#usage)
- [Demo](#demo)
- [Documentation](#documentation)
- [Extending Waffle Map](#extending-waffle-map)
- [Author](#author)

## Usage

```console
$ git clone https://github.com/dorayakikun/waffle-map.git
$ npm run dev
```

## Demo

Please See https://waffle-map.netlify.com/

## Documentation

Please See https://dorayakikun.github.io/waffle-map/ for details.(Jpanese only)

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
