// @flow
import React, { PropTypes } from 'react'
import {
  Marker,
  Map as LeafletMap,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip
} from 'react-leaflet'
import { Card } from 'semantic-ui-react'
import { updateContextmenuPosition } from '../actions/AppActions'
import { SCALES, latLngToMesh } from 'waffle-map-mesh-calculator-basic'

import type { Mesh } from '../reducers'
import type { LatLng } from 'waffle-map-mesh-calculator-basic'

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

const createCardContent = ({ lat, lng }: LatLng): any => {
  return SCALES.map(scale => {
    return (
      <Card.Content
        description={`scale${scale}: ${latLngToMesh(lat, lng, scale)}`}
      />
    )
  })
}

const Map = ({ meshes, map, dispatch }: any) =>
  <div style={{ width: '100%', height: '100%' }}>
    <LeafletMap
      bounds={calculateLeafletBoundsFrom(meshes)}
      onContextmenu={(e: Event & { latlng: LatLng }) => {
        console.log(e)
        dispatch(updateContextmenuPosition(e.latlng))
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {meshes.map(mesh =>
        <Rectangle
          bounds={[mesh.bounds.leftTop, mesh.bounds.rightBottom]}
          color="#00847e"
        >
          <Tooltip><span>{mesh.code}</span></Tooltip>
        </Rectangle>
      )}
      {map.contextmenuPosition != null &&
        <Popup
          position={map.contextmenuPosition}
          onClose={() => {
            dispatch(updateContextmenuPosition(null))
          }}
        >
          <Card>
            <Card.Content header="Scales" />
            <Card.Content
              description={`position: ${Math.ceil(
                map.contextmenuPosition.lat * 100
              ) / 100}, ${Math.ceil(map.contextmenuPosition.lng * 100) / 100}`}
            />
            {createCardContent(map.contextmenuPosition)}
          </Card>
        </Popup>}
    </LeafletMap>
  </div>

Map.propTypes = {
  meshes: PropTypes.array.isRequired
}

export default Map
