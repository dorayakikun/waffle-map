import React from 'react'

import { storiesOf } from '@storybook/react'

import TileToggle from '../src/components/TileToggle'

const propsShowDebugTile = {
  isShowDebugTiles: true,
  onToggleChanged: (event, data) => {}
}

storiesOf('TileToggle', module).add('show debug tile', () =>
  <TileToggle {...propsShowDebugTile} />
)

const propsHideDebugTile = {
  isShowDebugTiles: false,
  onToggleChanged: (event, data) => {}
}
storiesOf('TileToggle', module).add('hide debug tile', () =>
  <TileToggle {...propsHideDebugTile} />
)
