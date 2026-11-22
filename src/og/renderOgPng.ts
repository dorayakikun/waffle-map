import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import meshCalculatorBasic from "waffle-map-mesh-calculator-basic";
import type { Mesh } from "../domain/calculateMesh.ts";
import { parseMeshcodesFromUrl } from "../utils/meshcodeUrl.ts";
import { computeMercatorView, getVisibleTiles } from "./mercator.ts";
import { type EmbeddedTile, MAP_RECT, OG_WIDTH, renderOgSvg } from "./renderOgSvg.ts";

const FONT_FILES = ["DMMono-Medium.ttf", "Poppins-Regular.ttf", "Poppins-Bold.ttf"];
const GSI_PALE_TILE_URL = "https://cyberjapandata.gsi.go.jp/xyz/pale";
const GSI_ATTRIBUTION = "Map: GSI Tiles (GSI Japan), modified by Waffle Map";
const TILE_FETCH_TIMEOUT_MS = 2500;
const MAX_TILE_CACHE_ENTRIES = 256;

// In-memory LRU-style tile cache across warm Netlify Function invocations
const tileCache = new Map<string, string>();

function resolveFontFiles(): string[] {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [resolve(here, "fonts"), resolve(process.cwd(), "src/og/fonts")];
  for (const dir of candidates) {
    const resolved = FONT_FILES.map((f) => resolve(dir, f)).filter((p) => existsSync(p));
    if (resolved.length > 0) {
      return resolved;
    }
  }
  return [];
}

async function fetchGsiTileDataUri(z: number, x: number, y: number): Promise<string | null> {
  const key = `${z}/${x}/${y}`;
  const cached = tileCache.get(key);
  if (cached) {
    return cached;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TILE_FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${GSI_PALE_TILE_URL}/${z}/${x}/${y}.png`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "waffle-map/2.0 (+https://waffle-map.netlify.app)",
      },
    });
    if (!res.ok) {
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const dataUri = `data:image/png;base64,${buf.toString("base64")}`;

    if (tileCache.size >= MAX_TILE_CACHE_ENTRIES) {
      const oldestKey = tileCache.keys().next().value;
      if (oldestKey) tileCache.delete(oldestKey);
    }
    tileCache.set(key, dataUri);
    return dataUri;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export type RenderOgPngOptions = {
  /** Set false in offline/unit tests to skip external GSI tile fetches. Defaults to true. */
  fetchTiles?: boolean;
};

/**
 * Parse raw mesh code query string (e.g. "5339.5340" or "5339-35-97,5339-35-98"),
 * composite real GSI Pale map tiles + mesh overlays, and render a 1200x630 PNG buffer.
 */
export async function renderOgPng(
  codesParam: string,
  displayUrl?: string,
  options: RenderOgPngOptions = {},
): Promise<Uint8Array> {
  const { meshcodes } = codesParam ? parseMeshcodesFromUrl(`/${codesParam}/`) : { meshcodes: [] };

  const meshes: Mesh[] = [];
  const validCodes: string[] = [];

  for (const code of meshcodes.slice(0, 64)) {
    try {
      const bounds = meshCalculatorBasic.toBounds(code);
      const center = meshCalculatorBasic.toCenterLatLng(code);
      meshes.push({ code, bounds, center });
      validCodes.push(code);
    } catch {
      // Skip invalid mesh codes gracefully so OGP always returns a valid PNG
    }
  }

  const view = computeMercatorView(meshes, MAP_RECT.width, MAP_RECT.height);
  const embeddedTiles: EmbeddedTile[] = [];

  if (options.fetchTiles !== false) {
    const visible = getVisibleTiles(view, MAP_RECT.x, MAP_RECT.y);
    const settled = await Promise.all(
      visible.map(async (tile) => {
        const dataUri = await fetchGsiTileDataUri(tile.z, tile.x, tile.y);
        return dataUri ? { drawX: tile.drawX, drawY: tile.drawY, dataUri } : null;
      }),
    );
    for (const item of settled) {
      if (item) embeddedTiles.push(item);
    }
  }

  const svg = renderOgSvg({
    meshcodes: validCodes,
    meshes,
    displayUrl,
    tiles: embeddedTiles,
    attribution: embeddedTiles.length > 0 ? GSI_ATTRIBUTION : undefined,
    view,
  });

  const fontFiles = resolveFontFiles();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
    font: {
      fontFiles,
      loadSystemFonts: fontFiles.length === 0,
      defaultFontFamily: "Poppins",
    },
  });

  return resvg.render().asPng();
}
