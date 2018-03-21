declare const require: any

import * as pkg from '../../package.json'

export interface LatLng {
  lat: number,
  lng: number,
}

export interface Bounds {
  leftTop: LatLng,
  rightBottom: LatLng,
}

export interface Mesh {
  code: string,
  center: LatLng,
  bounds: Bounds,
}

interface MeshCalculator {
  toCenterLatLng: (meshCode: string) => LatLng,
  toBounds: (meshCode: string) => Bounds,
  toMeshCode: (lat: number, lng: number, scale: number) => string,
  scaleFrom(zoom: number): number,
  offset(meshCode: string, x: number, y: number): string,
  SCALES: number[],
}

const meshCalculator: () => MeshCalculator = () => {
  if ((<any>pkg).wafflemap) {
    return require('../../node_modules/waffle-map-mesh-calculator-' +
    (<any>pkg).wafflemap.meshcalculator +
      '/lib/meshCalculator.js')
  }
  return require('waffle-map-mesh-calculator-basic')
}

export default meshCalculator()
