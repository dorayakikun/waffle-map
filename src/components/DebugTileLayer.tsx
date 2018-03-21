import { GridLayer, GridLayerProps } from 'react-leaflet'
import * as Leaflet from 'leaflet';

export class DebugTileLayer extends GridLayer {
  // createLeafletElement(props: GridLayerProps): Leaflet.GridLayer {
  //   let grid = super.createLeafletElement(props)
  //   grid.createTile = (coords: Leaflet.Coords, done: Leaflet.DoneCallback): HTMLElement => {
  //     const tile = document.createElement('div')
  //     tile.style.outline = '1px solid red'
  //     tile.innerHTML = `<span style="font-family: Lato, 
  //                                    'Helvetica Neue', 
  //                                    Helvetica, 
  //                                    Arial, 
  //                                    sans-serif; 
  //                                    font-size: 24px; 
  //                                    font-weight: 700;">
  //       ${[coords.x, coords.y, coords.z].join(', ')}
  //       </span>`
  //     return tile
  //   }
  //   return grid
  // }
}
