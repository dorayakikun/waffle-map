// @flow

import React from 'react'
import render from 'react-test-renderer'
import MeshInput from '../../src/components/MeshCodeInput'

import type { Props } from '../../src/components/MeshCodeInput'

const defaultProps: Props = {
  errorMessage: '',
  meshCodes: '',
  separator: '.',
  datum: 'wgs84',
  onMeshesChanged: () => {},
  onSeparatorChanged: () => {},
  onDatumChanged: () => {},
}

test('Should set props to MeshCodeInput', () => {
  const tree = render.create(<MeshInput {...defaultProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Should render negative message when errorMessage is not blank', () => {
  const invalidProps = {
    ...defaultProps,
    meshCodes: '5',
    errorMessage: 'It seems there was something wrong ...',
  }
  const tree = render.create(<MeshInput {...invalidProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})
