// @flow

import React from 'react'
import { Table } from 'semantic-ui-react'
import { round } from '../domain/roundPoint'

import type { Bounds, LatLng } from '../domain/calculateMesh'

export type MeshDetailProps = {
  code: string,
  center: LatLng,
  bounds: Bounds
}

const MeshDetail = (props: MeshDetailProps) =>
  <Table inverted>
    <Table.Body>
      <Table.Row>
        <Table.Cell>mesh code</Table.Cell>
        <Table.Cell>
          {props.code}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>center</Table.Cell>
        <Table.Cell>
          {round(props.center.lat, 5)}
          <br />
          {round(props.center.lng, 5)}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>leftTop</Table.Cell>
        <Table.Cell>
          {round(props.bounds.leftTop.lat, 5)}
          <br />
          {round(props.bounds.leftTop.lng, 5)}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>rightBottom</Table.Cell>
        <Table.Cell>
          {round(props.bounds.rightBottom.lat, 5)}
          <br />
          {round(props.bounds.rightBottom.lng, 5)}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

export default MeshDetail
