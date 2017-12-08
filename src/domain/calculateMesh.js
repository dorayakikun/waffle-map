// @flow
import path from 'path'
import pkg from '../../package.json'

export type LatLng = {
  lat: number,
  lng: number
}

export type Bounds = {
  leftTop: LatLng,
  rightBottom: LatLng
}

export type Mesh = {
  code: string,
  center: LatLng,
  bounds: Bounds
}

type MeshCalculator = {
  meshToLatLng: (mesh: string) => LatLng,
  meshToBounds: (mesh: string) => Bounds,
  latLngToMesh: (lat: number, lng: number, scale: number) => string,
  getScaleWith(zoom: number): number,
  SCALES: *
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
