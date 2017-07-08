// @flow

import React from 'react'
import { mount } from 'enzyme'
import MeshDetail from '../../src/components/MeshDetail'
import { meshToLatLng, meshToBounds } from '../../src/MeshCalculator'

test('Should set props to MeshDetail', () => {
  const mesh = '5339'
  const center = meshToLatLng(mesh)
  const bounds = meshToBounds(mesh)

  const props = {
    code: mesh,
    center,
    bounds
  }
  const enzymeWrapper = mount(<MeshDetail {...props} />)

  expect(enzymeWrapper.childAt(0).childAt(0).childAt(1).text()).toBe(mesh)
  expect(enzymeWrapper.childAt(0).childAt(1).childAt(1).text()).toBe(
    `${center.lat}${center.lng}`
  )
  expect(enzymeWrapper.childAt(0).childAt(2).childAt(1).text()).toBe(
    `${bounds.leftTop.lat}${bounds.leftTop.lng}`
  )
  expect(enzymeWrapper.childAt(0).childAt(3).childAt(1).text()).toBe(
    `${bounds.rightBottom.lat}${bounds.rightBottom.lng}`
  )
})
