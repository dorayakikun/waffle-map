// @flow

import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import render from 'react-test-renderer'
import TileToggle from '../../src/components/TileToggle'

import type { TileToggleProps } from '../../src/components/TileToggle'

test('Should set props to TileToggle', t => {
  const isShowDebugTiles = false
  const props: TileToggleProps = {
    isShowDebugTiles,
    onToggleChanged: () => {}
  }
  const tree = render.create(<TileToggle {...props} />).toJSON()
  t.snapshot(tree)
})

test('Should call onToggleChanged when changed checked', t => {
  const isShowDebugTiles = false
  const onToggleChanged = sinon.spy()
  const props: TileToggleProps = {
    isShowDebugTiles,
    onToggleChanged
  }
  const tree = render.create(<TileToggle {...props} />).toJSON()
  t.snapshot(tree)
})
