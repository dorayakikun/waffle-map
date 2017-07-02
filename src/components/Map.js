// @flow
import React, { PropTypes } from 'react'
import {
  Marker,
  Map as LeafletMap,
  Rectangle,
  TileLayer,
  Tooltip
} from 'react-leaflet'

import type { Bounds } from '../meshCalculator'
import type { Mesh } from '../reducers'

const initialBounds = [[35, 139], [37, 140]]

const calculateBoundsFrom = (meshes: Array<Mesh>): Bounds => {
  if (meshes.length === 0) {
    return initialBounds
  }
  let lats: Array<number> = []
  let lngs: Array<number> = []
  meshes
    .map(mesh => mesh.bounds)
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach(latLng => {
      lats.push(latLng[0])
      lngs.push(latLng[1])
    })

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)]
  ]
}

const Map = ({ meshes }: any) =>
  <LeafletMap bounds={calculateBoundsFrom(meshes)}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {meshes.map(mesh =>
      <Rectangle bounds={mesh.bounds} color="#00847e">
        <Tooltip><span>{mesh.code}</span></Tooltip>
      </Rectangle>
    )}
  </LeafletMap>

Map.propTypes = {
  meshes: PropTypes.array.isRequired
}

export default Map
