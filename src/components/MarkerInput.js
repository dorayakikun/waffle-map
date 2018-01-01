// @flow
import React, { Component } from 'react';
import { Button, Dropdown, Input, Message } from 'semantic-ui-react';

export type Props = {
  latLng: string,
  unit: string,
  errorMessage: string,
  putMarker: (event: Event, state: State) => void,
  removeAllMarkers: () => void,
  changeUnit: (event: Event, data: { text: string, value: string }) => void,
}

export type State = {
  latLng: string,
  errorMessage: string
}

class MarkerInput extends Component<Props, State> {
  state = {
    latLng: this.props.latLng || '',
    unit: this.props.unit || 'degree',
    errorMessage: this.props.errorMessage || '',
  }

  onChangedLatLng = (e: Event, data: { value: string }) =>
    this.setState({ latLng: data.value })

  onChangedUnit = (e: Event, data: { text: string, value: string }) =>
    this.props.changeUnit(e, data)

  handleClickPutAMarker = (event: Event) =>
    this.props.putMarker(event, this.state)

  handleClickRemoveAllMarkers = (event: Event) =>
    this.props.removeAllMarkers()

  render() {
    const { latLng } = this.state;

    return (
      <div
        onKeyPress={(event: Event) => {
          if (event.key === 'Enter') {
            this.handleClickPutAMarker(event);
          }
        }}
      >
        <Input
          error={this.props.errorMessage !== ''}
          inverted
          onChange={this.onChangedLatLng}
          placeholder="lat,lng"
          style={{
            marginTop: '10px',
            marginRight: '3px',
            marginBottom: '10px',
          }}
          value={latLng}
        />

        <Button icon="marker" onClick={this.handleClickPutAMarker} />
        <Button
          icon="trash outline"
          onClick={this.handleClickRemoveAllMarkers}
        />

        {this.props.errorMessage !== '' && (
          <Message negative>
            <Message.Header>Waffle Map Error</Message.Header>
            <p>{this.props.errorMessage}</p>
          </Message>
        )}

        <Dropdown
          fluid
          onChange={this.onChangedUnit}
          options={[
            {
              text: 'millisec',
              value: 'millisec',
            },
            {
              text: 'degree',
              value: 'degree',
            },
          ]}
          style={{ marginTop: '10px', marginBottom: '10px' }}
          text={this.props.unit}
          value={this.props.unit}
        />
      </div>
    );
  }
}

export default MarkerInput;
