// @flow
import React, { PropTypes } from 'react'
import { Dropdown, Input, Label } from 'semantic-ui-react'

export type SeparatorItem = {
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

const MeshInput = ({
  meshes,
  separator,
  onMeshesChanged,
  onSeparatorChanged
}: any) =>
  <div>
    <Input
      fluid
      label={<Label color="teal">meshes</Label>}
      placeholder="e.g. 5339-35-97"
      onChange={onMeshesChanged}
      value={meshes}
    />
    <Dropdown
      fluid
      onChange={onSeparatorChanged}
      options={separatorOptions}
      text={`Split with ${fetchTextFrom(separatorOptions, separator)}.`}
    />
  </div>

MeshInput.propTypes = {
  meshes: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired,
  onMeshesChanged: PropTypes.func.isRequired,
  onSeparatorChanged: PropTypes.func.isRequired
}

export default MeshInput
