// @flow

import React from 'react'
import { Table } from 'semantic-ui-react'

import type { Bounds, LatLng } from '../domain/meshCalculator'

export type MeshDetailProps = {
  code: string,
  center: LatLng,
  bounds: Bounds
}

const MeshDetail = (props: MeshDetailProps) =>
  <Table inverted>
    <Table.Body>
      <Table.Row>
        <Table.Cell>mesh</Table.Cell>
        <Table.Cell>
          {props.code}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>center</Table.Cell>
        <Table.Cell>
          {props.center.lat}
          <br />
          {props.center.lng}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>leftTop</Table.Cell>
        <Table.Cell>
          {props.bounds.leftTop.lat}
          <br />
          {props.bounds.leftTop.lng}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>rightBottom</Table.Cell>
        <Table.Cell>
          {props.bounds.rightBottom.lat}
          <br />
          {props.bounds.rightBottom.lng}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

export default MeshDetail
