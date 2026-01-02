import { createLayerComponent, updateGridLayer, withPane } from "@react-leaflet/core";
import { type Coords, GridLayer, type GridLayerOptions } from "leaflet";
import { MESH_COLORS } from "../../theme/constants";

// biome-ignore lint/suspicious/noExplicitAny: Leaflet's GridLayer.extend() requires casting due to incomplete TypeScript definitions
const _debugTileLayer = (GridLayer as any).extend({
  createTile: (coords: Coords): HTMLElement => {
    const tile = document.createElement("div");
    tile.style.backgroundColor = MESH_COLORS.debug.background;
    tile.style.outline = "2px solid";
    tile.style.outlineColor = MESH_COLORS.debug.outline;
    tile.innerHTML = `<span style="
                                      font-family: Lato, 
                                      'Helvetica Neue', 
                                      Helvetica, 
                                      Arial, 
                                      sans-serif; 
                                      font-size: 24px; 
                                      font-weight: 700;">
          ${[coords.x, coords.y, coords.z].join(", ")}
          </span>`;
    return tile;
  },
});

export const DebugTileLayer = createLayerComponent<GridLayer, GridLayerOptions>(
  function createGridLayer({ ...options }, context) {
    return {
      instance: new _debugTileLayer(withPane(options, context)),
      context,
    };
  },
  updateGridLayer,
);
