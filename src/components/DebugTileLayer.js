// @flow
import { GridLayer } from 'react-leaflet';

export default class DebugTileLayer extends GridLayer {
  createLeafletElement(props: Object): Object {
    let grid = super.createLeafletElement(props);
    grid.createTile = (coords: any) => {
      const tile = document.createElement('div');
      tile.style.outline = '1px solid red';
      tile.innerHTML = `<span style="font-family: Lato, 
                                     'Helvetica Neue', 
                                     Helvetica, 
                                     Arial, 
                                     sans-serif; 
                                     font-size: 24px; 
                                     font-weight: 700;">
        ${[coords.x, coords.y, coords.z].join(', ')}
        </span>`;
      return tile;
    };
    return grid;
  }
}
