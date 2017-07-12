// @flow

import React from 'react'
import { mount } from 'enzyme'
import Map from '../../src/components/Map'

import type { LatLng } from 'waffle-map-mesh-calculator-basic'
import type { MapProps } from '../../src/components/Map'

test('Should render Leaflet Map', () => {
  const props: MapProps = {
    meshes: [],
    contextmenuPosition: null,
    onContextmenu: (event: Event & { latlng: LatLng }) => {},
    onClose: () => {}
  }
  const enzymeWrapper = mount(<Map {...props} />)
  expect(enzymeWrapper.find('.leaflet-container').length).toBe(1)
  expect(enzymeWrapper.find('path.leaflet-interactive').length).toBe(0)
})

// MEMO: Can't test for rendering rectangles
