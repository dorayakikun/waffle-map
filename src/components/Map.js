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

import type { LatLng, Bounds, Mesh } from '../domain/calculateMesh'

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

/**
 * Apply datum to bounds.
 *
 * @param {Bounds} bounds bounds
 * @param {string} datum datum(tokyo/wgs84)
 * @returns {Bounds} bounds
 */
const applyDatumToBounds = (bounds: Bounds, datum: string): Bounds => {
  if (datum == 'Tokyo') {
    return convertBoundsToWGS84Datum(bounds)
  }
  return bounds
}

/**
 * Make the set of meshes a set of latitude and longitude.
 * @param {Array<Mesh>} meshes
 * @param {string} datum
 * @returns {{ lats: Array<number>, lngs: Array<number> }} lats and lngs
 */
const meshesToLatsAndLngs = (
  meshes: Array<Mesh>,
  datum: string
): { lats: Array<number>, lngs: Array<number> } => {
  const lats: Array<number> = []
  const lngs: Array<number> = []
  meshes
    .map(mesh => mesh.bounds)
    .map(bounds => applyDatumToBounds(bounds, datum))
    .map(bounds => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach(latLng => {
      lats.push(latLng.lat)
      lngs.push(latLng.lng)
    })
  return {
    lats,
    lngs
  }
}

/**
 * Calculate a LeafletBounds from mesh, the maker position and datum.
 *
 * @param {Array<Mesh>} meshes
 * @param {Array<LatLng>} markerPositions
 * @param {string} datum
 * @returns {Array<Array<number>>} LeafletBounds
 */
const calculateLeafletBoundsFrom = (
  meshes: Array<Mesh>,
  markerPositions: Array<LatLng>,
  datum: string
): Array<Array<number>> => {
  if (meshes.length === 0 && markerPositions.length == 0) {
    return initialLeafletBounds
  }
  const latsAndLngs = meshesToLatsAndLngs(meshes, datum)
  const lats: Array<number> = latsAndLngs.lats
  const lngs: Array<number> = latsAndLngs.lngs

  markerPositions.forEach(position => {
    lats.push(position.lat)
    lngs.push(position.lng)
  })

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)]
  ]
}

/**
 * Create a card description from LatLng and datum.
 *
 * @param {LatLng} latLng
 * @param {string} datum
 * @returns {string} card description
 */
const createCardDescription = (latLng: LatLng, datum: string): string => {
  const convertedLatLng =
    datum === 'tokyo' ? convertLatLngToTokyoDatum(latLng) : latLng
  return `position: ${round(convertedLatLng.lat, 5)}, ${round(
    convertedLatLng.lng,
    5
  )}`
}

/**
 * Create a card content from LatLng.
 * @param {LatLng} param0 LatLng
 * @returns card content
 */
const createCardContent = (latLng: ?LatLng, datum: string): Card.Content => {
  if (latLng === undefined || latLng === null) {
    throw new Error('Unexpected exception occured. Missing latlang.')
  }
  const { lat, lng } =
    datum === 'tokyo' ? convertLatLngToTokyoDatum(latLng) : latLng
  return SCALES.map((scale, idx) => (
    <Card.Content
      description={`scale${scale}: ${latLngToMesh(lat, lng, scale)}`}
      key={idx}
    />
  ))
}
/**
 * Get a square mesh from LatLng, zoom and redius.
 * @param {LatLng} latlng
 * @param {number} zoom
 * @param {number} redius
 * @returns {Array<Mesh>} square meshes
 */
const getSquareMeshes = (
  latlng: LatLng,
  zoom: number,
  redius: number
): Array<Mesh> => {
  const scale: number = meshCalculator.getScaleWith(zoom)

  return [
    '5339',
    '5340',
    '5338',
    '5438',
    '5439',
    '5440',
    '5238',
    '5239',
    '5240'
  ].map(code => {
    return {
      code,
      center: meshCalculator.meshToLatLng(code),
      bounds: meshCalculator.meshToBounds(code)
    }
  })
}

/**
 * Create a mesh rectangle.
 * @param {Bounds} bounds
 * @param {number} index
 * @param {string} meshCode
 * @param {string} color
 * @returns {Rectangle} mesh rectangle
 */
const createMeshRect = (
  bounds: Bounds,
  index: number,
  meshCode: string,
  color: string = '#00847e'
): Rectangle => (
  <Rectangle
    bounds={[bounds.leftTop, bounds.rightBottom]}
    key={index}
    color={color}
  >
    <Tooltip>
      <span>{meshCode}</span>
    </Tooltip>
  </Rectangle>
)

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

      {getSquareMeshes({ lat: 0, lng: 0 }, 6, 10).map((mesh, index) => {
        const bounds: Bounds = applyDatumToBounds(mesh.bounds, props.datum)
        return createMeshRect(bounds, index, mesh.code, '#9C27B0')
      })}

      {props.meshes.map((mesh, index) => {
        const bounds = applyDatumToBounds(mesh.bounds, props.datum)
        return createMeshRect(bounds, index, mesh.code)
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
            {createCardContent(props.contextmenuPosition, props.datum)}
          </Card>
        </Popup>
      )}
    </LeafletMap>
  </div>
)

export default Map
