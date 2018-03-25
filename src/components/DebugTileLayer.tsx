import { GridLayer, GridLayerProps } from 'react-leaflet'
import * as Leaflet from 'leaflet';

class DebugTileLayer extends GridLayer {
  createLeafletElement(props: GridLayerProps): Leaflet.GridLayer {
    const debugGridLayer = (Leaflet.GridLayer as any).extend({
      createTile: (coords: Leaflet.Coords): HTMLElement => {
        const tile = document.createElement('div')
        tile.style.outline = '1px solid red'
        tile.innerHTML = `<span style="font-family: Lato, 
                                       'Helvetica Neue', 
                                       Helvetica, 
                                       Arial, 
                                       sans-serif; 
                                       font-size: 24px; 
                                       font-weight: 700;">
          ${[coords.x, coords.y, coords.z].join(', ')}
          </span>`
        return tile
      }
    })
    return new debugGridLayer(this.getOptions(props))
  }
}

export { DebugTileLayer }