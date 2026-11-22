import type { Mesh } from "../domain/calculateMesh.ts";
import { round } from "../domain/roundPoint.ts";
import { JAPAN_OUTLINE_POLYGONS, type PolyRing } from "./japanOutline.ts";
import {
  computeMercatorView,
  type MercatorView,
  projectToViewport,
  TILE_SIZE,
} from "./mercator.ts";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const SIDEBAR_WIDTH = 344;
export const MAP_RECT = {
  x: SIDEBAR_WIDTH,
  y: 0,
  width: OG_WIDTH - SIDEBAR_WIDTH,
  height: OG_HEIGHT,
} as const;

export type EmbeddedTile = {
  drawX: number;
  drawY: number;
  dataUri: string;
};

export type OgRenderInput = {
  meshcodes: string[];
  meshes: Mesh[];
  displayUrl?: string;
  tiles?: EmbeddedTile[];
  attribution?: string;
  view?: MercatorView;
};

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function ringToMercatorPath(ring: PolyRing, view: MercatorView): string {
  return ring
    .map(([lat, lng], idx) => {
      const pt = projectToViewport(lat, lng, view, MAP_RECT.x, MAP_RECT.y);
      const cmd = idx === 0 ? "M" : "L";
      return `${cmd}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");
}

function renderFallbackVectorMap(view: MercatorView): string {
  const paths = JAPAN_OUTLINE_POLYGONS.map(
    (ring) =>
      `<path d="${ringToMercatorPath(ring, view)}" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>`,
  ).join("\n");
  return `<rect x="${MAP_RECT.x}" y="${MAP_RECT.y}" width="${MAP_RECT.width}" height="${MAP_RECT.height}" fill="#F1F5F9"/>\n${paths}`;
}

function renderTileImages(tiles: EmbeddedTile[]): string {
  return tiles
    .map(
      (t) =>
        `<image href="${t.dataUri}" x="${t.drawX.toFixed(1)}" y="${t.drawY.toFixed(1)}" width="${TILE_SIZE}" height="${TILE_SIZE}" preserveAspectRatio="none"/>`,
    )
    .join("\n");
}

function renderMeshRectangles(meshes: Mesh[], view: MercatorView): string {
  return meshes
    .map((mesh) => {
      const topLat = Math.max(mesh.bounds.leftTop.lat, mesh.bounds.rightBottom.lat);
      const bottomLat = Math.min(mesh.bounds.leftTop.lat, mesh.bounds.rightBottom.lat);
      const leftLng = Math.min(mesh.bounds.leftTop.lng, mesh.bounds.rightBottom.lng);
      const rightLng = Math.max(mesh.bounds.leftTop.lng, mesh.bounds.rightBottom.lng);

      const p1 = projectToViewport(topLat, leftLng, view, MAP_RECT.x, MAP_RECT.y);
      const p2 = projectToViewport(bottomLat, rightLng, view, MAP_RECT.x, MAP_RECT.y);
      const rectX = Math.min(p1.x, p2.x);
      const rectY = Math.min(p1.y, p2.y);
      const rectW = Math.max(Math.abs(p2.x - p1.x), 4);
      const rectH = Math.max(Math.abs(p2.y - p1.y), 4);

      const cx = rectX + rectW / 2;
      const cy = rectY + rectH / 2;
      const safeCode = escapeXml(mesh.code);

      const maxFontByWidth = (rectW * 0.84) / Math.max(mesh.code.length * 0.62, 1);
      const maxFontByHeight = rectH * 0.34;
      const fontSize = Math.min(28, Math.max(12, Math.min(maxFontByWidth, maxFontByHeight)));
      const showLabel = rectW >= 54 && rectH >= 24;

      const labelSvg = showLabel
        ? `<text x="${cx.toFixed(1)}" y="${(cy + fontSize * 0.34).toFixed(1)}" text-anchor="middle" fill="#4338CA" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill" font-family="DM Mono" font-size="${fontSize.toFixed(1)}">${safeCode}</text>`
        : "";

      return [
        `<rect x="${rectX.toFixed(1)}" y="${rectY.toFixed(1)}" width="${rectW.toFixed(1)}" height="${rectH.toFixed(1)}" fill="#4F46E5" fill-opacity="0.2" stroke="#4F46E5" stroke-width="2.75"/>`,
        labelSvg,
      ].join("\n");
    })
    .join("\n");
}

export function renderOgSvg(input: OgRenderInput): string {
  const { meshcodes, meshes, tiles = [], attribution } = input;
  const view = input.view ?? computeMercatorView(meshes, MAP_RECT.width, MAP_RECT.height);

  const mapBackground = tiles.length > 0 ? renderTileImages(tiles) : renderFallbackVectorMap(view);

  const meshCount = meshes.length;
  const countBadge =
    meshCount > 0
      ? `<rect x="278" y="138" width="38" height="22" rx="11" fill="#4F46E5"/>
         <text x="297" y="153" text-anchor="middle" fill="#FFFFFF" font-family="DM Mono" font-size="12">${meshCount}</text>`
      : "";

  const visibleCodes = meshcodes.slice(0, 6);
  const extraCount = Math.max(0, meshcodes.length - visibleCodes.length);

  const codeRowsSvg =
    visibleCodes.length > 0
      ? visibleCodes
          .map((code, i) => {
            const y = 178 + i * 42;
            return `
              <rect x="24" y="${y}" width="296" height="34" rx="10" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="1"/>
              <circle cx="42" cy="${y + 17}" r="4" fill="#4F46E5"/>
              <text x="56" y="${y + 22}" fill="#111827" font-family="DM Mono" font-size="14">${escapeXml(code)}</text>
            `;
          })
          .join("\n")
      : `
          <rect x="24" y="178" width="296" height="96" rx="12" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="1"/>
          <text x="40" y="208" fill="#111827" font-family="Poppins" font-weight="700" font-size="14">Japanese Mesh Code Studio</text>
          <text x="40" y="232" fill="#4B5563" font-family="Poppins" font-size="12">Visualize &amp; share Japanese mesh</text>
          <text x="40" y="252" fill="#4B5563" font-family="Poppins" font-size="12">codes directly via URL.</text>
        `;

  const extraSvg =
    extraCount > 0
      ? `<text x="28" y="${178 + visibleCodes.length * 42 + 16}" fill="#6B7280" font-family="DM Mono" font-size="12">+${extraCount} more mesh codes</text>`
      : "";

  let centerSummary = "36.2°N, 138.2°E";
  if (meshes.length > 0) {
    const avgLat = meshes.reduce((sum, m) => sum + m.center.lat, 0) / meshes.length;
    const avgLng = meshes.reduce((sum, m) => sum + m.center.lng, 0) / meshes.length;
    centerSummary = `${round(avgLat, 4)}°N, ${round(avgLng, 4)}°E`;
  }

  const rawUrl = input.displayUrl ?? "waffle-map.netlify.app";
  const displayUrl = rawUrl.length > 34 ? `${rawUrl.slice(0, 31)}...` : rawUrl;

  const attributionPill = attribution
    ? `
      <rect x="${OG_WIDTH - 344}" y="${OG_HEIGHT - 30}" width="332" height="22" rx="8" fill="#FFFFFF" fill-opacity="0.88" stroke="#E5E7EB" stroke-width="1"/>
      <text x="${OG_WIDTH - 178}" y="${OG_HEIGHT - 15}" text-anchor="middle" fill="#374151" font-family="Poppins" font-size="10">${escapeXml(attribution)}</text>
    `
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </linearGradient>
    <clipPath id="map-clip">
      <rect x="${MAP_RECT.x}" y="${MAP_RECT.y}" width="${MAP_RECT.width}" height="${MAP_RECT.height}"/>
    </clipPath>
  </defs>

  <!-- Right Full-Bleed Map Viewport -->
  <g clip-path="url(#map-clip)">
    ${mapBackground}
    ${renderMeshRectangles(meshes, view)}
  </g>

  <!-- Floating HUD Pill (bottom-left of map, matching app UI) -->
  <rect x="${MAP_RECT.x + 16}" y="${OG_HEIGHT - 42}" width="182" height="28" rx="14" fill="#FFFFFF" fill-opacity="0.9" stroke="#E5E7EB" stroke-width="1"/>
  <text x="${MAP_RECT.x + 32}" y="${OG_HEIGHT - 24}" fill="#4338CA" font-family="DM Mono" font-size="11">WGS84</text>
  <text x="${MAP_RECT.x + 76}" y="${OG_HEIGHT - 24}" fill="#9CA3AF" font-family="Poppins" font-size="11">·</text>
  <text x="${MAP_RECT.x + 88}" y="${OG_HEIGHT - 24}" fill="#4B5563" font-family="DM Mono" font-size="11">degree</text>
  <text x="${MAP_RECT.x + 138}" y="${OG_HEIGHT - 24}" fill="#9CA3AF" font-family="Poppins" font-size="11">·</text>
  <text x="${MAP_RECT.x + 150}" y="${OG_HEIGHT - 24}" fill="#4B5563" font-family="DM Mono" font-size="11">z${view.zoom}</text>

  <!-- Map Attribution Pill -->
  ${attributionPill}

  <!-- Left 2026 App Sidebar -->
  <rect x="0" y="0" width="${SIDEBAR_WIDTH}" height="${OG_HEIGHT}" fill="#FFFFFF"/>
  <line x1="${SIDEBAR_WIDTH}" y1="0" x2="${SIDEBAR_WIDTH}" y2="${OG_HEIGHT}" stroke="#E5E7EB" stroke-width="1.5"/>

  <!-- Brand Header -->
  <rect x="24" y="26" width="42" height="42" rx="12" fill="url(#brand-grad)"/>
  <g stroke="#FFFFFF" stroke-width="2" opacity="0.95">
    <line x1="38" y1="36" x2="38" y2="58"/>
    <line x1="52" y1="36" x2="52" y2="58"/>
    <line x1="34" y1="42" x2="56" y2="42"/>
    <line x1="34" y1="52" x2="56" y2="52"/>
  </g>
  <text x="78" y="46" fill="#111827" font-family="Poppins" font-weight="700" font-size="21">wafflemap</text>
  <text x="78" y="63" fill="#6B7280" font-family="Poppins" font-size="11">Mesh Code Studio</text>

  <line x1="0" y1="90" x2="${SIDEBAR_WIDTH}" y2="90" stroke="#F3F4F6" stroke-width="1.5"/>

  <!-- Section Title -->
  <rect x="24" y="136" width="26" height="26" rx="8" fill="#EEF2FF"/>
  <text x="37" y="154" text-anchor="middle" fill="#4338CA" font-family="DM Mono" font-size="14">#</text>
  <text x="60" y="154" fill="#111827" font-family="Poppins" font-weight="700" font-size="15">Mesh Code</text>
  ${countBadge}

  ${codeRowsSvg}
  ${extraSvg}

  <!-- Center Coordinate Card -->
  <rect x="24" y="492" width="296" height="62" rx="12" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="1"/>
  <text x="40" y="514" fill="#6B7280" font-family="Poppins" font-weight="700" font-size="10">CENTER (WGS84)</text>
  <text x="40" y="538" fill="#111827" font-family="DM Mono" font-size="14">${escapeXml(centerSummary)}</text>

  <!-- Share URL -->
  <text x="24" y="590" fill="#4F46E5" font-family="DM Mono" font-size="12">${escapeXml(displayUrl)}</text>
</svg>`;
}
