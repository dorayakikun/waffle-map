// @flow
import React from 'react'
import { Dropdown, Input, Label, Message } from 'semantic-ui-react'

export type MeshCodeInputProps = {
  errorMessage: string,
  meshCodes: string,
  separator: string,
  onMeshesChanged: (event: Element & { target: HTMLInputElement }) => void,
  onSeparatorChanged: (
    event: Event,
    data: { text: string, value: string }
  ) => void
}

type SeparatorItem = {
  text: string,
  value: string
}

const separatorOptions: Array<SeparatorItem> = [
  {
    text: 'commas',
    value: ','
  },
  {
    text: 'dots',
    value: '.'
  }
]

const fetchTextFrom = (
  options: Array<SeparatorItem>,
  value: string
): string => {
  return options.filter(o => o.value === value).map(o => o.text).toString()
}

const MeshCodeInput = (props: MeshCodeInputProps) =>
  <div>
    <Input
      error={props.errorMessage !== ''}
      fluid
      label={<Label color="teal">mesh codes</Label>}
      placeholder="e.g. 5339-35-97"
      onChange={props.onMeshesChanged}
      value={props.meshCodes}
    />
    {props.errorMessage !== '' &&
      <Message negative>
        <Message.Header>Waffle Map Error</Message.Header>
        <p>
          {props.errorMessage}
        </p>
      </Message>}
    <Dropdown
      fluid
      onChange={props.onSeparatorChanged}
      options={separatorOptions}
      text={`Split with ${fetchTextFrom(separatorOptions, props.separator)}`}
      value={props.separator}
    />
  </div>

export default MeshCodeInput
