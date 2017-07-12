// @flow

import React from 'react'
import { mount } from 'enzyme'
import MeshDetail from '../../src/components/MeshDetail'
import { meshToLatLng, meshToBounds } from 'waffle-map-mesh-calculator-basic'

import type { MeshDetailProps } from '../../src/components/MeshDetail'

test('Should set props to MeshDetail', () => {
  const meshCode = '5339'
  const center = meshToLatLng(meshCode)
  const bounds = meshToBounds(meshCode)

  const props: MeshDetailProps = {
    code: meshCode,
    center,
    bounds
  }
  const enzymeWrapper = mount(<MeshDetail {...props} />)

  expect(enzymeWrapper.childAt(0).childAt(0).childAt(1).text()).toBe(meshCode)
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