declare const require: any

export interface LatLng {
  lat: number
  lng: number
}

export interface Bounds {
  leftTop: LatLng
  rightBottom: LatLng
}

export interface Mesh {
  code: string
  center: LatLng
  bounds: Bounds
}

interface MeshCalculator {
  SCALES: number[]
  toCenterLatLng: (meshCode: string) => LatLng
  toBounds: (meshCode: string) => Bounds
  toMeshCode: (lat: number, lng: number, scale: number) => string
  scaleFrom(zoom: number): number
  offset(meshCode: string, x: number, y: number): string
}

const meshCalculator: () => MeshCalculator = () => {
  if (process.env.npm_package_wafflemap_meshcalculator) {
    return require('../../node_modules/waffle-map-mesh-calculator-' +
      process.env.npm_package_wafflemap_meshcalculator +
      '/lib/meshCalculator.js')
  }
  return require('waffle-map-mesh-calculator-basic')
}

export default meshCalculator()
