import type { Mesh } from "../domain/calculateMesh.ts";

export const TILE_SIZE = 256;
export const MIN_TILE_ZOOM = 5;
export const MAX_TILE_ZOOM = 18;

export type MercatorView = {
  zoom: number;
  centerWorldX: number;
  centerWorldY: number;
  originWorldX: number;
  originWorldY: number;
  width: number;
  height: number;
};

export type TileCoord = {
  z: number;
  x: number;
  y: number;
  drawX: number;
  drawY: number;
};

const MAX_LAT = 85.05112878;

export function latLngToWorldPx(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const clampedLat = Math.max(-MAX_LAT, Math.min(MAX_LAT, lat));
  const scale = TILE_SIZE * 2 ** zoom;
  const x = ((lng + 180) / 360) * scale;
  const sinLat = Math.sin((clampedLat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
  return { x, y };
}

export function computeMercatorView(meshes: Mesh[], width: number, height: number): MercatorView {
  if (meshes.length === 0) {
    const zoom = 6;
    const center = latLngToWorldPx(36.2, 138.2, zoom);
    return {
      zoom,
      centerWorldX: center.x,
      centerWorldY: center.y,
      originWorldX: center.x - width / 2,
      originWorldY: center.y - height / 2,
      width,
      height,
    };
  }

  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const mesh of meshes) {
    for (const pt of [mesh.bounds.leftTop, mesh.bounds.rightBottom]) {
      if (pt.lat < minLat) minLat = pt.lat;
      if (pt.lat > maxLat) maxLat = pt.lat;
      if (pt.lng < minLng) minLng = pt.lng;
      if (pt.lng > maxLng) maxLng = pt.lng;
    }
  }

  const usableW = width * 0.62;
  const usableH = height * 0.62;

  let chosenZoom = MIN_TILE_ZOOM;
  for (let z = MAX_TILE_ZOOM; z >= MIN_TILE_ZOOM; z--) {
    const topLeft = latLngToWorldPx(maxLat, minLng, z);
    const bottomRight = latLngToWorldPx(minLat, maxLng, z);
    const spanX = Math.abs(bottomRight.x - topLeft.x);
    const spanY = Math.abs(bottomRight.y - topLeft.y);
    if (spanX <= usableW && spanY <= usableH) {
      chosenZoom = z;
      break;
    }
  }

  const topLeft = latLngToWorldPx(maxLat, minLng, chosenZoom);
  const bottomRight = latLngToWorldPx(minLat, maxLng, chosenZoom);
  const centerWorldX = (topLeft.x + bottomRight.x) / 2;
  const centerWorldY = (topLeft.y + bottomRight.y) / 2;

  return {
    zoom: chosenZoom,
    centerWorldX,
    centerWorldY,
    originWorldX: centerWorldX - width / 2,
    originWorldY: centerWorldY - height / 2,
    width,
    height,
  };
}

export function projectToViewport(
  lat: number,
  lng: number,
  view: MercatorView,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  const world = latLngToWorldPx(lat, lng, view.zoom);
  return {
    x: offsetX + (world.x - view.originWorldX),
    y: offsetY + (world.y - view.originWorldY),
  };
}

export function getVisibleTiles(view: MercatorView, offsetX: number, offsetY: number): TileCoord[] {
  const maxIndex = 2 ** view.zoom - 1;
  const minTileX = Math.max(0, Math.floor(view.originWorldX / TILE_SIZE));
  const maxTileX = Math.min(maxIndex, Math.floor((view.originWorldX + view.width) / TILE_SIZE));
  const minTileY = Math.max(0, Math.floor(view.originWorldY / TILE_SIZE));
  const maxTileY = Math.min(maxIndex, Math.floor((view.originWorldY + view.height) / TILE_SIZE));

  const tiles: TileCoord[] = [];
  for (let ty = minTileY; ty <= maxTileY; ty++) {
    for (let tx = minTileX; tx <= maxTileX; tx++) {
      tiles.push({
        z: view.zoom,
        x: tx,
        y: ty,
        drawX: offsetX + tx * TILE_SIZE - view.originWorldX,
        drawY: offsetY + ty * TILE_SIZE - view.originWorldY,
      });
    }
  }
  return tiles;
}
