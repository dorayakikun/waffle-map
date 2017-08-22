// @flow
import React, { Component } from 'react'
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react'

export type MarkerInputProps = {
  latLng: string,
  datum: string,
  errorMessage: string
}

class MarkerInput extends Component {
  state = {
    latLng: '',
    datum: 'degree'
  }

  handleChange = (e, { latLng, value }) => {
    console.log(latLng, value)
    this.setState({ [latLng]: value })
  }

  handleSubmit = () => {}

  render() {
    const { latLng, datum } = this.state

    return (
      <div>
        <Input
          inverted
          label="LatLng"
          onChange={this.handleChange}
          placeholder="lat,lng"
          value={latLng}
        />
        <Button>Put a marker</Button>
        <Button>Remove all markers</Button>
        <div>
          <Dropdown
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
            text="millisec"
            value="millisec"
          />
        </div>
      </div>
    )
  }
}

export default MarkerInput
