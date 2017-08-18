// @flow
import React from 'react'
import { Checkbox, MenuItem } from 'semantic-ui-react'

export type TileToggleProps = {
  isShowDebugTiles: boolean,
  onToggleChanged: (event: Event, data: { checked: boolean }) => void
}

const TileToggle = (props: TileToggleProps) =>
  <div>
    <span style={{ fontColor: 'white', marginRight: 5 }}>Show tiles</span>
    <Checkbox
      checked={props.isShowDebugTiles}
      onChange={props.onToggleChanged}
      toggle
    />
  </div>

export default TileToggle
