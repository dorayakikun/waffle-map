import React from 'react'

import { storiesOf } from '@storybook/react'

import Map from '../src/components/Map'

const propsNoMesh = {
  meshes: [],
  contextmenuPosition: null,
  onContextmenu: event => {},
  onClose: () => {}
}
storiesOf('Map', module).add('no mesh', () => <Map {...propsNoMesh} />)

const propsSomeMesh = {
  meshes: [
    {
      code: '5339',
      center: { lat: 35.66667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36, lng: 139 },
        rightBottom: { lat: 35.33334, lng: 140 }
      }
    }
  ],
  contextmenuPosition: null,
  onContextmenu: event => {},
  onClose: () => {}
}

storiesOf('Map', module).add('with mesh', () => <Map {...propsSomeMesh} />)

const propsSomeMeshes = {
  meshes: [
    {
      code: '5335',
      center: { lat: 35.66667, lng: 135.5 },
      bounds: {
        leftTop: { lat: 36, lng: 135 },
        rightBottom: { lat: 35.33334, lng: 136 }
      }
    },
    {
      code: '5339',
      center: { lat: 35.66667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36, lng: 139 },
        rightBottom: { lat: 35.33334, lng: 140 }
      }
    }
  ],
  contextmenuPosition: null,
  onContextmenu: event => {},
  onClose: () => {}
}

storiesOf('Map', module).add('with meshes', () => <Map {...propsSomeMeshes} />)

const propsSomeMeshAndContextPosition = {
  meshes: [
    {
      code: '5339',
      center: { lat: 35.66667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36, lng: 139 },
        rightBottom: { lat: 35.33334, lng: 140 }
      }
    }
  ],
  contextmenuPosition: { lat: 35.6896, lng: 139.6921 },
  onContextmenu: event => {},
  onClose: () => {}
}

storiesOf('Map', module).add('with meshes and contextMenuPosition', () =>
  <Map {...propsSomeMeshAndContextPosition} />
)

const propsShowDebugTile = {
  meshes: [],
  contextmenuPosition: null,
  isShowDebugTiles: true,
  onContextmenu: event => {},
  onClose: () => {}
}

storiesOf('Map', module).add('show Debug Tile', () =>
  <Map {...propsShowDebugTile} />
)
