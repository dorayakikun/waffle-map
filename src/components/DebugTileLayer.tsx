import * as Leaflet from 'leaflet'
import { GridLayer, withLeaflet } from 'react-leaflet'

const DebugTileLayer = withLeaflet(
  class extends GridLayer {
    public createLeafletElement(props: any): Leaflet.GridLayer {
      const DebugGridLayer = (Leaflet.GridLayer as any).extend({
        createTile: (coords: Leaflet.Coords): HTMLElement => {
          const tile = document.createElement('div')
          tile.style.backgroundColor = 'rgba(41, 98, 255, 0.2)'
          tile.style.outline = '2px solid'
          tile.style.outlineColor = '#2962FF'
          tile.innerHTML = `<span style="
                                      font-family: Lato, 
                                      'Helvetica Neue', 
                                      Helvetica, 
                                      Arial, 
                                      sans-serif; 
                                      font-size: 24px; 
                                      font-weight: 700;">
          ${[coords.x, coords.y, coords.z].join(', ')}
          </span>`
          return tile
        },
      })
      return new DebugGridLayer(this.getOptions(props))
    }
  }
)
export { DebugTileLayer }
