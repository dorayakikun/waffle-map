import * as React from 'react'
import {
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Input,
  InputOnChangeData,
  Message,
} from 'semantic-ui-react'

export interface Props {
  errorMessage: string
  meshCodes: string
  separator: string
  onMeshesChanged: (
    event: React.SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void
  onSeparatorChanged: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void
}

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

const fetchTextFrom = (options: DropdownItemProps[], value: string): string => {
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
      onChange={props.onSeparatorChanged}
      options={separatorOptions}
      style={{ marginTop: '10px', marginBottom: '10px' }}
      text={`Split with ${fetchTextFrom(separatorOptions, props.separator)}`}
      value={props.separator}
    />
  </div>
)
