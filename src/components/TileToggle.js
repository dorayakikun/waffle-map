// @flow
import React from 'react'
import { MenuItem, Radio } from 'semantic-ui-react'

export type TileToggleProps = {
  isShowDebugTiles: boolean,
  onToggleChanged: (_, data: { checked: boolean }) => void
}

const TileToggle = (props: TileToggleProps) =>
  <div>
    <span style={{ fontColor: 'white', marginRight: 5 }}>Show tiles</span>
    <Radio toggle onChange={props.onToggleChanged} />
  </div>

export default TileToggle
