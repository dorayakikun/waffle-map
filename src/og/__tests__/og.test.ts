import type { Mesh } from "../../domain/calculateMesh";
import {
  computeMercatorView,
  getVisibleTiles,
  latLngToWorldPx,
  projectToViewport,
} from "../mercator";
import { buildOgMeta, escapeHtmlAttr, injectOgMeta, isStaticAssetPath } from "../meta";
import { renderOgPng } from "../renderOgPng";
import { escapeXml, MAP_RECT, OG_HEIGHT, OG_WIDTH, renderOgSvg } from "../renderOgSvg";

describe("OGP metadata utilities", () => {
  describe("isStaticAssetPath", () => {
    test("identifies API, assets, images, and static file extensions", () => {
      expect(isStaticAssetPath("/api/og")).toBe(true);
      expect(isStaticAssetPath("/assets/index.js")).toBe(true);
      expect(isStaticAssetPath("/images/logo.png")).toBe(true);
      expect(isStaticAssetPath("/favicon.ico")).toBe(true);
      expect(isStaticAssetPath("/manifest.json")).toBe(true);
      expect(isStaticAssetPath("/styles.CSS")).toBe(true);
    });

    test("returns false for root and mesh code routes", () => {
      expect(isStaticAssetPath("/")).toBe(false);
      expect(isStaticAssetPath("/5339.5340/")).toBe(false);
      expect(isStaticAssetPath("/5339-35-97,5339-35-98/")).toBe(false);
    });
  });

  describe("escapeHtmlAttr", () => {
    test("escapes HTML special characters", () => {
      expect(escapeHtmlAttr(`a & "b" <c>`)).toBe("a &amp; &quot;b&quot; &lt;c&gt;");
    });
  });

  describe("buildOgMeta", () => {
    test("returns default meta for root path and strips trailing slash from origin", () => {
      const meta = buildOgMeta("/", "https://waffle-map.netlify.app/");
      expect(meta).toEqual({
        title: "Waffle Map",
        description: "Fantastic mesh renderer for Japanese mesh codes",
        ogUrl: "https://waffle-map.netlify.app/",
        ogImage: "https://waffle-map.netlify.app/api/og",
        twitterCard: "summary_large_image",
      });
    });

    test("builds dynamic meta for single mesh code", () => {
      const meta = buildOgMeta("/5339/", "https://waffle-map.netlify.app");
      expect(meta).toEqual({
        title: "5339 · Waffle Map",
        description: "Japanese mesh code map for 5339 (1 mesh)",
        ogUrl: "https://waffle-map.netlify.app/5339/",
        ogImage: "https://waffle-map.netlify.app/api/og?codes=5339",
        twitterCard: "summary_large_image",
      });
    });

    test("builds dynamic meta for multiple mesh codes with dot or comma separator", () => {
      const dotMeta = buildOgMeta("/5339.5340/", "https://waffle-map.netlify.app");
      expect(dotMeta.title).toBe("5339, 5340 · Waffle Map");
      expect(dotMeta.description).toBe("Japanese mesh code map for 5339, 5340 (2 meshes)");
      expect(dotMeta.ogUrl).toBe("https://waffle-map.netlify.app/5339.5340/");
      expect(dotMeta.ogImage).toBe("https://waffle-map.netlify.app/api/og?codes=5339.5340");

      const fourMeta = buildOgMeta("/5339,5340,5439,5440/", "https://waffle-map.netlify.app");
      expect(fourMeta.title).toBe("5339, 5340, 5439 +1 · Waffle Map");
      expect(fourMeta.description).toBe(
        "Japanese mesh code map for 5339, 5340, 5439 +1 (4 meshes)",
      );
      expect(fourMeta.ogImage).toBe(
        "https://waffle-map.netlify.app/api/og?codes=5339%2C5340%2C5439%2C5440",
      );
    });

    test("falls back to default meta for invalid characters in segment", () => {
      const meta = buildOgMeta("/<script>/", "https://waffle-map.netlify.app");
      expect(meta.title).toBe("Waffle Map");
      expect(meta.ogImage).toBe("https://waffle-map.netlify.app/api/og");
    });
  });

  describe("injectOgMeta", () => {
    test("replaces existing meta tags and inserts missing ones", () => {
      const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Waffle Map</title>
    <meta name="Description" content="Old" />
    <meta property="og:title" content="Old" />
    <meta property="og:image" content="https://old.example/img.png" />
    <meta name="twitter:card" content="summary" />
  </head>
  <body></body>
</html>`;
      const meta = buildOgMeta("/5339.5340/", "https://waffle-map.netlify.app");
      const out = injectOgMeta(html, meta);

      expect(out).toContain("<title>5339, 5340 · Waffle Map</title>");
      expect(out).toContain('<meta property="og:title" content="5339, 5340 · Waffle Map" />');
      expect(out).toContain(
        '<meta property="og:image" content="https://waffle-map.netlify.app/api/og?codes=5339.5340" />',
      );
      expect(out).toContain('<meta property="og:image:width" content="1200" />');
      expect(out).toContain('<meta property="og:image:height" content="630" />');
      expect(out).toContain('<meta name="twitter:card" content="summary_large_image" />');
      expect(out).toContain(
        '<meta name="twitter:image" content="https://waffle-map.netlify.app/api/og?codes=5339.5340" />',
      );
    });
  });
});

describe("Mercator projection & tile grid", () => {
  const sampleMeshes: Mesh[] = [
    {
      code: "5339",
      center: { lat: 35.6667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36.0, lng: 139.0 },
        rightBottom: { lat: 35.3333, lng: 140.0 },
      },
    },
    {
      code: "5340",
      center: { lat: 35.6667, lng: 140.5 },
      bounds: {
        leftTop: { lat: 36.0, lng: 140.0 },
        rightBottom: { lat: 35.3333, lng: 141.0 },
      },
    },
  ];

  test("latLngToWorldPx maps equator/prime meridian to exact center of world", () => {
    const pt = latLngToWorldPx(0, 0, 0);
    expect(pt.x).toBeCloseTo(128, 5);
    expect(pt.y).toBeCloseTo(128, 5);

    // Clamps extreme latitudes without returning NaN/Infinity
    const north = latLngToWorldPx(90, 180, 1);
    expect(Number.isFinite(north.y)).toBe(true);
    expect(north.x).toBeCloseTo(512, 5);
  });

  test("computeMercatorView returns Japan overview for empty meshes and fits given meshes", () => {
    const emptyView = computeMercatorView([], MAP_RECT.width, MAP_RECT.height);
    expect(emptyView.zoom).toBe(6);
    expect(emptyView.width).toBe(MAP_RECT.width);

    const meshView = computeMercatorView(sampleMeshes, MAP_RECT.width, MAP_RECT.height);
    expect(meshView.zoom).toBeGreaterThanOrEqual(7);
    expect(meshView.zoom).toBeLessThanOrEqual(10);

    const centerPt = projectToViewport(35.6667, 140.0, meshView, MAP_RECT.x, MAP_RECT.y);
    expect(centerPt.x).toBeCloseTo(MAP_RECT.x + MAP_RECT.width / 2, 0);
    expect(centerPt.y).toBeCloseTo(MAP_RECT.height / 2, -1);
  });

  test("getVisibleTiles covers viewport with valid tile coordinates", () => {
    const view = computeMercatorView(sampleMeshes, MAP_RECT.width, MAP_RECT.height);
    const tiles = getVisibleTiles(view, MAP_RECT.x, MAP_RECT.y);
    expect(tiles.length).toBeGreaterThanOrEqual(6);
    for (const tile of tiles) {
      expect(tile.z).toBe(view.zoom);
      expect(tile.x).toBeGreaterThanOrEqual(0);
      expect(tile.y).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("OGP SVG & PNG renderer", () => {
  const sampleMeshes: Mesh[] = [
    {
      code: "5339",
      center: { lat: 35.6667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36.0, lng: 139.0 },
        rightBottom: { lat: 35.3333, lng: 140.0 },
      },
    },
    {
      code: "5340",
      center: { lat: 35.6667, lng: 140.5 },
      bounds: {
        leftTop: { lat: 36.0, lng: 140.0 },
        rightBottom: { lat: 35.3333, lng: 141.0 },
      },
    },
  ];

  test("escapeXml escapes XML entities", () => {
    expect(escapeXml(`<&>"'`)).toBe("&lt;&amp;&gt;&quot;&apos;");
  });

  test("renderOgSvg renders valid 1200x630 SVG with tiles, attribution, and fallback", () => {
    const svgWithTiles = renderOgSvg({
      meshcodes: ["5339", "5340"],
      meshes: sampleMeshes,
      displayUrl: "waffle-map.netlify.app/5339.5340/",
      tiles: [{ drawX: 344, drawY: 0, dataUri: "data:image/png;base64,AA==" }],
      attribution: "Map: GSI Tiles (GSI Japan), modified by Waffle Map",
    });
    expect(svgWithTiles).toContain(`width="${OG_WIDTH}" height="${OG_HEIGHT}"`);
    expect(svgWithTiles).toContain("5339");
    expect(svgWithTiles).toContain("5340");
    expect(svgWithTiles).toContain("data:image/png;base64,AA==");
    expect(svgWithTiles).toContain("GSI Tiles");

    const svgEmpty = renderOgSvg({ meshcodes: [], meshes: [] });
    expect(svgEmpty).toContain("Japanese Mesh Code Studio");
  });

  test("renderOgPng produces a valid PNG image buffer offline (fallback mode)", async () => {
    const png = await renderOgPng("5339.5340", "waffle-map.netlify.app/5339.5340/", {
      fetchTiles: false,
    });
    expect(Array.from(png.slice(0, 8))).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(png.byteLength).toBeGreaterThan(5000);

    const fallbackPng = await renderOgPng("not-a-mesh", undefined, { fetchTiles: false });
    expect(Array.from(fallbackPng.slice(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });
});
