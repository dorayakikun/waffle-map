import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import meshCalculatorBasic from "waffle-map-mesh-calculator-basic";
import type { Mesh } from "../domain/calculateMesh.ts";
import { parseMeshcodesFromUrl } from "../utils/meshcodeUrl.ts";
import { OG_WIDTH, renderOgSvg } from "./renderOgSvg.ts";

const FONT_FILES = ["DMMono-Medium.ttf", "Poppins-Regular.ttf", "Poppins-Bold.ttf"];

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

/**
 * Parse raw mesh code query string (e.g. "5339.5340" or "5339-35-97,5339-35-98")
 * and render a 1200x630 PNG buffer for OGP / X Card.
 */
export function renderOgPng(codesParam: string, displayUrl?: string): Uint8Array {
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

  const svg = renderOgSvg({
    meshcodes: validCodes,
    meshes,
    displayUrl,
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
