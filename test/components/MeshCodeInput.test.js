// @flow

import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import render from 'react-test-renderer'
import MeshInput from '../../src/components/MeshCodeInput'

import type { MeshCodeInputProps } from '../../src/components/MeshCodeInput'

test('Should set props to MeshCodeInput', t => {
  const props: MeshCodeInputProps = {
    errorMessage: '',
    meshCodes: '',
    separator: '.',
    onMeshesChanged: () => {},
    onSeparatorChanged: () => {}
  }
  const tree = render.create(<MeshInput {...props} />).toJSON()
  t.snapshot(tree)
})

test('Should render negative message when errorMessage is not blank', t => {
  const props: MeshCodeInputProps = {
    errorMessage: 'It seems there was something wrong ...',
    meshCodes: '5',
    separator: '.',
    onMeshesChanged: () => {},
    onSeparatorChanged: () => {}
  }
  const tree = render.create(<MeshInput {...props} />).toJSON()
  t.snapshot(tree)
})

test('Should call onMeshesChanged when input meshCodes', t => {
  const onMeshesChanged = sinon.spy()
  const props: MeshCodeInputProps = {
    errorMessage: '',
    meshCodes: '',
    separator: '.',
    onMeshesChanged,
    onSeparatorChanged: () => {}
  }
  const tree = render.create(<MeshInput {...props} />).toJSON()
  t.snapshot(tree)
})

test('Should call onSeparatorChanged when select separator', t => {
  const onSeparatorChanged = sinon.spy()
  const props: MeshCodeInputProps = {
    errorMessage: '',
    meshCodes: '',
    separator: '.',
    onMeshesChanged: () => {},
    onSeparatorChanged
  }
  const tree = render.create(<MeshInput {...props} />).toJSON()
  t.snapshot(tree)
})
