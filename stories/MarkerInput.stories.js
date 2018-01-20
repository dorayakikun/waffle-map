// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import MarkerInput from '../src/components/MarkerInput'

const propsNoLatLng = {
  latLng: '',
  unit: 'degree',
  errorMessage: '',
  putMarker: () => {},
  removeAllMarkers: () => {},
  changeUnit: () => {},
}

storiesOf('MarkerInput', module).add('no latlng', () => (
  <MarkerInput {...propsNoLatLng} />
))
