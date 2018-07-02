import * as React from 'react'
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  InputOnChangeData,
  Message,
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
  public state = {
    errorMessage: this.props.errorMessage || '',
    latLng: this.props.latLng || '',
  }

  public onChangedLatLng = (
    event: React.SyntheticEvent<HTMLElement>,
    data: InputOnChangeData
  ) => this.setState({ latLng: data.value })

  public handleClickPutAMarker = (event: React.SyntheticEvent<HTMLElement>) => {
    if ((event as React.KeyboardEvent<HTMLElement>).key === 'Enter') {
      this.props.putMarker(event, this.state)
    }
  }

  public handleClickRemoveAllMarkers = (
    event: React.SyntheticEvent<HTMLElement>
  ) => this.props.removeAllMarkers()

  public render() {
    const { latLng } = this.state
    return (
      <div onKeyPress={this.handleClickPutAMarker}>
        <Input
          error={this.props.errorMessage !== ''}
          inverted={true}
          onChange={this.onChangedLatLng}
          placeholder="lat,lng"
          style={{
            marginBottom: '10px',
            marginRight: '3px',
            marginTop: '10px',
          }}
          value={latLng}
        />

        <Button icon="marker" onClick={this.handleClickPutAMarker} />
        <Button
          icon="trash"
          onClick={this.handleClickRemoveAllMarkers}
        />

        {this.props.errorMessage !== '' && (
          <Message negative={true}>
            <Message.Header>Waffle Map Error</Message.Header>
            <p>{this.props.errorMessage}</p>
          </Message>
        )}
      </div>
    )
  }
}
