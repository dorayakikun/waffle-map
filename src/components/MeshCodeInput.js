// @flow
import React from 'react'
import { Dropdown, Input, Label, Message } from 'semantic-ui-react'

export type MeshCodeInputProps = {
  errorMessage: string,
  meshCodes: string,
  datum: string,
  separator: string,
  onMeshesChanged: (event: Element & { target: HTMLInputElement }) => void,
  onDatumChanged: (event: Event, data: { text: string, value: string }) => void,
  onSeparatorChanged: (
    event: Event,
    data: { text: string, value: string }
  ) => void
}

type OptionItem = {
  text: string,
  value: string
}

const datumOptions: Array<OptionItem> = [
  {
    text: 'Tokyo',
    value: 'Tokyo'
  },
  {
    text: 'WGS84',
    value: 'WGS84'
  }
]

const separatorOptions: Array<OptionItem> = [
  {
    text: 'commas',
    value: ','
  },
  {
    text: 'dots',
    value: '.'
  }
]

const fetchTextFrom = (options: Array<OptionItem>, value: string): string => {
  return options
    .filter(o => o.value === value)
    .map(o => o.text)
    .toString()
}

const MeshCodeInput = (props: MeshCodeInputProps) => (
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

export default MeshCodeInput
