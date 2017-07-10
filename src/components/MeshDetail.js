// @flow

import React, { PropTypes } from 'react'
import { Table } from 'semantic-ui-react'

import type { Mesh } from '../reducers'

const MeshDetail = ({ code, center, bounds }: Mesh) =>
  <Table inverted>
    <Table.Body>
      <Table.Row>
        <Table.Cell>mesh</Table.Cell>
        <Table.Cell>
          {code}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>center</Table.Cell>
        <Table.Cell>
          {center.lat}
          <br />
          {center.lng}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>leftTop</Table.Cell>
        <Table.Cell>
          {bounds.leftTop.lat}
          <br />
          {bounds.leftTop.lng}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>rightBottom</Table.Cell>
        <Table.Cell>
          {bounds.rightBottom.lat}
          <br />
          {bounds.rightBottom.lng}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

MeshDetail.PropTypes = {
  code: PropTypes.string.isRequired,
  center: PropTypes.array.isRequired,
  bounds: PropTypes.array.isRequired
}

export default MeshDetail
