// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import MeshToggle from '../src/components/MeshToggle'

const propsShowMeshes = {
  isShowMeshes: true,
  onToggleChanged: linkTo('MeshToggle', 'hide meshes')
}

storiesOf('MeshToggle', module).add('show meshes', () => (
  <MeshToggle {...propsShowMeshes} />
))

const propsHideMeshes = {
  isShowMeshes: false,
  onToggleChanged: linkTo('MeshToggle', 'show meshes')
}
storiesOf('MeshToggle', module).add('hide meshes', () => (
  <MeshToggle {...propsHideMeshes} />
))
