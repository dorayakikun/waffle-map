// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import MeshDetail from '../src/components/MeshDetail'

const props = {
  code: '5339',
  center: { lat: 35.66667, lng: 139.5 },
  bounds: {
    leftTop: { lat: 36, lng: 139 },
    rightBottom: { lat: 35.33334, lng: 140 }
  }
}

storiesOf('Mesh Detail', module).add('default', () => <MeshDetail {...props} />)
