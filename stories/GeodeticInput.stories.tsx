import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { DropdownProps } from 'semantic-ui-react'
import { GeodeticInput } from '../src/components/GeodeticInput'

const defaultProps = {
  changeUnit: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {},
  datum: 'WGS84',
  onDatumChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {},
  unit: 'degree',
}

storiesOf('GeodeticInput', module).add('default', () => (
  <GeodeticInput {...defaultProps} />
))

const changeDatum = { ...defaultProps, datum: 'Tokyo' }
storiesOf('GeodeticInput', module).add('change datum', () => (
  <GeodeticInput {...changeDatum} />
))

const changeUnit = {
  ...defaultProps,
  unit: 'millisec',
}
storiesOf('GeodeticInput', module).add('change unit', () => (
  <GeodeticInput {...changeUnit} />
))
