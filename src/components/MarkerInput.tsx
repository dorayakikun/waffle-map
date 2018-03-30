import * as React from 'react'
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  Message,
  InputOnChangeData,
} from 'semantic-ui-react'

export interface Props {
  latLng: string
  errorMessage: string
  putMarker: (event: React.SyntheticEvent<HTMLElement>, state: State) => void
  removeAllMarkers: () => void
}

export interface State {
  latLng: string
  errorMessage: string
}

export class MarkerInput extends React.Component<Props, State> {
  state = {
    latLng: this.props.latLng || '',
    errorMessage: this.props.errorMessage || '',
  }

  onChangedLatLng = (
    event: React.SyntheticEvent<HTMLElement>,
    data: InputOnChangeData
  ) => this.setState({ latLng: data.value })

  handleClickPutAMarker = (event: React.SyntheticEvent<HTMLElement>) =>
    this.props.putMarker(event, this.state)

  handleClickRemoveAllMarkers = (event: React.SyntheticEvent<HTMLElement>) =>
    this.props.removeAllMarkers()

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
      </div>
    )
  }
}
