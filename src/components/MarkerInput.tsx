import * as React from 'react'
import { Button, Dropdown, DropdownProps, Input, Message, InputOnChangeData } from 'semantic-ui-react'

export interface Props {
  latLng: string,
  unit: string,
  errorMessage: string,
  putMarker: (event: React.SyntheticEvent<HTMLElement>, state: State) => void,
  removeAllMarkers: () => void,
  changeUnit: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void,
}

export interface State {
  latLng: string,
  unit: string,
  errorMessage: string,
}

export class MarkerInput extends React.Component<Props, State> {
  state = {
    latLng: this.props.latLng || '',
    unit: this.props.unit || 'degree',
    errorMessage: this.props.errorMessage || '',
  }

  onChangedLatLng = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => this.setState({ latLng: data.value })

  onChangedUnit = (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => this.props.changeUnit(e, data)

  handleClickPutAMarker = (event: React.SyntheticEvent<HTMLElement>) => this.props.putMarker(event, this.state)

  handleClickRemoveAllMarkers = (event: React.SyntheticEvent<HTMLElement>) => this.props.removeAllMarkers()

  render() {
    const { latLng } = this.state
    return (
      <div
        onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === 'Enter') {
            this.handleClickPutAMarker(event)
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
    )
  }
}
