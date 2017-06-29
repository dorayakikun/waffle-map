// @flow
import React, { PropTypes } from 'react'
import { Map as LeafletMap, Rectangle, TileLayer } from 'react-leaflet'

import type { Bounds } from '../meshCalculator'

const initialBounds = [[35, 139], [37, 140]]

const calculateBoundsFrom = (boundsArray: Array<Bounds>): Bounds => {
  if (boundsArray.length === 0) {
    return initialBounds
  }
  let lats: Array<number> = []
  let lngs: Array<number> = []
  boundsArray
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

const Map = ({ boundsArray }: any) =>
  <LeafletMap bounds={calculateBoundsFrom(boundsArray)}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {boundsArray.map(bounds => <Rectangle bounds={bounds} color="#00847e" />)}
  </LeafletMap>

Map.propTypes = {
  boundsArray: PropTypes.array.isRequired
}

export default Map
