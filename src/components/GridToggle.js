// @flow
import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export type Props = {
  title: string,
  isShowGrid: boolean,
  onToggleChanged: (event: Event, data: { checked: boolean }) => void,
}

const GridToggle = (props: Props) => (
  <div>
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <span style={{ fontColor: 'white', marginRight: 5 }}>{props.title}</span>
      <Checkbox
        checked={props.isShowGrid}
        onChange={props.onToggleChanged}
        toggle
      />
    </div>
  </div>
)

export default GridToggle
