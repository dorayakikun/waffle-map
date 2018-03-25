import * as React from 'react'
import { Dropdown, DropdownProps, Input, Message, InputOnChangeData } from 'semantic-ui-react'

export type Props = {
  errorMessage: string,
  meshCodes: string,
  datum: string,
  separator: string,
  onMeshesChanged: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => void,
  onDatumChanged: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void,
  onSeparatorChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void,
}

export interface OptionItem {
  text: string,
  value: string,
}

const datumOptions = [
  {
    text: 'Tokyo',
    value: 'Tokyo',
  },
  {
    text: 'WGS84',
    value: 'WGS84',
  },
]

const separatorOptions = [
  {
    text: 'commas',
    value: ',',
  },
  {
    text: 'dots',
    value: '.',
  },
]

const fetchTextFrom = (options: Array<OptionItem>, value: string): string => {
  return options
    .filter(o => o.value === value)
    .map(o => o.text)
    .toString()
}

export const MeshCodeInput = (props: Props) => (
  <div>
    <Input
      error={props.errorMessage !== ''}
      fluid
      placeholder="5339-35-97.5339-35-98.5339-35-99"
      onChange={props.onMeshesChanged}
      style={{ marginTop: '10px', marginBottom: '10px' }}
      value={props.meshCodes}
    />
    {props.errorMessage !== '' && (
      <Message negative>
        <Message.Header>Waffle Map Error</Message.Header>
        <p>{props.errorMessage}</p>
      </Message>
    )}
    <Dropdown
      fluid
      onChange={props.onDatumChanged}
      options={datumOptions}
      style={{ marginTop: '10px', marginBottom: '10px' }}
      text={props.datum}
      value={props.datum}
    />
    <Dropdown
      fluid
      onChange={props.onSeparatorChanged}
      options={separatorOptions}
      style={{ marginTop: '10px', marginBottom: '10px' }}
      text={`Split with ${fetchTextFrom(separatorOptions, props.separator)}`}
      value={props.separator}
    />
  </div>
)
