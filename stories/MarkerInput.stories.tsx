import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { MarkerInput } from '../src/components/MarkerInput'

const propsNoLatLng = {
  changeUnit: () => {},
  errorMessage: '',
  latLng: '',
  putMarker: () => {},
  removeAllMarkers: () => {},
  unit: 'degree',
}

storiesOf('MarkerInput', module).add('no latlng', () => (
  <MarkerInput {...propsNoLatLng} />
))
