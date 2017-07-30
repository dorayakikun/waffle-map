// @flow

import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import TileToggle from '../../src/components/TileToggle'

import type { TileToggleProps } from '../../src/components/TileToggle'

test('Should set props to TileToggle', () => {
  const isShowDebugTiles = false
  const props: TileToggleProps = {
    isShowDebugTiles,
    onToggleChanged: jest.fn()
  }
  const enzymeWrapper = mount(<TileToggle {...props} />)
  expect(enzymeWrapper.find('span').text()).toBe('Show tiles')
  expect(
    enzymeWrapper.find('.ui .fitted .toggle .checkbox').find('input').length
  ).toBe(1)
})

test('Should call onToggleChanged when changed checked', () => {
  const isShowDebugTiles = false
  const onToggleChanged = sinon.spy()
  const props: TileToggleProps = {
    isShowDebugTiles,
    onToggleChanged
  }
  const enzymeWrapper = mount(<TileToggle {...props} />)
  enzymeWrapper
    .find('.ui .fitted .toggle .checkbox')
    .simulate('change', { target: { checked: true } })
  expect(onToggleChanged).toHaveProperty('callCount', 1)
})
