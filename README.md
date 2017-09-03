# waffle-map

[![Greenkeeper badge](https://badges.greenkeeper.io/dorayakikun/waffle-map.svg)](https://greenkeeper.io/)

> Fantastic mesh renderer

[![Build Status](https://travis-ci.org/dorayakikun/waffle-map.svg?branch=master)](https://travis-ci.org/dorayakikun/waffle-map)
[![Code Climate](https://codeclimate.com/github/dorayakikun/waffle-map/badges/gpa.svg)](https://codeclimate.com/github/dorayakikun/waffle-map)
[![Test Coverage](https://codeclimate.com/github/dorayakikun/waffle-map/badges/coverage.svg)](https://codeclimate.com/github/dorayakikun/waffle-map/coverage)

Mesh code is a very useful project, but it is not intuitive. Waffle Map generates a mesh from the mesh code and render it on the map. I would be happy if we can help everyone understand the mesh code !!

# [![Waffle Map](media/header.png)](https://dorayakikun.github.io/waffle-map/)

## Contents

- [Usage](#usage)
- [Extending Waffle Map](#extending-waffle-map)
- [Author](#author)

## Usage

``` console
$ git clone https://github.com/dorayakikun/waffle-map.git
$ npm run dev
```

## Extending Waffle Map

### first step
Prepare below modules

- name: waffle-map-mesh-calculator-{your-logic-name}
- functions:
  - latLngToMesh(lat: number, lng: number, scale: number): string
  - meshToBounds(mesh: string): Bounds
  - meshToLatLng(mesh: string): LatLng
- constant
  - SCALES: [number]
  
Please see [here](https://github.com/dorayakikun/waffle-map-mesh-calculator-basic) as sample code.

### second step

Append wafflemap config in package.json.

``` json
"wafflemap": {
  "meshcalculator": "your-logic-name"
}
```

## Author
- dorayakikun