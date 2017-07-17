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
  SCALES: *
}

const meshCalculator: () => MeshCalculator = () => {
  const packageConfigPath = path.resolve(process.cwd(), 'package.json')
  if (process.env.NODE_ENV !== 'test' && pkg.wafflemap) {
    const moduleName = `./node_modules/waffle-map-mesh-calculator-${pkg
      .wafflemap.meshcalculator}/lib/meshCalculator.js`
    // $FlowFixMe
    return (__webpack_require__(moduleName): any)
  }
  return require('waffle-map-mesh-calculator-basic')
}

export default meshCalculator()
