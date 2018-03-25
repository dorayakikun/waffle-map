// @flow

import * as React from 'react'
import * as render from 'react-test-renderer'
import { MeshCodeInput, Props } from '../MeshCodeInput'

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
  const tree = render.create(<MeshCodeInput {...defaultProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Should render negative message when errorMessage is not blank', () => {
  const invalidProps = {
    ...defaultProps,
    meshCodes: '5',
    errorMessage: 'It seems there was something wrong ...',
  }
  const tree = render.create(<MeshCodeInput {...invalidProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})
