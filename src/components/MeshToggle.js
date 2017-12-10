// @flow
import React from 'react'
import { Checkbox, Label } from 'semantic-ui-react'

export type Props = {
  isShowMeshes: boolean,
  onToggleChanged: (event: Event, data: { checked: boolean }) => void
}

const MeshToggle = (props: Props) => (
  <div>
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <span
        style={{
          fontColor: 'white',
          marginRight: 5
        }}
      >
        Show meshes
      </span>
      <Checkbox
        checked={props.isShowMeshes}
        onChange={props.onToggleChanged}
        toggle
      />
    </div>
  </div>
)

export default MeshToggle
