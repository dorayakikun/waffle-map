import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Map } from '../src/components/Map'
import { LatLng } from '../src/domain/calculateMesh'

const someMesh = {
  bounds: {
    leftTop: { lat: 34, lng: 131 },
    rightBottom: { lat: 33.33334, lng: 132 },
  },
  center: { lat: 33.66667, lng: 131.5 },
  code: '5031',
}
const otherMesh = {
  bounds: {
    leftTop: { lat: 40.66667, lng: 141 },
    rightBottom: { lat: 40, lng: 142 },
  },
  center: { lat: 40.33334, lng: 141.5 },
  code: '6041',
}

const propsDefault = {
  contextmenuPosition: undefined,
  datum: 'wgs84',
  isShowDebugTiles: false,
  isShowMeshes: false,
  markerPositions: [],
  meshes: [],
  onClose: () => {},
  onContextmenu: (event: Event & { latlng: LatLng }) => {},
  unit: 'degree',
}
const propsSomeMesh = { ...propsDefault, meshes: [someMesh] }
const propsMeshes = { ...propsDefault, meshes: [someMesh, otherMesh] }
const propsSomeMeshAndContextPosition = {
  ...propsSomeMesh,
  contextmenuPosition: { lat: 35.6896, lng: 139.6921 },
}
const propsShowDebugTile = { ...propsDefault, isShowDebugTiles: true }
const propsShowMeshes = { ...propsDefault, isShowMeshes: true }

storiesOf('Map', module).add('no mesh', () => <Map {...propsDefault} />)
storiesOf('Map', module).add('with mesh', () => <Map {...propsSomeMesh} />)
storiesOf('Map', module).add('with meshes', () => <Map {...propsMeshes} />)
storiesOf('Map', module).add('with meshes and contextMenuPosition', () => (
  <Map {...propsSomeMeshAndContextPosition} />
))
storiesOf('Map', module).add('show Debug Tile', () => (
  <Map {...propsShowDebugTile} />
))
storiesOf('Map', module).add('show Grid Meshes', () => (
  <Map {...propsShowMeshes} />
))
