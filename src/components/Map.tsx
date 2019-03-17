import * as React from "react";
import {
  Map as LeafletMap,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip
} from "react-leaflet";
import { Card } from "semantic-ui-react";
import meshCalculator, { Bounds, LatLng, Mesh } from "../domain/calculateMesh";
import {
  convertBoundsToWGS84IfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
  convertLatLngToWGS84IfNeeded
} from "../domain/convertLatLng";
import { round } from "../domain/roundPoint";
import { DebugTileLayer } from "./DebugTileLayer";

export type Props = {
  meshes: Mesh[];
  datum: string;
  unit: string;
  contextmenuPosition?: LatLng;
  isShowDebugTiles: boolean;
  isShowMeshes: boolean;
  markerPositions: LatLng[];
  onContextmenu: (event: Event & { latlng: LatLng }) => void;
  onClose: () => void;
};

type State = {
  center: LatLng;
  zoom: number;
};

type Viewport = {
  center?: number[];
  zoom?: number;
};

const initialLeafletBounds: [number, number][] = [[35, 139], [37, 140]];
const { toMeshCode, SCALES } = meshCalculator;

function meshesToLatsAndLngs(
  meshes: Mesh[],
  datum: string
): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  const lngs: number[] = [];
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
    lngs
  };
}

function calculateLeafletBoundsFrom(
  meshes: Mesh[],
  markerPositions: LatLng[],
  datum: string
): [number, number][] {
  if (meshes.length === 0 && markerPositions.length === 0) {
    return initialLeafletBounds;
  }
  const latsAndLngs = meshesToLatsAndLngs(meshes, datum);
  const lats: number[] = latsAndLngs.lats;
  const lngs: number[] = latsAndLngs.lngs;

  markerPositions
    .map(position => convertLatLngToWGS84IfNeeded(position, datum))
    .forEach(position => {
      lats.push(position.lat);
      lngs.push(position.lng);
    });

  return [
    [Math.min(...lats), Math.max(...lngs)],
    [Math.max(...lats), Math.min(...lngs)]
  ];
}

function getSquareMeshCodes(meshCode: string, redius: number): string[] {
  const meshCodes: string[] = [];
  for (let i = -redius; i <= redius; i++) {
    for (let j = -redius; j <= redius; j++) {
      const code: string = meshCalculator.offset(meshCode, i, j);
      meshCodes.push(code);
    }
  }
  return meshCodes;
}

function createMesh(code: string): Mesh {
  return {
    bounds: meshCalculator.toBounds(code),
    center: meshCalculator.toCenterLatLng(code),
    code
  };
}

function getSquareMeshes(latlng: LatLng, zoom: number, redius: number): Mesh[] {
  const scale: number = meshCalculator.scaleFrom(zoom);
  const centerMeshCode = meshCalculator.toMeshCode(
    latlng.lat,
    latlng.lng,
    scale
  );
  const meshCodes: string[] = getSquareMeshCodes(centerMeshCode, redius);
  return meshCodes.map(createMesh);
}

function throttleEvents(
  listener: (viewport: Viewport) => void,
  delay: number
): (viewport: Viewport) => void {
  let timeout: number;
  const throttledListener = (viewport: Viewport) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(listener, delay, viewport);
  };
  return throttledListener;
}

function createMeshRect(
  bounds: Bounds,
  index: number,
  meshCode: string,
  color: string
): React.ReactElement {
  return (
    <Rectangle
      bounds={[
        [bounds.leftTop.lat, bounds.leftTop.lng],
        [bounds.rightBottom.lat, bounds.rightBottom.lng]
      ]}
      key={index}
      color={color}
    >
      <Tooltip>
        <span>{meshCode}</span>
      </Tooltip>
    </Rectangle>
  );
}

function createPositionDescription(
  datum: string,
  unit: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("latLng is missing.");
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

function createScaleDescription(
  scale: number,
  datum: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${toMeshCode(lat, lng, scale)}`;
}
function createScaleCardContents(
  datum: string,
  latLng?: LatLng
): React.ReactElement[] {
  return SCALES.map((scale, idx) => (
    <Card.Content
      description={createScaleDescription(scale, datum, latLng)}
      key={idx}
    />
  ));
}

function CoordPopup(props: Props): React.ReactElement {
  return (
    <Popup position={props.contextmenuPosition} onClose={props.onClose}>
      <Card>
        <Card.Content header="Scales" />
        <Card.Content
          description={createPositionDescription(
            props.datum,
            props.unit,
            props.contextmenuPosition
          )}
        />
        {createScaleCardContents(props.datum, props.contextmenuPosition)}
      </Card>
    </Popup>
  );
}
export class Map extends React.Component<Props, State> {
  state = {
    center: { lat: 36.01357, lng: 139.49891 },
    zoom: 6
  };

  constructor(props: Props) {
    super(props);
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateViewport(viewport: Viewport) {
    const { center, zoom } = viewport;
    if (!center) {
      return;
    }
    if (zoom === undefined || zoom === null) {
      return;
    }
    this.setState({ center: { lat: center[0], lng: center[1] } });
    this.setState({ zoom });
  }

  createMeshRects(
    meshes: Mesh[],
    color: string = "#00847e"
  ): React.ReactElement[] {
    return meshes.map((mesh, index) => {
      const bounds = convertBoundsToWGS84IfNeeded(
        mesh.bounds,
        this.props.datum
      );
      return createMeshRect(bounds, index, mesh.code, color);
    });
  }

  createMarkers(positions: LatLng[], datum: string): React.ReactElement[] {
    return positions
      .map(position => convertLatLngToWGS84IfNeeded(position, datum))
      .map((position, idx) => <Marker key={idx} position={position} />);
  }

  render() {
    const { meshes, markerPositions, datum } = this.props;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <LeafletMap
          bounds={calculateLeafletBoundsFrom(meshes, markerPositions, datum)}
          maxZoom={18}
          minZoom={7}
          onContextmenu={this.props.onContextmenu}
          onViewportChanged={throttleEvents(this.updateViewport, 100)}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.isShowDebugTiles && <DebugTileLayer />}
          {this.props.isShowMeshes &&
            this.createMeshRects(
              getSquareMeshes(this.state.center, this.state.zoom, 10),
              "#9C27B0"
            )}
          {this.createMeshRects(this.props.meshes)}
          {this.createMarkers(this.props.markerPositions, this.props.datum)}
          {this.props.contextmenuPosition != null && (
            <CoordPopup {...this.props} />
          )}
        </LeafletMap>
      </div>
    );
  }
}
