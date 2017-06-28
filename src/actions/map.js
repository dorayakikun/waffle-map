// @flow

import type { Bounds } from '../meshCalculator'
import type { State } from '../reducers/map'

export const RENDER_RECTANGLE = 'RENDER_RECTANGLE'

export type MapAction = {
  type: typeof RENDER_RECTANGLE,
  payload: {
    meshes: string
  }
}

export const renderRectangle = (meshes: string): MapAction => ({
  type: RENDER_RECTANGLE,
  payload: { meshes }
})
