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
import DebugTileLayer from './DebugTileLayer'
import meshCalculator from '../domain/calculateMesh'
import { round } from '../domain/roundPoint'

import type { LatLng, Mesh } from '../domain/calculateMesh'

export type MapProps = {
  meshes: Array<Mesh>,
  contextmenuPosition: ?LatLng,
  isShowDebugTiles: boolean,
  markerPositions: Array<LatLng>,
  onContextmenu: (event: Event & { latlng: LatLng }) => void,
  onClose: () => void
}

const initialLeafletBounds: Array<Array<number>> = [[35, 139], [37, 140]]
const { latLngToMesh, SCALES } = meshCalculator
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

const createCardContent = ({ lat, lng }: LatLng) =>
  SCALES.map((scale, idx) =>
    <Card.Content
      description={`scale${scale}: ${latLngToMesh(lat, lng, scale)}`}
      key={idx}
    />
  )

const Map = (props: MapProps) =>
  <div style={{ width: '100%', height: '100%' }}>
    <LeafletMap
      bounds={calculateLeafletBoundsFrom(props.meshes)}
      maxZoom={19}
      minZoom={6}
      onContextmenu={props.onContextmenu}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      {props.isShowDebugTiles && <DebugTileLayer />}

      {props.meshes.map((mesh, index) =>
        <Rectangle
          bounds={[mesh.bounds.leftTop, mesh.bounds.rightBottom]}
          key={index}
          color="#00847e"
        >
          <Tooltip>
            <span>
              {mesh.code}
            </span>
          </Tooltip>
        </Rectangle>
      )}

      {props.markerPositions.map((position, idx) =>
        <Marker key={idx} position={position} />
      )}

      {props.contextmenuPosition != null &&
        <Popup position={props.contextmenuPosition} onClose={props.onClose}>
          <Card>
            <Card.Content header="Scales" />
            <Card.Content
              description={`position: ${round(
                props.contextmenuPosition.lat,
                5
              )}, ${round(props.contextmenuPosition.lng, 5)}`}
            />
            {createCardContent(props.contextmenuPosition)}
          </Card>
        </Popup>}
    </LeafletMap>
  </div>

export default Map
