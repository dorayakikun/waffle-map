// @flow

import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import MeshInput from '../../src/components/MeshInput'

test('Should set props to MeshInput', () => {
  const props = {
    meshesString: '',
    separator: '.',
    onMeshesChanged: jest.fn(),
    onSeparatorChanged: jest.fn()
  }
  const enzymeWrapper = mount(<MeshInput {...props} />)
  expect(enzymeWrapper.props().meshesString).toBe('')
  expect(enzymeWrapper.props().separator).toBe('.')
})

test('Should call onMeshesChanged when input meshString', () => {
  const onMeshesChanged = sinon.spy()
  const props = {
    meshesString: '',
    separator: '.',
    onMeshesChanged,
    onSeparatorChanged: jest.fn()
  }
  const enzymeWrapper = mount(<MeshInput {...props} />)
  enzymeWrapper.find('input').simulate('change', { target: { value: '5339' } })
  expect(onMeshesChanged).toHaveProperty('callCount', 1)
})
