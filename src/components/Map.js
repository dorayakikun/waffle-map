// @flow
import React, { PropTypes } from 'react'
import {
  Marker,
  Map as LeafletMap,
  Rectangle,
  TileLayer,
  Tooltip
} from 'react-leaflet'

import type { Bounds } from '../MeshCalculator'
import type { Mesh } from '../reducers'

const initialLeafletBounds: Array<Array<number>> = [[35, 139], [37, 140]]

const calculateLeafletBoundsFrom = (
  meshes: Array<Mesh>
): Array<Array<number>> => {
  if (meshes.length === 0) {
    return initialLeafletBounds
  }
  let lats: Array<number> = []
  let lngs: Array<number> = []
  meshes
    .map(mesh => mesh.bounds)
    .map(bounds => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach(latLng => {
      lats.push(latLng.lat)
      lngs.push(latLng.lng)
    })

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)]
  ]
}

const Map = ({ meshes }: any) =>
  <LeafletMap bounds={calculateLeafletBoundsFrom(meshes)}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {meshes.map(mesh =>
      <Rectangle
        bounds={[
          [mesh.bounds.leftTop.lat, mesh.bounds.leftTop.lng],
          [mesh.bounds.rightBottom.lat, mesh.bounds.rightBottom.lng]
        ]}
        color="#00847e"
      >
        <Tooltip><span>{mesh.code}</span></Tooltip>
      </Rectangle>
    )}
  </LeafletMap>

Map.propTypes = {
  meshes: PropTypes.array.isRequired
}

export default Map
