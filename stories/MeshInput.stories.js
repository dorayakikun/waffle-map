// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import MeshInput from '../src/components/MeshCodeInput'

const propsNoMeshCode = {
  errorMessage: '',
  meshCodes: '',
  separator: '.',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {}
}

storiesOf('MeshCodeInput', module).add('no mesh code', () =>
  <MeshInput {...propsNoMeshCode} />
)

const propsSomeMeshCode = {
  errorMessage: '',
  meshCodes: '5339',
  separator: '.',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {}
}

storiesOf('MeshCodeInput', module).add('with valid mesh code', () =>
  <MeshInput {...propsSomeMeshCode} />
)

const propsSomeInvalidMeshCode = {
  errorMessage: 'some error',
  meshCodes: '5339-99',
  separator: '.',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {}
}

storiesOf('MeshCodeInput', module).add('with invalid mesh code', () =>
  <MeshInput {...propsSomeInvalidMeshCode} />
)

const propsCommas = {
  errorMessage: '',
  meshCodes: '',
  separator: ',',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {}
}

storiesOf('MeshCodeInput', module).add('select commas', () =>
  <MeshInput {...propsCommas} />
)
