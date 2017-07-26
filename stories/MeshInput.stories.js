import React from 'react'

import { storiesOf } from '@storybook/react'

import MeshInput from '../src/components/MeshInput'

const props = {
  errorMessage: '',
  meshCodes: '5339',
  separator: '.',
  onMeshesChanged: event => {},
  onSeparatorChanged: (event, data) => {}
}

storiesOf('MeshInput', module).add('with valid mesh code', () =>
  <MeshInput {...props} />
)
