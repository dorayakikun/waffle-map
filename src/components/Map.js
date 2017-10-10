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
import {
  convertBoundsToWGS84Datum,
  convertLatLngToTokyoDatum
} from '../domain/convertLatLng'
import meshCalculator from '../domain/calculateMesh'
import { round } from '../domain/roundPoint'

import type { LatLng, Mesh } from '../domain/calculateMesh'

export type MapProps = {
  meshes: Array<Mesh>,
  datum: string,
  contextmenuPosition: ?LatLng,
  isShowDebugTiles: boolean,
  markerPositions: Array<LatLng>,
  onContextmenu: (event: Event & { latlng: LatLng }) => void,
  onClose: () => void
}

const initialLeafletBounds: Array<Array<number>> = [[35, 139], [37, 140]]
const { latLngToMesh, SCALES } = meshCalculator

const applyDatumToBounds = (bounds: Bounds, datum: string): LatLng => {
  if (datum == 'Tokyo') {
    return convertBoundsToWGS84Datum(bounds)
  }
  return bounds
}

const calculateLeafletBoundsFrom = (
  meshes: Array<Mesh>,
  markerPositions: Array<LatLng>,
  datum: string
): Array<Array<number>> => {
  if (meshes.length === 0 && markerPositions.length == 0) {
    return initialLeafletBounds
  }
  let lats: Array<number> = []
  let lngs: Array<number> = []
  meshes
    .map(mesh => mesh.bounds)
    .map(bounds => applyDatumToBounds(bounds, datum))
    .map(bounds => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach(latLng => {
      lats.push(latLng.lat)
      lngs.push(latLng.lng)
    })

  markerPositions.forEach(position => {
    lats.push(position.lat)
    lngs.push(position.lng)
  })

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)]
  ]
}

const createCardDescription = (latLng: LatLng, datum: string): string => {
  const convertedLatLng = convertLatLngToTokyoDatum(latLng, datum)
  return `position: ${round(convertedLatLng.lat, 5)}, ${round(
    convertedLatLng.lng,
    5
  )}`
}

const createCardContent = ({ lat, lng }: LatLng) =>
  SCALES.map((scale, idx) => (
    <Card.Content
      description={`scale${scale}: ${latLngToMesh(lat, lng, scale)}`}
      key={idx}
    />
  ))

const Map = (props: MapProps) => (
  <div style={{ width: '100%', height: '100%' }}>
    <LeafletMap
      bounds={calculateLeafletBoundsFrom(
        props.meshes,
        props.markerPositions,
        props.datum
      )}
      maxZoom={19}
      minZoom={6}
      onContextmenu={props.onContextmenu}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      {props.isShowDebugTiles && <DebugTileLayer />}

      {props.meshes.map((mesh, index) => {
        const bounds = applyDatumToBounds(mesh.bounds, props.datum)
        return (
          <Rectangle
            bounds={[bounds.leftTop, bounds.rightBottom]}
            key={index}
            color="#00847e"
          >
            <Tooltip>
              <span>{mesh.code}</span>
            </Tooltip>
          </Rectangle>
        )
      })}

      {props.markerPositions.map((position, idx) => (
        <Marker key={idx} position={position} />
      ))}

      {props.contextmenuPosition != null && (
        <Popup position={props.contextmenuPosition} onClose={props.onClose}>
          <Card>
            <Card.Content header="Scales" />
            <Card.Content
              description={createCardDescription(
                props.contextmenuPosition,
                props.datum
              )}
            />
            {createCardContent(
              convertLatLngToTokyoDatum(props.contextmenuPosition)
            )}
          </Card>
        </Popup>
      )}
    </LeafletMap>
  </div>
)

export default Map
