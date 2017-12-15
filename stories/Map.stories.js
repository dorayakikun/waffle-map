// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import Map from '../src/components/Map'

import type { LatLng } from '../src/domain/calculateMesh'

const someMesh = {
  code: '5031',
  center: { lat: 33.66667, lng: 131.5 },
  bounds: {
    leftTop: { lat: 34, lng: 131 },
    rightBottom: { lat: 33.33334, lng: 132 }
  }
}
const otherMesh = {
  code: '6041',
  center: { lat: 40.33334, lng: 141.5 },
  bounds: {
    leftTop: { lat: 40.66667, lng: 141 },
    rightBottom: { lat: 40, lng: 142 }
  }
}

const propsDefault = {
  meshes: [],
  contextmenuPosition: null,
  isShowDebugTiles: false,
  isShowMeshes: false,
  markerPositions: [],
  datum: 'wgs84',
  onContextmenu: (event: Event & { latlng: LatLng }) => {},
  onClose: () => {}
}
const propsSomeMesh = Object.assign({}, { ...propsDefault, meshes: [someMesh] })
const propsMeshes = Object.assign(
  {},
  { ...propsDefault, meshes: [someMesh, otherMesh] }
)
const propsSomeMeshAndContextPosition = Object.assign(
  {},
  { ...propsSomeMesh, contextmenuPosition: { lat: 35.6896, lng: 139.6921 } }
)
const propsShowDebugTile = Object.assign(
  {},
  { ...propsDefault, isShowDebugTiles: true }
)

storiesOf('Map', module).add('no mesh', () => <Map {...propsDefault} />)
storiesOf('Map', module).add('with mesh', () => <Map {...propsSomeMesh} />)
storiesOf('Map', module).add('with meshes', () => <Map {...propsMeshes} />)
storiesOf('Map', module).add('with meshes and contextMenuPosition', () => (
  <Map {...propsSomeMeshAndContextPosition} />
))
storiesOf('Map', module).add('show Debug Tile', () => (
  <Map {...propsShowDebugTile} />
))
