// @flow
import type { LatLon, Bounds } from '../meshCalculator'

export type MapState = {
  centerCoords: Array<LatLon>,
  boundsArray: Array<Bounds>
}
