import * as React from 'react'
import { CheckboxProps } from 'semantic-ui-react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { GridToggle } from '../src/components/GridToggle'

const propsShowMeshes = {
  title: 'Show grid',
  isShowGrid: true,
  // linkTo('MeshToggle', 'hide meshes')
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {},
}

storiesOf('GridToggle', module).add('show meshes', () => (
  <GridToggle {...propsShowMeshes} />
))

const propsHideMeshes = {
  title: 'Show grid',
  isShowGrid: false,
  // linkTo('MeshToggle', 'show meshes')
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {},
}
storiesOf('GridToggle', module).add('hide meshes', () => (
  <GridToggle {...propsHideMeshes} />
))
