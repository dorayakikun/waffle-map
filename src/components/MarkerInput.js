// @flow
import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export type MarkerInputProps = {
  latLng: string,
  datum: string,
  errorMessage: string
}

const MarkerInput = (props: MarkerInputProps) =>
  <Form>
    <Form.Input label="LatLng" placeholder="xxx" value={props.latLng} />
    <Button type="submit">Submit</Button>
  </Form>

export default MarkerInput
