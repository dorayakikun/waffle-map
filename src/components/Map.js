// @flow
import React, { Component } from 'react';
import {
  Marker,
  Map as LeafletMap,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import { Card } from 'semantic-ui-react';
import DebugTileLayer from './DebugTileLayer';
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToTokyoIfNeeded,
  convertLatLngToWGS84IfNeeded,
  convertLatLngToMillisecIfNeeded,
} from '../domain/convertLatLng';
import meshCalculator from '../domain/calculateMesh';
import { round } from '../domain/roundPoint';

import type { LatLng, Bounds, Mesh } from '../domain/calculateMesh';

export type Props = {
  meshes: Array<Mesh>,
  datum: string,
  unit: string,
  contextmenuPosition: ?LatLng,
  isShowDebugTiles: boolean,
  isShowMeshes: boolean,
  markerPositions: Array<LatLng>,
  onContextmenu: (event: Event & { latlng: LatLng }) => void,
  onClose: () => void
}

type State = {
  center: LatLng,
  zoom: number
}

type Viewport = {
  center: ?Array<number>,
  zoom: ?number
}

const initialLeafletBounds: Array<Array<number>> = [[35, 139], [37, 140]];
const { latLngToMesh, SCALES } = meshCalculator;

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
  const lats: Array<number> = [];
  const lngs: Array<number> = [];
  meshes
    .map(mesh => mesh.bounds)
    .map(bounds => convertBoundsToWGS84IfNeeded(bounds, datum))
    .map(bounds => [bounds.leftTop, bounds.rightBottom])
    .reduce((accumrator, current) => accumrator.concat(current), [])
    .forEach(latLng => {
      lats.push(latLng.lat);
      lngs.push(latLng.lng);
    });
  return {
    lats,
    lngs,
  };
};

/**
 * Calculate a LeafletBounds from mesh, the maker position and datum.
 *
 * @param {Array<Mesh>} meshes
 * @param {Array<LatLng>} markerPositions
 * @param {string} datum
 * @returns {Array<Array<number>>} LeafletBounds
 */
const calculateLeafletBoundsFrom =
  (
    meshes: Array<Mesh>,
    markerPositions: Array<LatLng>,
    datum: string
  ): Array<Array<number>> => {
    if (meshes.length === 0 && markerPositions.length == 0) {
      return initialLeafletBounds;
    }
    const latsAndLngs = meshesToLatsAndLngs(meshes, datum);
    const lats: Array<number> = latsAndLngs.lats;
    const lngs: Array<number> = latsAndLngs.lngs;

    markerPositions
      .map(position => convertLatLngToWGS84IfNeeded(position, datum))
      .forEach(position => {
        lats.push(position.lat);
        lngs.push(position.lng);
      });

    return [
      [Math.min(...lats), Math.max(...lngs)],
      [Math.max(...lats), Math.min(...lngs)],
    ];
  };

/**
 * Get a square mesh codes from a mesh code and a redius.
 * @param {string} meshCode
 * @param {number} redius
 * @returns {Array<string>} square meshe codes
 */
const getSquareMeshCodes =
  (meshCode: string, redius: number): Array<string> => {
    const meshCodes: Array<string> = [];
    for (let i = -redius; i <= redius; i++) {
      for (let j = -redius; j <= redius; j++) {
        const code: string = meshCalculator.panMeshByOffset(meshCode, i, j);
        meshCodes.push(code);
      }
    }
    return meshCodes;
  };

/**
 * Create a mesh from code.
 * @param {string} code
 * @returns {Mesh} mesh
 */
const createMesh = (code: string): Mesh => ({
  code,
  center: meshCalculator.meshToLatLng(code),
  bounds: meshCalculator.meshToBounds(code),
});

/**
 * Get a square mesh from LatLng, zoom and redius.
 * @param {LatLng} latlng
 * @param {number} zoom
 * @param {number} redius
 * @returns {Array<Mesh>} square meshes
 */
const getSquareMeshes =
  (latlng: LatLng, zoom: number, redius: number): Array<Mesh> => {
    const scale: number = meshCalculator.getScaleWith(zoom);
    const centerMeshCode = meshCalculator.latLngToMesh(
      latlng.lat,
      latlng.lng,
      scale
    );
    const meshCodes: Array<string> = getSquareMeshCodes(centerMeshCode, redius);
    return meshCodes.map(createMesh);
  };

/**
 * Throttle listener events.
 * @param {Viewport => void} listener
 * @param {number} delay
 * @returns {Viewport => void} throttleEventListener
 */
const throttleEvents =
  (listener: Viewport => void, delay: number): (Viewport => void) => {
    let timeout: number;
    const throttledListener = (viewport: Viewport) => {
      if (timeout) { clearTimeout(timeout); }
      timeout = setTimeout(listener, delay, viewport);
    };
    return throttledListener;
  };

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
  color: string): Rectangle => (
  <Rectangle
    bounds={[bounds.leftTop, bounds.rightBottom]}
    key={index}
    color={color}
  >
    <Tooltip>
      <span>{meshCode}</span>
    </Tooltip>
  </Rectangle>
);

const createPositionDescription =
  (latLng: ?LatLng, datum: string, unit: string): string => {
    if (latLng == null) {
      throw new Error('latLng is missing.');
    }

    const a = convertLatLngToTokyoIfNeeded(latLng, datum);
    const b = convertLatLngToMillisecIfNeeded(a, unit);
    return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
  };

const createScaleDescription = (
  scale: number,
  latLng: ?LatLng,
  datum: string
): string => {
  if (latLng === undefined || latLng === null) {
    throw new Error('Unexpected exception occured. Missing latlang.');
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${latLngToMesh(lat, lng, scale)}`;
};
const createScaleCardContents = (latLng: ?LatLng, datum: string) =>
  SCALES.map((scale, idx) => (
    <Card.Content
      description={createScaleDescription(scale, latLng, datum)}
      key={idx}
    />
  ));

const CoordPopup = (props: Props) => (
  <Popup
    position={props.contextmenuPosition}
    onClose={props.onClose}
  >
    <Card>
      <Card.Content header="Scales" />
      <Card.Content
        description={createPositionDescription(
          props.contextmenuPosition,
          props.datum,
          props.unit
        )}
      />
      {createScaleCardContents(
        props.contextmenuPosition,
        props.datum
      )}
    </Card>
  </Popup>
);

class Map extends Component<Props, State> {
  state = {
    center: { lat: 36.01357, lng: 139.49891 },
    zoom: 6,
  }

  updateViewport = (viewport: Viewport) => {
    const { center, zoom } = viewport;
    if (!center) {
      return;
    }
    if (zoom === undefined || zoom === null) {
      return;
    }
    this.setState({ center: { lat: center[0], lng: center[1] } });
    this.setState({ zoom: zoom });
  }

  createMeshRects = (meshes: Array<Mesh>, color: string = '#00847e') =>
    meshes.map((mesh, index) => {
      const bounds =
        convertBoundsToWGS84IfNeeded(mesh.bounds, this.props.datum);
      return createMeshRect(bounds, index, mesh.code, color);
    })

  createMarkers = (positions: Array<LatLng>, datum: string) =>
    positions
      .map(position => convertLatLngToWGS84IfNeeded(position, datum))
      .map((position, idx) => <Marker key={idx} position={position} />)

  render() {
    const { meshes, markerPositions, datum } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <LeafletMap
          bounds={calculateLeafletBoundsFrom(meshes, markerPositions, datum)}
          maxZoom={18}
          minZoom={7}
          onContextmenu={this.props.onContextmenu}
          onViewportChanged={throttleEvents(this.updateViewport, 100)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.isShowDebugTiles && <DebugTileLayer />}
          {this.props.isShowMeshes &&
            this.createMeshRects(getSquareMeshes(this.state.center, this.state.zoom, 10), '#9C27B0')}
          {this.createMeshRects(this.props.meshes)}
          {this.createMarkers(this.props.markerPositions, this.props.datum)}
          {this.props.contextmenuPosition != null && <CoordPopup {...this.props} />}
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
