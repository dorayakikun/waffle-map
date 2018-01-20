// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import MeshCodeInput from '../src/components/MeshCodeInput'

const defaultProps = {
  errorMessage: '',
  meshCodes: '',
  separator: '.',
  datum: 'wgs84',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {},
  onDatumChanged: () => {},
}

storiesOf('MeshCodeInput', module).add('no mesh code', () => (
  <MeshCodeInput {...defaultProps} />
))

const someMeshCode = Object.assign({}, { ...defaultProps, meshCodes: '5339' })
storiesOf('MeshCodeInput', module).add('with valid mesh code', () => (
  <MeshCodeInput {...someMeshCode} />
))

const someInvalidMeshCode = {
  ...defaultProps,
  errorMessage: 'some error',
  meshCodes: '5339-99',
}
storiesOf('MeshCodeInput', module).add('with invalid mesh code', () => (
  <MeshCodeInput {...someInvalidMeshCode} />
))

const useCommas = Object.assign({}, { ...defaultProps, separator: ',' })
storiesOf('MeshCodeInput', module).add('select commas', () => (
  <MeshCodeInput {...useCommas} />
))
