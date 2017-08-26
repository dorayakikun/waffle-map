// @flow
import React from 'react'
import { Checkbox, Label, MenuItem } from 'semantic-ui-react'

export type TileToggleProps = {
  isShowDebugTiles: boolean,
  onToggleChanged: (event: Event, data: { checked: boolean }) => void
}

const TileToggle = (props: TileToggleProps) =>
  <div>
    <Label color="teal" tag>
      Tile Grid
    </Label>
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <span
        style={{
          fontColor: 'white',
          marginRight: 5
        }}
      >
        Show tiles
      </span>
      <Checkbox
        checked={props.isShowDebugTiles}
        onChange={props.onToggleChanged}
        toggle
      />
    </div>
  </div>

export default TileToggle
