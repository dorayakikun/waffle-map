// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import MarkerInput from '../src/components/MarkerInput'

const propsNoLatLng = {
  latLng: '',
  unit: 'degree',
  errorMessage: ''
}

storiesOf('MarkerInput', module).add('no latlng', () =>
  <MarkerInput {...propsNoLatLng} />
)
