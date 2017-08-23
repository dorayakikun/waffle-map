// @flow
import React, { Component } from 'react'
import { Button, Dropdown, Label, Icon, Input } from 'semantic-ui-react'

export type MarkerInputState = {
  latLng: string,
  datum: string
}

export type MarkerInputProps = {
  latLng: string,
  datum: string,
  errorMessage: string,
  putMarker: (event: Event, state: MarkerInputState) => void,
  removeAllMarkers: (event: Event, state: MarkerInputState) => void
}

class MarkerInput extends Component {
  state = {
    latLng: this.props.latLng || '',
    datum: this.props.datum || 'degree'
  }

  onChangedLatLng = (e: Event, data: { value: string }) =>
    this.setState({ latLng: data.value })

  onChangedDatum = (e: Event, data: { value: string }) =>
    this.setState({ datum: data.value })

  handleClickPutAMarker = (event: Event) => {
    this.props.putMarker(event, this.state)
  }

  handleClickRemoveAllMarkers = (event: Event) => {
    this.props.removeAllMarkers(event, this.state)
  }

  render() {
    const { latLng, datum } = this.state
    const { putMarker, removeAllMarkers } = this.props

    return (
      <div>
        <Input
          fluid
          inverted
          label={<Label color="teal">LatLng</Label>}
          onChange={this.onChangedLatLng}
          placeholder="lat,lng"
          style={{ marginTop: '10px', marginBottom: '10px' }}
          value={latLng}
        />
        <Dropdown
          fluid
          onChange={this.onChangedDatum}
          options={[
            {
              text: 'millisec',
              value: 'millisec'
            },
            {
              text: 'degree',
              value: 'degree'
            }
          ]}
          style={{ marginTop: '10px', marginBottom: '10px' }}
          text={datum}
          value={datum}
        />
        <Button
          fluid
          style={{ marginTop: '10px', marginBottom: '10px' }}
          onClick={this.handleClickPutAMarker}
        >
          Put a marker
        </Button>
        <Button
          fluid
          style={{ marginTop: '10px', marginBottom: '10px' }}
          onClick={this.handleClickRemoveAllMarkers}
        >
          Remove all markers
        </Button>
      </div>
    )
  }
}

export default MarkerInput
