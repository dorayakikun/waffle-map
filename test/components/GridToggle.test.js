// @flow

import React from 'react'
import render from 'react-test-renderer'
import GridToggle from '../../src/components/GridToggle'

import type { Props } from '../../src/components/GridToggle'

test('Should set props to MeshToggle', () => {
  const isShowGrid = false
  const props: Props = {
    title: 'Show grid',
    isShowGrid,
    onToggleChanged: () => {},
  }
  const tree = render.create(<GridToggle {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Should call onToggleChanged when changed checked', () => {
  const isShowGrid = false
  const onToggleChanged = () => {}
  const props: Props = {
    title: 'Show grid',
    isShowGrid,
    onToggleChanged,
  }
  const tree = render.create(<GridToggle {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
