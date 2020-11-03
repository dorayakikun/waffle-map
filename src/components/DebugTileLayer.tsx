import * as Leaflet from "leaflet";
import { createTileLayerComponent } from "@react-leaflet/core";

const d = (Leaflet.GridLayer as any).extend({
  createTile: (coords: Leaflet.Coords): HTMLElement => {
    const tile = document.createElement("div");
    tile.style.backgroundColor = "rgba(41, 98, 255, 0.2)";
    tile.style.outline = "2px solid";
    tile.style.outlineColor = "#2962FF";
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

// eslint-disable-next-line
const DebugTileLayer = createTileLayerComponent(function createTileLayer({}, context) {
  return { instance: new d(), context };
});
export { DebugTileLayer };
