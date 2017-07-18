// @flow

import React from 'react'
import { mount } from 'enzyme'
import { meshToLatLng, meshToBounds } from 'waffle-map-mesh-calculator-basic'
import MeshDetail from '../../src/components/MeshDetail'
import { round } from '../../src/domain/roundPoint'

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
    `${round(center.lat, 5)}${round(center.lng, 5)}`
  )
  expect(enzymeWrapper.childAt(0).childAt(2).childAt(1).text()).toBe(
    `${round(bounds.leftTop.lat, 5)}${round(bounds.leftTop.lng, 5)}`
  )
  expect(enzymeWrapper.childAt(0).childAt(3).childAt(1).text()).toBe(
    `${round(bounds.rightBottom.lat, 5)}${round(bounds.rightBottom.lng, 5)}`
  )
})
