// @flow
import React, { Component } from 'react'
import {
  Button,
  Dropdown,
  Icon,
  Input,
  Label,
  Message
} from 'semantic-ui-react'

export type MarkerInputState = {
  latLng: string,
  unit: string,
  errorMessage: string
}

export type MarkerInputProps = {
  latLng: string,
  unit: string,
  errorMessage: string,
  putMarker: (event: Event, state: MarkerInputState) => void,
  removeAllMarkers: () => void
}

class MarkerInput extends Component {
  state = {
    latLng: this.props.latLng || '',
    unit: this.props.unit || 'degree',
    errorMessage: this.props.errorMessage || ''
  }

  onChangedLatLng = (e: Event, data: { value: string }) =>
    this.setState({ latLng: data.value })

  onChangedUnit = (e: Event, data: { value: string }) =>
    this.setState({ unit: data.value })

  handleClickPutAMarker = (event: Event) => {
    this.props.putMarker(event, this.state)
  }

  handleClickRemoveAllMarkers = (event: Event) => {
    this.props.removeAllMarkers(event, this.state)
  }

  render() {
    const { latLng, unit } = this.state
    const { putMarker, removeAllMarkers } = this.props

    return (
      <div>
        <Input
          error={this.props.errorMessage !== ''}
          fluid
          inverted
          label={<Label color="teal">LatLng</Label>}
          onChange={this.onChangedLatLng}
          placeholder="lat,lng"
          style={{ marginTop: '10px', marginBottom: '10px' }}
          value={latLng}
        />

        {this.props.errorMessage !== '' &&
          <Message negative>
            <Message.Header>Waffle Map Error</Message.Header>
            <p>
              {this.props.errorMessage}
            </p>
          </Message>}

        <Dropdown
          fluid
          onChange={this.onChangedUnit}
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
          text={unit}
          value={unit}
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
