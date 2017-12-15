// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import Map from '../src/components/Map'

import type { LatLng } from '../src/domain/calculateMesh'

const someMesh = {
  code: '5339',
  center: { lat: 35.66667, lng: 139.5 },
  bounds: {
    leftTop: { lat: 36, lng: 139 },
    rightBottom: { lat: 35.33334, lng: 140 }
  }
}
const otherMesh = {
  code: '5339',
  center: { lat: 35.66667, lng: 139.5 },
  bounds: {
    leftTop: { lat: 36, lng: 139 },
    rightBottom: { lat: 35.33334, lng: 140 }
  }
}

const propsDefault = {
  meshes: [],
  contextmenuPosition: null,
  isShowDebugTiles: false,
  isShowMeshes: false,
  markerPositions: [],
  datum: 'wgs84',
  onContextmenu: (event: Event & { latlng: LatLng }) => { },
  onClose: () => { }
}
const propsSomeMesh = Object.assign({}, { ...propsDefault, meshes: [someMesh] })
const propsMeshes = Object.assign({}, { ...propsDefault, meshes: [someMesh, otherMesh] })
const propsSomeMeshAndContextPosition = Object.assign({}, { ...propsSomeMesh, contextmenuPosition: { lat: 35.6896, lng: 139.6921 } })
const propsShowDebugTile = Object.assign({}, { ...propsDefault, isShowDebugTiles: true })

storiesOf('Map', module).add('no mesh', () => <Map {...propsDefault} />)
storiesOf('Map', module).add('with mesh', () => <Map {...propsSomeMesh} />)
storiesOf('Map', module).add('with meshes', () => <Map {...propsMeshes} />)
storiesOf('Map', module).add('with meshes and contextMenuPosition', () => (<Map {...propsSomeMeshAndContextPosition} />))
storiesOf('Map', module).add('show Debug Tile', () => (<Map {...propsShowDebugTile} />))
