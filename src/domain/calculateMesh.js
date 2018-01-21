// @flow
import pkg from '../../package.json'

export type LatLng = {
  lat: number,
  lng: number,
}

export type Bounds = {
  leftTop: LatLng,
  rightBottom: LatLng,
}

export type Mesh = {
  code: string,
  center: LatLng,
  bounds: Bounds,
}

type MeshCalculator = {
  toCenterLatLng: (meshCode: string) => LatLng,
  toBounds: (meshCode: string) => Bounds,
  toMeshCode: (lat: number, lng: number, scale: number) => string,
  scaleFrom(zoom: number): number,
  offset(meshCode: string, offsetX: number, offsetY: number): string,
  SCALES: *,
}

const meshCalculator: () => MeshCalculator = () => {
  if (process.env.NODE_ENV !== 'test' && pkg.wafflemap) {
    // $FlowFixMe
    return require('../../node_modules/waffle-map-mesh-calculator-' +
      pkg.wafflemap.meshcalculator +
      '/lib/meshCalculator.js')
  }
  return require('waffle-map-mesh-calculator-basic')
}

export default meshCalculator()
