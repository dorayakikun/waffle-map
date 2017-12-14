// @flow

import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import render from 'react-test-renderer'
import MeshInput from '../../src/components/MeshCodeInput'

import type { Props } from '../../src/components/MeshCodeInput'

const defaultProps: Props = {
  errorMessage: '',
  meshCodes: '',
  separator: '.',
  datum: 'wgs84',
  onMeshesChanged: () => { },
  onSeparatorChanged: () => { },
  onDatumChanged: () => { },
}

test('Should set props to MeshCodeInput', t => {
  const tree = render.create(<MeshInput {...defaultProps} />).toJSON()
  t.snapshot(tree)
})

test('Should render negative message when errorMessage is not blank', t => {
  const tree = render.create(<MeshInput {...Object.assign({}, { ...defaultProps, meshCodes: '5', errorMessage: 'It seems there was something wrong ...' })
  } />).toJSON()
  t.snapshot(tree)
})
