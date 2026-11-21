import type { Mesh } from "../domain/calculateMesh.ts";
import { round } from "../domain/roundPoint.ts";
import { JAPAN_BOUNDS, JAPAN_OUTLINE_POLYGONS, type PolyRing } from "./japanOutline.ts";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type ViewportBounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export type OgRenderInput = {
  meshcodes: string[];
  meshes: Mesh[];
  displayUrl?: string;
};

const MAP_BOX = { x: 36, y: 36, width: 744, height: 558 };
const INSET_BOX = { x: 636, y: 452, width: 128, height: 126 };

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Compute aspect-ratio-preserving geographic viewport around the given meshes.
 * Uses cos(midLat) horizontal correction so mesh rectangles keep realistic proportions.
 */
export function computeViewportBounds(
  meshes: Mesh[],
  width: number,
  height: number,
): ViewportBounds {
  if (meshes.length === 0) {
    return { ...JAPAN_BOUNDS };
  }

  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const mesh of meshes) {
    const lats = [mesh.bounds.leftTop.lat, mesh.bounds.rightBottom.lat];
    const lngs = [mesh.bounds.leftTop.lng, mesh.bounds.rightBottom.lng];
    for (const lat of lats) {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    for (const lng of lngs) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }
  }

  const midLat = (minLat + maxLat) / 2;
  const cosLat = Math.max(Math.cos((midLat * Math.PI) / 180), 0.2);

  // Add breathing room around the meshes
  const rawLatSpan = Math.max(maxLat - minLat, 0.004);
  const rawLngSpan = Math.max(maxLng - minLng, 0.004);
  let latSpan = rawLatSpan * 1.9;
  let lngSpan = rawLngSpan * 1.9;

  // Match viewport aspect ratio with cosine latitude correction
  const targetRatio = width / height;
  const currentRatio = (lngSpan * cosLat) / latSpan;

  if (currentRatio < targetRatio) {
    lngSpan = (latSpan * targetRatio) / cosLat;
  } else {
    latSpan = (lngSpan * cosLat) / targetRatio;
  }

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  return {
    minLat: centerLat - latSpan / 2,
    maxLat: centerLat + latSpan / 2,
    minLng: centerLng - lngSpan / 2,
    maxLng: centerLng + lngSpan / 2,
  };
}

export function projectPoint(
  lat: number,
  lng: number,
  bounds: ViewportBounds,
  box: { x: number; y: number; width: number; height: number },
): { x: number; y: number } {
  const xRatio = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
  const yRatio = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat);
  return {
    x: box.x + xRatio * box.width,
    y: box.y + yRatio * box.height,
  };
}

function ringToSvgPath(
  ring: PolyRing,
  bounds: ViewportBounds,
  box: { x: number; y: number; width: number; height: number },
): string {
  return ring
    .map(([lat, lng], idx) => {
      const pt = projectPoint(lat, lng, bounds, box);
      const cmd = idx === 0 ? "M" : "L";
      return `${cmd}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");
}

function renderGridLines(bounds: ViewportBounds): string {
  const lines: string[] = [];
  const steps = 4;
  for (let i = 1; i < steps; i++) {
    const ratio = i / steps;
    const x = MAP_BOX.x + ratio * MAP_BOX.width;
    const y = MAP_BOX.y + ratio * MAP_BOX.height;
    const lngVal = bounds.minLng + ratio * (bounds.maxLng - bounds.minLng);
    const latVal = bounds.maxLat - ratio * (bounds.maxLat - bounds.minLat);

    lines.push(
      `<line x1="${x.toFixed(1)}" y1="${MAP_BOX.y}" x2="${x.toFixed(1)}" y2="${MAP_BOX.y + MAP_BOX.height}" stroke="#334155" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="4 4"/>`,
    );
    lines.push(
      `<line x1="${MAP_BOX.x}" y1="${y.toFixed(1)}" x2="${MAP_BOX.x + MAP_BOX.width}" y2="${y.toFixed(1)}" stroke="#334155" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="4 4"/>`,
    );
    lines.push(
      `<text x="${(x + 6).toFixed(1)}" y="${MAP_BOX.y + 20}" fill="#64748B" font-family="DM Mono" font-size="11">${lngVal.toFixed(2)}°E</text>`,
    );
    lines.push(
      `<text x="${MAP_BOX.x + 12}" y="${(y - 6).toFixed(1)}" fill="#64748B" font-family="DM Mono" font-size="11">${latVal.toFixed(2)}°N</text>`,
    );
  }
  return lines.join("\n");
}

function renderMeshRectangles(meshes: Mesh[], bounds: ViewportBounds): string {
  return meshes
    .map((mesh) => {
      const topLat = Math.max(mesh.bounds.leftTop.lat, mesh.bounds.rightBottom.lat);
      const bottomLat = Math.min(mesh.bounds.leftTop.lat, mesh.bounds.rightBottom.lat);
      const leftLng = Math.min(mesh.bounds.leftTop.lng, mesh.bounds.rightBottom.lng);
      const rightLng = Math.max(mesh.bounds.leftTop.lng, mesh.bounds.rightBottom.lng);

      const p1 = projectPoint(topLat, leftLng, bounds, MAP_BOX);
      const p2 = projectPoint(bottomLat, rightLng, bounds, MAP_BOX);
      const rectX = Math.min(p1.x, p2.x);
      const rectY = Math.min(p1.y, p2.y);
      const rectW = Math.max(Math.abs(p2.x - p1.x), 4);
      const rectH = Math.max(Math.abs(p2.y - p1.y), 4);

      const cx = rectX + rectW / 2;
      const cy = rectY + rectH / 2;
      const safeCode = escapeXml(mesh.code);

      // Fit label cleanly inside rectangle when large enough
      const maxFontByWidth = (rectW * 0.82) / Math.max(mesh.code.length * 0.62, 1);
      const maxFontByHeight = rectH * 0.36;
      const fontSize = Math.min(26, Math.max(11, Math.min(maxFontByWidth, maxFontByHeight)));
      const showLabel = rectW >= 54 && rectH >= 24;

      const labelSvg = showLabel
        ? `<text x="${cx.toFixed(1)}" y="${(cy + fontSize * 0.34).toFixed(1)}" text-anchor="middle" fill="#F8FAFC" stroke="#0F172A" stroke-width="4" paint-order="stroke fill" font-family="DM Mono" font-size="${fontSize.toFixed(1)}">${safeCode}</text>`
        : "";

      return [
        `<rect x="${rectX.toFixed(1)}" y="${rectY.toFixed(1)}" width="${rectW.toFixed(1)}" height="${rectH.toFixed(1)}" rx="3" fill="#4F46E5" fill-opacity="0.34" stroke="#818CF8" stroke-width="2.5"/>`,
        labelSvg,
      ].join("\n");
    })
    .join("\n");
}

function renderJapanInset(meshes: Mesh[]): string {
  if (meshes.length === 0) return "";

  const insetPaths = JAPAN_OUTLINE_POLYGONS.map(
    (ring) =>
      `<path d="${ringToSvgPath(ring, JAPAN_BOUNDS, INSET_BOX)}" fill="#334155" stroke="#64748B" stroke-width="0.8"/>`,
  ).join("\n");

  let sumLat = 0;
  let sumLng = 0;
  for (const m of meshes) {
    sumLat += m.center.lat;
    sumLng += m.center.lng;
  }
  const avgLat = sumLat / meshes.length;
  const avgLng = sumLng / meshes.length;
  const pin = projectPoint(avgLat, avgLng, JAPAN_BOUNDS, INSET_BOX);

  return `
    <g>
      <rect x="${INSET_BOX.x}" y="${INSET_BOX.y}" width="${INSET_BOX.width}" height="${INSET_BOX.height}" rx="12" fill="#0F172A" fill-opacity="0.88" stroke="#334155" stroke-width="1.2"/>
      <g clip-path="url(#inset-clip)">
        ${insetPaths}
        <circle cx="${pin.x.toFixed(1)}" cy="${pin.y.toFixed(1)}" r="10" fill="#6366F1" fill-opacity="0.35"/>
        <circle cx="${pin.x.toFixed(1)}" cy="${pin.y.toFixed(1)}" r="4.5" fill="#A855F7" stroke="#FFFFFF" stroke-width="1.5"/>
      </g>
      <text x="${INSET_BOX.x + 10}" y="${INSET_BOX.y + 18}" fill="#94A3B8" font-family="Poppins" font-weight="700" font-size="9">JAPAN</text>
    </g>
  `;
}

export function renderOgSvg(input: OgRenderInput): string {
  const { meshcodes, meshes } = input;
  const viewport = computeViewportBounds(meshes, MAP_BOX.width, MAP_BOX.height);

  const mainJapanPaths = JAPAN_OUTLINE_POLYGONS.map(
    (ring) =>
      `<path d="${ringToSvgPath(ring, viewport, MAP_BOX)}" fill="#162033" stroke="#334155" stroke-width="1.6"/>`,
  ).join("\n");

  const meshCount = meshes.length;
  const badgeText =
    meshCount === 0 ? "JAPAN MESH GRID" : `${meshCount} ${meshCount === 1 ? "MESH" : "MESHES"}`;

  const visibleCodes = meshcodes.slice(0, 6);
  const extraCount = Math.max(0, meshcodes.length - visibleCodes.length);

  const codeChipsSvg =
    visibleCodes.length > 0
      ? visibleCodes
          .map((code, i) => {
            const y = 210 + i * 38;
            return `
              <rect x="828" y="${y}" width="312" height="30" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1"/>
              <circle cx="844" cy="${y + 15}" r="4" fill="#818CF8"/>
              <text x="858" y="${y + 20}" fill="#F1F5F9" font-family="DM Mono" font-size="14">${escapeXml(code)}</text>
            `;
          })
          .join("\n")
      : `
          <text x="828" y="232" fill="#CBD5E1" font-family="Poppins" font-size="15">Interactive Japanese Mesh</text>
          <text x="828" y="256" fill="#CBD5E1" font-family="Poppins" font-size="15">Code Visualizer</text>
          <text x="828" y="294" fill="#94A3B8" font-family="Poppins" font-size="13">Share any mesh code directly</text>
          <text x="828" y="314" fill="#94A3B8" font-family="Poppins" font-size="13">via URL path.</text>
        `;

  const extraSvg =
    extraCount > 0
      ? `<text x="828" y="${210 + visibleCodes.length * 38 + 14}" fill="#94A3B8" font-family="DM Mono" font-size="12">+${extraCount} more mesh codes</text>`
      : "";

  let centerSummary = "35.6812°N, 139.7671°E";
  if (meshes.length > 0) {
    const avgLat = meshes.reduce((sum, m) => sum + m.center.lat, 0) / meshes.length;
    const avgLng = meshes.reduce((sum, m) => sum + m.center.lng, 0) / meshes.length;
    centerSummary = `${round(avgLat, 4)}°N, ${round(avgLng, 4)}°E`;
  }

  const rawUrl = input.displayUrl ?? "waffle-map.netlify.app";
  const displayUrl = rawUrl.length > 36 ? `${rawUrl.slice(0, 33)}...` : rawUrl;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090E1A"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </linearGradient>
    <clipPath id="map-clip">
      <rect x="${MAP_BOX.x}" y="${MAP_BOX.y}" width="${MAP_BOX.width}" height="${MAP_BOX.height}" rx="18"/>
    </clipPath>
    <clipPath id="inset-clip">
      <rect x="${INSET_BOX.x}" y="${INSET_BOX.y}" width="${INSET_BOX.width}" height="${INSET_BOX.height}" rx="12"/>
    </clipPath>
  </defs>

  <!-- Canvas background -->
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg-grad)"/>

  <!-- Map frame -->
  <rect x="${MAP_BOX.x}" y="${MAP_BOX.y}" width="${MAP_BOX.width}" height="${MAP_BOX.height}" rx="18" fill="#0B1324" stroke="#1E293B" stroke-width="2"/>
  <g clip-path="url(#map-clip)">
    ${mainJapanPaths}
    ${renderGridLines(viewport)}
    ${renderMeshRectangles(meshes, viewport)}
  </g>
  ${renderJapanInset(meshes)}

  <!-- Right Inspector Card -->
  <rect x="804" y="36" width="360" height="558" rx="18" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>

  <!-- Brand Header -->
  <rect x="828" y="60" width="44" height="44" rx="12" fill="url(#brand-grad)"/>
  <g stroke="#FFFFFF" stroke-width="2" opacity="0.95">
    <line x1="843" y1="70" x2="843" y2="94"/>
    <line x1="857" y1="70" x2="857" y2="94"/>
    <line x1="838" y1="76" x2="862" y2="76"/>
    <line x1="838" y1="88" x2="862" y2="88"/>
  </g>
  <text x="884" y="81" fill="#F8FAFC" font-family="Poppins" font-weight="700" font-size="22">wafflemap</text>
  <text x="884" y="99" fill="#94A3B8" font-family="Poppins" font-size="12">Mesh Code Studio</text>

  <!-- Divider -->
  <line x1="828" y1="124" x2="1140" y2="124" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Section Badge -->
  <rect x="828" y="144" width="136" height="26" rx="13" fill="#312E81"/>
  <text x="896" y="161" text-anchor="middle" fill="#C7D2FE" font-family="DM Mono" font-size="11">${escapeXml(badgeText)}</text>

  <text x="828" y="196" fill="#94A3B8" font-family="Poppins" font-weight="700" font-size="11">MESH CODES</text>
  ${codeChipsSvg}
  ${extraSvg}

  <!-- Coordinates Footer Box -->
  <rect x="828" y="476" width="312" height="58" rx="12" fill="#1E293B"/>
  <text x="844" y="497" fill="#94A3B8" font-family="Poppins" font-weight="700" font-size="10">CENTER (WGS84)</text>
  <text x="844" y="520" fill="#E2E8F0" font-family="DM Mono" font-size="14">${escapeXml(centerSummary)}</text>

  <!-- URL pill -->
  <text x="828" y="568" fill="#818CF8" font-family="DM Mono" font-size="12">${escapeXml(displayUrl)}</text>
</svg>`;
}
