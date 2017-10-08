// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import TileToggle from '../src/components/TileToggle'

const propsShowDebugTile = {
  isShowDebugTiles: true,
  onToggleChanged: linkTo('TileToggle', 'hide debug tile')
}

storiesOf('TileToggle', module).add('show debug tile', () => (
  <TileToggle {...propsShowDebugTile} />
))

const propsHideDebugTile = {
  isShowDebugTiles: false,
  onToggleChanged: linkTo('TileToggle', 'show debug tile')
}
storiesOf('TileToggle', module).add('hide debug tile', () => (
  <TileToggle {...propsHideDebugTile} />
))
