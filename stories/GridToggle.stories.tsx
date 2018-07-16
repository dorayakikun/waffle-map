import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { CheckboxProps } from 'semantic-ui-react'
import { GridToggle } from '../src/components/GridToggle'

const propsShowMeshes = {
  isShowGrid: true,
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {},
  title: 'Show grid',
}

storiesOf('GridToggle', module).add('show meshes', () => (
  <GridToggle {...propsShowMeshes} />
))

const propsHideMeshes = {
  isShowGrid: false,
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {},
  title: 'Show grid',
}
storiesOf('GridToggle', module).add('hide meshes', () => (
  <GridToggle {...propsHideMeshes} />
))
