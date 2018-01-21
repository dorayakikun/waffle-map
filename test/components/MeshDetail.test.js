// @flow

import test from 'ava'
import React from 'react'
import render from 'react-test-renderer'
import { toCenterLatLng, toBounds } from 'waffle-map-mesh-calculator-basic'
import MeshDetail from '../../src/components/MeshDetail'

import type { Props } from '../../src/components/MeshDetail'

test('Should set props to MeshDetail', t => {
  const meshCode = '5339'
  const center = toCenterLatLng(meshCode)
  const bounds = toBounds(meshCode)

  const props: Props = {
    code: meshCode,
    center,
    bounds,
  }
  const tree = render.create(<MeshDetail {...props} />).toJSON()
  t.snapshot(tree)
})
