import React from 'react'

import { storiesOf } from '@storybook/react'

import Map from '../src/components/Map'

const props = {
  meshes: [
    {
      code: '5339',
      center: { lat: 35.66667, lng: 139.5 },
      bounds: {
        leftTop: { lat: 36, lng: 139 },
        rightBottom: { lat: 35.33334, lng: 140 }
      }
    }
  ],
  contextmenuPosition: null,
  onContextmenu: event => {},
  onClose: () => {}
}

storiesOf('Map', module).add('with mesh', () => <Map {...props} />)
