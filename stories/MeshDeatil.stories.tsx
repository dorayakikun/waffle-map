import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { MeshDetail } from '../src/components/MeshDetail'

const props = {
  bounds: {
    leftTop: { lat: 36, lng: 139 },
    rightBottom: { lat: 35.33334, lng: 140 },
  },
  center: { lat: 35.66667, lng: 139.5 },
  code: '5339',
}

storiesOf('MeshDetail', module).add('default', () => <MeshDetail {...props} />)
