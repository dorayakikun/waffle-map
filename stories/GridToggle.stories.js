// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import GridToggle from '../src/components/GridToggle'

const propsShowMeshes = {
  title: 'Show grid',
  isShowGrid: true,
  onToggleChanged: linkTo('MeshToggle', 'hide meshes')
}

storiesOf('MeshToggle', module).add('show meshes', () => (
  <GridToggle {...propsShowMeshes} />
))

const propsHideMeshes = {
  title: 'Show grid',
  isShowGrid: false,
  onToggleChanged: linkTo('MeshToggle', 'show meshes')
}
storiesOf('MeshToggle', module).add('hide meshes', () => (
  <GridToggle {...propsHideMeshes} />
))
