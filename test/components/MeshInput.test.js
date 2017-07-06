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
  expect(
    enzymeWrapper.find('.ui .fluid .labeled input').find('input').length
  ).toBe(1)
  expect(enzymeWrapper.find('.ui .teal .label .label').text()).toBe('meshes')
  expect(enzymeWrapper.find('.selected .item').text()).toBe('dots')
})

test('Should call onMeshesChanged when input meshesString', () => {
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

test('Should call onSeparatorChanged when select separator', () => {
  const onSeparatorChanged = sinon.spy()
  const props = {
    meshesString: '',
    separator: '.',
    onMeshesChanged: jest.fn(),
    onSeparatorChanged
  }
  const enzymeWrapper = mount(<MeshInput {...props} />)
  enzymeWrapper
    .find('.selected .item')
    .simulate('change', { target: { value: ',' } })
  expect(onSeparatorChanged).toHaveProperty('callCount', 1)
})
